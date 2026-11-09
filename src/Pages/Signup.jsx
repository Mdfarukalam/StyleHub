
import { useState } from "react";
import Modal from "react-modal";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import useMutationApi from "../service/hooks/useMutationApi";
import storageService from "../service/storageService";
import API from "../ApiEndPoint/ApiUrl";
import toastService from "../component/toastService";

Modal.setAppElement("#root");

function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SignupMutation = useMutationApi("POST", API.signup);

  const [formData, setFormData] = useState({
    fullName: "",
    Email: "",
    Password: "",
    phoneNumber: "",
  });

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Signup API
  const handleSignup = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    SignupMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log(data, "Signup Data");

        if (data.token) {
          storageService.setToken(data.token);
        }

        toastService.success("Signup Successfully!");
      window.dispatchEvent(new Event("CartProducts"));
        setIsOpen(false);
        setLoading(false);

        setFormData({
          fullName: "",
          Email: "",
          Password: "",
          phoneNumber: "",
        });
      },

      onError: (error) => {
        setError(error.message);
        toastService.error(error.message || "Signup Failed!");
        setLoading(false);
      },
    });
  };

  const openModal = () => {
    setError("");
    setIsOpen(true);
  };

  return (
    <>
      <p
        onClick={openModal}
    
      >
        Signup
      </p>

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
            required
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
            required
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-pink-500"
          />

          <PhoneInput
            defaultCountry="IN"
            countries={["IN"]}
            international
            countryCallingCodeEditable={false}
            limitMaxLength
            placeholder="10 Digit Phone Number"
            value={formData.phoneNumber}
            onChange={(value) => {
              const digits = (value || "").replace(/\D/g, "");

              // +91 country code ke baad maximum 10 digits
              if (digits.length <= 12) {
                setFormData((prev) => ({
                  ...prev,
                  phoneNumber: value || "",
                }));
              }
            }}
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
            minLength={6}
            required
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-pink-500"
          />

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white p-3 rounded-lg font-semibold hover:bg-pink-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Signup;