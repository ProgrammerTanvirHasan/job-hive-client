"use server";

import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllUsers() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/user`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });
    const users = await res.json();
    if (!users) return { data: null, error: { message: "data missing" } };
    return { data: users, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
}
