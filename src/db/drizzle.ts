import "dotenv/config";
import {
  boolean,
  index,
  mysqlTable,
  serial,
  text,
  varchar,
  int,
} from "drizzle-orm/mysql-core";
import {
  type InferSelectModel,
  type InferInsertModel,
  relations,
} from "drizzle-orm";
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
    isAdmin: boolean("is_admin").default(false),
    isDeleted: boolean("is_deleted").default(false),
  },
  (table) => ({
    idIndex: index("id_index").on(table.id),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  dashboards: many(dashboards),
  statsCanadaData: many(statsCanadaData),
}));

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export const dashboards = mysqlTable(
  "dashboards",
  {
    id: serial("id"),
    userId: varchar("user_id", { length: 32 }).notNull(),
    name: varchar("name", { length: 100 }),
    contents: text("contents"), // This will be a serialized JSON string of the contents for the dashboard
    createdAt: text("created_at"), // Set only on dashboard creation
    updatedAt: text("updated_at"), // Set each time the dashboard is updated
  },
  (table) => ({
    userIdIndex: index("user_id_index").on(table.userId),
    nameIndex: index("name_index").on(table.name),
  })
);

export const dashboardsRelations = relations(dashboards, ({ one }) => ({
  user: one(users, {
    fields: [dashboards.userId],
    references: [users.id],
  }),
}));

export type Dashboard = InferSelectModel<typeof dashboards>;
export type InsertDashboard = InferInsertModel<typeof dashboards>;

export const statsCanadaData = mysqlTable(
  "statsCanadaData",
  {
    id: serial("id"),
    authorId: varchar("author_id", { length: 32 }).notNull(),
    productId: int("product_id").notNull().unique(),
    data: text("data"), // This will be a serialized JSON string of the data from Stats Canada
    metadata: text("metadata"), // This will be a serialized JSON string of the metadata from Stats Canada
    createdAt: text("created_at"), // Set only on dashboard creation
    updatedAt: text("updated_at"), // Set each time the dashboard is updated
  },
  (table) => ({
    productIdIndex: index("product_id_index").on(table.productId),
    authorIdIndex: index("author_id_index").on(table.authorId),
  })
);

export const statsCanadaDataRelations = relations(
  statsCanadaData,
  ({ one }) => ({
    author: one(users, {
      fields: [statsCanadaData.authorId],
      references: [users.id],
    }),
  })
);

export type StatsCanadaData = InferSelectModel<typeof statsCanadaData>;
export type InsertStatsCanadaData = InferInsertModel<typeof statsCanadaData>;

// Then run npm run db:push
