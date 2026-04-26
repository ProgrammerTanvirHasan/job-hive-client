"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function FailedPage() {
  const router = useRouter();

  useEffect(() => {
    toast.error("Payment failed. Please try again.");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            Unfortunately, your payment could not be processed. No charges were made.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">
            Please check your payment details and try again. If the problem
            persists, contact support.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={() => router.back()} className="w-full">
            Try Again
          </Button>
          <Button
            onClick={() => router.push("/jobs/all")}
            variant="outline"
            className="w-full"
          >
            Browse Jobs
          </Button>
        </div>
      </div>
    </div>
  );
}
