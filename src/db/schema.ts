import {
  boolean,
  index,
  mysqlTable,
  serial,
  text,
  varchar,
  int,
  double,
} from "drizzle-orm/mysql-core";
import {
  type InferSelectModel,
  type InferInsertModel,
  relations,
} from "drizzle-orm";

// This is where the drizzle schema would go.

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 32 }).primaryKey(),
    email: text("email"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    imageUrl: text("image_url"),
    isAdmin: boolean("is_admin").default(false),
    isDeleted: boolean("is_deleted").default(false),
    createdAt: text("created_at"),
    updatedAt: text("updated_at"),
  },
  (table) => ({
    idIndex: index("id_index").on(table.id),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  dashboards: many(dashboards),
  statsCanadaTables: many(statsCanadaTables),
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

export const statsCanadaTables = mysqlTable(
  "statsCanadaTables",
  {
    id: serial("id").primaryKey(),
    authorId: varchar("author_id", { length: 32 }).notNull(),
    productId: int("product_id").notNull().unique(),
    createdAt: text("created_at"), // Set only on creation
    updatedAt: text("updated_at"), // Set only on update
  },
  (table) => ({
    productIdIndex: index("product_id_index").on(table.productId),
    authorIdIndex: index("author_id_index").on(table.authorId),
  })
);

export const statsCanadaTablesRelations = relations(
  statsCanadaTables,
  ({ one, many }) => ({
    author: one(users, {
      fields: [statsCanadaTables.authorId],
      references: [users.id],
    }),
    data: many(statsCanadaData),
  })
);

export type StatsCanadaTable = InferSelectModel<typeof statsCanadaTables>;
export type InsertStatsCanadaTable = InferInsertModel<typeof statsCanadaTables>;

export const statsCanadaData = mysqlTable(
  "statsCanadaData",
  {
    id: serial("id").primaryKey(),
    tableId: int("table_id").notNull(),
    productId: int("product_id").notNull(),
    coordinate: varchar("coordinate", { length: 50 }).notNull(),
    label: text("label").notNull(),
    labelFr: text("label_fr").notNull(),
    refPeriod: text("ref_period"),
    value: double("value"),
    createdAt: text("created_at"), // Set only on creation
    updatedAt: text("updated_at"), // Set only on update
  },
  (table) => ({
    productIdIndex: index("product_id_index").on(table.productId),
    coordinateIndex: index("coordinate_index").on(table.coordinate),
  })
);

export const statsCanadaDataRelations = relations(
  statsCanadaData,
  ({ one }) => ({
    statsCanadaTable: one(statsCanadaTables, {
      fields: [statsCanadaData.tableId],
      references: [statsCanadaTables.id],
    }),
  })
);

export type StatsCanadaData = InferSelectModel<typeof statsCanadaData>;
export type InsertStatsCanadaData = InferInsertModel<typeof statsCanadaData>;

// Then run npm run db:push
