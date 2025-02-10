"use server";

import User from "@/modal/ticket.modal"; // ✅ Corrected import path
import { connect } from "@/db";

interface UserProps {
  clerkId: string;
  email: string;
}

export async function createUser(userData: UserProps) { // ✅ Explicit Type
  try {
    await connect();
    const newUser = await User.create(userData); // ✅ Corrected Model Usage
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}
