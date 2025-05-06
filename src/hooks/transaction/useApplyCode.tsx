"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAxios from "../useAxios";
import { UpdateProfile } from "@/types/updateProfile";
import { Seat } from "@/types/seats";
import { Voucher } from "@/types/voucher";
interface PayloadApplyCode {
  voucherCode?: string;
  couponCode?: string;
  isUsedPoints?: boolean;
}

const useApplyVoucher = (uuid: string) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: PayloadApplyCode) => {
      const { data } = await axiosInstance.patch(
        `/transactions/${uuid}`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Upload your proofment transaction successfully");

      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data.message || "gagal menggunakan kode voucher"
      );
    },
  });
};

export default useApplyVoucher;
