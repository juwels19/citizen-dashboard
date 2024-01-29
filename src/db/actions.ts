import { count, eq } from "drizzle-orm";
import { db } from "./drizzle";
import {
  InsertStatsCanadaData,
  InsertStatsCanadaTable,
  statsCanadaData,
  statsCanadaTables,
  users,
} from "./schema";

export async function getUser(userId: string) {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });

  return user;
}

export async function getAllStatsCanadaTables() {
  const tables = await db.query.statsCanadaTables.findMany({
    with: {
      author: true,
      data: true,
    },
  });
  return tables;
}

export async function getStatsCanadaTable(productId: number) {
  const table = await db.query.statsCanadaTables.findFirst({
    where: eq(statsCanadaTables.productId, productId),
  });

  return table;
}

export async function addStatsCanadaTable(values: InsertStatsCanadaTable) {
  const res = await db.insert(statsCanadaTables).values({ ...values });

  return res;
}

export async function addStatsCanadaData(valuesArr: InsertStatsCanadaData[]) {
  const res = await db.insert(statsCanadaData).values(valuesArr);

  return res;
}
