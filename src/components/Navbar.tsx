"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import OrganizerSidebar from "./OrganizerSidebar";

export default function OrganizerNavbar({
  title = "Dashboard",
}: {
  title?: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <OrganizerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Navbar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-purple-100 bg-white/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-full p-2 text-gray-500 hover:bg-purple-50 lg:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>

        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

        <div className="ml-auto flex items-center gap-4">
          {/* User avatar (simplified for mobile) */}
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white md:hidden">
            <span className="text-xs font-medium">O</span>
          </button>
        </div>
      </header>
    </>
  );
}
