import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

interface AcceptPaymentParams {
  transactionId: string | number;
}

interface AcceptPaymentResponse {
  success: boolean;
  message: string;
}

const useAcceptPayment = () => {
  const queryClient = useQueryClient();

  return useMutation<AcceptPaymentResponse, Error, AcceptPaymentParams>({
    mutationFn: async ({ transactionId }: AcceptPaymentParams) => {
      const token = localStorage.getItem("accessToken");

      // This is a dummy implementation. Replace with actual API call in production
      // For now we're just simulating the API call with a timeout
      return new Promise<AcceptPaymentResponse>((resolve) => {
        console.log(`Accepting payment for transaction ${transactionId}`);
        setTimeout(() => {
          resolve({
            success: true,
            message: "Payment accepted successfully!",
          });
        }, 1000);
      });

      // Real implementation would look something like this:
      // const { data } = await axiosInstance.post<AcceptPaymentResponse>(
      //   `/transactions/${transactionId}/accept`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // return data;
    },
    onSuccess: () => {
      // Invalidate related queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Payment accepted successfully!");
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Failed to accept payment. Please try again."
      );
    },
  });
};

export default useAcceptPayment;
