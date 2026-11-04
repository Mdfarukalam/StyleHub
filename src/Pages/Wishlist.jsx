
import React from "react";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/navbar";
import useGet from "../service/hooks/useGet";
import API from "../ApiEndPoint/ApiUrl";

import useMutationApi from "../service/hooks/useMutationApi";
import toastService from "../component/toastService";

const Wishlist = () => {
  const navigate = useNavigate();

  // Demo data - baad mein API se replace kar dena
  const wishlistItems = [
    {
      _id: "1",
      name: "Men Casual T-Shirt",
      brand: "Roadster",
      images: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      color: "Black",
      price: 599,
      originalPrice: 999,
      discount: 40,
      rating: 4.5,
    },
    {
      _id: "2",
      name: "Men Regular Fit Shirt",
      brand: "U.S. Polo Assn.",
      images: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
      color: "Blue",
      price: 899,
      originalPrice: 1499,
      discount: 40,
      rating: 4.2,
    },
    {
      _id: "3",
      name: "Men Slim Fit Jeans",
      brand: "Levis",
      images: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      color: "Blue",
      price: 1199,
      originalPrice: 1999,
      discount: 40,
      rating: 4.7,
    },
  ];

  return (

    <>

          <Navbar />

      <div className="pt-24"></div>

        <div className="bg-gray-50 pt-28 pb-12 px-4 md:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <Heart className="text-pink-500" size={30} />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Wishlist
              </h1>
            </div>

            <p className="text-gray-500 mt-2">
              {wishlistItems.length} items saved for later
            </p>
          </div>

          <button
            onClick={() => navigate("/Home")}
            className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-pink-600"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden group">
                  <img
                    src={item.images}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded">
                    -{item.discount}% OFF
                  </span>

                  <button
                    title="Remove from wishlist"
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4">
                  <p className="text-gray-500 text-sm">{item.brand}</p>

                  <h2 className="font-semibold text-gray-900 text-lg mt-1">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Color: {item.color}
                  </p>

                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <Star size={15} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{item.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{item.price}
                    </span>

                    <span className="text-gray-400 line-through text-sm">
                      ₹{item.originalPrice}
                    </span>

                    <span className="text-green-600 text-sm font-semibold">
                      {item.discount}% OFF
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <button
                    className="w-full mt-5 flex items-center justify-center gap-2 bg-slate-900 hover:bg-pink-600 text-white py-3 rounded-lg font-medium transition"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}

          </div>
        ) : (
          /* Empty Wishlist */
          <div className="bg-white rounded-2xl py-20 px-5 text-center shadow-sm">
            <Heart size={65} className="mx-auto text-pink-300" />

            <h2 className="text-2xl font-bold mt-5">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mt-2">
              Save your favourite products here and shop them later.
            </p>

            <button
              onClick={() => navigate("/Home")}
              className="mt-6 bg-slate-900 hover:bg-pink-600 text-white px-7 py-3 rounded-lg transition"
            >
              Explore Products
            </button>
          </div>
        )}

      </div>
    </div>
          <Footer />
    </>
 
  );
};

export default Wishlist;
