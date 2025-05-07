"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAxios from "../useAxios";
import { UpdateOrganizerProfile } from "@/types/updateorganizer";

/**
 * Custom hook for updating organizer profile
 * @returns Mutation object for updating organizer profile
 */
const useUpdateOrganizerProfile = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: UpdateOrganizerProfile) => {
      const { data } = await axiosInstance.put("/organizer/profile", payload);
      return data;
    },
    onSuccess: async () => {
      toast.success("Profile organizer berhasil diperbarui");
      await queryClient.invalidateQueries({ queryKey: ["organizer-profile"] });
      router.push("/organizer/profile");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data.message || "Gagal memperbarui profile organizer"
      );
    },
  });
};

export default useUpdateOrganizerProfile;
