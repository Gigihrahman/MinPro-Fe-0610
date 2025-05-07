import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import useAxios from "@/hooks/useAxios";

interface PointUser {
  pointsValue: number;
}
const useGetPoints = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["points"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PointUser>("/discount/points");
      return data;
    },
  });
};

export default useGetPoints;
