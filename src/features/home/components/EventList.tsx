import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { GetEvents } from "@/features/home/api/GetEvent";
import { Event } from "@/types/event";
import Link from "next/link";
import React, { FC } from "react";

import { event } from "./../../event-detail/components/Dummy";

interface EventListProps {
  events: Event[];
}
const EventList: FC<EventListProps> = async ({ events }) => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header with Decorative Line */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative pb-4 mb-8">
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">
              Upcoming Events
            </h2>
            <p className="text-gray-600 mt-2">Discover events happening soon</p>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-0 h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            {/* Optional filters can go here */}
          </div>
        </div>

        {/* Events Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.length === 0 && (
            <div className="col-span-4 py-20 text-center">
              <div className="inline-flex justify-center items-center p-6 rounded-full bg-gray-50 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No events found</p>
              <p className="text-gray-400 text-sm mt-1">
                Check back soon for upcoming events
              </p>
            </div>
          )}

          {events.length !== 0 &&
            events?.map((event) => (
              <EventCard
                key={event.id}
                slug={event.slug}
                title={event.name}
                startDate={event.startEvent}
                endDate={event.endEvent}
                category={event.category.name}
                image="/file.svg"
                location={event.city.name}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventList;
