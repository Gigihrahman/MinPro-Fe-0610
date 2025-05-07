// hooks/useDashboardRevenue.ts
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface RevenueData {
  month: string;
  revenue: number;
}

const useDashboardRevenue = (year: number) => {
  return useQuery({
    queryKey: ["dashboard-revenue", year],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const { data } = await axiosInstance.get<{ data: RevenueData[] }>(
        "/dashboard/revenue",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            year,
          },
        }
      );
      return data.data;
    },
    enabled: !!year,
  });
};

export default useDashboardRevenue;
