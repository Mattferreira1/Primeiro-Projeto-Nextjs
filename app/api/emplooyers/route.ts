import { getEmployers } from "@/services/emplooyers";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await getEmployers();

  return NextResponse.json(response);
}
