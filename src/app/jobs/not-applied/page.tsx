"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function NotAppliedJobsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["not-applied-jobs"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/application/not-applied`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json();
    },
  });

  if (isLoading) return <p className="p-10">Loading...</p>;

  if (error) return <p className="p-10 text-red-500">Failed to load jobs</p>;

  return (
    <div className="p-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-[#22426A] mb-8">
        Not Applied Jobs
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {data?.data?.map((job: any) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
          >
            {/* TITLE */}
            <h2 className="text-lg font-semibold text-[#22426A]">
              {job.title}
            </h2>

            {/* COMPANY (small hint only) */}
            <p className="text-xs text-gray-500 mt-1">{job.company}</p>

            {/* DEADLINE ONLY MAIN INFO */}
            <p className="text-sm text-red-500 mt-3 font-medium">
              Apply Before:{" "}
              {job.applyDeadline
                ? new Date(job.applyDeadline).toLocaleDateString()
                : "Not set"}
            </p>

            {/* VIEW DETAILS BUTTON */}
            <Link href={`/job/${job.id}`}>
              <button className="mt-4 w-full py-2 bg-[#22426A] text-white rounded-lg hover:bg-[#1b3555] transition">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
