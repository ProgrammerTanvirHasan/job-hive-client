"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

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

  const uploadResumeToCloudinary = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

   

    if (!res.ok) {
      throw new Error(data?.error?.message || "Upload failed");
    }

    return data.secure_url;
  };

  const handleApply = async () => {
    if (!job) return;

    if (!resume) {
      toast.error("Upload CV required");
      return;
    }

    setLoading(true);

    try {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(resume.type)) {
        throw new Error("Only PDF/DOC/DOCX allowed");
      }

      const maxSize = 5 * 1024 * 1024;

      if (resume.size > maxSize) {
        throw new Error("File size must be less than 5MB");
      }

      toast.loading("Uploading resume...", {
        id: "upload",
      });

      const resumeUrl = await uploadResumeToCloudinary(resume);

      toast.loading("Submitting application...", {
        id: "upload",
      });

      const payload = {
        resume: resumeUrl,
        coverLetter,
        jobId: Number(job.id),
      };

      if (!job.price || job.price <= 0) {
        const res = await fetch(`${API_URL}/api/application/apply`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        toast.success("Application submitted successfully!", {
          id: "upload",
        });

        setResume(null);
        setCoverLetter("");

        return;
      }

      /* ================= PAID JOB ================= */
      toast.loading("Redirecting to payment...", {
        id: "upload",
      });

      const res = await fetch(`${API_URL}/api/payment/init-paid-application`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      const gatewayURL = data?.paymentURL;

      if (!gatewayURL) {
        throw new Error("No payment URL received");
      }

      toast.success("Redirecting to payment...", {
        id: "upload",
      });

      window.location.href = gatewayURL;
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", {
        id: "upload",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <p className="min-h-screen p-6">Loading...</p>;
  }

  if (error) {
    return <p className="min-h-screen p-6">Error loading job</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold">{job?.title}</h1>

      <p className="text-gray-500 mt-1">
        {job?.company} • {job?.location}
      </p>

      <p className="text-green-600 font-bold mt-3">
        {job?.price > 0 ? `💰 ${job.price} BDT` : "Free"}
      </p>

      <p className="mt-5 leading-7">{job?.description}</p>

      <div className="mt-8 border rounded-xl p-5 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Apply for this Job</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Resume/CV *
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              className="w-full border p-2 rounded"
            />

            {resume && (
              <p className="text-sm text-green-600 mt-2">✓ {resume.name}</p>
            )}

            <p className="text-xs text-gray-500 mt-1">
              Allowed: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>

          {/* ================= COVER LETTER ================= */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Cover Letter (Optional)
            </label>

            <textarea
              placeholder="Tell the employer why you're a great fit..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full border p-3 rounded min-h-[140px]"
            />
          </div>
        </div>

        {/* ================= BUTTON ================= */}
        <Button
          onClick={handleApply}
          disabled={loading}
          className="mt-5 w-full"
        >
          {loading
            ? "Processing..."
            : job?.price > 0
              ? `Pay ${job.price} BDT & Apply`
              : "Submit Application"}
        </Button>

        {/* ================= PAID NOTE ================= */}
        {job?.price > 0 && (
          <p className="text-sm text-gray-500 mt-3">
            You’ll be redirected to SSLCommerz for secure payment.
          </p>
        )}
      </div>
    </div>
  );
}
