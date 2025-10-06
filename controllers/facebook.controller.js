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

  receiveWebhook: async (req, res) => {
    try {
      console.log("📩 Nuevo evento recibido desde Meta:");
      facebookService.logPayload(req.body);
      return res.sendStatus(200);
    } catch (err) {
      console.error("❌ Error en webhook:", err);
      return res.sendStatus(500);
    }
  },
};
