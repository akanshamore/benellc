"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FolderPage() {
  const params = useParams();
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const response = await fetch(
          `/api/get-attachments?folder=${encodeURIComponent(
            params.productName
          )}`
        );
        const data = await response.json();
        setAttachments(data);
      } catch (error) {
        console.error("Error fetching folder content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttachments();
  }, [params.productName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const mediaAttachments = attachments.filter((item) =>
    item.name.match(/\.(jpg|jpeg|png|avif|mp4|mov|avi|webm)$/i)
  );

  const documentAttachments = attachments.filter(
    (item) => !item.name.match(/\.(jpg|jpeg|png|avif|mp4|mov|avi|webm)$/i)
  );

  const isVideo = (filename) => {
    return /\.(mp4|mov|avi|webm)$/i.test(filename);
  };

  const isImage = (filename) => {
    return /\.(jpg|jpeg|png|avif)$/i.test(filename);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
        >
          ← Back to Folders
        </Link>
        <h1 className="text-2xl font-bold mt-4">
          {decodeURIComponent(params.productName)}
        </h1>
      </div>

      {/* Media Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaAttachments.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-lg transition-all"
            >
              <div className="relative h-48 w-full mb-2">
                {isVideo(item.name) ? (
                  <video
                    className="w-full h-full object-cover rounded"
                    controls
                    preload="metadata"
                  >
                    <source
                      src={`/api/get-thumbnail?path=${encodeURIComponent(
                        item.path
                      )}`}
                      type={`video/${item.name.split(".").pop().toLowerCase()}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : isImage(item.name) ? (
                  <Image
                    src={`/api/get-thumbnail?path=${encodeURIComponent(
                      item.path
                    )}`}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                ) : null}
              </div>
              <h3 className="font-medium text-center">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Attachments Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Attachments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentAttachments.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="font-medium">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
