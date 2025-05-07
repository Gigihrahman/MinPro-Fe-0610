import CreateEventPage from "@/features/create-event";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const CreateEvent = async () => {
  const session = await auth();
  if (!session) return redirect("/login");
  return (
    <div>
      <CreateEventPage />
    </div>
  );
};

export default CreateEvent;
