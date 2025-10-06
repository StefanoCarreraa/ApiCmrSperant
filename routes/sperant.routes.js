import express from "express";
import { sperantController } from "../controllers/sperant.controller.js";

const router = express.Router();

// Ruta de prueba para comprobar que Express funciona
router.get("/ping", (req, res) => {
  res.json({ success: true, message: "pong 🏓" });
});

router.get("/projects", sperantController.getProjects);
router.post("/clients", sperantController.createClient);

export default router;
