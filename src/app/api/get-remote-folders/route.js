import { promises as fs } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import cors from "cors";

export async function GET() {
  // Enable CORS for remote access
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
      "A-Messages"
    );
    const items = await fs.readdir(folderPath, { withFileTypes: true });
    const folders = items
      .filter((item) => item.isDirectory())
      .map((folder) => ({
        name: folder.name,
        path: join(folderPath, folder.name),
        type: "directory",
      }));

    return NextResponse.json(folders, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read folders", details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
