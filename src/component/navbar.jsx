
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Login from "../Pages/Login_page";
import Signup from "../Pages/Signup";
import User_Profile from "../Pages/User_Profile";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "HOME", path: "/Home" },
    { name: "MEN", path: "/men" },
    { name: "WOMEN", path: "/women" },
    { name: "KIDS", path: "/kids" },
  ];

  const navClass = ({ isActive }) =>
    `relative py-2 text-[16px] font-medium transition duration-300
    ${isActive ? "text-pink-500" : "text-gray-800 hover:text-pink-500"}
    after:content-[''] after:absolute after:left-0 after:bottom-0
    after:h-[3px] after:rounded-full after:bg-pink-500
    after:transition-all after:duration-300
    ${isActive ? "after:w-full" : "after:w-0"}`;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">

      <nav className="min-h-[80px] flex items-center px-4 md:px-8 py-3">

        {/* Logo */}
        <Link to="/Home" className="text-3xl md:text-4xl font-bold mr-10 md:mr-16">
          <span className="text-gray-900">Style</span>
          <span className="text-pink-500">Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={navClass}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-3 md:gap-6">

          {/* Search */}
          <div className="hidden md:flex items-center w-[300px] h-[45px] border border-gray-300 rounded-lg px-4">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 outline-none text-gray-700"
            />
            <span>🔍</span>
          </div>

          {/* Login */}
          <div className="hidden sm:block">
            <Login />
          </div>

          {/* Signup */}
          <div className="hidden sm:block">
            <Signup />
          </div>

          {/* Profile */}
          <User_Profile />

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg px-6 py-5">

          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={() => setMenuOpen(false)}
                className={navClass}
              >
                {item.name}
              </NavLink>
            ))}

            <div className="border-t pt-4">
              <div className="mb-3">
                <Login />
              </div>
              <Signup />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;