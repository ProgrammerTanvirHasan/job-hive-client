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
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserDashboardPage() {
  const router = useRouter();

  const { data: approvedJobsData } = useQuery({
    queryKey: ["approved-jobs"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/my-posts`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json();
    },
  });

  const { data: appliedJobsData } = useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/application`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json();
    },
  });

  const approvedJobsCount = approvedJobsData?.data?.length || 0;
  const appliedJobsCount = appliedJobsData?.data?.length || 0;

  const chartData = [
    { name: "Approved", value: approvedJobsCount },
    { name: "Applied", value: appliedJobsCount },
  ];

  return (
    <div className="space-y-10">
      <h2 className="text-xl font-semibold">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-xl shadow">
          <p className="text-sm text-gray-500">Approved Jobs</p>
          <h3 className="text-lg font-bold mt-2">{approvedJobsCount}</h3>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl shadow">
          <p className="text-sm text-gray-500">Applied Jobs</p>
          <h3 className="text-lg font-bold mt-2">{appliedJobsCount}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Job Statistics</h3>

        <div className="w-full h-72">
          <ResponsiveContainer width="50%" height="100%">
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
