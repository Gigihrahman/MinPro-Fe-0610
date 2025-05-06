"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import OrganizerNavbar from "@/components/Navbar";
import OrganizerSidebar from "./OrganizerSidebar";

export default function DashboardClientWrapper({
  children,
  title = "Dashboard",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle initial mounting with window check for responsive behavior
  useEffect(() => {
    setIsMounted(true);
    // Set sidebar to open by default on larger screens
    if (typeof window !== "undefined") {
      setIsSidebarOpen(window.innerWidth >= 1024);
    }

    // Add resize listener
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent hydration issues
  if (!isMounted) {
    return null;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Sidebar */}
      <OrganizerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <OrganizerNavbar title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
