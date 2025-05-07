"use client";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateTransactionDTO {
  status: "DONE" | "REJECTED";
  paymentProofUrl?: string;
}

const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      transactionId,
      data,
    }: {
      transactionId: string;
      data: UpdateTransactionDTO;
    }) => {
      const token = localStorage.getItem("accessToken");
      // Updated endpoint to match the backend expectation
      const response = await axiosInstance.patch(
        `/transactions/update/${transactionId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response received", response.data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch transactions data
      queryClient.invalidateQueries({
        queryKey: ["transactions", "waiting_for_admin_confirmation"],
      });
    },
  });
};

export default useUpdateTransactionStatus;
