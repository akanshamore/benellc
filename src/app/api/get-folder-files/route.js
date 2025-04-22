import { NextResponse } from "next/server";
import { join } from "path";
import { promises as fs } from "fs";

export async function GET(request) {
  console.log("Request received:", request);
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");

  console.log("folder:", folder);

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
      "A-Messages",
      folder
    );

    console.log("Folder path:", folderPath);
    const items = await fs.readdir(folderPath, { withFileTypes: true });
    const files = items
      .filter((item) => item.isFile() && !item.name.startsWith("."))
      .map((file) => ({
        name: file.name,
        path: join(folderPath, file.name),
        type: "file",
      }));

    return NextResponse.json(files, { headers: corsHeaders });
  } catch {
    return NextResponse.json([]);
  }
  return NextResponse.json({ name: "Akansha More" });
}
