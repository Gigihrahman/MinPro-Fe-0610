import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
interface GetEventsQuery extends PaginationQueries {
  search?: string;
}

const useGetProfile = (queries?: GetEventsQuery) => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/events",
        {
          params: { queries },
        }
      );
      return data;
    },
  });
};

export default useGetProfile;
