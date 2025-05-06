"use client";

import { auth } from "@/lib/auth";
import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { log } from "console";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLogin = () => {
  const router = useRouter();
  // const { onAuthSuccess } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: Pick<User, "email" | "password">) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: async (data) => {
      await signIn("credentials", { ...data, redirect: false });

      const role = data.user.role;

      toast.success("Login success");

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("role", role);

      if (role === "ORGANIZER") {
        router.push("/organizer/dashboard-organizer");
      } else if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};
export default useLogin;
