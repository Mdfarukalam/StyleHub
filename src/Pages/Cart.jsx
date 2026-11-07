
import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Tag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  Headset,
  RefreshCw,
} from "lucide-react";

import Footer from "../component/Footer";
import Navbar from "../component/navbar";
import useGet from "../service/hooks/useGet";
import API from "../ApiEndPoint/ApiUrl";

import useMutationApi from "../service/hooks/useMutationApi";
import toastService from "../component/toastService";

 

const Cart = () => {



  
  const [cartItems, setCartItems] = useState([]);

  // Get Cart API
  const {
    data,
    isLoading,
    isError,
  } = useGet(
    ["CartProducts"],
    API.UserCartProducts
  );

  // Set API data
  useEffect(() => {
    if (data) {
      const userData = Array.isArray(data)
        ? data
        : data.CartProdut ||
          data.CartProducts ||
          data.cartProducts ||
          [];

      setCartItems(Array.isArray(userData) ? userData : []);
    }
  }, [data]);

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // Remove Product (local UI)
  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // Calculate Subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  // Shipping
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 50;

  // Total Amount
  const totalAmount = subtotal + shipping;




const { mutate: deleteProduct, isPending: isDeleting } = useMutationApi(
  "DELETE",
  API.DeleteCartProduct,
  ["CartProductsd"]
);

const handleDelete = (id) => {
  deleteProduct(
    { id },
    {
      onSuccess: () => {
        setCartItems((prev) =>
          prev.filter((item) => item._id !== id)
        );

        toastService.success("Product removed from cart");
      },
      onError: (error) => {
        console.log("Delete Cart Error:", error);
        toastService.error("Failed to delete cart product");
      },
    }
  );
};


  return (
    <>
      <Navbar />

      <div className="pt-24"></div>

      <div className="bg-white px-4 md:px-8 pt-10 pb-12">

        {/* Heading */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center gap-4">
            <ShoppingCart size={45} className="text-pink-500" />

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Your Shopping Cart
              </h1>

              <p className="text-gray-500 mt-2">
                Review your items and proceed to checkout
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-7">

          {/* Cart Items */}
          <div className="lg:col-span-2">

            <div className="border border-gray-200 rounded-2xl shadow-sm p-5">

              {isLoading ? (
                <div className="text-center py-16">
                  <p className="text-gray-500">Loading cart products...</p>
                </div>
              ) : isError ? (
                <div className="text-center py-16 text-red-500">
                  Failed to load cart products.
                </div>
              ) : cartItems.length > 0 ? (
                <>
                  {/* Table Header */}
                  <div className="hidden md:grid grid-cols-12 gap-4 border-b pb-5 text-gray-600 font-semibold">
                    <div className="col-span-3">Product</div>
                    <div className="col-span-4">Details</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-1 text-center">Action</div>
                  </div>

                  {/* Products */}
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-5 py-6 border-b last:border-b-0 items-center"
                    >
                      {/* Image */}
                      <div className="md:col-span-3">
                        <img
                          src={item.images}
                          alt={item.name}
                          className="w-full h-48 md:h-52 object-cover rounded-xl"
                        />
                      </div>

                      {/* Details */}
                      <div className="md:col-span-4">
                        <h2 className="font-bold text-xl text-slate-900">
                          {item.name}
                        </h2>

                        <p className="text-gray-500 mt-1">
                          {item.brand}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <span className="bg-gray-100 px-3 py-2 rounded-lg flex items-center gap-2">
                            <span
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: item.color }}
                            />
                            {item.color}
                          </span>

                          <span className="bg-gray-100 px-3 py-2 rounded-lg">
                            Size: {Array.isArray(item.sizes)
                              ? item.sizes.join(", ")
                              : item.size || "-"}
                          </span>
                        </div>

                        <div className="mt-3 inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-3 py-2 rounded-lg font-semibold">
                          <Tag size={17} />
                          {item.discount}% OFF
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-4">
                          <span className="text-2xl font-bold text-pink-500">
                            ₹{Number(item.price || 0).toLocaleString("en-IN")}
                          </span>

                          <span className="text-gray-400 line-through">
                            ₹{Number(item.originalPrice || 0).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex md:justify-center">
                        <div className="flex items-center gap-4 border rounded-xl px-3 py-2">
                          <button
                            onClick={() => decreaseQuantity(item._id)}
                            disabled={Number(item.quantity) <= 1}
                            className="hover:text-pink-500 disabled:opacity-40"
                          >
                            <Minus size={20} />
                          </button>

                          <span className="font-semibold">
                            {item.quantity || 1}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item._id)}
                            className="hover:text-pink-500"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 md:text-center">
                        <p className="font-bold text-xl">
                          ₹{(
                            Number(item.price || 0) *
                            Number(item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Remove */}
                     <button
  onClick={() => handleDelete(item._id)}
  disabled={isDeleting}
  className="bg-pink-50 text-pink-600 hover:bg-pink-500 hover:text-white disabled:opacity-50 p-3 rounded-xl transition"
  title="Remove Product"
>
  <Trash2 size={21} />
</button>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-16">
                  <ShoppingCart
                    size={65}
                    className="mx-auto text-gray-300"
                  />

                  <h2 className="text-2xl font-bold mt-5">
                    Your Cart is Empty
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Add some products to your cart.
                  </p>
                </div>
              )}
            </div>

            {/* Continue Shopping */}
            <button
              onClick={() => window.history.back()}
              className="mt-7 flex items-center gap-3 border-2 border-slate-400 px-6 py-4 rounded-xl font-semibold hover:bg-slate-900 hover:text-white transition"
            >
              <ArrowLeft size={22} />
              Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-2xl shadow-sm p-6 sticky top-24">

              <div className="flex items-center gap-4 border-b pb-5">
                <Tag size={35} className="text-pink-500" />

                <h2 className="text-2xl font-bold text-slate-900">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-5 py-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>

                  <span className="font-semibold">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>

                  <span className="text-green-600 font-semibold">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>

                <div className="border-t pt-5 flex justify-between items-center">
                  <span className="text-lg font-bold">
                    Total Amount
                  </span>

                  <span className="text-3xl font-bold text-pink-500">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                disabled={cartItems.length === 0}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition"
              >
                <CreditCard size={23} />
                Proceed to Checkout
                <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="max-w-7xl mx-auto mt-14 bg-pink-50 rounded-2xl p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">

          <div className="flex items-center gap-4">
            <Truck size={42} />
            <div>
              <h3 className="font-bold">Free Shipping</h3>
              <p className="text-sm text-gray-500">On orders above ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck size={42} />
            <div>
              <h3 className="font-bold">Secure Payments</h3>
              <p className="text-sm text-gray-500">100% Secure & Safe</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Headset size={42} />
            <div>
              <h3 className="font-bold">24/7 Support</h3>
              <p className="text-sm text-gray-500">Get Help Anytime</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RefreshCw size={42} />
            <div>
              <h3 className="font-bold">Easy Returns</h3>
              <p className="text-sm text-gray-500">Hassle Free Returns</p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};
 
export default Cart;
