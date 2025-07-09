import dotenv from "dotenv";

dotenv.config();

const envVar = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost:27017/tour-management",
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default envVar;
