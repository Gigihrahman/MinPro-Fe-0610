// hooks/useDashboardSummary.ts
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface SummaryData {
  totalRevenue: number;
  totalTransactions: number;
  averageRevenue: number;
}

const useDashboardSummary = (year: number) => {
  return useQuery({
    queryKey: ["dashboard-summary", year],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const { data } = await axiosInstance.get<{ data: SummaryData }>(
        "/dashboard/summary",
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

export default useDashboardSummary;
