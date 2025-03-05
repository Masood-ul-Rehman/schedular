import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import CalendarView from "./CalendarView";
import AnalyticsPanel from "./AnalyticsPanel";
import PostEditor from "./PostEditor";

interface DashboardProps {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
  initialView?: "calendar" | "analytics" | "create" | "settings";
}

const Dashboard = ({
  userName = "Jane Smith",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  onLogout = () => console.log("Logout clicked"),
  initialView = "calendar",
}: DashboardProps) => {
  const [activeView, setActiveView] = useState<string>(initialView);

  // Function to render the appropriate view based on activeView state
  const renderView = () => {
    switch (activeView) {
      case "calendar":
        return <CalendarView onCreatePost={() => setActiveView("create")} />;
      case "analytics":
        return <AnalyticsPanel />;
      case "create":
        return <PostEditor onSchedule={() => setActiveView("calendar")} />;
      case "settings":
        return (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-muted-foreground">
                Settings panel coming soon
              </p>
            </div>
          </div>
        );
      default:
        return <CalendarView />;
    }
  };

  // Handle navigation from sidebar
  const handleNavigation = (view: string) => {
    setActiveView(view);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activePage={activeView}
        userName={userName}
        userAvatar={userAvatar}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {/* Render the active view or the router outlet */}
        {renderView()}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
