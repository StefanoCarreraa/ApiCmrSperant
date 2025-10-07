import express from "express";
import facebookRoutes from "./routes/facebook.routes.js";
import sperantRoutes from "./routes/sperant.routes.js";
import legalRoutes from "./routes/legal.routes.js";

const app = express();

app.use(express.json());

// Rutas
app.use("/webhook", facebookRoutes);
app.use("/api/sperant", sperantRoutes);

// Webs 
app.use("/legal", legalRoutes);

export default app;
