"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAxios from "../useAxios";
import { UpdateProfile } from "@/types/updateProfile";

const useUpdateProfile = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: Omit<UpdateProfile, "id">) => {
      const { data } = await axiosInstance.patch(
        "/profile/update-profile",
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      router.push("/profile");
      router.refresh()
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Failed to update profile");
    },
  });
};

export default useUpdateProfile;
