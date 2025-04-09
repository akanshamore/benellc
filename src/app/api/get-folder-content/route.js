import { NextResponse } from "next/server";

export async function GET() {
  try {
  } catch {
    return NextResponse.json({ error: "Error retrieving folder content" });
  }
  return NextResponse.json({ name: "Akansha More" });
}
