import express from "express";
import facebookRoutes from "./routes/facebook.routes.js";
import sperantRoutes from "./routes/sperant.routes.js";
import tiktokRoutes from "./routes/tiktok.routes.js";
import legalRoutes from "./routes/legal.routes.js";

const app = express();

// 🧩 Soporte para distintos formatos de cuerpo
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: "*/*" }));

// Rutas
app.use("/webhook", facebookRoutes);
app.use("/api/sperant", sperantRoutes);
app.use("/api", tiktokRoutes);

// Webs
app.use("/legal", legalRoutes);

export default app;

