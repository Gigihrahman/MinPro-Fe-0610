"use client";

import { Voucher } from "@/types/voucher";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAxios from "../useAxios";

interface CreateVoucherPayload {
  comment: string;
  rating: number;
}

const useCreateVoucher = (uuid: string) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: CreateVoucherPayload) => {
      const { data } = await axiosInstance.post(`/reviews/${uuid}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Create Seat successfully");
      router.push("/");
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Failed to update profile");
      console.log(error.response?.data.message);
    },
  });
};

export default useCreateVoucher;
