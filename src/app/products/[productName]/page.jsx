"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductPage() {
  const params = useParams();
  const [attachments, setAttachments] = useState([]);
  const [folderFiles, setFolderFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

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

    const fetchFolderFiles = async () => {
      try {
        const response = await fetch(
          `/api/get-folder-files?folder=${encodeURIComponent(
            params.productName
          )}`
        );
        const data = await response.json();
        setFolderFiles(data);
      } catch (error) {
        console.error("Error fetching folder files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttachments();
    fetchFolderFiles();
  }, [params.productName]);

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Folders
          </Link>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {decodeURIComponent(params.productName)}
          </h1>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!loading && (
          <>
            {/* Files Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Files
              </h2>
              <div className="w-full">
                <div className="flex space-x-4 border-b">
                  {folderFiles.map((file, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`px-6 py-3 font-medium transition-colors ${
                        activeTab === index
                          ? "border-b-2 border-blue-600 text-blue-600"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {file.name}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  {folderFiles.map((file, index) => (
                    <div
                      key={index}
                      className={activeTab === index ? "block" : "hidden"}
                    >
                      <iframe
                        src={`/api/get-file-content?path=${encodeURIComponent(
                          file.path
                        )}`}
                        className="w-full h-[800px] border rounded-lg bg-gray-50"
                        title={file.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Media
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaAttachments.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
                      {isVideo(item.name) ? (
                        <video
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                        >
                          <source
                            src={`/api/get-thumbnail?path=${encodeURIComponent(
                              item.path
                            )}`}
                            type={`video/${item.name
                              .split(".")
                              .pop()
                              .toLowerCase()}`}
                          />
                        </video>
                      ) : (
                        <Image
                          src={`/api/get-thumbnail?path=${encodeURIComponent(
                            item.path
                          )}`}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <h3 className="font-medium text-center text-gray-700 truncate">
                      {item.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentAttachments.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-8 h-8 text-blue-600"
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
                      <h3 className="font-medium text-gray-700 truncate">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
