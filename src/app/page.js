"use client";

import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import Header from "./components/Header";
import DriveFiles from "./components/DriveFiles";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [productsThumbnails, setProductsThumbnails] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/get-products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      }
    };
    const fetchProductsThumbnails = async () => {
      try {
        const res = await fetch("/api/get-products-thumbnails");
        const data = await res.json();
        setProductsThumbnails(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setProductsThumbnails([]);
      }
    };

    fetchProducts();
    fetchProductsThumbnails();
  }, []);

  const handleSearchText = (e) => {
    const enteredText = e.target.value;
    setSearchText(enteredText);
  };

  const filteredProducts = products.filter((file) => {
    return file.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Search handleSearchText={handleSearchText} />

      <DriveFiles
        files={filteredProducts}
        productsThumbnails={productsThumbnails}
      />
      <footer className="mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Benellc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
