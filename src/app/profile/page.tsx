"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/session-context";
import { UserProfile1 } from "@/components/user-profile1";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function ProfilePage() {
  const { id } = useParams();

  const { user, setUser } = useSession() as {
    user: {
      id?: string;
      name?: string;
      email?: string;
      role?: string;
    } | null;
    setUser: (user: any) => void;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  if (!user) return <p className="p-10 min-h-screen">Loading...</p>;

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password || undefined,
        }),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success("Profile updated successfully!");
      setUser(data.data);
      setIsEditing(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 min-h-screen space-y-6">
      <UserProfile1
        user={{
          name: user.name || "",
          email: user.email || "",
          avatar: "",
          role: user.role || "",
        }}
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
      />

      {isEditing && (
        <div className="max-w-sm mx-auto space-y-4">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            type="password"
            placeholder="New Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button onClick={handleUpdate} className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  );
}
