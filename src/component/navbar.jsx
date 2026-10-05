import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import Login from "../Pages/Login_page";
import Signup from "../Pages/Signup";
import User_Profile from "../Pages/User_Profile";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">

        <nav className="min-h-[80px] flex items-center px-4 md:px-8 py-3">

          {/* Logo */}
          <div className="mr-0 md:mr-16">
            <Link
              to="/Home"
              className="text-2xl md:text-3xl font-bold"
            >
              <span className="text-gray-900">Style</span>
              <span className="text-pink-500">Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">

            <Link
              to="/Home"
              className="text-[16px] font-medium text-gray-800 hover:text-pink-500 transition"
            >
              HOME
            </Link>

            <Link
              to="/men"
              className="text-[16px] font-medium text-gray-800 hover:text-pink-500 transition"
            >
              MEN
            </Link>

            <Link
              to="/women"
              className="text-[16px] font-medium text-gray-800 hover:text-pink-500 transition"
            >
              WOMEN
            </Link>

            <Link
              to="/kids"
              className="text-[16px] font-medium text-gray-800 hover:text-pink-500 transition"
            >
              KIDS
            </Link>

          </div>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-3 md:gap-6">

            {/* Search - Desktop */}
            <div className="hidden md:flex items-center w-[300px] lg:w-[400px] h-[48px] border border-gray-300 rounded-lg px-4">

              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 outline-none text-gray-700"
              />

              <span className="text-xl">
                🔍
              </span>

            </div>

            {/* Search Icon - Mobile */}
            <button className="md:hidden text-xl">
              🔍
            </button>

            {/* Login - Desktop */}
            <div className="hidden sm:block">
              <Login />
            </div>

            {/* Signup - Desktop */}
            <div className="hidden sm:block">
              <Signup />
            </div>

            {/* User Profile */}
            <User_Profile />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl ml-1"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>

        </nav>

        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">

            <div className="flex flex-col px-6 py-5 gap-4">

              {/* Mobile Navigation */}

              <Link
                to="/Home"
                onClick={() => setMenuOpen(false)}
                className="text-[16px] font-medium text-gray-800 hover:text-pink-500"
              >
                HOME
              </Link>

              <Link
                to="/men"
                onClick={() => setMenuOpen(false)}
                className="text-[16px] font-medium text-gray-800 hover:text-pink-500"
              >
                MEN
              </Link>

              <Link
                to="/women"
                onClick={() => setMenuOpen(false)}
                className="text-[16px] font-medium text-gray-800 hover:text-pink-500"
              >
                WOMEN
              </Link>

              <Link
                to="/kids"
                onClick={() => setMenuOpen(false)}
                className="text-[16px] font-medium text-gray-800 hover:text-pink-500"
              >
                KIDS
              </Link>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-4">

                {/* Login */}
                <div className="mb-3">
                  <Login />
                </div>

                {/* Signup */}
                <Signup />

              </div>

            </div>

          </div>
        )}

      </div>
    </>
  );
};

export default Navbar;