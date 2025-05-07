"use client";

import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (
      payload: Omit<User, "id" | "profilePicture" | "confirmPassword">
    ) => {
      const { data } = await axiosInstance.post("/auth/register", payload);

      return data;
    },
    onSuccess: () => {
      toast.success("Register success");
      router.push("/login");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useRegister;
