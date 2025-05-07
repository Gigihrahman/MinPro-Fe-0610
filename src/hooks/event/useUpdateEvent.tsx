"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface UpdateEventPayload {
  name?: string;
  categoryId?: number;
  description?: string;
  content?: string;
  cityId?: number;
  locationDetail?: string;
  startEvent?: Date | null;
  endEvent?: Date | null;
  thumbnail?: any; // Changed from File | null to any to avoid TypeScript issues
}

const useUpdateEvent = (id?: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: Partial<UpdateEventPayload>) => {
      const { name, categoryId, description, content, cityId, locationDetail } =
        payload;
      const UpdateEventForm = new FormData();

      if (name) UpdateEventForm.append("name", name);
      if (categoryId) UpdateEventForm.append("categoryId", String(categoryId));
      if (description) UpdateEventForm.append("description", description);
      if (content) UpdateEventForm.append("content", content);
      if (cityId) UpdateEventForm.append("cityId", String(cityId));
      if (locationDetail)
        UpdateEventForm.append("locationDetail", locationDetail);

      if (payload.startEvent) {
        console.log(payload.startEvent);
        const formattedStart = payload.startEvent
          .toISOString()
          .replace("T", " ")
          .split(".")[0];
        UpdateEventForm.append("startEvent", formattedStart);
      }

      if (payload.endEvent) {
        const formattedEnd = payload.endEvent
          .toISOString()
          .replace("T", " ")
          .split(".")[0];
        UpdateEventForm.append("endEvent", formattedEnd);
      }

      // Handle thumbnail - make sure it's a File object before appending
      if (payload.thumbnail instanceof File) {
        if (payload.thumbnail.size > 5 * 1024 * 1024) {
          throw new Error("Ukuran gambar terlalu besar (maksimal 5MB)");
        }
        UpdateEventForm.append("thumbnail", payload.thumbnail);
      }

      try {
        if (id) {
          const { data } = await axiosInstance.patch(
            `/events/${id}`,
            UpdateEventForm
          );

          return data;
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 500) {
          throw new Error(
            "Terjadi kesalahan di server. Silakan coba dengan ukuran gambar yang lebih kecil atau konten yang lebih pendek."
          );
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success("Event berhasil diupdate");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push(`/organizer/dashboard-organizer`);
    },
    onError: (error: any) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Terjadi kesalahan saat membuat event");
      }
    },
  });
};

export default useUpdateEvent;
