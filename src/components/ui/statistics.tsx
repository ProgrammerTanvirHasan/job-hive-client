"use client";

import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Statistics() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/stats`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch stats");

      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading stats...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load stats
      </div>
    );
  }

  const stats = [
    {
      value: `${data?.data?.totalCompanies || 0}K+`,
      label: "Companies",
    },
    {
      value: `${data?.data?.totalUsers || 0}K+`,
      label: "Users",
    },
    {
      value: `${data?.data?.totalApplications || 0}K+`,
      label: "Job Applications",
    },
    {
      value: `${data?.data?.approvedJobs || 0}K+`,
      label: "Jobs Confirmed",
    },
    {
      value: `${data?.data?.totalJobs || 0}K+`,
      label: "Job Vacancies",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      {/* Heading */}
      <div className="text-center mb-12 max-w-xl">
        <h1 className="text-4xl font-bold mb-4 text-[#22426A]">
          Strength in Numbers, Trust in Proof
        </h1>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-16">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <span className="text-3xl md:text-4xl font-bold text-[#22426A]">
              {item.value}
            </span>

            <span className="text-gray-500 mt-2 text-sm md:text-base">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
