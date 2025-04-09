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

    // First, get the Thumbnails folder ID
    const folderResponse = await drive.files.list({
      q: `name = 'Products-Thumbnails' and mimeType = 'application/vnd.google-apps.folder' and '${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and trashed = false`,
      fields: "files(id)",
    });
    const thumbnailsFolderId = folderResponse.data.files[0].id;

    // Then get all files inside that folder
    const filesResponse = await drive.files.list({
      q: `'${thumbnailsFolderId}' in parents and trashed = false`,
      pageSize: 100,
      fields:
        "nextPageToken, files(id, name, mimeType, modifiedTime, size, webViewLink, thumbnailLink, createdTime, webContentLink)",
      orderBy: "createdTime desc",
    });

    return NextResponse.json(filesResponse.data.files);
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
