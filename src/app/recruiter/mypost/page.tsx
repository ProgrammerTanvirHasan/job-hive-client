"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyPostPage() {
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-posts"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/my-posts`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const result = await res.json();
      return result.data;
    },
  });

  if (isLoading) {
    return <p className="p-10 min-h-screen">Loading...</p>;
  }

  if (isError) {
    return <p className="p-10 text-red-500">Failed to load posts</p>;
  }

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#22426A]">My Job Posts</h1>
        <p className="text-gray-500 mt-1">
          Manage all your posted jobs and track their status.
        </p>
      </div>

      {jobs?.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {jobs?.map((job: any) => (
            <div
              key={job.id}
              className="p-5 border rounded-lg bg-white shadow-sm"
            >
              <h2 className="text-lg font-bold text-[#22426A]">{job.title}</h2>

              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.category}</p>

              <div className="mt-4">
                <Link
                  href={`/recruiter/mypost/${job.id}`}
                  className="inline-block text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Update Post
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
