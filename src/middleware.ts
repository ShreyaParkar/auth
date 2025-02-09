import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!_next|.*\\..*|api/public).*)", "/api/data"], // Ensure it applies to protected routes
};
