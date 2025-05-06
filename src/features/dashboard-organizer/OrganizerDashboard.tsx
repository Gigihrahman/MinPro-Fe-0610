"use client"

import {
    Bell,
    Calendar,
    ChevronRight,
    Clock,
    DollarSign,
    Search,
    Tag,
    Ticket,
    Users
} from "lucide-react";
import React, { useState } from "react";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useOrganizerDashboard } from "./components/useOrganizerDashboard";

// Type definitions
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

const OrganizerDashboard: React.FC = () => {
  // Custom hook for data fetching
  const { 
    isLoading,
    dashboardStats,
    revenueData,
    recentSales,
    upcomingEvents
  } = useOrganizerDashboard();

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [notifications, setNotifications] = useState<number>(3);

  // Format currency for display
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Function to render event icons
  const renderEventIcon = (type: string) => {
    switch(type) {
      case "calendar":
        return <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
          <Calendar size={16} className="text-purple-600" />
        </div>;
      case "tech":
        return <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Clock size={16} className="text-blue-600" />
        </div>;
      default:
        return <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Calendar size={16} className="text-gray-600" />
        </div>;
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}

      <div className="container mx-auto px-4 py-8">
        {/* Date picker */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <select 
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="mt-1 text-2xl font-bold">
                  {dashboardStats?.totalRevenue ? formatCurrency(dashboardStats.totalRevenue) : "Rp 0"}
                </h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <DollarSign size={20} className="text-purple-600" />
              </div>
            </div>
          </div>

          {/* Total Events */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Events</p>
                <h3 className="mt-1 text-2xl font-bold">+{dashboardStats?.totalEvents || 0}</h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Calendar size={20} className="text-purple-600" />
              </div>
            </div>
          </div>

          {/* Total Tickets */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Tickets</p>
                <h3 className="mt-1 text-2xl font-bold">+{dashboardStats?.totalTickets || 0}</h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Ticket size={20} className="text-purple-600" />
              </div>
            </div>
          </div>

          {/* Total Vouchers */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Vouchers</p>
                <h3 className="mt-1 text-2xl font-bold">+{dashboardStats?.totalVouchers || 0}</h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Tag size={20} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue chart and recent sales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    tickFormatter={(value) => `${value / 1000000}M`}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent sales */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Sales</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              You have made {recentSales?.length || 0} sales so far.
            </p>
            <div className="space-y-4">
              {recentSales?.slice(0, 5).map((sale, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {sale.avatar ? (
                        <img src={sale.avatar} alt={sale.customerName} className="h-full w-full object-cover" />
                      ) : (
                        <Users size={16} className="text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{sale.customerName}</p>
                      <p className="text-xs text-gray-500">{sale.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-right text-green-600">
                      +{formatCurrency(sale.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming events */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            <a href="/events" className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center">
              View all
              <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents?.map((event, index) => (
              <div key={index} className="rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  {renderEventIcon(event.icon)}
                  <div>
                    <h3 className="font-medium text-gray-900">{event.name}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(event.startDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;