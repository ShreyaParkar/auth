import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createUser } from "@/actions/user.action"; // ✅ Import correct function

export async function POST(req: Request) {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!CLERK_WEBHOOK_SECRET) {
    console.error("Error: CLERK_WEBHOOK_SECRET is missing in environment variables.");
    return new Response("Error: Webhook Secret Missing", { status: 500 });
  }

  // Initialize Svix Webhook Verification
  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  // Get Headers
  const headerPayload = headers();
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id") || "",
    "svix-timestamp": headerPayload.get("svix-timestamp") || "",
    "svix-signature": headerPayload.get("svix-signature") || "",
  };

  // Ensure required headers are present
  if (!svixHeaders["svix-id"] || !svixHeaders["svix-timestamp"] || !svixHeaders["svix-signature"]) {
    console.error("Error: Missing Svix headers in webhook request.");
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  // Parse Request Body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify Payload Signature
  try {
    evt = wh.verify(body, svixHeaders) as WebhookEvent;
  } catch (err) {
    console.error("Error: Webhook signature verification failed:", err);
    return new Response("Error: Webhook verification failed", { status: 400 });
  }

  // Extract Event Details
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      const { id, email_addresses } = evt.data;

      // Create User Object
      const user = {
        clerkId: id,
        email: email_addresses?.[0]?.email_address || "No Email",
      };

      console.log("Creating user in database:", user);

      // Store user in the database
      const newUser = await createUser(user); // ✅ Fixed function call

      if (newUser && newUser._id) {
        console.log("Updating Clerk metadata with new User ID:", newUser._id);
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      } else {
        console.error("Error: User was not created in the database.");
      }

      return NextResponse.json({ message: "New User Created", user: newUser });
    } catch (error) {
      console.error("Error handling user.created webhook:", error);
      return NextResponse.json({ message: "Error processing webhook", error }, { status: 500 });
    }
  }

  console.log(`Received webhook with ID ${id} and event type: ${eventType}`);
  console.log("Webhook payload:", body);

  return new Response("Webhook received", { status: 200 });
}
