import { facebookService } from "../services/facebook.service.js";
import { config } from "../config/config.js";

export const facebookController = {
  verifyWebhook: (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === config.verifyToken) {
      console.log("✅ Webhook verificado con Meta");
      return res.status(200).send(challenge);
    }

    console.log("❌ Error en la verificación");
    return res.sendStatus(403);
  },

  // 📩 2. Recepción de eventos (POST)
  receiveWebhook: async (req, res) => {
    try {
      console.log("📩 Nuevo evento recibido desde Meta:");
      facebookService.logPayload(req.body);

      // Si el evento es de tipo "leadgen"
      const entry = req.body.entry?.[0];
      const change = entry?.changes?.[0];
      const value = change?.value;

      if (change?.field === "leadgen" && value?.leadgen_id) {
        const leadId = value.leadgen_id;

        console.log("🔎 Consultando datos del lead:", leadId);

        // Llamada a la API Graph
        const response = await fetch(
          `https://graph.facebook.com/v21.0/${leadId}?access_token=${config.metaAccessToken}`
        );

        const data = await response.json();

        console.log("📄 Datos del lead recibidos:");
        console.log(JSON.stringify(data, null, 2));

        // 👉 Aquí podrías guardar los datos en tu BD o CRM
        // await crmService.saveLead(data);
      }

      return res.sendStatus(200);
    } catch (err) {
      console.error("❌ Error en webhook:", err);
      return res.sendStatus(500);
    }
  },
};
