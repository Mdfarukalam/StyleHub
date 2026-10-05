import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Login() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-pink-500 text-white px-5 py-2 rounded-lg"
      >
        Login
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="bg-white w-[400px] p-8 rounded-xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="float-right text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button className="w-full bg-pink-500 text-white p-3 rounded-lg">
          Login
        </button>
      </Modal>
    </>
  );
}

export default Login;