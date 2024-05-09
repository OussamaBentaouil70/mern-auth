const fetch = require("node-fetch");
const https = require("https");
const { log } = require("console");

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

    // Process the retrieved rules data as needed

    res.status(200).json(sourceArray); // Return the fetched rules data to the client
  } catch (error) {
    console.error("Error while fetching rules by tag", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getRulesByTag };
