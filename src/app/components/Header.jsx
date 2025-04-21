import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const [folders, setFolders] = useState([]);
  const [filteredFolders, setFilteredFolders] = useState([]);

  useEffect(() => {
    setFilteredFolders(folders);
  }, [folders]);

  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch("/api/get-remote-folders");
      const data = await response.json();
      setFolders(data);
    };
    fetchFolders();
  }, []);

  return (
    <div className="w-full bg-[#8A9BA4] shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="py-4">
          <Link href="/">
            <Image
              src="/images/benesvg1.svg"
              alt="Company Logo"
              width={40}
              height={46}
              className="logo"
            />
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="hidden lg:flex flex-1 justify-center text-white">
          <ul className="flex items-center space-x-12">
            {/* About Us */}
            <li>
              <Link
                href="/about-us"
                className="py-6 text-white hover:text-green-300"
              >
                About Us
              </Link>
            </li>

            {/* Products Dropdown */}
            <li className="relative group">
              <button className="flex items-center space-x-1 py-6 text-white">
                <span>Products</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block w-64 bg-white shadow-lg rounded-md z-50">
                {/* Search Section */}
                <div className="p-3 border-b">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    onChange={(e) => {
                      const searchTerm = e.target.value.toLowerCase();
                      const filtered = folders.filter((folder) =>
                        folder.name.toLowerCase().includes(searchTerm)
                      );
                      setFilteredFolders(filtered);
                    }}
                  />
                </div>

                {/* Scrollable Products List */}
                <ul className="max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {filteredFolders.map((folder) => (
                    <li key={folder.name}>
                      <Link
                        href={`/products/${folder.name.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                      >
                        {folder.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Join our team */}
            <li>
              <Link
                href="/join-our-team"
                className="py-6 text-white hover:text-green-300"
              >
                Join our team
              </Link>
            </li>

            {/* Contact us */}
            <li>
              <Link
                href="/contact-us"
                className="py-6 text-white hover:text-green-300"
              >
                Contact us
              </Link>
            </li>

            {/* FAQ */}
            <li>
              <Link
                href="/FAQ"
                className="py-6 text-white hover:text-green-300"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </nav>

        {/* Inquire Now Button */}
        <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Inquire Now
        </button>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
