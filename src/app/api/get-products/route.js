import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Initialize auth with JWT
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY,
      scopes: [process.env.SCOPES],
    });

    console.log("Drive API Auth:", auth);
    // Create drive client
    const drive = google.drive({
      version: "v3",
      auth,
    });

    console.log("Drive API Client:", drive);
    // List files from specific folder

    const response = await drive.files.list({
      q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and name != 'Products-Thumbnails' and trashed = false`,
      pageSize: 100,
      fields:
        "nextPageToken, files(id, name, mimeType, modifiedTime, size, webViewLink, thumbnailLink, createdTime)",
      orderBy: "createdTime desc",
    });

    console.log("Files found:", response.data.files.length);
    console.log(
      "Query used:",
      `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and trashed = false`
    );

    // const response = await drive.files.list({
    //   q: "'15oXs-Orw8hA1PJWa8zDmGSpRpwiHPKai' in parents",
    //   pageSize: 100,
    //   fields: "files(id, name, mimeType, modifiedTime, size, webViewLink)",
    // });

    return NextResponse.json(response.data.files);
  } catch (error) {
    console.log("Drive API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch drive files",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
