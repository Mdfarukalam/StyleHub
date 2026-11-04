import React, { useState } from "react";


import useMutationApi from "../service/hooks/useMutationApi";
import API from "../ApiEndPoint/ApiUrl";
import toastService from "./toastService";

 export const ProductCard = ({ product }) => {
  const variants = product?.colorVariants || [];

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const selectedVariant = variants[selectedVariantIndex];

  const handleColorChange = (index) => {
    setSelectedVariantIndex(index);
    setSelectedSize("");
  };



  const { mutate: addToCart, isPending } = useMutationApi(
  "POST",
  API.addcart,
  ["cart"]
);



 const handleAddToCart = () => {
  if (!selectedSize) {
    toastService.error("Please select a size");
    return;
  }

  addToCart(
    {
      name: product.name,
      brand: product.brand,
      productId: product._id,
      productType: "men",
      color: selectedVariant.color,
      discount: selectedVariant.discount,
      images: selectedVariant.images,
      originalPrice: selectedVariant.originalPrice,
      price: selectedVariant.price,
      sizes: [selectedSize],
      quantity: 1,
    },
    {
      onSuccess: (response) => {
        console.log("API SUCCESS:", response);
        toastService.success("Product added to cart successfully");
      },
      onError: (error) => {
        console.log("API ERROR:", error);
        console.log("SERVER RESPONSE:", error?.response?.data);

        toastService.error(
          error?.response?.data?.message || "Failed to add product to cart"
        );
      },
    }
  );
};
  console.log(selectedVariant,"selectedVariant")
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

      {/* Product Image */}
      <div className="w-full h-64 overflow-hidden relative group">

        {selectedVariant?.images ? (
          <img
            src={selectedVariant.images}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}

        {/* Discount and Wishlist */}
        <div className="absolute top-0 left-0 w-full flex justify-between p-4">

          <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
            -{selectedVariant?.discount || 0}%
          </span>

          <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer">
            ♡
          </span>

        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">

        <h2 className="font-bold text-xl">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-1">
          {product.brand}
        </p>

        {/* Price and Discount */}
        <div className="flex items-center gap-3 mt-5 flex-wrap">

          <span className="text-2xl font-bold">
            ₹{selectedVariant?.price}
          </span>

          <span className="text-gray-400 line-through">
            ₹{selectedVariant?.originalPrice}
          </span>

          <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
            {selectedVariant?.discount || 0}% OFF
          </span>

        </div>

        {/* Rating */}
        <div className="mt-4">
          ⭐ {product.rating}
        </div>

        {/* Colors */}
        <div className="flex gap-3 mt-4 flex-wrap">

          {variants.map((variant, index) => (
            <button
              key={variant._id || index}
              type="button"
              title={variant.color}
              onClick={() => handleColorChange(index)}
              className={`w-7 h-7 rounded-full border-2 transition ${
                selectedVariantIndex === index
                  ? "border-pink-500 scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: variant.color }}
            />
          ))}

        </div>

        {/* Sizes */}
        <div className="flex gap-2 mt-4 flex-wrap">

          {selectedVariant?.sizes?.map((size, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedSize(size)}
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

        {/* Add to Cart */}
        <button
          disabled={!selectedSize || !selectedVariant}
          onClick={handleAddToCart}
          className="w-full bg-slate-900 hover:bg-slate-700 disabled:bg-gray-400 text-white py-3 rounded-lg mt-6"
        >
          🛒 Add to Cart
        </button>

      </div>
    </div>
  );
};

 