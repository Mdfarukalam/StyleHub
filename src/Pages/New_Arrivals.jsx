
import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Footer from "../component/Footer";
import useGet from "../service/hooks/useGet";
import API from "../ApiEndPoint/ApiUrl";

// Product Card
const ProductCard = ({ product }) => {
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

    const variants = product.colorVariants || [];
    const selectedVariant = variants[selectedVariantIndex];

    return (
        <div
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
        >
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

                <div className="absolute top-0 left-0 w-full flex justify-between p-4">

                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                        -{product.discount}%
                    </span>

                    <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer">
                        ♡
                    </span>

                </div>
            </div>

            {/* Product Information */}
            <div className="p-4">

                <h2 className="font-bold text-xl">
                    {product.name}
                </h2>

                <p className="text-gray-500 mt-1">
                    {product.brand}
                </p>

                {/* Price */}
                <div className="flex items-center gap-3 mt-5 flex-wrap">

                    <span className="text-2xl font-bold">
                        ₹{product.price}
                    </span>

                    <span className="text-gray-400 line-through">
                        ₹{product.originalPrice}
                    </span>

                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                        {product.discount}% OFF
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
                            onClick={() => setSelectedVariantIndex(index)}
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

                {/* Selected Color */}
                {selectedVariant && (
                    <p className="text-sm text-gray-500 mt-2">
                        Selected Color: {selectedVariant.color}
                    </p>
                )}

                {/* Sizes */}
                <div className="flex gap-2 mt-4 flex-wrap">

                    {selectedVariant?.sizes?.map((size, index) => (
                        <span
                            key={index}
                            className="border px-3 py-1 rounded text-sm"
                        >
                            {size}
                        </span>
                    ))}

                </div>

                {/* Add to Cart */}
                <button
                    className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6"
                >
                    🛒 Add to Cart
                </button>

            </div>
        </div>
    );
};


const New_Arrivals = () => {

    const [ArrivalsProducts, setArrivalsProducts] = useState([]);

    const {
        data,
        isLoading,
        isError,
    } = useGet(
        ["ArrivalsProducts"],
        API.UserListArrivalsProducts
    );

    useEffect(() => {
        if (data) {
            const userData = Array.isArray(data)
                ? data
                : data.UserGetArrivalsProduts || [];

            setArrivalsProducts(
                Array.isArray(userData) ? userData : []
            );
        }
    }, [data]);

    return (
        <>
            <Navbar />

            {/* Navbar ke liye top space */}
            <div className="pt-24"></div>

            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="mb-8">

                    <p className="text-red-500 font-medium">
                        — FEATURED PRODUCTS
                    </p>

                    <h1 className="text-4xl font-bold mt-2">
                        Latest Collection
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Discover the best styles, handpicked for you.
                    </p>

                </div>

                {/* Loading */}
                {isLoading && (
                    <p className="text-center py-10 text-gray-500">
                        Loading products...
                    </p>
                )}

                {/* Error */}
                {isError && (
                    <p className="text-center py-10 text-red-500">
                        Something went wrong. Please try again.
                    </p>
                )}

                {/* Products */}
                {!isLoading && !isError && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {ArrivalsProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}

                    </div>
                )}

                {/* No Products */}
                {!isLoading && !isError && ArrivalsProducts.length === 0 && (
                    <p className="text-center py-10 text-gray-500">
                        No products found.
                    </p>
                )}

            </div>

            <Footer />
        </>
    );
};

export default New_Arrivals;
