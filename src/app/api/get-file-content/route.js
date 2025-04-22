import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import mammoth from "mammoth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");

  try {
    const ext = path.extname(filePath);

    if (ext === ".docx") {
      const buffer = await fs.readFile(filePath);
      const result = await mammoth.convertToHtml({ buffer });
      return new NextResponse(result.value, {
        headers: { "Content-Type": "text/html" },
      });
    }

    if (ext === ".html") {
      const htmlContent = await fs.readFile(filePath, "utf-8");
      return new NextResponse(htmlContent, {
        headers: { "Content-Type": "text/html" },
      });
    }

    if (ext === ".pdf") {
      const dataBuffer = await fs.readFile(filePath);
      const base64 = dataBuffer.toString("base64");
      const pdfViewerHtml = `
        <html>
          <body style="margin:0;">
            <embed src="data:application/pdf;base64,${base64}" type="application/pdf" width="100%" height="100%"/>
          </body>
        </html>
      `;
      return new NextResponse(pdfViewerHtml, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // Default: treat as text (e.g. .txt, .js)
    const content = await fs.readFile(filePath, "utf-8");
    return new NextResponse(
      `
      <html>
        <body style="padding:20px;">
          <pre>${content}</pre>
        </body>
      </html>
    `,
      {
        headers: { "Content-Type": "text/html" },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
