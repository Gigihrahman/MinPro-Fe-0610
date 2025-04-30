import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse } from "@/types/pagination";

export const GetEvents = async () => {
  const { data } = await axiosInstance.get<PageableResponse<Event>>("/events");
  console.log(data.data);
  return data;
};
