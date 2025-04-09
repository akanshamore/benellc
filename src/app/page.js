"use client";

import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import Header from "./components/Header";
import DriveFiles from "./components/DriveFiles";
import FolderList from "./components/FolderList";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <FolderList />

      <footer className="mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Benellc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
