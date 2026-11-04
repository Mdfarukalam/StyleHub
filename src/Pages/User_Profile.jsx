import React from "react";
import { useNavigate } from "react-router-dom";
import useGet from "../service/hooks/useGet";
import API from "../ApiEndPoint/ApiUrl";
import storageService from "../service/storageService";

const User_Profile = () => {
  const token = storageService.getToken();
  console.log(token,"tokentokentoken")

  // Token nahi hai toh kuch bhi render nahi hoga
  if (!token) return null;

  return <ProfileDropdown />;
};

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGet(
    ["Profile"],
    API.Profile
  );

  const user = data?.UserData || data?.UserData || data?.UserData || data;

  const handleLogout = () => {
    storageService.removeToken();
    storageService.removeUser();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 text-gray-800 hover:text-pink-500">
        <span className="text-2xl">👤</span>
      </button>

      <div className="hidden group-hover:block absolute right-0 top-full pt-2 w-[240px] z-50">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4">

          <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
            <div className="w-[45px] h-[45px] rounded-full bg-pink-100 flex items-center justify-center">
              👤
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold truncate">
                {isLoading ? "Loading..." : user?.fullName || "User"}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {user?.Email || ""}
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

            <button className="text-left px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/Wishlist")}
  >
              ❤️ Wishlist
            </button>

            <button
              onClick={handleLogout}
              className="text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50"
            >
              🚪 Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default User_Profile;