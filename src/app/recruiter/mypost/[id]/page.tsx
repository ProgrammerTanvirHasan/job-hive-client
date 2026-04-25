"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getJob = async (id: string) => {
  const res = await fetch(`${API_URL}/api/job/${id}`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data.data;
};

export default function UpdateJobsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    category: "",
    salary: "",
    applyDeadline: "",
  });
  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJob(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (job) {
      setForm({
        title: job.title || "",
        description: job.description || "",
        company: job.company || "",
        location: job.location || "",
        category: job.category || "",
        salary: job.salary || "",
        applyDeadline: job.applyDeadline ? job.applyDeadline.split("T")[0] : "",
      });
    }
  }, [job]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/job/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Updated successfully");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (isLoading) return <p className="p-10 min-h-screen">Loading...</p>;

  return (
    <div className="p-10 min-h-screen ">
      <h1 className="text-xl font-bold mb-4">Update Job</h1>

      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Title"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Description"
        />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Company"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Location"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Category"
        />

        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Salary"
        />

        <input
          type="date"
          name="applyDeadline"
          value={form.applyDeadline}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-green-600 text-white px-4 py-2">Update</button>
      </form>
    </div>
  );
}
