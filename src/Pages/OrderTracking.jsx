
import React from "react";
import {
  Check,
  Package,
  Truck,
  MapPin,
  ShoppingBag,
  ArrowLeft,
  Phone,
  RefreshCw,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/navbar";
import Footer from "../component/Footer";
import useGet from "../service/hooks/useGet";
import API from "../ApiEndPoint/ApiUrl";

const OrderTracking = () => {
    console.log('firstkkkkkkk')
  const navigate = useNavigate();
  const { id } = useParams();

    console.log('ididididid',id)

  // Single Order API
const {
  data,
  isLoading,
  isError,
  error,
  refetch,
  isFetching,
} = useGet(
  ["SingleOrder", id],
  `${API.SingleOrder}?orderId=${id}`
);

  // API response se order
const order = data?.order || data?.data?.order || data;
  const steps = [
    {
      title: "Pending",
      label: "Order Placed",
      description: "Your order has been confirmed",
      icon: ShoppingBag,
    },
    {
      title: "Processing",
      label: "Processing",
      description: "Your order is being prepared",
      icon: Package,
    },
    {
      title: "Shipped",
      label: "Shipped",
      description: "Your package is on its way",
      icon: Truck,
    },
    {
      title: "Delivered",
      label: "Delivered",
      description: "Your order has been delivered",
      icon: Check,
    },
  ];

  const currentStatus = order?.orderStatus || "Pending";

  const currentStep = steps.findIndex(
    (step) => step.title.toLowerCase() === currentStatus.toLowerCase()
  );

  const isCancelled = currentStatus.toLowerCase() === "cancelled";

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading order tracking...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (isError || !order?._id) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <Package size={45} className="text-gray-400" />
          <h2 className="text-xl font-bold">Order Not Found</h2>
          <button
            onClick={() => navigate("/MyOrders")}
            className="bg-pink-500 text-white px-5 py-2 rounded-lg"
          >
            Back to My Orders
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen bg-[#f8f8f8] px-4 py-8">
        <div className="max-w-5xl mx-auto">

          {/* Back Button */}
          <button
            onClick={() => navigate("/MyOrders")}
            className="flex items-center gap-2 text-gray-600 hover:text-pink-500 mb-6"
          >
            <ArrowLeft size={19} />
            Back to My Orders
          </button>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Header */}
            <div className="p-6 md:p-8 border-b flex flex-wrap justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Track Your Order
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                  Order ID: #{order._id.slice(-8).toUpperCase()}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>

              <span className={`h-fit px-4 py-2 rounded-full text-sm font-semibold ${
                isCancelled
                  ? "bg-red-50 text-red-600"
                  : currentStatus === "Delivered"
                  ? "bg-green-50 text-green-600"
                  : "bg-pink-50 text-pink-600"
              }`}>
                {currentStatus}
              </span>
            </div>

            {/* Tracking Timeline */}
            <div className="p-6 md:p-8">

              {isCancelled ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                  <Package size={42} className="mx-auto text-red-500 mb-3" />

                  <h2 className="text-xl font-bold text-red-600">
                    Order Cancelled
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Your order has been cancelled.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Order Status
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Track your package progress
                      </p>
                    </div>

                    <button
                      onClick={() => refetch()}
                      disabled={isFetching}
                      className="flex items-center gap-2 text-sm text-pink-600 font-semibold hover:text-pink-700 disabled:opacity-50"
                    >
                      <RefreshCw
                        size={16}
                        className={isFetching ? "animate-spin" : ""}
                      />
                      Refresh Status
                    </button>
                  </div>

                  <div className="relative">

                    {/* Progress Line */}
                    <div className="absolute top-5 left-[12.5%] right-[12.5%] h-1 bg-gray-200" />

                    <div
                      className="absolute top-5 left-[12.5%] h-1 bg-green-500 transition-all duration-500"
                      style={{
                        width: `${Math.max(0, currentStep) * 25}%`,
                      }}
                    />

                    <div className="grid grid-cols-4 relative">
                      {steps.map((step, index) => {
                        const Icon = step.icon;
                        const completed = index <= currentStep;

                        return (
                          <div
                            key={step.title}
                            className="flex flex-col items-center text-center"
                          >
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center border-4 border-white shadow ${
                              completed
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-400"
                            }`}>
                              {completed ? (
                                <Check size={21} />
                              ) : (
                                <Icon size={20} />
                              )}
                            </div>

                            <h3 className={`text-xs sm:text-sm font-semibold mt-3 ${
                              completed ? "text-green-600" : "text-gray-400"
                            }`}>
                              {step.label}
                            </h3>

                            <p className="hidden sm:block text-xs text-gray-400 mt-2 max-w-[130px]">
                              {step.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Products */}
            <div className="px-6 md:px-8 py-6 border-t">
              <h2 className="text-lg font-bold mb-5">
                Order Items
              </h2>

              <div className="space-y-5">
                {order.items?.map((item, index) => (
                  <div key={item._id || index} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-lg bg-gray-100"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Brand: {item.brand}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          Size: {item.size}
                        </span>

                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          Color: {item.color}
                        </span>

                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          Qty: {item.quantity}
                        </span>
                      </div>

                      <p className="font-bold mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="px-6 md:px-8 pb-6">
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={20} className="text-pink-500" />
                  <h2 className="font-bold">Delivery Address</h2>
                </div>

                <p className="font-semibold text-gray-800">
                  {order.deliveryAddress?.fullName}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {order.deliveryAddress?.addressLine}
                </p>

                <p className="text-sm text-gray-500">
                  {order.deliveryAddress?.city},{" "}
                  {order.deliveryAddress?.state} -{" "}
                  {order.deliveryAddress?.pincode}
                </p>

                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                  <Phone size={15} />
                  {order.deliveryAddress?.phoneNumber}
                </p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="px-6 md:px-8 py-6 border-t">
              <h2 className="font-bold mb-4">Payment Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>{formatPrice(order.shipping)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Total Amount</span>
                  <span>{formatPrice(order.totalAmount)}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm">
                <p className="text-gray-500">
                  Payment Method:{" "}
                  <b className="text-gray-800">{order.paymentMethod}</b>
                </p>

                <p className="text-gray-500">
                  Payment Status:{" "}
                  <b className="text-gray-800">{order.paymentStatus}</b>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderTracking;
