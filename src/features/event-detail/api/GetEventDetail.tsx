import { axiosInstance } from "@/lib/axios";
import { DetailEvent } from "@/types/detailEvent";
import { Event } from "@/types/event";

export const getEventBySlug = async (slug: string) => {
  const { data } = await axiosInstance.get<DetailEvent>(`/events/${slug}`);
  console.log(data);
  return data;
};
