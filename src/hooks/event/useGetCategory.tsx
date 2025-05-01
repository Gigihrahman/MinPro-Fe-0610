import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface GetCategoryQuery {
  id: number;
  name: string;
  slug: string;
}
const useGetCategories = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetCategoryQuery[]>(
        "/categories"
      );
      return data;
    },
  });
};

export default useGetCategories;
