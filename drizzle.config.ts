import type { Config } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required.");
}

export default {
  schema: "./src/db/drizzle.ts",
  out: "./src/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  },
} satisfies Config;
