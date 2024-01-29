import { HTTP_RESPONSE } from "@/constants/http-responses";
import { getAllStatsCanadaTables } from "@/db/actions";
import { db } from "@/db/drizzle";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Return all of the tables to display in tabular format
  const tables = await getAllStatsCanadaTables();

  return Response.json({ tables, status: HTTP_RESPONSE.OK });
}
