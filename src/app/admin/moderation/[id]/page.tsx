"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [rejectId, setRejectId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  // ---------------- FETCH SINGLE JOB ----------------
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/${id}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch job");

      return res.json();
    },
  });

  const job = data?.data;

  // ---------------- APPROVE ----------------
  const handleApprove = async () => {
    try {
      const res = await fetch(`${API_URL}/api/job/admin/${id}/approve`, {
        method: "PUT",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Approve failed");

      toast.success("Job Approved 🚀");

      await refetch();
      router.push("/admin/moderation");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

 
  const handleReject = async () => {
    try {
      const res = await fetch(`${API_URL}/api/job/admin/${id}/reject`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ rejectionReason: feedback }),
      });

      if (!res.ok) throw new Error("Reject failed");

      toast.success("Job Rejected ❌");

      setRejectId(null);
      setFeedback("");

      await refetch();
      router.push("/admin/moderation");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  
  const handleDelete = async () => {
    try {
      const confirmDelete = confirm("Are you sure?");
      if (!confirmDelete) return;

      const res = await fetch(`${API_URL}/api/job/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Job Deleted 🗑️");

      router.push("/admin/moderation");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (isLoading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">Error loading job</p>;

  return (
    <div className="mx-auto p-6 min-h-svh">
   
      <h1 className="text-3xl font-bold">{job.title}</h1>

      <p className="text-gray-500 mt-1">
        {job.company} • {job.location}
      </p>

  
      <div className="flex gap-2 mt-3">
        <span className="bg-blue-100 px-2 py-1 rounded text-xs">
          {job.category}
        </span>
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
       
      </div>

    
      <p className="mt-6 text-gray-700">{job.description}</p>

      {job.requirements?.length > 0 && (
        <div className="mt-5">
          <h2 className="font-semibold">Requirements</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {job.requirements.map((r: string, i: number) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {job.qualifications?.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold">Qualifications</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {job.qualifications.map((q: string, i: number) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      {job.qualifications?.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold">Qualifications</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {job.qualifications.map((q: string, i: number) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      
      <div className="mt-8 flex gap-3">
      
        <button
          onClick={handleApprove}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Approve
        </button>

       
        <button
          onClick={() => setRejectId(Number(id))}
          className="px-4 py-2 bg-yellow-600 text-white rounded"
        >
          Reject
        </button>

     
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>

    
      {rejectId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="font-semibold mb-2">Reject Reason</h2>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border p-2 rounded h-24"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setRejectId(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleReject}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
