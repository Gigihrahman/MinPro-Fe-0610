"use client";

import { axiosInstance } from "@/lib/axios";
import { Organizer } from "@/types/organizer";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useRegisterOrganizer = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (
      payload: Omit<Organizer, "id" | "confirmPassword" | "BankName">
    ) => {
      const { data } = await axiosInstance.post(
        "/auth/register-organizer",
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Register admin success");
      router.push("/login");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Register failed");
    },
  });
};

export default useRegisterOrganizer;
