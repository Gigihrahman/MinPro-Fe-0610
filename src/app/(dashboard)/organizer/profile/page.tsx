import OrganizerProfilePage from "@/features/profile-organizer";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const profile = async () => {
  const session = await auth();
  if (!session) return redirect("/login");
  return <OrganizerProfilePage />;
};

export default profile;
