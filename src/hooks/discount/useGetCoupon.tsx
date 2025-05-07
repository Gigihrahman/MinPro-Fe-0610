import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import useAxios from "@/hooks/useAxios";

interface Coupon {
  pointsValue: number;
}
const useGetCoupon = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["coupon"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Coupon>("/discount/");
      return data;
    },
  });
};

export default useGetCoupon;
