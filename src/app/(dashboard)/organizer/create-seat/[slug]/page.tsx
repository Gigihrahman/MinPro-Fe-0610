import CreateTicketPage from "@/features/create-seat";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const CreateTicket = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth();
  if (!session) return redirect("/login");
  const slug = (await params).slug;

  return <CreateTicketPage slug={slug} />;
};

export default CreateTicket;
