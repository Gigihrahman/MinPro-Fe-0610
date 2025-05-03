"use client"

import { useState } from "react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data based on the screenshot
const events = [
  {
    id: 1,
    title: "Mens Rea - Palembang",
    thumbnail: "/placeholder.svg?height=60&width=100&text=Mens+Rea",
    status: "ACTIVE",
    location: "Surabaya",
    startDate: "06 Aug 2025",
    endDate: "08 Aug 2025",
    startTime: "14:00",
    endTime: "17:00",
  },
  {
    id: 2,
    title: "WHISKY LIVE JAKARTA 2025",
    thumbnail: "/placeholder.svg?height=60&width=100&text=WHISKY+LIVE",
    status: "ACTIVE",
    location: "Yogyakarta",
    startDate: "27 Nov 2025",
    endDate: "29 Nov 2025",
    startTime: "19:00",
    endTime: "23:00",
  },
  {
    id: 3,
    title: "Tomo Land : Art & Illustration Festival",
    thumbnail: "/placeholder.svg?height=60&width=100&text=Tomo+Land",
    status: "ACTIVE",
    location: "Bandung",
    startDate: "01 Dec 2025",
    endDate: "03 Dec 2025",
    startTime: "10:00",
    endTime: "16:00",
  },
  {
    id: 4,
    title: "Hwang In Youp In Love Fan Meeting Tour",
    thumbnail: "/placeholder.svg?height=60&width=100&text=Hwang+In+Youp",
    status: "ACTIVE",
    location: "Jakarta",
    startDate: "03 Feb 2026",
    endDate: "05 Feb 2026",
    startTime: "16:00",
    endTime: "20:00",
  },
  {
    id: 5,
    title: "GMMTV Fan Day In JAKARTA 2025",
    thumbnail: "/placeholder.svg?height=60&width=100&text=GMMTV",
    status: "ACTIVE",
    location: "Tangerang",
    startDate: "25 Mar 2025",
    endDate: "25 Mar 2025",
    startTime: "12:00",
    endTime: "14:00",
  },
]

export default function EventsTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const toggleAllRows = () => {
    setSelectedRows((prev) => (prev.length === events.length ? [] : events.map((event) => event.id)))
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/20">
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.length === events.length && events.length > 0}
                onCheckedChange={toggleAllRows}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="w-[120px]">Thumbnail</TableHead>
            <TableHead>
              <div className="flex items-center">
                Title <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(event.id)}
                  onCheckedChange={() => toggleRow(event.id)}
                  aria-label={`Select ${event.title}`}
                />
              </TableCell>
              <TableCell>
                <div className="relative h-[60px] w-[100px]">
                  <Image
                    src={event.thumbnail || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 px-2 text-left font-normal">
                      {event.status} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>ACTIVE</DropdownMenuItem>
                    <DropdownMenuItem>DRAFT</DropdownMenuItem>
                    <DropdownMenuItem>CANCELLED</DropdownMenuItem>
                    <DropdownMenuItem>COMPLETED</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.startDate}</TableCell>
              <TableCell>{event.endDate}</TableCell>
              <TableCell>{event.startTime}</TableCell>
              <TableCell>{event.endTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
