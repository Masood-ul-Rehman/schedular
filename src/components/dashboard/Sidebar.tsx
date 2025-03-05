"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  BarChart3,
  PlusSquare,
  Settings,
  LogOut,
  Instagram,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

interface SidebarProps {
  activePage?: string;
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const Sidebar = ({
  activePage = "calendar",
  userName = "Jane Smith",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  onLogout = () => console.log("Logout clicked"),
}: SidebarProps) => {
  const navItems = [
    {
      name: "Calendar",
      path: "/dashboard/calendar",
      icon: <Calendar className="h-5 w-5" />,
      id: "calendar",
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      id: "analytics",
    },
    {
      name: "Create Post",
      path: "/dashboard/create",
      icon: <PlusSquare className="h-5 w-5" />,
      id: "create",
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      id: "settings",
    },
  ];

  return (
    <div className="w-[250px] h-full bg-white border-r flex flex-col">
      {/* Logo and app name */}
      <div className="p-4 flex items-center">
        <div className="bg-blue-500 p-2 rounded-md mr-2">
          <Instagram className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold">InstaScheduler</h1>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link href={item.path}>
                <Button
                  variant={activePage === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${activePage === item.id ? "" : "text-gray-600"}`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Separator />

      {/* Help section */}
      <div className="p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="h-5 w-5 mr-2" />
                Help & Support
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Get help with using the app</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Separator />

      {/* User profile */}
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">Business Account</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
