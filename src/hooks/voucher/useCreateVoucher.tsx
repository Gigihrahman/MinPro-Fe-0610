"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAxios from "../useAxios";
import { UpdateProfile } from "@/types/updateProfile";
import { Seat } from "@/types/seats";
import { Voucher } from "@/types/voucher";

const useCreateVoucher = (id: number) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (
      payload: Pick<
        Voucher,
        "description" | "quota" | "value" | "validAt" | "expiredAt"
      >
    ) => {
      const { data } = await axiosInstance.post(`/vouchers/${id}`, payload);
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
