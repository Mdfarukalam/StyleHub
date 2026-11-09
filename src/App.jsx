import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./service/hooks/AuthContext";
import Men_cloths from "./Pages/Men_cloths";
import Home from "./Pages/Home";
import Women_sare from "./Pages/Women_sare";
import Kids_cloths from "./Pages/Kids_cloths";
import GlobalLoader from "./component/GlobalLoader";
import NetworkStatusModal from "./component/NetworkStatusModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Contact from "./component/Contact";
import Checkout from "./component/Checkout";
import MyOrders from "./Pages/MyOrders";
import User_Profile from "./component/UserProfile";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/men" element={<Men_cloths />} />
          <Route path="/women" element={<Women_sare />} />
          <Route path="/kids" element={<Kids_cloths />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/MyOrders" element={<MyOrders />} />
    <Route path="/Profile" element={<User_Profile />} />
        </Routes>
        <NetworkStatusModal />
        <GlobalLoader />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;