import { FC } from "react";
import EditEventForm from "./components/EditEventForn";

interface EventEditPageProps {
  slug: string;
}

const EditEventPage: FC<EventEditPageProps> = ({ slug }) => {
  return <EditEventForm slug={slug} />;
};

export default EditEventPage;
