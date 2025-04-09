import { promises as fs } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const messagesPath = join(
      "/Users",
      "akanshamore",
      "Downloads",
      "benellc",
      "A-Messages"
    );
    console.log("Reading from path:", messagesPath);
    const files = await fs.readdir(messagesPath);

    return new NextResponse(JSON.stringify(files), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error reading directory:", error);
    return new NextResponse(JSON.stringify({ error: "Directory not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
