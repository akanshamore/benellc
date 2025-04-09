"use strict";

import { useState, useEffect } from "react";
import { FolderIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New states for search, sort, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([fetchFolders(), fetchThumbnails()]);
    } catch (err) {
      setError("Failed to load folders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFolders = async () => {
    const response = await fetch("/api/get-remote-folders");
    const data = await response.json();
    setFolders(data);
  };

  const fetchThumbnails = async () => {
    const response = await fetch("/api/get-remote-folders-thumbnails");
    const data = await response.json();
    setThumbnails(data);
  };

  const getThumbnailForFolder = (folderName) => {
    const thumbnail = thumbnails.find((thumb) =>
      folderName.toLowerCase().includes(thumb.name.split(".")[0].toLowerCase())
    );
    return thumbnail?.path;
  };

  // Search and sort logic
  const filteredAndSortedFolders = folders
    .filter((folder) =>
      folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedFolders.length / itemsPerPage);
  const paginatedFolders = filteredAndSortedFolders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Sort dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {paginatedFolders.map((folder) => {
          const thumbnailPath = getThumbnailForFolder(folder.name);
          return (
            <div
              key={folder.path}
              className="group p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out hover:border-blue-500 flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                {thumbnailPath ? (
                  <img
                    src={`/api/get-thumbnail?path=${encodeURIComponent(
                      thumbnailPath
                    )}`}
                    alt={folder.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <FolderIcon className="w-12 h-12 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300 text-center truncate w-full">
                {folder.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Pagination controls */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FolderList;
