export interface Event {
  id: number;
  categoryId: number;
  organizerId: number;
  cityId: number;
  locationDetail: string;
  name: string;
  image: string;
  startEvent: string;
  endEvent: string;
  slug: string;
  thumbnail: string;
  organizer: {
    name: string;
  };
  city: {
    name: string;
  };
  category: {
    name: string;
    slug: string;
  };
}
