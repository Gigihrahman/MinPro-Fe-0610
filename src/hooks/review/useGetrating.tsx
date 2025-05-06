import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

interface GetRatingResponse {
  rating: number;
}
const useGetRating = (eventId: number) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["reviews", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetRatingResponse>(
        `/reviews/rating/${eventId}`
      );
      return data;
    },
  });
};

export default useGetRating;
