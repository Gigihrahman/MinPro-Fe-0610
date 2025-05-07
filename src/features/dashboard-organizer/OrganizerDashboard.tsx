"use client";

import React, { useState } from "react";
import useDashboardRevenue from "@/hooks/dashboard/useDashboardRevenue";
import useDashboardSummary from "@/hooks/dashboard/useDashboardSummary";
import useDashboardDailyRevenue from "@/hooks/dashboard/useDashboardDailyRevenue";
import useDashboardYearlyRevenue from "@/hooks/dashboard/useDashboardYearlyRevenue";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow">
        <p className="font-semibold">{payload[0].payload.month || payload[0].payload.date || payload[0].payload.year}</p>
        <p className="text-primary">{`Revenue: ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

const DashboardPage: React.FC = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [viewMode, setViewMode] = useState<"year" | "month" | "day">("month");

  const summary = useDashboardSummary(year);
  const revenueMonthly = useDashboardRevenue(year);
  const revenueDaily = useDashboardDailyRevenue(year, month);
  const revenueYearly = useDashboardYearlyRevenue();

  const isLoading =
    summary.isLoading ||
    revenueMonthly.isLoading ||
    revenueDaily.isLoading ||
    revenueYearly.isLoading;

  const renderChartData = () => {
    if (viewMode === "year") return revenueYearly.data ?? [];
    if (viewMode === "day") return revenueDaily.data ?? [];
    return revenueMonthly.data ?? [];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Revenue Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-gray-500 text-sm uppercase">Total Revenue</h3>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(summary.data?.totalRevenue ?? 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-gray-500 text-sm uppercase">Total Transactions</h3>
          <p className="text-2xl font-bold">{summary.data?.totalTransactions ?? 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-gray-500 text-sm uppercase">Avg Revenue</h3>
          <p className="text-2xl font-bold">
            {formatCurrency(summary.data?.averageRevenue ?? 0)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <label className="text-sm font-medium">View Mode:</label>
          <div className="flex gap-2 mt-1">
            {["year", "month", "day"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-4 py-1 rounded-md text-sm font-semibold ${
                  viewMode === mode
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="year" className="text-sm font-medium block">
            Year:
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="mt-1 px-3 py-2 border rounded-md"
          >
            {[...Array(5)].map((_, i) => {
              const optionYear = new Date().getFullYear() - 2 + i;
              return (
                <option key={optionYear} value={optionYear}>
                  {optionYear}
                </option>
              );
            })}
          </select>
        </div>

        {(viewMode === "day") && (
          <div>
            <label htmlFor="month" className="text-sm font-medium block">
              Month:
            </label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="mt-1 px-3 py-2 border rounded-md"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {viewMode === "year"
            ? "Revenue per Year"
            : viewMode === "day"
            ? `Daily Revenue - ${new Date(0, month - 1).toLocaleString("default", {
                month: "long",
              })} ${year}`
            : `Monthly Revenue - ${year}`}
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">Loading...</div>
        ) : (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={renderChartData()}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={viewMode === "year" ? "year" : viewMode === "month" ? "month" : "date"} />
                <YAxis
                  tickFormatter={(value) =>
                    value === 0
                      ? "0"
                      : value >= 1000000
                      ? `${value / 1000000}M`
                      : `${value / 1000}K`
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="revenue" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
