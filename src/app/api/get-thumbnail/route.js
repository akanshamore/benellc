import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  try {
    const fileBuffer = await fs.readFile(path);
    // const contentType = path.endsWith(".jpg")
    //   ? "image/jpeg"
    //   : path.endsWith(".png")
    //   ? "image/png"
    //   : path.endsWith(".avif")
    //   ? "image/avif"
    //   : "application/octet-stream";

    const contentType = path.endsWith(".jpg")
      ? "image/jpeg"
      : path.endsWith(".png")
      ? "image/png"
      : path.endsWith(".avif")
      ? "image/avif"
      : path.endsWith(".mp4")
      ? "video/mp4"
      : path.endsWith(".mov")
      ? "video/quicktime"
      : path.endsWith(".webm")
      ? "video/webm"
      : path.endsWith(".avi")
      ? "video/x-msvideo"
      : "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read thumbnail" },
      { status: 500 }
    );
  }
}
