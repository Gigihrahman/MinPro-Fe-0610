"use client"

import { useState } from "react"
import EventCard from "./event-card"
import { Button } from "@/components/ui/button"

// This would typically come from your API
const mockEvents = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Event ${i + 1}`,
  thumbnail: `/placeholder.svg?height=250&width=500&text=Event+${i + 1}`,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  categoryName: ["Conference", "Workshop", "Seminar", "Concert"][Math.floor(Math.random() * 4)],
  cityName: ["New York", "San Francisco", "London", "Tokyo"][Math.floor(Math.random() * 4)],
  locationDetail: "Convention Center",
  startEvent: new Date(Date.now() + 86400000 * (i + 1)),
  endEvent: new Date(Date.now() + 86400000 * (i + 2)),
  slug: `event-${i + 1}`,
}))

export default function EventsGrid() {
  const [events, setEvents] = useState(mockEvents)
  const [page, setPage] = useState(1)
  const eventsPerPage = 9

  // In a real app, you would fetch events from your API
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     const response = await fetch('/api/events')
  //     const data = await response.json()
  //     setEvents(data)
  //   }
  //   fetchEvents()
  // }, [])

  const totalPages = Math.ceil(events.length / eventsPerPage)
  const displayedEvents = events.slice(0, page * eventsPerPage)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      {page < totalPages && (
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setPage(page + 1)}>
            Load More Events
          </Button>
        </div>
      )}
    </div>
  )
}
