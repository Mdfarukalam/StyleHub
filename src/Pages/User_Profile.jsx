import React from "react";

const User_Profile = () => {
  return (
 <div className="relative group">

  {/* Profile */}
  <button className="flex items-center gap-2 text-gray-800 hover:text-pink-500">
    <span className="text-2xl">👤</span>
  </button>

  {/* Dropdown */}
  <div className="hidden group-hover:block absolute right-0 top-full pt-2 w-[240px] z-50">

    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4">

      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="w-[45px] h-[45px] rounded-full bg-pink-100 flex items-center justify-center">
          👤
        </div>

        <div>
          <h3 className="font-semibold">Md Faruk</h3>
          <p className="text-sm text-gray-500">
            faruk@example.com
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-3">

        <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-100">
          👤 My Profile
        </button>

        <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-100">
          📦 My Orders
        </button>

        <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-100">
          ❤️ Wishlist
        </button>

        <button className="text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50">
          🚪 Logout
        </button>

      </div>

    </div>

  </div>

</div>
  );
};

export default User_Profile;