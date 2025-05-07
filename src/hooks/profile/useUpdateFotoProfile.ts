"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../useAxios";
import { toast } from "sonner";

const useUpdateFotoProfile = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  // Mutasi untuk memperbarui foto profil
  const updateProfilePicture = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("thumbnail", file);

      const { data } = await axiosInstance.patch(
        "/fotoprofile/uploadfoto",
        formData
      );
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile picture updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile picture");
    },
  });

  return {
    updateProfilePicture,
  };
};

export default useUpdateFotoProfile;
