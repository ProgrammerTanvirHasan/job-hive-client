"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
type Job = {
  id: number;
  title: string;
  company: string;
  category: string;
  applyDeadline?: string;
};
export default function BrowseJobsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCategory(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const {
    data = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery<Job[]>({
    queryKey: ["jobs", category],
    queryFn: async () => {
      const url = category
        ? `${API_URL}/api/job/search?category=${encodeURIComponent(category)}`
        : `${API_URL}/api/job/all`;

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const result = await res.json();
      return result.data;
    },
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <p className="p-10 min-h-screen">Loading...</p>;

  if (isError)
    return (
      <p className="p-10 text-red-500 min-h-screen">Failed to load jobs</p>
    );

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Browse Jobs</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-1/3"
        />

        {isFetching && (
          <p className="text-sm text-gray-500 mt-2">Searching...</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((job: any) => (
          <div key={job.id} className="bg-white p-5 rounded-xl shadow border">
            <h2 className="text-lg font-semibold text-[#22426A]">
              {job.title}
            </h2>

            <p className="text-sm text-gray-500">{job.company}</p>

            <p className="text-sm text-gray-500 capitalize">{job.category}</p>

            <p className="text-xs text-red-500 mt-2">
              Deadline:{" "}
              {job.applyDeadline
                ? new Date(job.applyDeadline).toLocaleDateString()
                : "N/A"}
            </p>

            <div className="mt-4">
              <Link href={`/job/${job.id}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {data?.length === 0 && (
        <p className="mt-10 text-center text-gray-500">No jobs found</p>
      )}
    </div>
  );
}
