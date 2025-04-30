import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { GetEvents } from "@/features/home/api/GetEvent";
import { Event } from "@/types/event";
import Link from "next/link";
import React, { FC } from "react";

const EventList = async () => {
  const events = await GetEvents();
  console.log(events);
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground">
              Discover events happening soon
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row"></div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.data.map((event) => (
            <EventCard
              key={event.id}
              slug={event.slug}
              title={event.name}
              date={event.startEvent}
              category={event.category.name}
              image="/file.svg"
              location={event.city.name}
            />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/events">
            <Button>View All Events</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventList;
