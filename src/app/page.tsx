"use client"; // ✅ Mark as client component

import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userId } = useAuth(); // ✅ Keep authentication check
  const router = useRouter(); // ✅ Keep manual navigation

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary relative">
      {/* Top-right UserButton */}
      {userId && (
        <div className="absolute top-4 right-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      )}

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Digital Bus Pass System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience seamless travel with our smart ticketing solution. Scan, ride, and track your journey with ease.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            {!userId ? (
              <>
                <SignInButton mode="modal">
                  <Button size="lg">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="lg" variant="outline">
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <Button size="lg" onClick={() => router.push("/ticket")}>
                Go to Ticket Page
              </Button>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="p-6 border rounded-md text-center">
            <h3 className="text-xl font-semibold">Feature 1</h3>
            <p className="text-muted-foreground">Description of feature 1</p>
          </div>
          <div className="p-6 border rounded-md text-center">
            <h3 className="text-xl font-semibold">Feature 2</h3>
            <p className="text-muted-foreground">Description of feature 2</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of commuters who have already switched to our digital bus pass system.
          </p>
          {!userId && (
            <SignUpButton mode="modal">
              <Button size="lg" className="px-8">Create Your Account</Button>
            </SignUpButton>
          )}
        </div>
      </div>
    </div>
  );
}
