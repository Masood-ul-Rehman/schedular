import React, { useState, useEffect } from "react";
import AuthContainer from "./auth/AuthContainer";
import Dashboard from "./dashboard/Dashboard";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInstagramConnected, setIsInstagramConnected] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already authenticated (e.g., from localStorage)
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedAuthStatus = localStorage.getItem("isAuthenticated");
      const savedInstagramStatus = localStorage.getItem("isInstagramConnected");

      if (savedAuthStatus === "true") {
        setIsAuthenticated(true);
      }

      if (savedInstagramStatus === "true") {
        setIsInstagramConnected(true);
      }
    };

    checkAuthStatus();
  }, []);

  // Handle successful Google authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    setAuthError("");
  };

  // Handle successful Instagram connection
  const handleInstagramConnected = () => {
    setIsInstagramConnected(true);
    localStorage.setItem("isInstagramConnected", "true");
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsInstagramConnected(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isInstagramConnected");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && isInstagramConnected ? (
        // Show Dashboard when user is authenticated and Instagram is connected
        <Dashboard onLogout={handleLogout} />
      ) : (
        // Show Auth Container when user is not authenticated or Instagram is not connected
        <div className="flex items-center justify-center min-h-screen p-4">
          <AuthContainer
            onAuthSuccess={handleAuthSuccess}
            onInstagramConnected={handleInstagramConnected}
            error={authError}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
