import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 443,
  verifyToken: process.env.VERIFY_TOKEN,
  sperantToken: process.env.SPERANT_TOKEN || ""
};
