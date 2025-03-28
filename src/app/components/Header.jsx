import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full bg-white shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="py-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={180}
              height={60}
              className="logo"
            />
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center space-x-12">
            {/* About Us Dropdown */}
            <li className="relative group">
              <button className="flex items-center space-x-1 py-6 transition-colors duration-300 hover:text-gray-800">
                <span>About Us</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
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
              <ul className="absolute hidden group-hover:block w-48 bg-white shadow-lg py-2 rounded-md z-50">
                <li>
                  <Link
                    href="/about"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mission"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Mission & Vision
                  </Link>
                </li>
                <li>
                  <Link
                    href="/values"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Values
                  </Link>
                </li>
              </ul>
            </li>

            {/* Products Dropdown */}
            <li className="relative group">
              <button className="flex items-center space-x-1 py-6">
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
              <ul className="absolute hidden group-hover:block w-48 bg-white shadow-lg py-2 rounded-md z-50">
                <li>
                  <Link
                    href="/products/aluminum"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Aluminium Alloy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/zinc"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Zinc Alloy
                  </Link>
                </li>
              </ul>
            </li>

            {/* Our Customers */}
            <li>
              <Link href="/our-customers" className="py-6 hover:text-green-600">
                Our Customers
              </Link>
            </li>

            {/* Contact Us */}
            <li className="relative group">
              <button className="flex items-center space-x-1 py-6">
                <span>Contact Us</span>
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
              <ul className="absolute hidden group-hover:block w-48 bg-white shadow-lg py-2 rounded-md z-50">
                <li>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Get in Touch
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Inquire Now Button */}
        <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Inquire Now
        </button>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2">
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
