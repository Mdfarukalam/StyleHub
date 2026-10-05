import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import Login from "../Pages/Login_page";
import Signup from "../Pages/Signup";
import User_Profile from "../Pages/User_Profile";
const Navbar = () => {
 
 
  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">

        <nav className="h-[80px] flex items-center px-8">

          {/* Logo */}
          <div className="mr-16">
            <Link to="/Home" className="text-3xl font-bold">
              <span className="text-gray-900">Style</span>
              <span className="text-pink-500">Hub</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-8">

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

          {/* Search */}
          <div className="ml-auto flex items-center gap-6">

            <div className="flex items-center w-[400px] h-[48px] border border-gray-300 rounded-lg px-4">

              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 outline-none text-gray-700"
              />

              <span className="text-xl">
                🔍
              </span>

            </div>

            {/* Login Button */}
    <Login />
             <Signup/>
<User_Profile />
          </div>

        </nav>

      </div>

           <Login />

    </>
  );
};

export default Navbar;