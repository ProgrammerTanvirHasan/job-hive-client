"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/dashboard`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const result = await res.json();
      return result.data;
    },
  });

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load data</p>;
  }

 
  const chartData = [
    { name: "Users", value: data.totalUsers },
    { name: "Jobs", value: data.totalJobs },
    { name: "Pending", value: data.pendingJobs },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border p-4 shadow-sm">
          <h2 className="text-sm text-gray-500">Total Users</h2>
          <p className="text-2xl font-bold ">{data.totalUsers}</p>
        </div>

        <div className="rounded-2xl border p-4 shadow-sm">
          <h2 className="text-sm text-gray-500">Total Jobs</h2>
          <p className="text-2xl font-bold">{data.totalJobs}</p>
        </div>

        <div className="rounded-2xl border p-4 shadow-sm">
          <h2 className="text-sm text-gray-500">Pending Jobs</h2>
          <p className="text-2xl font-bold">{data.pendingJobs}</p>
        </div>
      </div>

      {/* ================= CHART ================= */}
      <div className="mt-10 rounded-2xl border p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>

        <div style={{ width: "70%", height: 500 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00BC7D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
