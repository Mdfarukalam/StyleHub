import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { AuthProvider } from "./service/hooks/AuthContext";
import Men_cloths from './Pages/Men_cloths';
import Home from './Pages/Home';
import Women_sare from "./Pages/Women_sare";
import Kids_cloths from "./Pages/Kids_cloths";
import GlobalLoader from "./component/GlobalLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Contact from "./component/Contact";
function App() {

        return (

                <AuthProvider>
                                <BrowserRouter>

                        <Routes>

                                <Route path="/" element={<Home />} />
                                <Route path='/Home' element={<Home />}>home</Route>
                                <Route path='/men' element={<Men_cloths />}>home</Route>
                                <Route path='/women' element={<Women_sare />}>home</Route>
                                <Route path='/kids' element={<Kids_cloths />}>home</Route>
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/Wishlist" element={<Wishlist />} />
                                 <Route path="/contact" element={<Contact />} />
                        </Routes>
                        <GlobalLoader />
                        <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                theme="dark"
                        />
                </BrowserRouter>
                </AuthProvider>
         


        )
}

export default App
