import express from "express";
import { legalController } from "../controllers/legal.controller.js";

const router = express.Router();

router.get("/privacidad", legalController.privacidad);
router.get("/terminos", legalController.terminos);
router.get("/eliminar-datos", legalController.eliminar);

export default router;
