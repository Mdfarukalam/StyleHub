
import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Footer from "../component/Footer";
import useGet from "../service/hooks/useGet";
import API from "../ApiEndPoint/ApiUrl";
import { ProductCard } from "../component/ProductCard";

// Product Card
 


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

                        {kidProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}

                    </div>
                )}

                {/* No Products */}
                {!isLoading && !isError && kidProducts.length === 0 && (
                    <p className="text-center py-10 text-gray-500">
                        No products found.
                    </p>
                )}

            </div>
            

            <Footer />
        </>
    );
};

export default Kids_cloths;
