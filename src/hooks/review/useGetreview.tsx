import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Review } from "@/types/review";

import { useQuery } from "@tanstack/react-query";

const useGetReviews = (eventId: number, queries: PaginationQueries) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["reviews", queries, eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Review>>(
        `/reviews/${eventId}`,
        {
          params: {
            page: queries?.page,
            take: queries?.take,
          },
        }
      );
      return data;
    },
  });
};

export default useGetReviews;
