import { getAllUsers } from "@/lib/service/user.service";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getAllUsers();
  if (result.error) {
    return NextResponse.json({ data: null }, { status: 401 });
  }
  return NextResponse.json(result);
}
