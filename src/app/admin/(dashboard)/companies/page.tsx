"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TopCompanies() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["top-companies"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/all`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json();
    },
  });

  const handleBanCompany = async (company: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to permanently delete "${company}"? This action cannot be undone.`,
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/api/admin/company/${company}`, {
        withCredentials: true,
      });

      refetch();
      alert(`${company} banned successfully`);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-[#22426A] mb-10">All Companies</h1>

      <div className="grid lg:grid-cols-3 gap-6 mt-16">
        {data?.data?.map((job: any) => (
          <div
            key={job.id}
            className="w-80 bg-white shadow-lg rounded-2xl p-5 border"
          >
            <h2 className="text-xl font-semibold text-[#22426A] mb-2">
              {job.company}
            </h2>

            <p className="text-gray-600 text-sm line-clamp-3">
              {job.description}
            </p>

            {/* 🚨 BAN BUTTON */}
            <button
              onClick={() => handleBanCompany(job.company)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              Ban Company
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
