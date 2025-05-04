import EventDetailPage from "@/features/event-detail";
import React from "react";

const EventDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  console.log("slug", slug);
  return <EventDetailPage slug={slug} />;
};

export default EventDetail;
