import React from "react";
import Modal from "react-modal";
import { LogOut } from "lucide-react";

function LogoutModal({
  isOpen,
  setIsOpen,
  handleLogout,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="bg-[#181b21] w-[calc(100%-32px)] max-w-[400px] border border-[#2a2e36] rounded-xl p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
    >

      {/* Logout Icon */}
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <LogOut size={22} className="text-red-400" />
      </div>

      {/* Modal Title */}
      <h2 className="text-lg font-semibold text-white">
        Confirm Logout
      </h2>

      {/* Modal Description */}
      <p className="text-sm text-gray-400 mt-2 leading-6">
        Are you sure you want to logout from your account?
      </p>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">

        {/* Cancel Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 rounded-lg bg-[#292e37] text-sm text-gray-300 hover:bg-[#333842]"
        >
          Cancel
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-sm font-medium text-white"
        >
          Yes, Logout
        </button>

      </div>

    </Modal>
  );
}

export default LogoutModal;