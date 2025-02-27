import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Added to prevent duplicate users
  },
}, { timestamps: true }); // Automatically adds createdAt & updatedAt

const User = models.User || model("User", userSchema);

export default User;
