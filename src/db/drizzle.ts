import "dotenv/config";
import {
  boolean,
  index,
  mysqlTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

// create the connection
const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const db = drizzle(connection);

// This is where the drizzle schema would go.

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 32 }).primaryKey(),
    email: text("email"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    imageUrl: text("image_url"),
    createdAt: text("created_at"),
    updatedAt: text("updated_at"),
    isDeleted: boolean("is_deleted").default(false),
  },
  (table) => ({
    idIndex: index("id_index").on(table.id),
  })
);

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export const dashboards = mysqlTable("dashboards", {
  id: serial("id"),
  name: text("name"),
  contents: text("contents"), // This will be a serialized JSON string of the contents for the dashboard
  createdAt: text("created_at"), // Set only on dashboard creation
  updatedAt: text("updated_at"), // Set each time the dashboard is updated
});

export type Dashboard = InferSelectModel<typeof dashboards>;
export type InsertDashboard = InferInsertModel<typeof dashboards>;

// Then run npm run db:push
