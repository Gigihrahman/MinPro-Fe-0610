import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { City } from "@/types/city";

const useGetCities = () => {
  return useQuery({
    queryKey: ["city"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<City[]>("/city");
      return data;
    },
  });
};

export default useGetCities;
