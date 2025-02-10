"use server";

import User from "@/models/ticket.model"; // ✅ Ensure correct model path
import { connect } from "@/db";

interface UserProps {
  clerkId: string;
  email: string;
}

export async function createUser(userData: UserProps) {
  try {
    await connect();
    const newUser = new User(userData); // ✅ Correct model instantiation
    await newUser.save();
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}
