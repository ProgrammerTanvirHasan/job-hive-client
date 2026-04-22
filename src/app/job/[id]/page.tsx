"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function JobDetailsPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/${id}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch job");

      return res.json();
    },
    enabled: !!id, // id না থাকলে request যাবে না
  });

  if (isLoading) {
    return <p className="p-5">Loading...</p>;
  }

  if (error) {
    return <p className="p-5 text-red-500">Error loading job</p>;
  }

  const job = data?.data;

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-[#22426A]">{job?.title}</h1>

      {/* COMPANY + LOCATION */}
      <p className="text-gray-500 mt-1">
        {job?.company} • {job?.location}
      </p>

      {/* CATEGORY + STATUS */}
      <div className="flex gap-2 mt-3">
        <span className="bg-blue-100 px-2 py-1 rounded text-xs">
          {job?.category}
        </span>

        <span
          className={`text-xs px-2 py-1 rounded ${
            job?.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : job?.status === "APPROVED"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {job?.status}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="mt-6 text-gray-700">{job?.description}</p>
      <p className="mt-6 font-semibold">{job?.salary}</p>

      {/* REQUIREMENTS */}
      {job?.requirements?.length > 0 && (
        <div className="mt-5">
          <h2 className="font-semibold">Requirements</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {job.requirements.map((r: string, i: number) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {/* QUALIFICATIONS */}
      {job?.qualifications?.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold">Qualifications</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {job.qualifications.map((q: string, i: number) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      {/* BENEFITS */}
      {job?.benefits?.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold">Benefits</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {job.benefits.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      )}

      {/* PRICE */}
      {job?.price && (
        <p className="mt-4 text-green-600 font-bold">
          Apply Fee: {job.price} BDT
        </p>
      )}
      <div className="text-center mt-4 ">
        <Button className="bg-green-700">Apply Now</Button>
      </div>
    </div>
  );
}
