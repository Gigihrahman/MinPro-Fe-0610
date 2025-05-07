// hooks/useDashboardYearlyRevenue.ts
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface YearlyRevenueData {
  year: number;
  revenue: number;
}

const useDashboardYearlyRevenue = () => {
  return useQuery({
    queryKey: ["dashboard-yearly-revenue"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const { data } = await axiosInstance.get<{ data: YearlyRevenueData[] }>(
        "/dashboard/yearly-revenue",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.data;
    },
  });
};

export default useDashboardYearlyRevenue;
