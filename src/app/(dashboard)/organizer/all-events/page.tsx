import AllEventsPage from "@/features/all-events";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const AllEvents = async () => {
  const session = await auth();
  if (!session) return redirect("/login");
  return <AllEventsPage />;
};

export default AllEvents;
