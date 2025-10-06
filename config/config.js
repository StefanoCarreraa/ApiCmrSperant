import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5007,
  verifyToken: process.env.VERIFY_TOKEN,
  sperantToken: process.env.SPERANT_TOKEN || ""
};
