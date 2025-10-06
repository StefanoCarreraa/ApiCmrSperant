import express from "express";
import { facebookController } from "../controllers/facebook.controller.js";

const router = express.Router();

router.get("/facebook", facebookController.verifyWebhook);
router.post("/facebook", facebookController.receiveWebhook);

export default router;
