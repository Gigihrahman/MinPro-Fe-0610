import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  Star,
  Tag,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TicketSelection } from "./TicketSelection";

import { getEventBySlug } from "@/features/event-detail/api/GetEventDetail";
import Image from "next/image";
import { FC } from "react";
import type { Metadata } from "next";
import Markdown from "@/components/Markdown";
import { formatDate } from "./../../../lib/formatDate";

// This would normally come from a database
interface DetailEventProps {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const event = await getEventBySlug(slug);

  return {
    title: `${slug} Post`,
    description: event.description,
  };
}
export const DetailPageBody: FC<DetailEventProps> = async ({ slug }) => {
  const event = await getEventBySlug(slug);
  console.log(event.thumbnail);

  // Check if event.seats is empty or undefined, return an empty array if true
  const seats = event.seats && event.seats.length > 0 ? event.seats : [];

  return (
    <div className="bg-background min-h-screen">
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm font-medium"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to homepage
        </Link>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={event.thumbnail || "/placeholder.svg"}
                alt={event.name}
                width={600}
                height={300}
                layout="intrinsic"
                className="object-cover rounded-t-lg w-full max-w-[600px] max-h-[400px]"
              />
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-1 px-3 rounded-full text-sm">
                  {event.category.name}
                </Badge>
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-gray-900">
                {event.name}
              </h1>

              <div className="text-muted-foreground mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>{formatDate(event.startEvent)}</span>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  <span>{formatDate(event.endEvent)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span className="line-clamp-1">{event.locationDetail}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center">
                <div className="ml-2">
                  <p className="text-sm font-medium">{event.organizer.name}</p>
                  <div className="flex items-center">
                    <Star className="mr-1 h-3 w-3 fill-amber-500 text-amber-500" />
                  </div>
                </div>
                <Link
                  href={`/organizers/${event.organizer.name}`}
                  className="ml-auto"
                >
                  <Button variant="outline" size="sm">
                    View Organizer
                  </Button>
                </Link>
              </div>

              <Tabs defaultValue="details" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4 space-y-4">
                  <div className="bg-muted/50 rounded-lg border p-4">
                    <h3 className="font-medium">{event.city.name}</h3>

                    <Markdown content={event.content} />
                  </div>
                </TabsContent>
                <TabsContent value="location" className="mt-4">
                  <div className="bg-muted/50 rounded-lg border p-4">
                    <h3 className="font-medium">{event.city.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {event.locationDetail}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="lg:row-start-1">
            <div className="sticky top-20 rounded-lg border bg-card p-4 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground"></div>
              </div>

              <TicketSelection tickets={seats} />

              <div className="mt-4 rounded-md bg-muted p-3">
                <h4 className="font-medium">Event Policies</h4>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li>• Tickets are non-refundable</li>
                  <li>• Valid ID required for entry</li>
                  <li>• No recording devices allowed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
