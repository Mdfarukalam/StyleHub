import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Signup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Signup Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-pink-500 text-white px-5 py-2 rounded-lg"
      >
        Signup
      </button>

      {/* Signup Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="bg-white w-[400px] p-8 rounded-xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
      >

        <button
          onClick={() => setIsOpen(false)}
          className="float-right text-xl text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none"
        />

        <button className="w-full bg-pink-500 text-white p-3 rounded-lg font-semibold">
          Sign Up
        </button>

      </Modal>
    </>
  );
}

export default Signup;