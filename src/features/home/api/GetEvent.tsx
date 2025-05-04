import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse } from "@/types/pagination";
import axios from "axios";

export const GetEvents = async () => {
  try {
    const { data, status } = await axiosInstance.get<PageableResponse<Event>>(
      "/events?take=8"
    );
    console.log("ini data", data);
    if (status !== 200 || !data) {
      return [];
    }
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return [];
    }
    return [];
  }
};
