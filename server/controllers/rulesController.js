const fetch = require("node-fetch");
const https = require("https");
const Rule = require("../models/rule");
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

    for (const rule of sourceArray) {
      // Check if the rule's tag is not in the existing tags array
      if (!existingTags.includes(rule.tag)) {
        // Save the rule in the main cluster if it doesn't already exist
        const newRule = new Rule({
          name: rule.name,
          description: rule.description,
          tag: rule.tag,
        });
        await newRule.save();
        console.log(`Rule ${newRule.name} saved in the main cluster`);
      }
      console.log(
        `Rule with tag  ${rule.tag} already exists in the main cluster`
      );
    }

    res.status(200).json(sourceArray); // Return the fetched rules data to the client
  } catch (error) {
    console.error("Error while fetching rules by tag", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
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

module.exports = { getRulesByTag, generateText };
