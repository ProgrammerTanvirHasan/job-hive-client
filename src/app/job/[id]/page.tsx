"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function JobDetailsPage() {
  const { id } = useParams();

  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/${id}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch job");

      return res.json();
    },
    enabled: !!id,
  });

  const job = data?.data;

  const handleApply = async () => {
    if (!resume) {
      alert("Please upload your CV");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter || "");
      formData.append("jobId", String(job.id));

      const res = await fetch(`${API_URL}/api/application`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Apply failed");
      }

      toast("✅ Application submitted successfully!");

      // 🔄 reset form
      setResume(null);
      setCoverLetter("");
    } catch (err: any) {
      console.error(err);
      alert(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  if (isLoading) {
    return <p className="p-5 min-h-screen">Loading...</p>;
  }

  if (error) {
    return <p className="p-5 text-red-500">Error loading job</p>;
  }

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      {/* 🔥 JOB INFO */}
      <h1 className="text-3xl font-bold text-[#22426A]">{job?.title}</h1>

      <p className="text-gray-500 mt-1">
        {job?.company} • {job?.location}
      </p>

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

      <p className="text-green-600 font-bold mt-2">
        {job.price && job.price > 0 ? `💰 Apply Fee: ${job.price} BDT` : "Free"}
      </p>

      <p className="mt-6 text-gray-700">{job?.description}</p>

      {/* 📄 REQUIREMENTS */}
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

      {/* 📄 APPLY FORM */}
      <div className="mt-8 border p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Apply for this job</h2>

        {/* CV Upload */}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          className="mb-3"
        />

        {/* Cover Letter */}
        <textarea
          placeholder="Write your cover letter..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          rows={4}
        />

        <Button
          onClick={handleApply}
          disabled={loading}
          className="bg-green-700 w-full"
        >
          {loading
            ? "Processing..."
            : job?.price > 0
              ? "Pay & Apply"
              : "Apply Now"}
        </Button>
      </div>
    </div>
  );
}
