import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const API_URL =
  "https://stylehub-backend-3-pgrs.onrender.com/api/auth/Login";

function Login() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!formData.Email.trim() || !formData.Password) {
      setMessage("Please enter email and password.");
      setIsSuccess(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: formData.Email.trim(),
          Password: formData.Password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      if (!data.token) {
        throw new Error("Login successful, but token was not received.");
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      setIsSuccess(true);
      setMessage(data.message || "Login successful!");

      setFormData({
        Email: "",
        Password: "",
      });

      setIsOpen(false);

      // Notify other components in this tab
      window.dispatchEvent(new Event("authChanged"));
    } catch (error) {
      setIsSuccess(false);
      setMessage(
        error.message || "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setMessage("");
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition"
      >
        Login
      </button>

      {message && !isOpen && (
        <p
          role="status"
          className={`mt-3 text-sm ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <Modal
        isOpen={isOpen}
        onRequestClose={() => !loading && setIsOpen(false)}
        shouldCloseOnOverlayClick={!loading}
        shouldCloseOnEsc={!loading}
        className="bg-white w-[calc(100%-32px)] max-w-[400px] p-8 rounded-xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          disabled={loading}
          aria-label="Close login modal"
          className="float-right text-xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {message && (
          <p
            role="alert"
            className="text-red-600 text-sm mb-4"
          >
            {message}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="Email"
            placeholder="Email"
            autoComplete="email"
            value={formData.Email}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-pink-500"
          />

          <input
            type="password"
            name="Password"
            placeholder="Password"
            autoComplete="current-password"
            value={formData.Password}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-pink-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white p-3 rounded-lg font-semibold hover:bg-pink-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Login;