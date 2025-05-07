import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import useAxios from "@/hooks/useAxios";

interface Voucher {
  code: string;
}

const useGetVoucher = (id: number) => {
  return useQuery({
    queryKey: ["voucher", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Voucher[]>(`/discount/${id}`);
      return data;
    },
  });
};

export default useGetVoucher;
