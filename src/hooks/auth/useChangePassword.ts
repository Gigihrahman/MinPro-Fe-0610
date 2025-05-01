"use client";

import { useRouter } from "next/navigation";
import React from "react";
import useAxios from "../useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ChangePassword } from "@/types/changePassword";

const useChangePassword = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (
      payload: Omit<ChangePassword, "id" | "confirmPassword">
    ) => {
      const { data } = await axiosInstance.patch(
        "/auth/change-password",
        payload
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Password change successfully");
      await queryClient.invalidateQueries({ queryKey: ["change-password"] });
      router.push("/profile");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Failed to change password");
    },
  });
};

export default useChangePassword;
