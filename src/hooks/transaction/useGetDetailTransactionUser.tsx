import useAxios from "@/hooks/useAxios";
import { ResponseDetailTransaction } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";

const useGetDetailTransactionUser = (uuid: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["transaction", uuid],
    queryFn: async () => {
      console.log("uuid", uuid);
      const { data } = await axiosInstance.get<ResponseDetailTransaction>(
        `/transactions/${uuid}`
      );
      console.log("data", data);
      return data;
    },
  });
};

export default useGetDetailTransactionUser;
