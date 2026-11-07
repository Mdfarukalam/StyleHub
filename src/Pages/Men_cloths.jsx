
import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Footer from "../component/Footer";
import useGet from "../service/hooks/useGet";
import API from "../ApiEndPoint/ApiUrl";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../component/ProductCard";


const Men_cloths = () => {

    const [menProducts, setMenProducts] = useState([]);
    const [searchParams] = useSearchParams();

    const search = searchParams.get("search") || "";

    const {
        data,
        isLoading,
        isError,
    } = useGet(
        ["men", search],
        `${API.UserListMenProducts}?search=${encodeURIComponent(search)}`
    );

    useEffect(() => {
        if (data) {
            const userData = Array.isArray(data)
                ? data
                : data.UserGetMenProduts || [];

            setMenProducts(
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
                       Men Latest Collection
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

                        {menProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}

                    </div>
                )}

                {/* No Products */}
                {!isLoading && !isError && menProducts.length === 0 && (
                    <p className="text-center py-10 text-gray-500">
                        No products found.
                    </p>
                )}

            </div>

            <Footer />
        </>
    );
};

export default Men_cloths;
