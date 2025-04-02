"use client";

import Image from "next/image";
import { FaFile, FaFolder, FaImage } from "react-icons/fa";

const DriveFiles = ({ files, productsThumbnails }) => {
  const getFileIcon = (mimeType) => {
    if (mimeType?.includes("folder")) {
      return <FaFolder className="text-yellow-400 text-3xl" />;
    }
    if (mimeType?.includes("image")) {
      return <FaImage className="text-green-400 text-3xl" />;
    }
    return <FaFile className="text-blue-400 text-3xl" />;
  };

  const renderFileContent = (file) => {
    if (file.mimeType?.includes("folder")) {
      // Find matching thumbnail by name (removing spaces and case sensitivity)
      const thumbnail = productsThumbnails.find((thumb) => {
        const thumbName = thumb.name.toLowerCase().replace(/\s+/g, "");
        const fileName = file.name.toLowerCase().replace(/\s+/g, "");
        return thumbName.includes(fileName) || fileName.includes(thumbName);
      });

      if (thumbnail?.thumbnailLink) {
        const imageUrl = thumbnail.thumbnailLink;
        return (
          <Image
            src={imageUrl}
            alt={file.name}
            width={300}
            height={192}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={(e) => console.log("Image failed to load:", e)}
            style={{ objectFit: "cover" }}
            priority={true}
            quality={100}
          />
        );
      }
    }
    return getFileIcon(file.mimeType);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-4">
              {renderFileContent(file)}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {file.name}
                </h3>
                <div className="mt-4 flex justify-end">
                  <a
                    href={file.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Open
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriveFiles;
