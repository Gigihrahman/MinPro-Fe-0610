"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  CreditCard,
  Home,
  MessageSquare,
  Settings,
  User,
  Menu,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { useState } from "react";

const navItems = [
  { icon: Home, label: "Dashboard", href: "#", active: false },
  { icon: BarChart3, label: "Analytics", href: "#", active: false },
  { icon: CreditCard, label: "Transactions", href: "#", active: false },
  {
    icon: MessageSquare,
    label: "Messages",
    href: "#",
    active: false,
    subItems: [
      { label: "Inbox", href: "#", active: true },
      { label: "Sent", href: "#" },
      { label: "Archived", href: "#" },
    ],
  },
  { icon: Calendar, label: "Calendar", href: "#", active: false },
  { icon: User, label: "Profile", href: "#", active: false },
  { icon: Settings, label: "Settings", href: "#", active: false },
];

export function SideBarApp({ children }: { children: React.ReactNode }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <SidebarProvider>
      <Sidebar className="border-none">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <span className="font-bold">A</span>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                3
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Acme Inc.</span>
              <span className="text-xs text-muted-foreground">
                Creative Studio
              </span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="relative px-2">
          {/* Decorative elements */}
          <div className="absolute -left-4 top-1/4 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute -right-4 bottom-1/4 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl"></div>

          <div className="relative z-10 space-y-1 py-4">
            {navItems.map((item) => (
              <React.Fragment key={item.label}>
                {item.subItems ? (
                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full overflow-hidden"
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={handleToggle}
                        className={cn(
                          "group relative flex w-full justify-start gap-3 px-3 py-2",
                          item.active && "text-primary font-medium"
                        )}
                        onMouseEnter={() => setHoveredItem(item.label)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="relative">
                          <item.icon className="h-5 w-5" />
                          {hoveredItem === item.label && (
                            <motion.div
                              layoutId="hoverIndicator"
                              className="absolute -left-2 -right-2 -top-2 -bottom-2 rounded-md bg-primary/10"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </div>
                        <span>{item.label}</span>
                        <div className="ml-auto flex h-5 w-5 items-center justify-center">
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="transition-transform duration-200"
                          >
                            <div className="relative">
                              <div className="absolute h-0.5 w-3 bg-current rounded-full transform rotate-90" />
                              <div className="h-0.5 w-3 bg-current rounded-full" />
                            </div>
                          </motion.div>
                        </div>
                      </Button>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative ml-6 mt-1 space-y-1 before:absolute before:-left-2 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-purple-500/30 before:to-pink-500/30"
                      >
                        {item.subItems.map((subItem, index) => (
                          <motion.div
                            key={subItem.label}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                          >
                            <Button
                              variant="ghost"
                              className="group relative w-full justify-start rounded-l-none border-l-2 border-transparent pl-4 text-sm font-normal hover:border-l-2 hover:border-purple-500/50 data-[active=true]:border-l-2 data-[active=true]:border-purple-500"
                              asChild
                              data-active={subItem.active}
                            >
                              <a
                                href={subItem.href}
                                className="flex items-center"
                              >
                                <span className="relative">
                                  {subItem.label}
                                  <motion.div
                                    className="absolute -bottom-0.5 left-0 h-[1px] bg-gradient-to-r from-purple-500 to-pink-500 w-0 group-hover:w-full"
                                    transition={{ duration: 0.2 }}
                                  />
                                </span>
                              </a>
                            </Button>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Button
                    variant="ghost"
                    className={cn(
                      "group relative flex w-full justify-start gap-3 px-3 py-2",
                      item.active && "text-primary font-medium"
                    )}
                    asChild
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <a
                      href={item.href}
                      className="flex items-center gap-3 w-full relative"
                    >
                      <div className="relative">
                        <item.icon className="h-5 w-5" />
                        {hoveredItem === item.label && (
                          <motion.div
                            layoutId="hoverIndicator"
                            className="absolute -left-2 -right-2 -top-2 -bottom-2 rounded-md bg-primary/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </div>
                      <span>{item.label}</span>
                      {item.active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-purple-500 to-pink-500"
                        />
                      )}
                    </a>
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 backdrop-blur-sm">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-medium">Jane Doe</span>
              <span className="text-xs text-muted-foreground">
                jane@acme.com
              </span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-gradient-to-br from-background to-muted/20">
        <header className="flex h-16 items-center gap-4 border-b px-6">
          <SidebarTrigger>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </SidebarTrigger>
          <h1 className="text-xl font-semibold">Calendar</h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
