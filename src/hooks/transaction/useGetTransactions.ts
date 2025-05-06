"use client";

import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Transaction } from "@/types/transaction";

import { useQuery } from "@tanstack/react-query";

interface useGetTransactionsQuery extends PaginationQueries {
  search?: string;
}
const useGetTransactions = (queries?: useGetTransactionsQuery) => {
  return useQuery({
    queryKey: ["transactions", queries],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const { data } = await axiosInstance.get<PageableResponse<Transaction>>(
        "/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: queries,
        }
      );
      return data;
    },
  });
};

export default useGetTransactions;
