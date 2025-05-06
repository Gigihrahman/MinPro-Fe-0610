"use client"

import { useEffect, useState } from 'react';

// Types for the dashboard data
interface DashboardStats {
  totalRevenue: number;
  totalEvents: number;
  totalTickets: number;
  totalVouchers: number;
}

interface RevenuePoint {
  month: string;
  revenue: number;
}

interface SaleData {
  customerName: string;
  email: string;
  amount: number;
  avatar?: string;
}

interface EventData {
  id: number;
  name: string;
  startDate: Date;
  time: string;
  icon: "calendar" | "tech";
}

interface OrganizerDashboardData {
  isLoading: boolean;
  error: Error | null;
  dashboardStats: DashboardStats | null;
  revenueData: RevenuePoint[];
  recentSales: SaleData[];
  upcomingEvents: EventData[];
  refetch: () => void;
}

export const useOrganizerDashboard = (): OrganizerDashboardData => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [revenueData, setRevenueData] = useState<RevenuePoint[]>([]);
  const [recentSales, setRecentSales] = useState<SaleData[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventData[]>([]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, these would be API calls to your backend
      // For now, we'll simulate the data

      // Fetch dashboard stats
      // const statsResponse = await axios.get('/api/organizer/dashboard/stats');
      // setDashboardStats(statsResponse.data);
      
      // Mock data for development
      setDashboardStats({
        totalRevenue: 18950000,
        totalEvents: 5,
        totalTickets: 8,
        totalVouchers: 1
      });

      // Fetch revenue data
      // const revenueResponse = await axios.get('/api/organizer/dashboard/revenue');
      // setRevenueData(revenueResponse.data);
      
      // Mock revenue data
      setRevenueData([
        { month: 'Jan', revenue: 1000000 },
        { month: 'Feb', revenue: 6000000 },
        { month: 'Mar', revenue: 2800000 },
        { month: 'Apr', revenue: 6500000 },
        { month: 'May', revenue: 3200000 },
        { month: 'Jun', revenue: 0 },
        { month: 'Jul', revenue: 0 },
        { month: 'Aug', revenue: 0 },
        { month: 'Sep', revenue: 0 },
        { month: 'Oct', revenue: 0 },
        { month: 'Nov', revenue: 0 },
        { month: 'Dec', revenue: 0 }
      ]);

      // Fetch recent sales
      // const salesResponse = await axios.get('/api/organizer/dashboard/recent-sales');
      // setRecentSales(salesResponse.data);
      
      // Mock recent sales data
      setRecentSales([
        { customerName: 'Budi Jancok', email: 'budi@mail.com', amount: 2100000 },
        { customerName: 'budi', email: 'budi@gmail.com', amount: 1150000 },
        { customerName: 'Budi Jancok', email: 'budi@mail.com', amount: 700000 },
        { customerName: 'Budi Jancok', email: 'budi@mail.com', amount: 4000000 },
        { customerName: 'joko jancok', email: 'joko@mail.com', amount: 400000 }
      ]);

      // Fetch upcoming events
      // const eventsResponse = await axios.get('/api/organizer/dashboard/upcoming-events');
      // setUpcomingEvents(eventsResponse.data);
      
      // Mock upcoming events
      setUpcomingEvents([
        { 
          id: 1, 
          name: 'Summer Music Festival', 
          startDate: new Date(), 
          time: '7:00 PM',
          icon: 'calendar'
        },
        { 
          id: 2, 
          name: 'Tech Conference 2025', 
          startDate: new Date(Date.now() + 86400000), // tomorrow
          time: '9:00 AM',
          icon: 'tech'
        },
        { 
          id: 3, 
          name: 'Art Exhibition', 
          startDate: new Date(Date.now() + 172800000), // day after tomorrow
          time: '10:00 AM',
          icon: 'calendar'
        }
      ]);

    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    isLoading,
    error,
    dashboardStats,
    revenueData,
    recentSales,
    upcomingEvents,
    refetch: fetchDashboardData
  };
};