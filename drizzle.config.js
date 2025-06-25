// drizzle.config.js
require("dotenv").config({ path: ".env.local" });
const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
  schema: "./utils/schema.js", // adjust as needed
  dialect: "postgresql", // ✅ REQUIRED field to fix your error
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});