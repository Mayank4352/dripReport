"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Import the custom useAuth hook
import { toast } from "sonner";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config"; // Firebase auth config

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  // Redirect to login if the user is not logged in and authentication is done loading
  useEffect(() => {
    if (!loading && !user) {
      toast.error("You must be logged in to access this page");
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  // Handle sign out
  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      toast.success("Successfully signed out!");
      router.push("/sign-in");
    } else if (signOutError) {
      toast.error("Error signing out. Please try again.");
    }
  };

  if (loading) {
    // Show a loading state while checking authentication
    return <div>Loading...</div>;
  }

  if (!user) {
    // Optionally, return null to avoid rendering any content before redirect
    return null;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to the Home Page!</h1>
      <p>This page is protected and can only be accessed by logged-in users.</p>

      <button
        onClick={handleSignOut}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        disabled={signOutLoading}
      >
        {signOutLoading ? "Signing Out..." : "Sign Out"}
      </button>
    </div>
  );
}
