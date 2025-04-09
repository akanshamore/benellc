import { promises as fs } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import cors from "cors";

export async function GET() {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const folderPath = join(
      "/Users",
      "akanshamore",
      "Downloads",
      "benellc",
      "Thumbnails"
    );
    const items = await fs.readdir(folderPath, { withFileTypes: true });
    const files = items
      .filter((item) => item.isFile() && !item.name.startsWith("."))
      .map((file) => ({
        name: file.name,
        path: join(folderPath, file.name),
        type: "file",
      }));

    return NextResponse.json(files, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read files", details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
