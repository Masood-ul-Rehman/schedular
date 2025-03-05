import React, { useState } from "react";
import { Instagram, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface InstagramConnectionFormProps {
  onConnect?: (credentials: { username: string; password: string }) => void;
  isConnected?: boolean;
  connectionError?: string;
  username?: string;
}

const InstagramConnectionForm = ({
  onConnect = () => {},
  isConnected = false,
  connectionError = "",
  username = "",
}: InstagramConnectionFormProps) => {
  const [formData, setFormData] = useState({
    username: username || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      onConnect(formData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Instagram className="h-5 w-5 text-pink-500" />
            <CardTitle className="text-xl">Connect Instagram</CardTitle>
          </div>
          <CardDescription>
            Connect your Instagram Business account to start scheduling posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-md">
                <Check className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-medium">Successfully connected</p>
                  <p className="text-sm">
                    Your Instagram account @{username || "business_account"} is
                    connected
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {connectionError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{connectionError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Instagram Username
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="your_business_account"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Instagram Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p>
                  We only use your credentials to connect to Instagram's API.
                </p>
                <p>Your password is never stored on our servers.</p>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isConnected ? (
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1">
                Disconnect
              </Button>
              <Button className="flex-1">Continue</Button>
            </div>
          ) : (
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit}
              disabled={loading || !formData.username || !formData.password}
            >
              {loading ? "Connecting..." : "Connect Instagram Account"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default InstagramConnectionForm;
