"use client";

import { useAuth, useUser } from "@clerk/nextjs"; // Use Clerk's hooks for authentication
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TicketPage() {
  const { userId } = useAuth();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userId && isLoaded) {
      router.push("/signin");
    }
  }, [userId, isLoaded, router]);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Your Ticket</h1>
      {user ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}</p>
        </div>
      ) : (
        <p>Failed to load ticket details.</p>
      )}
    </div>
  );
}
