"use client";
import CreateSeatForm from "@/features/create-seat/components/CreateSeatForm";
import CreateTicketForm from "@/features/create-seat/components/CreateSeatForm";
import useGetEventBySlug from "@/hooks/event/useGeteventBySlug";
import React, { FC } from "react";

interface CreateSeatPageProps {
  slug: string;
}
const CreateSeatPage: FC<CreateSeatPageProps> = ({ slug }) => {
  const { data: event, isPending } = useGetEventBySlug(slug);
  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        No event can create ticket
      </div>
    );
  }

  return (
    <div>
      <CreateSeatForm id={event.id} name={event?.name} />
    </div>
  );
};

export default CreateSeatPage;
