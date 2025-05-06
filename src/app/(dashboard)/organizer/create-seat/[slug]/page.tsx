import CreateTicketPage from "@/features/create-seat";
import React from "react";

const CreateTicket = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  return <CreateTicketPage slug={slug} />;
};

export default CreateTicket;
