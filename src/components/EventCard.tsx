import { ArrowRight, Calendar, CalendarOff, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDate } from "@/lib/formatDate";

interface EventCardProps {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  category: string;
  categorySlug: string;
}

export default function EventCard({
  slug,
  title,
  startDate,
  endDate,
  location,
  image,
  category,
  categorySlug,
}: EventCardProps) {
  return (
    <Card className="relative bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden w-full sm:max-w-md">
      {/* Image */}
      <div className="relative w-full h-40 sm:h-48">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <CardContent className="relative z-20 p-6">
        <div className="flex justify-between items-center">
          {/* Category Badge */}
          <Link href={`/explore?category=${categorySlug}`}>
            <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-1 px-2 rounded-full text-sm">
              {category}
            </Badge>
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">{title}</h2>

        {/* Date and Location */}
        <div className="flex items-center text-gray-700 mt-4">
          <Calendar className="mr-2" />
          <span className="text-sm">Start: {formatDate(startDate)}</span>
        </div>
        <div className="flex items-center text-gray-700 mt-4">
          <CalendarOff className="mr-2 " />
          <span className="text-sm">End: {formatDate(endDate)}</span>
        </div>
        <div className="flex items-center text-gray-700 mt-2">
          <MapPin className="mr-2" />
          <span className="text-sm">{location}</span>
        </div>
      </CardContent>

      {/* Footer with "View Details" Link */}
      <CardFooter className="flex justify-center pb-6">
        <Link
          href={`/events/${slug}`}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 transition duration-300"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
