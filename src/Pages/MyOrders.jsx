import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  CalendarDays,
  CreditCard,
  ChevronRight,
  Truck,
  RefreshCw,
} from "lucide-react";
import Navbar from "../component/navbar";
import Footer from "../component/Footer";
import useGet from "../service/hooks/useGet";
import API from "../ApiEndPoint/ApiUrl";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  // GET MY ORDERS API
  const {
    data: orderDataResponse,
    isLoading: orderLoading,
    isError: orderError,
  } = useGet(["MyOrders"], API.MyOrders);

  // Store orders
  useEffect(() => {
    if (orderDataResponse) {
      const userOrders = Array.isArray(orderDataResponse)
        ? orderDataResponse
        : orderDataResponse.orders || [];

      setOrders(userOrders);
    }
  }, [orderDataResponse]);

  // Order status filter
  const filteredOrders = useMemo(() => {
    if (activeFilter === "All") return orders;

    return orders.filter(
      (order) =>
        order.orderStatus?.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [orders, activeFilter]);

  // Order summary
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus?.toLowerCase() === "pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus?.toLowerCase() === "delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.orderStatus?.toLowerCase() === "cancelled"
  ).length;

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Currency
  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  // Status design
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-50 text-green-600 border-green-200";

      case "pending":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";

      case "shipped":
        return "bg-blue-50 text-blue-600 border-blue-200";

      case "processing":
        return "bg-purple-50 text-purple-600 border-purple-200";

      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200";

      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  // Summary card
  const summaryCards = [
    {
      title: "Total Orders",
      count: totalOrders,
      icon: ShoppingBag,
      color: "bg-pink-50 text-pink-500",
    },
    {
      title: "Pending",
      count: pendingOrders,
      icon: Clock,
      color: "bg-yellow-50 text-yellow-500",
    },
    {
      title: "Delivered",
      count: deliveredOrders,
      icon: CheckCircle,
      color: "bg-green-50 text-green-500",
    },
    {
      title: "Cancelled",
      count: cancelledOrders,
      icon: XCircle,
      color: "bg-red-50 text-red-500",
    },
  ];

  const filters = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

 
  return (



    <> 
          <Navbar />
                  <div className="pt-24"></div>
    <div className=" bg-[#f8f8f8] py-8 px-4 sm:px-6 lg:px-10">

      <div className="max-w-6xl mx-auto">

        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              My Orders
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Track and manage all your StyleHub orders
            </p>
          </div>

          <Link
            to="/Home"
            className="text-sm font-semibold text-pink-500 hover:text-pink-600 flex items-center gap-1"
          >
            Continue Shopping
            <ChevronRight size={17} />
          </Link>

        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">

          {summaryCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {card.title}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-2">
                      {card.count}
                    </h2>
                  </div>

                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center ${card.color}`}
                  >
                    <Icon size={21} />
                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* FILTER SECTION */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6 shadow-sm">

          <div className="flex items-center gap-2 mb-4">
            <Package size={19} className="text-pink-500" />

            <h2 className="font-semibold text-gray-800">
              Order History
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">

            {filters.map((filter) => (

              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? "bg-pink-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                }`}
              >
                {filter}
              </button>

            ))}

          </div>

        </div>

        {/* ORDER LIST */}
        <div className="space-y-5">

          {filteredOrders.length > 0 ? (

            filteredOrders.map((order) => (

              <div
                key={order._id}
                className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
              >

                {/* ORDER HEADER */}
                <div className="p-4 sm:p-5 border-b border-gray-100">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div className="flex flex-wrap gap-x-7 gap-y-3">

                      <div>
                        <p className="text-xs text-gray-400">
                          Order ID
                        </p>

                        <p className="text-sm font-semibold text-gray-800 mt-1">
                          #{order._id?.slice(-8).toUpperCase()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Order Date
                        </p>

                        <p className="text-sm font-semibold text-gray-800 mt-1 flex items-center gap-1">
                          <CalendarDays size={14} />
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Payment
                        </p>

                        <p className="text-sm font-semibold text-gray-800 mt-1 flex items-center gap-1">
                          <CreditCard size={14} />
                          {order.paymentMethod}
                        </p>
                      </div>

                    </div>

                    <span
                      className={`px-3 py-1.5 rounded-full border text-xs font-semibold w-fit ${getStatusStyle(order.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>

                  </div>

                </div>

                {/* PRODUCT ITEMS */}
                <div className="p-4 sm:p-5 space-y-4">

                  {order.items?.map((item, index) => (

                    <div
                      key={item._id || index}
                      className="flex gap-4"
                    >

                      {/* PRODUCT IMAGE */}
                      <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package
                            size={32}
                            className="text-gray-400"
                          />
                        )}

                      </div>

                      {/* PRODUCT DETAILS */}
                      <div className="flex-1 min-w-0">

                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          Brand: {item.brand || "StyleHub"}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-2">

                          {item.size && (
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                              Size: {item.size}
                            </span>
                          )}

                          {item.color && (
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                              Color: {item.color}
                            </span>
                          )}

                          <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                            Qty: {item.quantity}
                          </span>

                        </div>

                        <p className="text-base font-bold text-gray-900 mt-3">
                          {formatPrice(item.price)}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                {/* DELIVERY ADDRESS */}
                <div className="mx-4 sm:mx-5 p-3 sm:p-4 bg-gray-50 rounded-lg">

                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={17} className="text-pink-500" />

                    <h3 className="text-sm font-semibold text-gray-800">
                      Delivery Address
                    </h3>
                  </div>

                  <p className="text-sm font-medium text-gray-800">
                    {order.deliveryAddress?.fullName}
                  </p>

                  <p className="text-xs text-gray-500 mt-1 leading-5">
                    {order.deliveryAddress?.addressLine},{" "}
                    {order.deliveryAddress?.city},{" "}
                    {order.deliveryAddress?.state} -{" "}
                    {order.deliveryAddress?.pincode}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Phone: {order.deliveryAddress?.phoneNumber}
                  </p>

                </div>

                {/* ORDER FOOTER */}
                <div className="p-4 sm:p-5 mt-3 border-t border-gray-100">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div className="space-y-1">

                      <p className="text-xs text-gray-500">
                        Payment Status:{" "}
                        <span className="font-semibold text-gray-800">
                          {order.paymentStatus}
                        </span>
                      </p>

                      <p className="text-xs text-gray-500">
                        Shipping: {formatPrice(order.shipping)}
                      </p>

                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>

                      <h2 className="text-xl font-bold text-gray-900">
                        {formatPrice(order.totalAmount)}
                      </h2>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">

                    

                      <Link
                        to={`/OrderDetails/${order._id}`}
                        className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition"
                      >
                        <Truck size={16} />
                        Track Order
                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            ))

          ) : (

            /* EMPTY ORDERS */
            <div className="bg-white rounded-xl border border-gray-100 py-16 px-5 text-center">

              <div className="w-20 h-20 mx-auto bg-pink-50 rounded-full flex items-center justify-center">
                <ShoppingBag
                  size={35}
                  className="text-pink-500"
                />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mt-5">
                {orders.length === 0
                  ? "No Orders Yet!"
                  : "No Orders Found"}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                {orders.length === 0
                  ? "You haven't placed any orders yet. Start shopping now!"
                  : `You don't have any ${activeFilter.toLowerCase()} orders.`}
              </p>

              <Link
                to="/Home"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold text-sm transition"
              >
                <ShoppingBag size={17} />
                Start Shopping
              </Link>

            </div>

          )}

        </div>

      </div>

    </div>

                <Footer />
    </>
  );
};

export default MyOrders;