import { axiosInstance } from "@/lib/axios";
import { Category } from "@/types/category";
import { useQuery } from "@tanstack/react-query";

const useGetCategories = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Category[]>("/category");
      return data;
    },
  });
};

export default useGetCategories;
