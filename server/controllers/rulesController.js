const fetch = require("node-fetch");
const https = require("https");
const { Rule, ruleSchema } = require("../models/rule.js");
const mongoose = require("mongoose");
// Get rules by tag controller function
// this function is responsible for fetching rules from the Elasticsearch cluster based on the user's role and saving them in the main MongoDB cluster
const getRulesByTag = async (req, res) => {
  try {
    const { fonction } = req.user;
    const query = {
      query: {
        match: {
          tag: fonction,
        },
      },
    };

    const url = `https://localhost:9200/rules/_search?&filter_path=hits.hits._source`;

    // Set up the request headers
    const authHeader =
      "Basic " +
      Buffer.from(`elastic:${process.env.PASSWORD}`).toString("base64");

    // Create an https agent to ignore self-signed certificate errors
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(query),
      agent,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch rules by tag");
    }

    const data = await response.json();

    // Extract the _source field from the retrieved data
    const sourceArray = data.hits.hits.map((hit) => hit._source);

    // Check for existing rules with the same tag before the loop
    const existingRules = await Rule.find({
      tag: { $in: sourceArray.map((rule) => rule.tag) },
    });
    // Extract the tags from the existing rules
    const existingTags = existingRules.map((rule) => rule.tag);
    let newRule;
    for (const rule of sourceArray) {
      // Check if the rule's tag is not in the existing tags array
      if (!existingTags.includes(rule.tag)) {
        // Save the rule in the main cluster if it doesn't already exist
        newRule = new Rule({
          name: rule.name,
          description: rule.description,
          tag: rule.tag,
        });
        await newRule.save();

        // Distribute the rule to a dynamically created collection based on its tag
        const OtherRuleCollection = mongoose.model(
          `Rule_${rule.tag.replace(/ /g, "_")}`,
          ruleSchema
        );
        const newRuleInOtherCollection = new OtherRuleCollection({
          name: rule.name,
          description: rule.description,
          tag: rule.tag,
        });
        await newRuleInOtherCollection.save();
      }
    }

    // console.log(
    //   "Rules saved in the main collection and distributed to other collections based on their tags"
    // );

    // Return the fetched rules data to the client
    res.status(200).json(sourceArray);
  } catch (error) {
    console.error("Error while fetching rules by tag", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Generate text controller function
// this function is responsible for generating text based on the user's role and the prompt provided by the user
const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);
    const { fonction } = req.user;
    console.log(fonction);
    const requestBody = {
      prompt: prompt,
      tag: fonction,
    };

    // Set the URL for the text generation API
    // This URL should be the URL of the text generation API from mistral API
    const generateUrl = "http://127.0.0.1:8000/api/generate/";

    const response = await fetch(generateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Failed to generate text");
    }

    const generatedData = await response.json();

    // Process the generated text data as needed

    res.status(200).json(generatedData); // Return the generated text data to the client
  } catch (error) {
    console.error("Error while generating text", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete rules controller function by there tag
const deleteRules = async (req, res) => {
  try {
    const { tag } = req.body;
    const result = await Rule.deleteMany({ tag });
    if (result.deletedCount > 0) {
      res.status(200).json({
        message: `${result.deletedCount} records deleted successfully.`,
      });
    } else {
      res
        .status(404)
        .json({ message: "No records found with the specified name." });
    }
  } catch (error) {
    console.error("Error deleting all rules", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getRulesByTag, generateText, deleteRules };
