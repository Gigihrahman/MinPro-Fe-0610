import { axiosInstance } from "@/lib/axios";

interface GetRatingResponse {
  rating: number;
}

export const getRatingByeventId = async (eventId: number) => {
  const { data } = await axiosInstance.get<GetRatingResponse>(
    `/reviews/rating/${eventId}`
  );
  console.log(data);
  return data;
};
