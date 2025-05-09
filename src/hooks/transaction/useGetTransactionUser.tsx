import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { TransactionUser } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";

interface GetTransactionQuery extends PaginationQueries {
  status?: string;
}
const useGetTransactionUser = (queries: GetTransactionQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["transaction", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<TransactionUser>
      >("/transactions/", {
        params: {
          page: queries?.page,
          take: queries?.take,
          status: queries?.status,
        },
      });
      return data;
    },
  });
};

export default useGetTransactionUser;
