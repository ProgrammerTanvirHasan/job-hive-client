
import { getAllUsers } from "@/lib/service/user.service";

import { AdminUserTable } from "./user-table";
import { User } from "@/types";

function normalizeUsers(data: unknown): User[] {
  if (Array.isArray(data)) return data as User[];
  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray((data as { data: unknown }).data)
  )
    return (data as { data: User[] }).data;
  if (
    data &&
    typeof data === "object" &&
    "users" in data &&
    Array.isArray((data as { users: unknown }).users)
  )
    return (data as { users: User[] }).users;
  return [];
}

export default async function AdminUsersPage() {
  const result = await getAllUsers();
  const users = normalizeUsers(result.data ?? null);

  return (
    <div className="container mx-auto px-4 py-8 min-h-svh">
      <h1 className="text-3xl font-bold ">All Users</h1>
      <p className="mt-2 text-muted-foreground">
        Manage Users To (ban/unban).
      </p>
      <AdminUserTable  initialUsers={users} />
     
    </div>
  );
}
