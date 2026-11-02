import { useState } from "react";
import Modal from "react-modal";
import useMutationApi from "../service/hooks/useMutationApi";
import storageService from "../service/storageService";
import { toast } from "react-toastify";
import API from "../ApiEndPoint/ApiUrl";
import { useNavigate } from "react-router-dom";
import toastService from "../component/toastService";
Modal.setAppElement("#root");

 

function Login() {
  const [isOpen, setIsOpen] = useState(false);

   const LoginMutation = useMutationApi("POST", API.Login);

  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

 
  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
 

 const handleLogin = (e) => {
  e.preventDefault();

  setError("");

  LoginMutation.mutate(formData, {
    onSuccess: (data) => {
      console.log(data,"datadatadata")
      storageService.setToken(data.token);
 
      toastService.success("Login Successfully!");
     setIsOpen(false);
    },

    onError: (error) => {
      setError(error.message);
      toastService.error(error.message || "Login Failed!");
    },
  });
};


  const openModal = () => {
   
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