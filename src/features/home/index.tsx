import { GetEvents } from "@/features/home/api/GetEvent";
import EventList from "./components/EventList";
import Jumbotron from "./components/Jumbotron";

const HomePage = () => {
  return (
    <main className="container mx-auto flex-1">
      <Jumbotron />
      <EventList />
    </main>
  );
};

export default HomePage;
