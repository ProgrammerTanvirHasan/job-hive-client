"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AllJobsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["all-jobs"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/jobs/all`);
      return res.json();
    },
  });

  if (isLoading) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      {/* HEADER */}
      <h1 className="text-4xl font-bold text-[#22426A]">
        All Jobs Here You Can Browse Your Desired Positions
      </h1>

      {/* SUB TEXT */}
      <p className="text-gray-600 mt-2 max-w-2xl">
        Discover high-quality paid job opportunities from top companies. Apply
        faster, get priority visibility, and unlock better career growth.
      </p>

      {/* STATS BAR */}
      <div className="mt-6 flex gap-4 text-sm">
        <div className="bg-white px-4 py-2 rounded shadow">
          💼 Total Jobs: {data?.data?.length || 0}
        </div>
        <div className="bg-white px-4 py-2 rounded shadow">
          🚀 Verified Listings
        </div>
        <div className="bg-white px-4 py-2 rounded shadow">
          💰 Paid Opportunities
        </div>
      </div>

      {/* JOB GRID */}
      <div className="grid lg:grid-cols-2 gap-5 mt-8">
        {data?.data?.map((job: any) => (
          <div
            key={job.id}
            className="border bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>

            <p className="text-sm text-gray-500 mt-1">
              {job.company} • {job.location}
            </p>

            <p className="text-green-600 font-bold mt-2">
              💰 Apply Fee: {job.price} BDT
            </p>

            <p className="text-sm text-gray-600 mt-3 line-clamp-2">
              {job.description}
            </p>

            <div className="mt-4 flex justify-end">
              <Link
                href={`/job/${job.id}`}
                className="text-sm px-4 py-2 bg-[#22426A] text-white rounded hover:bg-[#1b3554]"
              >
                See More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
