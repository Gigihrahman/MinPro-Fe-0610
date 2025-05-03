import { DetailPageBody } from "@/features/event-detail/components/DetailPageBody";
import React, { FC } from "react";

interface EventDetailPageProps {
  slug: string;
}
const EventDetailPage: FC<EventDetailPageProps> = ({ slug }) => {
  return <DetailPageBody slug={slug} />;
};

export default EventDetailPage;
