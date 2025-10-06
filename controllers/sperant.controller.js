import fetch from "node-fetch";
import { config } from "../config/config.js";

export const sperantController = {
  getProjects: async (req, res) => {
    if (!config.sperantToken) {
      return res.status(500).json({ success: false, error: "SPERANT_TOKEN no definido" });
    }

    try {
      const response = await fetch("https://api.eterniasoft.com/v3/projects", {
        method: "GET",
        headers: {
          Authorization: config.sperantToken,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error API Sperant: ${response.status} - ${text}`);
      }

      const data = await response.json();
      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  createClient: async (req, res) => {
    if (!config.sperantToken) {
      return res.status(500).json({ success: false, error: "SPERANT_TOKEN no definido" });
    }

    try {
      const clientData = req.body;

      const response = await fetch("https://api.sperant.com/v3/clients", {
        method: "POST",
        headers: {
          Authorization: config.sperantToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error API Sperant: ${response.status} - ${text}`);
      }

      const data = await response.json();
      return res.status(201).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
};
