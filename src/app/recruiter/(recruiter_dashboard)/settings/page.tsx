"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ApplicantsPage() {
  const queryClient = useQueryClient();

  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ================= GET JOBS =================
  const { data, isLoading } = useQuery({
    queryKey: ["my-jobs"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/my-posts`, {
        credentials: "include",
      });

      return res.json();
    },
  });

  const jobs = data?.data || [];

  // ================= DELETE JOB =================
  const deleteJob = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/api/job/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      setDeleteId(null); // close modal
    },
  });

  if (isLoading) return <p className="p-6">Loading jobs...</p>;

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Job Posts</h1>

      {jobs.length === 0 && <p>No jobs created yet</p>}

      <div className="space-y-4">
        {jobs.map((job: any) => (
          <div
            key={job.id}
            className="border p-5 rounded-xl shadow  flex justify-between items-center"
          >
            {/* LEFT */}
            <div>
              <h2 className="text-lg font-bold">{job.title}</h2>
              <p className="text-sm text-gray-500">{job.company}</p>
              <p className="text-xs text-gray-400 mt-1">{job.location}</p>
            </div>

            {/* RIGHT */}
            <div className="flex gap-3">
              <a
                href={`/recruiter/settings/${job.id}`}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
              >
                Edit
              </a>

              <button
                onClick={() => setDeleteId(job.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CONFIRM MODAL ================= */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>

            <p className="text-sm text-gray-500 mb-4">
              This job will be permanently deleted.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-3 py-1 text-sm bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteJob.mutate(deleteId)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
