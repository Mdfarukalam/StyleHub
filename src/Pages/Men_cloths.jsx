import React from "react";
import Navbar from "../component/navbar";
import  Footer from '../component/Footer'
const Men_cloths = () => {
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


                    {/* Products */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">

                        {/* Product 1 */}
                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            {/* Image */}
                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                {/* Discount + Wishlist */}
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
                                    Men's Casual Shirt
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Roadster
                                </p>


                                {/* Price */}
                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹999
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹1,299
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        25% OFF
                                    </span>

                                </div>


                                {/* Rating */}
                                <div className="mt-4">
                                    ⭐ 4.3 (120)
                                </div>


                                {/* Colors */}
                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-black"></span>

                                    <span className="w-6 h-6 rounded-full bg-blue-500"></span>

                                    <span className="w-6 h-6 rounded-full bg-gray-300"></span>

                                </div>


                                {/* Button */}
                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>


                        {/* Product 2 */}
                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                <div className="absolute top-0 left-0 w-full flex justify-between p-4">

                                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                                        -30%
                                    </span>

                                    <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                        ♡
                                    </span>

                                </div>

                            </div>

                            <div className="p-4">

                                <h2 className="font-bold text-xl">
                                    Women's T-Shirt
                                </h2>

                                <p className="text-gray-500">
                                    Campus Sutra
                                </p>

                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹699
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹999
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        30% OFF
                                    </span>

                                </div>

                                <div className="mt-4">
                                    ⭐ 4.5 (98)
                                </div>

                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-purple-300"></span>

                                    <span className="w-6 h-6 rounded-full bg-pink-300"></span>

                                    <span className="w-6 h-6 rounded-full bg-black"></span>

                                </div>

                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>


                        {/* Product 3 */}
                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                <div className="absolute top-0 left-0 w-full flex justify-between p-4">

                                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                                        -20%
                                    </span>

                                    <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                        ♡
                                    </span>

                                </div>

                            </div>

                            <div className="p-4">

                                <h2 className="font-bold text-xl">
                                    Men's Slim Fit Jeans
                                </h2>

                                <p className="text-gray-500">
                                    Levi's
                                </p>

                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹1,299
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹1,599
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        20% OFF
                                    </span>

                                </div>

                                <div className="mt-4">
                                    ⭐ 4.4 (156)
                                </div>

                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-blue-900"></span>

                                    <span className="w-6 h-6 rounded-full bg-blue-400"></span>

                                    <span className="w-6 h-6 rounded-full bg-gray-400"></span>

                                </div>

                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>


                        {/* Product 4 */}
                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                <div className="absolute top-0 left-0 w-full flex justify-between p-4">

                                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                                        -35%
                                    </span>

                                    <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                        ♡
                                    </span>

                                </div>

                            </div>

                            <div className="p-4">

                                <h2 className="font-bold text-xl">
                                    Kids Hooded Jacket
                                </h2>

                                <p className="text-gray-500">
                                    U.S. Polo Assn.
                                </p>

                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹1,499
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹2,299
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        35% OFF
                                    </span>

                                </div>

                                <div className="mt-4">
                                    ⭐ 4.6 (74)
                                </div>

                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-green-900"></span>

                                    <span className="w-6 h-6 rounded-full bg-blue-900"></span>

                                    <span className="w-6 h-6 rounded-full bg-gray-800"></span>

                                </div>

                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>


                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            {/* Image */}
                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                {/* Discount + Wishlist */}
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
                                    Men's Casual Shirt
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Roadster
                                </p>


                                {/* Price */}
                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹999
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹1,299
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        25% OFF
                                    </span>

                                </div>


                                {/* Rating */}
                                <div className="mt-4">
                                    ⭐ 4.3 (120)
                                </div>


                                {/* Colors */}
                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-black"></span>

                                    <span className="w-6 h-6 rounded-full bg-blue-500"></span>

                                    <span className="w-6 h-6 rounded-full bg-gray-300"></span>

                                </div>


                                {/* Button */}
                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>


                        {/* Product 2 */}
                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                <div className="absolute top-0 left-0 w-full flex justify-between p-4">

                                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                                        -30%
                                    </span>

                                    <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                        ♡
                                    </span>

                                </div>

                            </div>

                            <div className="p-4">

                                <h2 className="font-bold text-xl">
                                    Women's T-Shirt
                                </h2>

                                <p className="text-gray-500">
                                    Campus Sutra
                                </p>

                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹699
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹999
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        30% OFF
                                    </span>

                                </div>

                                <div className="mt-4">
                                    ⭐ 4.5 (98)
                                </div>

                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-purple-300"></span>

                                    <span className="w-6 h-6 rounded-full bg-pink-300"></span>

                                    <span className="w-6 h-6 rounded-full bg-black"></span>

                                </div>

                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>


                        {/* Product 3 */}
                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                <div className="absolute top-0 left-0 w-full flex justify-between p-4">

                                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                                        -20%
                                    </span>

                                    <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                        ♡
                                    </span>

                                </div>

                            </div>

                            <div className="p-4">

                                <h2 className="font-bold text-xl">
                                    Men's Slim Fit Jeans
                                </h2>

                                <p className="text-gray-500">
                                    Levi's
                                </p>

                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹1,299
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹1,599
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        20% OFF
                                    </span>

                                </div>

                                <div className="mt-4">
                                    ⭐ 4.4 (156)
                                </div>

                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-blue-900"></span>

                                    <span className="w-6 h-6 rounded-full bg-blue-400"></span>

                                    <span className="w-6 h-6 rounded-full bg-gray-400"></span>

                                </div>

                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>


                        {/* Product 4 */}
                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                <div className="absolute top-0 left-0 w-full flex justify-between p-4">

                                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                                        -35%
                                    </span>

                                    <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                        ♡
                                    </span>

                                </div>

                            </div>

                            <div className="p-4">

                                <h2 className="font-bold text-xl">
                                    Kids Hooded Jacket
                                </h2>

                                <p className="text-gray-500">
                                    U.S. Polo Assn.
                                </p>

                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹1,499
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹2,299
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        35% OFF
                                    </span>

                                </div>

                                <div className="mt-4">
                                    ⭐ 4.6 (74)
                                </div>

                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-green-900"></span>

                                    <span className="w-6 h-6 rounded-full bg-blue-900"></span>

                                    <span className="w-6 h-6 rounded-full bg-gray-800"></span>

                                </div>

                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>
                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            {/* Image */}
                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                {/* Discount + Wishlist */}
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
                                    Men's Casual Shirt
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Roadster
                                </p>


                                {/* Price */}
                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹999
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹1,299
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        25% OFF
                                    </span>

                                </div>


                                {/* Rating */}
                                <div className="mt-4">
                                    ⭐ 4.3 (120)
                                </div>


                                {/* Colors */}
                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-black"></span>

                                    <span className="w-6 h-6 rounded-full bg-blue-500"></span>

                                    <span className="w-6 h-6 rounded-full bg-gray-300"></span>

                                </div>


                                {/* Button */}
                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>


                        {/* Product 2 */}
                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                <div className="absolute top-0 left-0 w-full flex justify-between p-4">

                                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                                        -30%
                                    </span>

                                    <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                        ♡
                                    </span>

                                </div>

                            </div>

                            <div className="p-4">

                                <h2 className="font-bold text-xl">
                                    Women's T-Shirt
                                </h2>

                                <p className="text-gray-500">
                                    Campus Sutra
                                </p>

                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹699
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹999
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        30% OFF
                                    </span>

                                </div>

                                <div className="mt-4">
                                    ⭐ 4.5 (98)
                                </div>

                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-purple-300"></span>

                                    <span className="w-6 h-6 rounded-full bg-pink-300"></span>

                                    <span className="w-6 h-6 rounded-full bg-black"></span>

                                </div>

                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>


                        {/* Product 3 */}
                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                <div className="absolute top-0 left-0 w-full flex justify-between p-4">

                                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                                        -20%
                                    </span>

                                    <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                        ♡
                                    </span>

                                </div>

                            </div>

                            <div className="p-4">

                                <h2 className="font-bold text-xl">
                                    Men's Slim Fit Jeans
                                </h2>

                                <p className="text-gray-500">
                                    Levi's
                                </p>

                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹1,299
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹1,599
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        20% OFF
                                    </span>

                                </div>

                                <div className="mt-4">
                                    ⭐ 4.4 (156)
                                </div>

                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-blue-900"></span>

                                    <span className="w-6 h-6 rounded-full bg-blue-400"></span>

                                    <span className="w-6 h-6 rounded-full bg-gray-400"></span>

                                </div>

                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>


                        {/* Product 4 */}
                        <div className="lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">

                            <div className="relative">

                                <img
                                    src="https://offduty.in/cdn/shop/files/Image_Sep_3_2026_01_05_56_PM.png?format=webp&quality=80&v=1788424813&width=3840"
                                    className="w-full h-[400px] object-cover"
                                />

                                <div className="absolute top-0 left-0 w-full flex justify-between p-4">

                                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                                        -35%
                                    </span>

                                    <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                        ♡
                                    </span>

                                </div>

                            </div>

                            <div className="p-4">

                                <h2 className="font-bold text-xl">
                                    Kids Hooded Jacket
                                </h2>

                                <p className="text-gray-500">
                                    U.S. Polo Assn.
                                </p>

                                <div className="flex items-center gap-3 mt-5">

                                    <span className="text-2xl font-bold">
                                        ₹1,499
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹2,299
                                    </span>

                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                        35% OFF
                                    </span>

                                </div>

                                <div className="mt-4">
                                    ⭐ 4.6 (74)
                                </div>

                                <div className="flex gap-3 mt-4">

                                    <span className="w-6 h-6 rounded-full bg-green-900"></span>

                                    <span className="w-6 h-6 rounded-full bg-blue-900"></span>

                                    <span className="w-6 h-6 rounded-full bg-gray-800"></span>

                                </div>

                                <button className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-lg mt-6">
                                    🛒 Add to Cart
                                </button>

                            </div>

                        </div>


                    </div>
            
                </div>
                          <Footer/>
       
        </>
    );
};

export default Men_cloths;