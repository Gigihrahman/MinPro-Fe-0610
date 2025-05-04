"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAxios from "../useAxios";
import { UpdateProfile } from "@/types/updateProfile";
import { Seat } from "@/types/seats";

const useCreateSeat = (id: number) => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: Omit<Seat, "id" | "reserved">) => {
      const { data } = await axiosInstance.post(`/seats/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Create Seat successfully");
      router.push("/");
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Failed to update profile");
    },
  });
};

export default useCreateSeat;
