"use client";

import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Transaction } from "@/types/transaction";

import { useQuery } from "@tanstack/react-query";

interface useGetTransactionsQuery extends PaginationQueries {
  search?: string;
  status?: string;
}

const useGetWaitingForAdminConfirmationTransactions = (
  queries?: Omit<useGetTransactionsQuery, "status">
) => {
  return useQuery({
    queryKey: ["transactions", "waiting_for_admin_confirmation", queries],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const { data } = await axiosInstance.get<PageableResponse<Transaction>>(
        "/transactions/admin-confirmation",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            ...queries,
            status: "WAITING_FOR_ADMIN_CONFIRMATION", // Always include this status
          },
        }
      );
      return data;
    },
  });
};

export default useGetWaitingForAdminConfirmationTransactions;
