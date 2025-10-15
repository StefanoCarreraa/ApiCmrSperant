import { config } from "../config/config.js";
import axios from "axios";

export const tiktokController = {
  verifyWebhook: (req, res) => {
    const challenge = req.query.challenge;
    if (challenge) {
      console.log("✅ Webhook verificado con TikTok");
      return res.send(challenge);
    }
    console.warn("Solicitud de verificación inválida");
    return res.sendStatus(400);
  },
  receiveWebhook: (req, res) => {
    try {
      let body = req.body;

      // Si TikTok envía texto, lo convertimos en JSON
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch {
          console.warn("⚠️ El cuerpo no era JSON válido:", body);
        }
      }

      console.log("📩 Nuevo evento recibido desde TikTok:");
      console.log(JSON.stringify(body, null, 2));

      res.sendStatus(200);
    } catch (err) {
      console.error("❌ Error en webhook:", err);
      return res.sendStatus(500);
    }
  },
  authCallback: (req, res) => {
    try {
      const { code, state } = req.query;

      if (!code) {
        console.warn("⚠️ No se recibió el código de autorización");
        return res.status(400).send("Missing authorization code");
      }

      console.log("✅ Código de autorización recibido desde TikTok:");
      console.log("Code:", code);
      console.log("State:", state || "sin estado");

      // Aquí podrías intercambiar el code por un access_token usando la API de TikTok.
      // Ejemplo (pendiente de implementación):
      // const token = await getAccessTokenFromTikTok(code);

      return res.send("✅ TikTok authorization successful");
    } catch (err) {
      console.error("❌ Error en el callback de TikTok:", err);
      return res.sendStatus(500);
    }
  },
  verifyleadsWebhook: async (req, res) => {
    try {
      const data = Array.isArray(req.body) ? req.body[0] : req.body;
      console.log("📥 Lead recibido desde Zapier:", data);

      // Mapeo de campos al formato que espera Sperant
      const body = {
        fname: data.Name || "",
        lname: data.LName || "",
        phone: data.Number || "",
        email: data.Email || "",
        document: data.Dni || "",
        document_type_id: 1,
        interestTypeId: 4,
        inputChannelId: 2,
        sourceId: 79,
        projectId: 570,
        gender: "f", // puedes cambiarlo o detectar según nombre
        person_type: "natural",

        utm_source: "tiktok",
      };

      // Envío del lead a Sperant
      const response = await axios.post(
        "https://api.eterniasoft.com/v3/clients",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: config.sperantToken,
          },
        }
      );

      console.log("✅ Lead enviado a Sperant:", response.data);

      return res.status(200).json({
        message: "Lead recibido y enviado correctamente a Sperant",
        sperant: response.data,
      });
    } catch (error) {
      console.error(
        "❌ Error al enviar lead a Sperant:",
        error.response?.data || error.message
      );

      return res.status(500).json({
        message: "Error al enviar lead a Sperant",
        error: error.response?.data || error.message,
      });
    }
  },
};
