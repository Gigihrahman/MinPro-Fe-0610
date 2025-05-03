import { Seat } from "@/types/seats";

export interface DetailEvent {
  id: number;
  categoryId: number;
  organizerId: number;
  cityId: number;
  locationDetail: string;
  name: string;
  thumbnail: string;
  description: string;
  content: string;
  startEvent: string;
  endEvent: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  organizer: {
    name: string;
  };
  city: {
    name: string;
  };
  category: {
    name: string;
  };
  seats: Seat[];
}
