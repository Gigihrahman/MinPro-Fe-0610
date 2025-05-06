"use client";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UploadPatmentPayload {
  thumbnail: File | null;
}

const useUploadProofment = (uuid: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UploadPatmentPayload) => {
      const uploadPaymentProof = new FormData();

      if (payload.thumbnail) {
        if (payload.thumbnail.size > 2 * 1024 * 1024) {
          throw new Error("Ukuran gambar terlalu besar (maksimal 2MB)");
        }

        uploadPaymentProof.append("thumbnail", payload.thumbnail);
      }

      try {
        const { data } = await axiosInstance.post(
          `/transactions/upload-proofment/${uuid}`,
          uploadPaymentProof
        );

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
      toast.success("upload bukti pembayaran berhasil");

      router.push("/transaction");
    },

    onError: (error: any) => {
      toast.error(error.message || "Gagal mengupload bukti pembayaran");
    },
  });
};

export default useUploadProofment;
