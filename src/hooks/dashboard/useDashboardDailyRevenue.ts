// hooks/useDashboardDailyRevenue.ts
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface DailyRevenueData {
  date: string;
  revenue: number;
}

const useDashboardDailyRevenue = (year: number, month: number) => {
  return useQuery({
    queryKey: ["dashboard-daily-revenue", year, month],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const { data } = await axiosInstance.get<{ data: DailyRevenueData[] }>(
        "/dashboard/daily-revenue",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            year,
            month,
          },
        }
      );
      return data.data;
    },
    enabled: !!year && !!month,
  });
};

export default useDashboardDailyRevenue;
