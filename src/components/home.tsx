"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import AuthContainer from "./auth/AuthContainer";
import Dashboard from "./dashboard/Dashboard";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isInstagramConnected, setIsInstagramConnected] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if Instagram is connected (from localStorage)
  useEffect(() => {
    const checkInstagramStatus = () => {
      const savedInstagramStatus = localStorage.getItem("isInstagramConnected");

      if (savedInstagramStatus === "true") {
        setIsInstagramConnected(true);
      }
    };

    checkInstagramStatus();
  }, []);

  // Handle successful Instagram connection
  const handleInstagramConnected = () => {
    setIsInstagramConnected(true);
    localStorage.setItem("isInstagramConnected", "true");
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut({ redirect: false });
    setIsInstagramConnected(false);
    localStorage.removeItem("isInstagramConnected");
    router.push("/");
  };

  // If loading session
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {session && isInstagramConnected ? (
        // Show Dashboard when user is authenticated and Instagram is connected
        <Dashboard
          userName={session.user?.name || "User"}
          userAvatar={
            session.user?.image ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
          }
          onLogout={handleLogout}
        />
      ) : (
        // Show Auth Container when user is not authenticated or Instagram is not connected
        <div className="flex items-center justify-center min-h-screen p-4">
          <AuthContainer
            onInstagramConnected={handleInstagramConnected}
            error={authError}
            isLoading={isLoading}
            isAuthenticated={!!session}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
