import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserWebhookEvent } from "@clerk/nextjs/server";
import { DateTime } from "luxon";

import { db, users } from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = (await req.json()) as UserWebhookEvent;
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = (await wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    })) as UserWebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const id = evt.data.id as string;

  if (evt.type === "user.deleted") {
    await db.update(users).set({ isDeleted: true }).where(eq(users.id, id));
    return new Response("User deletion handled successfully", {
      status: 200,
    });
  }

  // If we get here we know the user is being created or updated
  const email = evt.data.email_addresses[0].email_address;
  const firstName = evt.data.first_name;
  const lastName = evt.data.last_name;
  const imageUrl = evt.data.image_url;
  const createdAt = DateTime.fromMillis(evt.data.created_at).toISO(); // This is an epoch timestamp in milliseconds
  const updatedAt = DateTime.fromMillis(evt.data.updated_at).toISO(); // This is an epoch timestamp in milliseconds

  // If the user already exists, update it
  await db
    .insert(users)
    .values({
      id,
      email,
      firstName,
      lastName,
      imageUrl,
      createdAt,
      updatedAt,
    })
    .onDuplicateKeyUpdate({
      set: {
        email,
        firstName,
        lastName,
        imageUrl,
        updatedAt,
      },
    });

  return new Response("User data was successfully saved", { status: 200 });
}
