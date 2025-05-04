"use client";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateEventPayload {
  name: string;
  categoryId: number;
  description: string;
  content: string;
  cityId: number;
  locationDetail: string;
  startEvent: Date | null;
  endEvent: Date | null;
  thumbnail: File | null;
}

const useCreateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const createEventForm = new FormData();
      createEventForm.append("name", payload.name);
      createEventForm.append("categoryId", String(payload.categoryId));
      createEventForm.append("description", payload.description);
      createEventForm.append("content", payload.content);
      createEventForm.append("cityId", String(payload.cityId));
      createEventForm.append("locationDetail", payload.locationDetail);

      if (payload.startEvent) {
        const formattedStart = payload.startEvent
          .toISOString()
          .replace("T", " ")
          .split(".")[0];
        createEventForm.append("startEvent", formattedStart);
      }

      if (payload.endEvent) {
        const formattedEnd = payload.endEvent
          .toISOString()
          .replace("T", " ")
          .split(".")[0];
        createEventForm.append("endEvent", formattedEnd);
      }

      if (payload.thumbnail) {
        if (payload.thumbnail.size > 5 * 1024 * 1024) {
          throw new Error("Ukuran gambar terlalu besar (maksimal 5MB)");
        }

        createEventForm.append("thumbnail", payload.thumbnail);
      }

      try {
        const { data } = await axiosInstance.post("/events", createEventForm);

        return data;
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
      toast.success("Event berhasil dibuat");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/organizer/dashboard");
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

export default useCreateEvent;
