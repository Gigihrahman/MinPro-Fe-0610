"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BarChart3,
  Calendar,
  Ticket,
  Tag,
  MessageSquare,
  Settings,
  User,
  ChevronRight,
  Plus,
  X,
  Clock,
  Star,
  CreditCard,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

// Custom hook for getting user profile (you need to implement this)
const useGetProfile = () => {
  // Mock data - replace with your actual implementation
  const [profile, setProfile] = useState<{
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProfile = async () => {
      try {
        // Replace with your actual API call
        // const response = await fetch('/api/profile');
        // const data = await response.json();

        // Mock data
        const mockData = {
          id: "O1",
          fullName: "Event Organizer",
          email: "organizer@eventhub.com",
          avatarUrl: undefined,
        };

        setProfile(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
};

interface SubItem {
  label: string;
  href: string;
  active?: boolean;
  badge?: number | null;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  subItems?: SubItem[];
  badge?: number | null;
}

export default function OrganizerSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, loading } = useGetProfile();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamically check which nav items should be active based on the current path
  const navItems: NavItem[] = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/organizer/dashboard-organizer",
      active: pathname === "/organizer/dashboard-organizer",
    },
    {
      icon: BarChart3,
      label: "Transactions",
      href: "#",
      active: pathname?.includes("/organizer/transactions"),
      subItems: [
        {
          label: "All Transactions",
          href: "/organizer/all-transactions",
          active: pathname === "/organizer/all-transactions",
        },
        {
          label: "Manual Payments",
          href: "/organizer/manual-payments",
          active: pathname === "/organizer/manual-payments",
        },
      ],
      badge: 5,
    },
    {
      icon: Calendar,
      label: "Events",
      href: "#",
      active: pathname?.includes("/organizer/events"),
      subItems: [
        {
          label: "All Events",
          href: "/organizer/all-events",
          active: pathname === "/organizer/all-events",
          badge: 12,
        },
        {
          label: "Create Event",
          href: "/organizer/create-event",
          active: pathname === "/organizer/create-event",
        },
      ],
    },
    {
      icon: Ticket,
      label: "Tickets",
      href: "#",
      active: pathname?.includes("/organizer/tickets"),
      subItems: [
        {
          label: "Manage Tickets",
          href: "/organizer/tickets",
          active: pathname === "/organizer/tickets",
        },
        {
          label: "Create Tickets",
          href: "/organizer/tickets/create",
          active: pathname === "/organizer/tickets/create",
        },
      ],
    },
    {
      icon: Tag,
      label: "Vouchers",
      href: "#",
      active: pathname?.includes("/organizer/vouchers"),
      subItems: [
        {
          label: "All Vouchers",
          href: "/organizer/all-vouchers",
          active: pathname === "/organizer/all-vouchers",
        },
        {
          label: "Create Vouchers",
          href: "/organizer/vouchers/create",
          active: pathname === "/organizer/vouchers/create",
        },
      ],
    },
    {
      icon: User,
      label: "Profile",
      href: "/organizer/profile",
      active: pathname === "/organizer/profile",
    },
  ];

  const handleToggle = (label: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Early render prevention
  if (!mounted) return null;

  // Sidebar animations
  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", damping: 20, stiffness: 300 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", damping: 20, stiffness: 300 },
    },
  };

  const logout = () => {
    signOut({ redirect: false });
    router.push("/login");
  };
  // Mobile overlay
  const overlayVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-purple-100 z-50 flex flex-col ${
          isOpen ? "" : "hidden lg:flex"
        }`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-purple-100 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5 text-purple-700" />
        </button>

        {/* Header */}
        <div className="p-4 border-b border-purple-100">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white">
              <span className="font-bold">O</span>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                +
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                EventHub Organizer
              </span>
              <span className="text-xs text-gray-500">
                Event Management Pro
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* Decorative elements */}
          <div className="absolute -left-4 top-1/4 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute -right-4 bottom-1/4 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl"></div>

          {/* Upcoming events quickview */}
          <div className="mb-4 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-purple-800">
                Upcoming Events
              </h3>
              <Link
                href="/organizer/events"
                className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1"
              >
                View all <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-2 rounded-md bg-white/80 shadow-sm">
                <div className="p-1.5 bg-purple-100 rounded-md">
                  <Clock className="h-3 w-3 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">
                    Summer Music Festival
                  </p>
                  <p className="text-xs text-gray-500">Today, 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-md bg-white/80 shadow-sm">
                <div className="p-1.5 bg-purple-100 rounded-md">
                  <Star className="h-3 w-3 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">
                    Tech Conference 2025
                  </p>
                  <p className="text-xs text-gray-500">Tomorrow, 9:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Create Event button */}
          <Link
            href="/organizer/create-event"
            className="mb-4 flex justify-center"
          >
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition-all w-full flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </button>
          </Link>

          {/* Nav items */}
          <div className="space-y-1 relative z-10">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.subItems ? (
                  <div className="mb-1">
                    <button
                      onClick={() => handleToggle(item.label)}
                      className={`group relative flex w-full items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        item.active
                          ? "text-purple-700 font-medium bg-purple-50"
                          : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      }`}
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <item.icon className="h-5 w-5" />
                          {hoveredItem === item.label && (
                            <motion.div
                              layoutId="hoverIndicator"
                              className="absolute -left-2 -right-2 -top-2 -bottom-2 rounded-md bg-purple-300/20"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </div>
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        <motion.div
                          animate={{ rotate: openItems[item.label] ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {openItems[item.label] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-1 space-y-1 pl-4 relative before:absolute before:-left-0 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-purple-400/30 before:to-pink-400/30">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className={`group flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg ${
                                  subItem.active
                                    ? "text-purple-700 font-medium bg-purple-50/70"
                                    : "text-gray-600 hover:bg-purple-50/50 hover:text-purple-700"
                                }`}
                              >
                                <span>{subItem.label}</span>
                                {subItem.badge && (
                                  <span className="px-1.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                    {subItem.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`group relative flex w-full items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.active
                        ? "text-purple-700 font-medium bg-purple-50"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <item.icon className="h-5 w-5" />
                        {hoveredItem === item.label && (
                          <motion.div
                            layoutId="hoverIndicator"
                            className="absolute -left-2 -right-2 -top-2 -bottom-2 rounded-md bg-purple-300/20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </div>
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {/* If active, show active indicator */}
                    {item.active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-purple-500 to-pink-500"
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer with user info */}
        <div className="p-3 border-t border-purple-100">
          <div className="relative">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors">
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-3 w-32 bg-gray-200 animate-pulse rounded mt-1"></div>
                  </div>
                </div>
              ) : profile ? (
                <>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-medium">
                    {profile.fullName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {profile.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {profile.email}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-medium">
                    O
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Organizer Account
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Sign in to access all features
                    </p>
                  </div>
                </>
              )}
              <button
                className="p-2 rounded-full hover:bg-white/70 transition-colors relative"
                onClick={() => setShowLogout(!showLogout)}
              >
                <Settings className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Logout popover */}
            <AnimatePresence>
              {showLogout && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full right-0 mb-2 w-40 bg-white rounded-lg shadow-lg border border-purple-100 overflow-hidden"
                >
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                  >
                    <LogOut className="h-4 w-4 text-gray-500" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
