"use client";

import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";

import { useQuery } from "@tanstack/react-query";

interface useGetEventBySlugResponse extends Event {
  description: string;
  content: string;
  location?: string;
}

const useUpdateEventBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["event", slug],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const { data } = await axiosInstance.get<useGetEventBySlugResponse>(
        `/events/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
  });
};
export default useUpdateEventBySlug;
