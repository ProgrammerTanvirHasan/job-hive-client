"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminUsersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/all`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch jobs");

      return res.json();
    },
  });

  if (isLoading) return <p className="p-5 min-h-screen">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">Error loading jobs</p>;

  return (
    <div className="container mx-auto px-4 py-8 min-h-svh">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#22426A]">
        Job Moderation Dashboard
      </h1>

      <p className="mt-3 text-muted-foreground max-w-2xl">
        Review and manage job postings. Approve high-quality listings and ensure
        only verified opportunities are published on the platform.
      </p>

      {/* Jobs */}
      <div className="mt-8 space-y-4">
        {data?.data?.map((job: any) => (
          <div
            key={job.id}
            className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* TITLE */}
            <h2 className="text-xl font-semibold">{job.title}</h2>

            {/* COMPANY + LOCATION */}
            <div className="flex items-center justify-between mt-1 text-sm text-gray-500">
              <p>
                {job.company} • {job.location}
              </p>
            </div>

            {/* CATEGORY */}
            <div className="mt-2">
              <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                {job.category}
              </span>
            </div>

            <div className="flex justify-between gap-2">
              {job.description && (
                <p className="mt-3 text-sm text-gray-700 line-clamp-2">
                  {job.description}
                </p>
              )}

              <p className="text-xs text-[#B3576A] ">
                Posted on: {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {/* STATUS + BUTTON ROW */}
              <div className="flex items-center justify-between">
                {/* STATUS */}
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    job.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : job.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.status}
                </span>
                <p className="text-xl italic text-red-800 font-bold">
                  {" "}
                  {job.rejectionReason}
                </p>
                {/* VIEW DETAILS */}
                <Link
                  href={`/admin/moderation/${job.id}`}
                  className="px-4 py-2 text-sm bg-[#22426A] text-white rounded-lg hover:bg-[#1b3554]"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
