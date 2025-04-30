import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface EventCardProps {
  slug: string;
  title: string;
  date: string;
  location: string;

  image: string;
  category: string;
}

export default function EventCard({
  slug,
  title,
  date,
  location,

  image,
  category,
}: EventCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/events/${slug}`}>
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={300}
            height={200}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <Badge className="mb-2">{category}</Badge>
          <h3 className="line-clamp-1 text-xl font-bold">{title}</h3>
          <div className="text-muted-foreground mt-2 flex items-center text-sm">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="text-muted-foreground mt-1 flex items-center text-sm">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{location}</span>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <Badge variant="outline">View Details</Badge>
        </CardFooter>
      </Link>
    </Card>
  );
}
