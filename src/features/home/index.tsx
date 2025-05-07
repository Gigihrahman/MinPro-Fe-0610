import { GetEvents } from "@/features/home/api/GetEvent";
import EventList from "./components/EventList";
import Jumbotron from "./components/Jumbotron";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Navbar from "@/components/NavbarHomePage";

const HomePage = async () => {
  const events = await GetEvents();
  const eventData = Array.isArray(events) ? events : events.data || [];

  return (
    <>
      <Navbar />
      <main className="container mx-auto flex-1">
        <Jumbotron />
        <Suspense fallback={<div>Loading...</div>}>
          <EventList events={eventData} />
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;
