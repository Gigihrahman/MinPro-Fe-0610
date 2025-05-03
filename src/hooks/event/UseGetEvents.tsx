import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";

interface GetEventsQuery extends PaginationQueries {
  search?: string;
  city?: string;
  category?: string;
}

const useGetevents = (queries?: GetEventsQuery) => {
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/events",
        {
          params: {
            page: queries?.page,
            take: queries?.take,
            search: queries?.search,
            city: queries?.city,
            category: queries?.category,
          },
        }
      );
      return data;
    },
  });
};

export default useGetevents;
