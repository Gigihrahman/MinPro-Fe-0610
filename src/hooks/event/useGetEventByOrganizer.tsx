import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface useGetEventByOrganizerQuery extends PaginationQueries {
  search?: string;
  order?: "asc" | "desc"
}

const useGetEventByOrganizer = (queries?: useGetEventByOrganizerQuery) => {
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      console.log("Token from localStorage:", token);
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/events/byorganizer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: queries?.page,
            take: queries?.take,
            search: queries?.search,
            order: queries?.order, // Added order parameter
          },
        }
      );
      return data;
    },
  });
};

export default useGetEventByOrganizer;
