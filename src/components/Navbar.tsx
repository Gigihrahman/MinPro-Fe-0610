"use client";

import { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import OrganizerSidebar from "./OrganizerSidebar";

export default function OrganizerNavbar({
  title = "Dashboard",
}: {
  title?: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Event Registration",
      message: "Someone registered for Summer Music Festival",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Payment Received",
      message: "You received a payment for Tech Conference tickets",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Event Reminder",
      message: "Your event 'Summer Music Festival' starts tomorrow",
      time: "3 hours ago",
      unread: false,
    },
  ];

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
          {/* Search bar */}
          <div className="hidden md:flex items-center bg-purple-50 rounded-full pl-3 pr-1 h-9">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search events, tickets..."
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm ml-2 w-40 lg:w-60"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative rounded-full p-2 text-gray-500 hover:bg-purple-50"
            >
              <Bell className="h-5 w-5" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-purple-600 ring-2 ring-white" />
              )}
            </button>

            {/* Notifications dropdown */}
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-1 w-80 rounded-lg border border-purple-100 bg-white shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-purple-100 px-4 py-2">
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                  <button className="text-xs text-purple-600 hover:text-purple-800">
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto overscroll-contain p-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex gap-3 p-3 rounded-md ${
                        notification.unread
                          ? "bg-purple-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                          notification.unread
                            ? "bg-purple-600"
                            : "bg-transparent"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-purple-100 p-2">
                  <button className="w-full rounded-md py-2 text-center text-sm text-purple-600 hover:bg-purple-50">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* User avatar (simplified for mobile) */}
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white md:hidden">
            <span className="text-xs font-medium">O</span>
          </button>
        </div>
      </header>
    </>
  );
}
