"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditJobPage() {
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  // ================= LOAD JOB =================
  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`${API_URL}/api/job/${id}`, {
        credentials: "include",
      });

      const data = await res.json();

      setForm({
        title: data.data.title,
        description: data.data.description,
        location: data.data.location,
        salary: data.data.salary,
      });
    };

    fetchJob();
  }, [id]);

  // ================= UPDATE JOB =================
  const handleUpdate = async () => {
    await fetch(`${API_URL}/api/job/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Job updated successfully");
  };

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">Edit Job</h1>

      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        className="border p-2 w-full mb-2"
      />

      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
        className="border p-2 w-full mb-2"
      />

      <input
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        placeholder="Location"
        className="border p-2 w-full mb-2"
      />

      <input
        value={form.salary}
        onChange={(e) => setForm({ ...form, salary: e.target.value })}
        placeholder="Salary"
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Update Job
      </button>
    </div>
  );
}
