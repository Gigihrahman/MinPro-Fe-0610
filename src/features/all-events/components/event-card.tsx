import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface EventCardProps {
  id: number
  name: string
  thumbnail: string
  description: string
  categoryName: string
  cityName: string
  locationDetail: string
  startEvent: Date
  endEvent: Date
  slug: string
}

export default function EventCard({
  id,
  name,
  thumbnail,
  description,
  categoryName,
  cityName,
  locationDetail,
  startEvent,
  endEvent,
  slug,
}: EventCardProps) {
  return (
    <Link href={`/events/${slug}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnail || "/placeholder.svg?height=250&width=500"}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-3 left-3 z-10">{categoryName}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold line-clamp-1 mb-2">{name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(startEvent)}</span>
          </div>
          <div className="flex items-start text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">
              {cityName} - {locationDetail}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="text-sm font-medium">
            {formatDate(startEvent)} - {formatDate(endEvent)}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
