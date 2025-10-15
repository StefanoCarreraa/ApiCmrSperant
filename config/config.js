import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  verifyToken: process.env.VERIFY_TOKEN,
  sperantToken: process.env.SPERANT_TOKEN || "",
  metaAccessToken: process.env.META_ACCESS_TOKEN || "",
};
