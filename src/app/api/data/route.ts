import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = getAuth(req); // ✅ Fixed by using getAuth(req)

  if (!userId) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  return NextResponse.json({
    message: "Authentication Successful",
    data: { userId },
  });
}
