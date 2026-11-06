
import React from "react";

import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  Star,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Navbar from "../component/navbar";
import Footer from "../component/Footer";

import useGet from "../service/hooks/useGet";
import useMutationApi from "../service/hooks/useMutationApi";

import API from "../ApiEndPoint/ApiUrl";
import toastService from "../component/toastService";

const Wishlist = () => {
  const navigate = useNavigate();

  // GET Wishlist API
  const {
    data,
    isLoading,
    isError,
  } = useGet(
    ["wishlist"],
    API.GetWishlist
  );

  // Get Wishlist Data
  const wishlistItems = data?.wishlist || [];

  // DELETE Wishlist API
  const { mutate: removeWishlist, isPending } = useMutationApi(
    "DELETE",
    API.RemoveWishlist,
    ["wishlist"]
  );

  // Remove Wishlist
  const handleRemoveWishlist = (wishlistId) => {
    removeWishlist(
      { id: wishlistId },
      {
        onSuccess: () => {
          toastService.success(
            "Product removed from wishlist successfully"
          );
        },
        onError: () => {
          toastService.error(
            "Failed to remove product from wishlist"
          );
        },
      }
    );
  };

  // Loading
  if (isLoading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg font-medium text-gray-600">
            Loading Wishlist...
          </p>
        </div>

        <Footer />
      </>
    );
  }

  // Error
  if (isError) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">
            Failed to load wishlist.
          </p>
        </div>

        <Footer />
      </>
    );
  }

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

                <Heart
                  className="text-pink-500"
                  size={30}
                />

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

              {wishlistItems.map((item) => {

                // Complete Product Details
                const product = item.productDetails;

                // Skip if product is deleted
                if (!product) return null;

                // Product Image
                const image =
                  product?.colorVariants?.[0]?.images ||
                  product?.images ||
                  "";

                // Product Color
                const color =
                  product?.colorVariants?.[0]?.color ||
                  "N/A";

                return (

                  <div
                    key={item._id}
                    className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition"
                  >

                    {/* Product Image */}
                    <div className="relative h-64 bg-gray-100 overflow-hidden group">

                      {image ? (
                        <img
                          src={image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image Available
                        </div>
                      )}

                      {/* Discount */}
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded">
                        -{product.discount || 0}% OFF
                      </span>

                      {/* Remove Wishlist */}
                      <button
                        title="Remove from wishlist"
                        disabled={isPending}
                        onClick={() =>
                          handleRemoveWishlist(item._id)
                        }
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 text-red-500 disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                    {/* Product Details */}
                    <div className="p-4">

                      {/* Brand */}
                      <p className="text-gray-500 text-sm">
                        {product.brand}
                      </p>

                      {/* Name */}
                      <h2 className="font-semibold text-gray-900 text-lg mt-1">
                        {product.name}
                      </h2>

                      {/* Color */}
                      <p className="text-gray-500 text-sm mt-1">
                        Color: {color}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-2 text-sm">

                        <Star
                          size={15}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        <span className="font-medium">
                          {product.rating || 0}
                        </span>

                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mt-3 flex-wrap">

                        <span className="text-xl font-bold text-gray-900">
                          ₹{product.price}
                        </span>

                        <span className="text-gray-400 line-through text-sm">
                          ₹{product.originalPrice}
                        </span>

                        <span className="text-green-600 text-sm font-semibold">
                          {product.discount || 0}% OFF
                        </span>

                      </div>

                      {/* Sizes */}
                      {product.colorVariants?.[0]?.sizes?.length > 0 && (
                        <div className="flex items-center gap-2 mt-3 flex-wrap">

                          <span className="text-sm text-gray-500">
                            Sizes:
                          </span>

                          {product.colorVariants[0].sizes.map(
                            (size, index) => (
                              <span
                                key={index}
                                className="border border-gray-200 px-2 py-1 rounded text-xs text-gray-700"
                              >
                                {size}
                              </span>
                            )
                          )}

                        </div>
                      )}

                      {/* Add to Cart */}
                      <button
                        className="w-full mt-5 flex items-center justify-center gap-2 bg-slate-900 hover:bg-pink-600 text-white py-3 rounded-lg font-medium transition"
                      >
                        <ShoppingBag size={18} />
                        Add to Cart
                      </button>

                    </div>

                  </div>

                );
              })}

            </div>

          ) : (

            /* Empty Wishlist */
            <div className="bg-white rounded-2xl py-20 px-5 text-center shadow-sm">

              <Heart
                size={65}
                className="mx-auto text-pink-300"
              />

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
