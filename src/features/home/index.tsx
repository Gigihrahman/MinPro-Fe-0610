import { GetEvents } from "@/features/home/api/GetEvent";
import { Suspense } from "react";
import EventList from "./components/EventList";
import Jumbotron from "./components/Jumbotron";
import Navbar from "@/components/NavbarHomePage";

const HomePage = async () => {
  const events = await GetEvents();
  const eventData = Array.isArray(events) ? events : events.data || [];

  return (
    <>
      <main className="container mx-auto flex-1">
        <Navbar />
        <Jumbotron />
        <Suspense fallback={<div>Loading...</div>}>
          <EventList events={eventData} />
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;
