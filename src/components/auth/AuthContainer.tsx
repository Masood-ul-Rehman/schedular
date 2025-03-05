"use client";

import React, { useState } from "react";
import { Instagram, AlertCircle } from "lucide-react";
import GoogleAuthButton from "./GoogleAuthButton";
import InstagramConnectionForm from "./InstagramConnectionForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { Button } from "@/src/components/ui/button";

interface AuthContainerProps {
  onInstagramConnected?: () => void;
  error?: string;
  isLoading?: boolean;
  isAuthenticated?: boolean;
}

const AuthContainer = ({
  onInstagramConnected = () => {},
  error = "",
  isLoading = false,
  isAuthenticated = false,
}: AuthContainerProps) => {
  const [authStep, setAuthStep] = useState<"google" | "instagram">(
    isAuthenticated ? "instagram" : "google",
  );
  const [googleAuthError, setGoogleAuthError] = useState("");
  const [instagramError, setInstagramError] = useState("");
  const [isInstagramConnected, setIsInstagramConnected] = useState(false);

  const handleInstagramConnect = (credentials: {
    username: string;
    password: string;
  }) => {
    // Simulate Instagram connection process
    setTimeout(() => {
      if (credentials.username && credentials.password) {
        setIsInstagramConnected(true);
        onInstagramConnected();
      } else {
        setInstagramError("Invalid Instagram credentials");
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-500 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Instagram className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Instagram Post Scheduler
          </CardTitle>
          <CardDescription>
            {authStep === "google"
              ? "Sign in with Google to get started"
              : "Connect your Instagram Business account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {authStep === "google" && (
            <div className="space-y-4">
              <GoogleAuthButton isLoading={isLoading} />

              {googleAuthError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Authentication Error</AlertTitle>
                  <AlertDescription>{googleAuthError}</AlertDescription>
                </Alert>
              )}

              <div className="text-center text-sm text-gray-500 mt-4">
                <p>By signing in, you agree to our</p>
                <div className="flex justify-center space-x-2">
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>
                  <span>and</span>
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          )}

          {authStep === "instagram" && (
            <InstagramConnectionForm
              onConnect={handleInstagramConnect}
              isConnected={isInstagramConnected}
              connectionError={instagramError}
            />
          )}
        </CardContent>

        {authStep === "instagram" && !isInstagramConnected && (
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" onClick={() => setAuthStep("google")}>
              Back to Sign In
            </Button>
          </CardFooter>
        )}
      </Card>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Need help?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthContainer;
