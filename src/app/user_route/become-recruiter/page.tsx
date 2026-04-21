"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BecomeRecruiterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    category: "",
    isPaid: false,
    price: "",
    requirements: "",
    qualifications: "",
    benefits: "",
    applyDeadline: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toArray = (text: string) => {
    return text
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: form.title,
        description: form.description,
        company: form.company,
        location: form.location,
        salary: form.salary || null,
        category: form.category,
        isPaid: form.isPaid,
        price: form.price ? Number(form.price) : null,
        applyDeadline: form.applyDeadline || null,
        requirements: toArray(form.requirements),
        qualifications: toArray(form.qualifications),
        benefits: toArray(form.benefits),
      };

      const res = await fetch(`${API_URL}/api/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Job submitted successfully!");
      router.push("/user_route");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className=" grid lg:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-[#22426A]">
              Why use JobHive?
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li>✔ Thousands of active job seekers</li>
              <li>✔ Fast approval system</li>
              <li>✔ AI-powered visibility boost</li>
              <li>✔ Trusted recruiter platform</li>
            </ul>
          </div>

          <div className=" p-6 rounded-xl">
            <p className="text-sm text-gray-500">Pro Tip</p>
            <p className="font-medium mt-1">
              Clear job descriptions get 3x more applications.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="  p-8">
          <p className="text-gray-500 mt-2">
            Post your job and find the perfect candidate for your company.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <input
              name="title"
              placeholder="Job Title"
              className="w-full border rounded-lg px-3 py-2"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              name="company"
              placeholder="Company"
              className="w-full border rounded-lg px-3 py-2"
              value={form.company}
              onChange={handleChange}
              required
            />

            <input
              name="location"
              placeholder="Location"
              className="w-full border rounded-lg px-3 py-2"
              value={form.location}
              onChange={handleChange}
              required
            />

            <div>
              <label className="text-sm text-gray-500">Apply Deadline</label>
              <input
                type="date"
                name="applyDeadline"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={form.applyDeadline}
                onChange={handleChange}
              />
            </div>

            <input
              name="category"
              placeholder="Category"
              className="w-full border rounded-lg px-3 py-2"
              value={form.category}
              onChange={handleChange}
              required
            />

            <input
              name="salary"
              placeholder="Salary (optional)"
              className="w-full border rounded-lg px-3 py-2"
              value={form.salary}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Job Description"
              className="w-full border rounded-lg px-3 py-2 min-h-[120px]"
              value={form.description}
              onChange={handleChange}
              required
            />

            <textarea
              name="requirements"
              placeholder="Requirements (comma separated)"
              className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
              value={form.requirements}
              onChange={handleChange}
            />

            <textarea
              name="qualifications"
              placeholder="Qualifications (comma separated)"
              className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
              value={form.qualifications}
              onChange={handleChange}
            />

            <textarea
              name="benefits"
              placeholder="Benefits (comma separated)"
              className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
              value={form.benefits}
              onChange={handleChange}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPaid"
                checked={form.isPaid}
                onChange={handleChange}
              />
              <label className="text-sm">Featured Job (Paid)</label>
            </div>

            {form.isPaid && (
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="w-full border rounded-lg px-3 py-2"
                value={form.price}
                onChange={handleChange}
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#22426A] text-white rounded-xl hover:bg-[#1b3554]"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
