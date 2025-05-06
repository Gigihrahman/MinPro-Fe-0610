import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

interface DeclinePaymentParams {
  transactionId: string | number;
}

interface DeclinePaymentResponse {
  success: boolean;
  message: string;
}

const useDeclinePayment = () => {
  const queryClient = useQueryClient();

  return useMutation<DeclinePaymentResponse, Error, DeclinePaymentParams>({
    mutationFn: async ({ transactionId }: DeclinePaymentParams) => {
      const token = localStorage.getItem("accessToken");

      // This is a dummy implementation. Replace with actual API call in production
      // For now we're just simulating the API call with a timeout
      return new Promise<DeclinePaymentResponse>((resolve) => {
        console.log(`Declining payment for transaction ${transactionId}`);
        setTimeout(() => {
          resolve({
            success: true,
            message: "Payment declined successfully!",
          });
        }, 1000);
      });

      // Real implementation would look something like this:
      // const { data } = await axiosInstance.post<DeclinePaymentResponse>(
      //   `/transactions/${transactionId}/decline`,
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
      toast.success("Payment declined successfully!");
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Failed to decline payment. Please try again."
      );
    },
  });
};

export default useDeclinePayment;
