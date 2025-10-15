import express from "express";
import { tiktokController } from "../controllers/tiktok.controller.js";

const router = express.Router();

router.get("/tiktok", tiktokController.verifyWebhook);
router.post("/tiktok", tiktokController.receiveWebhook);
router.get("/tiktok/callback", tiktokController.authCallback);

//zapier
router.post("/tiktok/leads", tiktokController.verifyleadsWebhook);

export default router;
