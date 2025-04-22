"use client";

import FolderList from "./components/FolderList";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white py-4">
      <FolderList />

      <footer className="mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Benellc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
