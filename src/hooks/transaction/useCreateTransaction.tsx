"use client";
import useAxios from "@/hooks/useAxios";
import { Seat } from "@/types/seats";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface SeatPayload {
  seatsId: number;
  quantity: number;
}
interface transactionPayload {
  eventId: number;
  detailsEvent: SeatPayload[];
}

const useCreateTransaction = () => {
  const router = useRouter();

  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: transactionPayload) => {
      const { data } = await axiosInstance.post(`/transactions`, payload);
      console.log(payload)
      return data;
    },
    onSuccess: (data) => {
      toast.success("Create Transaction successfully");
      router.push(`/transaction/${data.uuid}`);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
      console.error("Error creating transaction:", error);
    },
  });
};

export default useCreateTransaction;
