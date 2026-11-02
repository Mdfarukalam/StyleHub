import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Footer from '../component/Footer'
import useGet from "../service/hooks/useGet";
import API from "../ApiEndPoint/ApiUrl";
const Kids_cloths = () => {
  const [kidProducts, setkidProducts] = useState([]);

    const {
        data,
        isLoading,
        isError,
    } = useGet(
        ["kid"],
        API.Userkidlists
    );




    useEffect(() => {
        if (data) {
            const userData = Array.isArray(data)
                ? data
                : data.UserKidProducts || [];

            setkidProducts(
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


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {kidProducts.map((product) => (

                        <div
                            key={product._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                        >

                            {/* Product Image */}
                            {/* Product Image */}
                            <div className="w-full h-64 overflow-hidden relative group">

                                <img
                                    src={product.images}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />

                                <div className="absolute top-0 left-0 w-full flex justify-between p-4">

                                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                                        -25%
                                    </span>

                                    <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
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
                                <div className="flex gap-3 mt-4">
                                    {product.colors?.map((color, index) => (
                                        <span
                                            key={index}
                                            title={color}
                                            className="w-6 h-6 rounded-full border border-gray-300"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>

                                {/* Sizes */}
                                <div className="flex gap-2 mt-4">
                                    {product.sizes?.map((size, index) => (
                                        <span
                                            key={index}
                                            className="border px-3 py-1 rounded text-sm"
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>

                                {/* Button */}
                                <button
                                    className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6"
                                >
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>

                    ))}

                </div>





            </div>
            <Footer />

        </>
    );
};

export default Kids_cloths