import EditEventPage from "@/features/edit-event/EditEventPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const EditEvent = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const session = await auth();

  if (!session) return redirect("/login");

  const slug = (await params).slug;
  return <EditEventPage slug={slug} />;
};

export default EditEvent;
