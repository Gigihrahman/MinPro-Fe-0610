import OrganizerDashboard from "@/features/dashboard-organizer/OrganizerDashboard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardOrganizer = async () => {
  const session = await auth();
  if (!session) return redirect("/login");
  return <OrganizerDashboard />;
};

export default DashboardOrganizer;
