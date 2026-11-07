
import React, { useState } from "react";

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
import { useAuth } from "../service/hooks/AuthContext";

const Wishlist = () => {
  const navigate = useNavigate();

  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  // GET Wishlist API
  const {
    data,
    isLoading,
    isError,
  } = useGet(["wishlist"], API.GetWishlist);

  const wishlistItems = data?.wishlist || [];
   const { isLoggedIn } = useAuth();
 

  // DELETE Wishlist API
  const {
    mutate: removeWishlist,
    isPending: isRemovePending,
  } = useMutationApi(
    "DELETE",
    API.RemoveWishlist,
    ["wishlist"]
  );

  // ADD TO CART API
  const {
    mutate: addToCart,
    isPending: isCartPending,
  } = useMutationApi(
    "POST",
    API.addcart,
    ["cart"]
  );

  // REMOVE WISHLIST
  const handleRemoveWishlist = (wishlistId) => {

  if (!isLoggedIn) {
    toastService.error("Please login first to add product to cart");
    return;
  }
    removeWishlist(
      { id: wishlistId },
      {
        onSuccess: () => {
          toastService.success(
            "Product removed from wishlist successfully"
          );
        },
        onError: (error) => {
          toastService.error(
            error?.response?.data?.message ||
            "Failed to remove product from wishlist"
          );
        },
      }
    );
  };

  // COLOR CHANGE
  const handleColorChange = (wishlistId, index) => {
    setSelectedColors((prev) => ({
      ...prev,
      [wishlistId]: index,
    }));

    // Reset size when color changes
    setSelectedSizes((prev) => ({
      ...prev,
      [wishlistId]: "",
    }));
  };

  // ADD TO CART
  const handleAddToCart = (item, product, selectedVariant) => {

  if (!isLoggedIn) {
    toastService.error("Please login first to add product to cart");
    return;
  }
    const selectedSize = selectedSizes[item._id];

    if (!selectedVariant) {
      toastService.error("Please select a color");
      return;
    }

    if (!selectedSize) {
      toastService.error("Please select a size");
      return;
    }

    addToCart(
      {
        name: selectedVariant.name,
        brand: product.brand,
        productId: product._id,
        productType: item.productType,
        color: selectedVariant.color,
        discount: selectedVariant.discount ?? product.discount,
        images: selectedVariant.images,
        originalPrice:
          selectedVariant.originalPrice ?? product.originalPrice,
        price: selectedVariant.price ?? product.price,
        sizes: [selectedSize],
        quantity: 1,
      },
      {
        onSuccess: (response) => {
          console.log("CART SUCCESS:", response);

          toastService.success(
            "Product added to cart successfully"
          );
        },

        onError: (error) => {
          console.log("CART ERROR:", error);
          console.log("SERVER RESPONSE:", error?.response?.data);

          toastService.error(
            error?.response?.data?.message ||
            "Failed to add product to cart"
          );
        },
      }
    );
  };

  // LOADING
  if (isLoading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          Loading Wishlist...
        </div>

        <Footer />
      </>
    );
  }

  // ERROR
  if (isError) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center text-red-500">
          Failed to load wishlist.
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 pt-28 pb-12 px-4 md:px-8 min-h-screen">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">

            <div>
              <div className="flex items-center gap-3">

                <Heart className="text-pink-500" size={30} />

                <h1 className="text-2xl md:text-3xl font-bold">
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

          {/* WISHLIST ITEMS */}
          {wishlistItems.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {wishlistItems.map((item) => {

                const product = item.productDetails;

                if (!product) return null;

                const variants = product.colorVariants || [];

                const selectedVariantIndex =
                  selectedColors[item._id] ?? 0;

                const selectedVariant =
                  variants[selectedVariantIndex];

                const image =
                  selectedVariant?.images ||
                  product.images ||
                  "";

                const selectedSize = selectedSizes[item._id];

                return (

                  <div
                    key={item._id}
                    className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition"
                  >

                    {/* PRODUCT IMAGE */}
                    <div className="relative h-64 bg-gray-100 overflow-hidden group">

                      {image ? (

                        <img
                          src={image}
                          alt={product.name || "Product"}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                      ) : (

                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image Available
                        </div>

                      )}

                      {/* REMOVE */}
                      <button
                        title="Remove from wishlist"
                        disabled={isRemovePending}
                        onClick={() =>
                          handleRemoveWishlist(item._id)
                        }
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 text-red-500 disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="p-4">

                      

                          <h2 className="font-bold text-xl">
          {selectedVariant.name}
        </h2>

         <p className="text-gray-500 text-sm">
                        {product.brand}
                      </p>

                      {/* RATING */}
                      <div className="flex items-center gap-1 mt-2 text-sm">

                        <Star
                          size={15}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        <span className="font-medium">
                          {product.rating || 0}
                        </span>

                      </div>

                      {/* PRICE */}
                      {(selectedVariant?.price ?? product.price) != null && (

                        <div className="flex items-center gap-2 mt-3 flex-wrap">

                          <span className="text-xl font-bold">
                            ₹{selectedVariant?.price ?? product.price}
                          </span>

                          {(selectedVariant?.originalPrice ??
                            product.originalPrice) != null && (

                            <span className="text-gray-400 line-through text-sm">
                              ₹{selectedVariant?.originalPrice ??
                                product.originalPrice}
                            </span>

                          )}

                          {(selectedVariant?.discount ??
                            product.discount) > 0 && (

                            <span className="text-green-600 text-sm font-semibold">
                              {selectedVariant?.discount ??
                                product.discount}% OFF
                            </span>

                          )}

                        </div>
                      )}

                      {/* COLORS */}
                      {variants.length > 0 && (

                        <div className="flex gap-3 mt-4 flex-wrap">

                          {variants.map((variant, index) => (

                            <button
                              key={variant._id || index}
                              type="button"
                              title={variant.color}
                              onClick={() =>
                                handleColorChange(item._id, index)
                              }
                              className={`w-7 h-7 rounded-full border-2 transition ${
                                selectedVariantIndex === index
                                  ? "border-pink-500 scale-110"
                                  : "border-gray-300"
                              }`}
                              style={{
                                backgroundColor: variant.color,
                              }}
                            />

                          ))}

                        </div>
                      )}

                      {/* SIZES */}
                      <div className="flex gap-2 mt-4 flex-wrap">

                        {selectedVariant?.sizes?.map((size, index) => (

                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [item._id]: size,
                              }))
                            }
                            className={`border px-3 py-1 rounded text-sm ${
                              selectedSize === size
                                ? "bg-slate-900 text-white border-slate-900"
                                : "hover:border-pink-500"
                            }`}
                          >
                            {size}
                          </button>

                        ))}

                      </div>

                      {/* ADD TO CART */}
                      <button
                        disabled={isCartPending}
                        onClick={() =>
                          handleAddToCart(
                            item,
                            product,
                            selectedVariant
                          )
                        }
                        className="w-full mt-5 flex items-center justify-center gap-2 bg-slate-900 hover:bg-pink-600 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
                      >

                        <ShoppingBag size={18} />

                        {isCartPending
                          ? "Adding..."
                          : "Add to Cart"}

                      </button>

                    </div>

                  </div>

                );

              })}

            </div>

          ) : (

            /* EMPTY WISHLIST */
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
