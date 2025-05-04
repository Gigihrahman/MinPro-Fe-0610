import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface EventListItemProps {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
  description: string;
  availableSeats: number;
}

export default function EventListItem({
  id,
  title,
  date,
  location,
  price,
  image,
  category,
  description,
  availableSeats,
}: EventListItemProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md sm:flex-row">
      <Link href={`/events/${id}`} className="sm:w-1/3 md:w-1/4">
        <div className="aspect-video h-full w-full sm:aspect-square">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={300}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="mb-1">{category}</Badge>
            <div className="text-muted-foreground flex items-center text-xs">
              <Users className="mr-1 h-3 w-3" />
              <span>{availableSeats} seats available</span>
            </div>
          </div>
          <Link href={`/events/${id}`}>
            <h3 className="line-clamp-1 text-xl font-bold hover:underline">
              {title}
            </h3>
          </Link>
          <div className="text-muted-foreground mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-3 w-3" />
              <span>{location}</span>
            </div>
          </div>
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
            {description}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-medium">
            {price === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span>{formatCurrency(price)}</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/events/${id}`}>View Details</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/checkout/${id}`}>Buy Tickets</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
