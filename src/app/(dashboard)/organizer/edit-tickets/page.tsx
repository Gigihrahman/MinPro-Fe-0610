import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const EditTickets = async () => {
  const session = await auth();
  if (!session) return redirect("/login");
  return <div>EditTickets</div>;
};

export default EditTickets;
