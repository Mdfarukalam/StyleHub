import { useState } from "react";
import Modal from "react-modal";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
Modal.setAppElement("#root");

const API_URL =
  "https://stylehub-backend-3-pgrs.onrender.com/api/auth/signup";

function Signup() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    Email: "",
    Password: "",
    phoneNumber:""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const { fullName, Email, Password,phoneNumber } = formData;

    if (!fullName.trim() || !Email.trim() || !Password || !phoneNumber) {
      setMessage("Please fill all fields.");
      setMessageType("error");
      return;
    }
    if (!phoneNumber || !/^\+91[6-9]\d{9}$/.test(phoneNumber)) {
  setMessage("Please enter a valid 10-digit Indian mobile number.");
  setMessageType("error");
  return;
}

    if (Password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setMessageType("error");
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
          fullName: fullName.trim(),
          Email: Email.trim(),
          phoneNumber,
          Password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed.");
      }

      setMessage(data.message || "Account created successfully!");
      setMessageType("success");

      setFormData({
        fullName: "",
        Email: "",
        Password: "",
        phoneNumber:""
      });

      setIsOpen(false);
    } catch (error) {
      setMessage(
        error.message || "Unable to register. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setMessage("");
    setMessageType("");
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition"
      >
        Signup
      </button>

      {message && (
        <p
          role="status"
          className={`mt-3 text-sm ${
            messageType === "success"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={!loading}
        shouldCloseOnEsc={!loading}
        className="bg-white w-[calc(100%-32px)] max-w-[400px] p-8 rounded-xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          disabled={loading}
          aria-label="Close signup modal"
          className="float-right text-xl text-gray-500 hover:text-black disabled:opacity-50"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-pink-500"
          />


          
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
          <PhoneInput
  defaultCountry="IN"
  countries={["IN"]}
  international
  countryCallingCodeEditable={false}
  placeholder="10 Digit Phone Number"
  value={formData.phoneNumber}
  onChange={(value) =>
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value || "",
    }))
  }
  disabled={loading}
  className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus-within:border-pink-500"
  numberInputProps={{
    className:
      "w-full outline-none border-none focus:outline-none focus:ring-0 bg-transparent",
  }}
/>

          <input
            type="password"
            name="Password"
            placeholder="Password (minimum 6 characters)"
            autoComplete="new-password"
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Signup;