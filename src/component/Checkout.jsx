
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  MapPin,
  Plus,
  Check,
  Truck,
  Banknote,
  ShieldCheck,
  RotateCcw,
  Headset,
  ArrowRight,
  Lock,
  Edit2,
  Trash2,
} from "lucide-react";

import Navbar from "../component/navbar";
import Footer from "../component/Footer";
import { useLocation, useNavigate } from "react-router-dom";
 
import useGet from "../service/hooks/useGet";
import useMutationApi from "../service/hooks/useMutationApi";
import API from "../ApiEndPoint/ApiUrl";
import toastService from "../component/toastService";

const Checkout = () => {
  const location = useLocation();

  // Cart Data
  const {
    cartItems = [],
    subtotal = 0,
    shipping = 0,
    totalAmount = 0,
  } = location.state || {};
const navigate = useNavigate();
  // Address States
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);

  // Address Form Data
  const [addressData, setAddressData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  // GET Address API
  const {
    data: addressDataResponse,
    isLoading: addressLoading,
    isError: addressError,
  } = useGet(
    ["UserAddresses"],
    API.listContactUsUsers
  );

  // Set Address Data
  useEffect(() => {
    if (addressDataResponse) {
      const userAddresses = Array.isArray(addressDataResponse)
        ? addressDataResponse
        : addressDataResponse.NewAddresslist || [];

      setAddresses(userAddresses);

      if (userAddresses.length > 0) {
        setSelectedAddress((prev) =>
          userAddresses.some((item) => item._id === prev)
            ? prev
            : userAddresses[0]._id
        );
      } else {
        setSelectedAddress(null);
      }
    }
  }, [addressDataResponse]);

  // ADD Address API
  const AddAddressMutation = useMutationApi(
    "POST",
    API.addNewAddress,
    ["UserAddresses"]
  );

  // EDIT Address API
  const EditAddressMutation = useMutationApi(
    "PUT",
    API.EditNewAddressnew,
    ["UserAddresses"]
  );

  // DELETE Address API
  const DeleteAddressMutation = useMutationApi(
    "DELETE",
    API.DeleteNewAddressnew,
    ["UserAddresses"]
  );

  // CREATE ORDER API
  const AddorderMutation = useMutationApi(
    "POST",
    API.CreateOrder,
    ["CreateOrder"]
  );

  // Reset Form
  const resetAddressForm = () => {
    setAddressData({
      fullName: "",
      phoneNumber: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
    });

    setEditingAddress(null);
    setShowAddressForm(false);
  };

  // Handle Input
  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ADD / EDIT Address
  const handleAddressSubmit = (e) => {
    e.preventDefault();

    if (editingAddress) {
      // EDIT ADDRESS
      EditAddressMutation.mutate(
        {
          id: editingAddress._id,
          ...addressData,
        },
        {
          onSuccess: () => {
            toastService.success("Address updated successfully!");

            setAddresses((prev) =>
              prev.map((item) =>
                item._id === editingAddress._id
                  ? { ...item, ...addressData }
                  : item
              )
            );

            resetAddressForm();
          },
          onError: (error) => {
            toastService.error(
              error.message || "Address update failed"
            );
          },
        }
      );
    } else {
      // ADD ADDRESS
      AddAddressMutation.mutate(addressData, {
        onSuccess: (data) => {
          toastService.success("Address added successfully!");

          const newAddress = data?.address;

          if (newAddress?._id) {
            setAddresses((prev) => [...prev, newAddress]);
            setSelectedAddress(newAddress._id);
          }

          resetAddressForm();
        },
        onError: (error) => {
          toastService.error(
            error.message || "Address not added"
          );
        },
      });
    }
  };

  // EDIT Address
  const handleEditAddress = (address) => {
    setEditingAddress(address);

    setAddressData({
      fullName: address.fullName || "",
      phoneNumber: address.phoneNumber || "",
      addressLine: address.addressLine || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
    });

    setShowAddressForm(true);
  };

  // DELETE Address
  const handleDeleteAddress = (address) => {
 

    DeleteAddressMutation.mutate(
      { id: address._id },
      {
        onSuccess: () => {
          toastService.success("Address deleted successfully!");

          setAddresses((prev) =>
            prev.filter((item) => item._id !== address._id)
          );

          if (selectedAddress === address._id) {
            setSelectedAddress(null);
          }
        },
        onError: (error) => {
          toastService.error(
            error.message || "Address deletion failed"
          );
        },
      }
    );
  };

  // PLACE ORDER
  const handlePlaceOrder = () => {
    if (!cartItems.length) {
      toastService.error("Your cart is empty");
      return;
    }

    const selectedAddressData = addresses.find(
      (address) => address._id === selectedAddress
    );

    if (!selectedAddressData) {
      toastService.error("Please select delivery address");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      brand: item.brand,

      image: Array.isArray(item.images)
        ? item.images[0]
        : item.images,

      price: item.price,
      quantity: item.quantity,
      size: Array.isArray(item.sizes)
        ? item.sizes[0]
        : item.sizes,
      color: item.color,
    }));

    const orderData = {
      items: orderItems,
      deliveryAddress: selectedAddressData,
      subtotal,
      shipping,
      totalAmount,
      paymentMethod: "COD",
    };

    console.log("Order Details:", orderData);

    AddorderMutation.mutate(orderData, {
      onSuccess: () => {
        toastService.success("Order placed successfully!");
           navigate(`/OrderConfirmation/${orderId}`);
      },
      onError: (error) => {
        toastService.error(
          error.message || "Order placement failed"
        );
      },
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#faf8ff] pt-28 pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Checkout
              </h1>
              <p className="text-gray-500 mt-2">
                Complete your order securely
              </p>
            </div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              Step 1 of 3
            </span>
          </div>

          {/* Progress */}
          <div className="flex items-center max-w-2xl mb-8">

            <div className="flex items-center gap-2 text-purple-700 font-semibold">
              <span className="bg-purple-700 text-white p-2 rounded-full">
                <ShoppingBag size={18} />
              </span>
              <span className="hidden sm:block">Cart</span>
            </div>

            <div className="flex-1 h-[2px] bg-purple-600 mx-3" />

            <div className="flex items-center gap-2 text-purple-700 font-semibold">
              <span className="bg-purple-700 text-white p-2 rounded-full">
                <MapPin size={18} />
              </span>
              <span className="hidden sm:block">
                Address & Payment
              </span>
            </div>

            <div className="flex-1 h-[2px] bg-gray-300 mx-3" />

            <div className="flex items-center gap-2 text-gray-400 font-semibold">
              <span className="bg-gray-300 text-white p-2 rounded-full">
                <Check size={18} />
              </span>
              <span className="hidden sm:block">Confirmation</span>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT SECTION */}
            <div className="lg:col-span-2 space-y-5">

              {/* DELIVERY ADDRESS */}
              <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">

                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <span className="bg-purple-700 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold">
                      1
                    </span>

                    <h2 className="text-xl font-bold text-gray-900">
                      Delivery Address
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      resetAddressForm();
                      setShowAddressForm(true);
                    }}
                    className="flex items-center gap-1 text-purple-700 font-semibold hover:text-purple-900"
                  >
                    <Plus size={18} />
                    <span className="hidden sm:inline">
                      Add New Address
                    </span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>

                {/* ADDRESS FORM */}
                {showAddressForm && (
                  <form
                    onSubmit={handleAddressSubmit}
                    className="border border-purple-200 rounded-xl p-4 mb-5 bg-purple-50 space-y-3"
                  >
                    <h3 className="font-semibold text-gray-800">
                      {editingAddress
                        ? "Edit Delivery Address"
                        : "Add Delivery Address"}
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        ["fullName", "Full Name"],
                        ["phoneNumber", "Mobile Number"],
                        ["addressLine", "House No, Street, Area"],
                        ["city", "City"],
                        ["state", "State"],
                        ["pincode", "Pincode"],
                      ].map(([name, label]) => (
                        <input
                          key={name}
                          required
                          name={name}
                          placeholder={label}
                          value={addressData[name]}
                          onChange={handleAddressChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:border-purple-600"
                        />
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={
                          AddAddressMutation.isPending ||
                          EditAddressMutation.isPending
                        }
                        className="bg-purple-700 hover:bg-purple-800 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg"
                      >
                        {AddAddressMutation.isPending ||
                        EditAddressMutation.isPending
                          ? "Saving..."
                          : editingAddress
                          ? "Update Address"
                          : "Save Address"}
                      </button>

                      <button
                        type="button"
                        onClick={resetAddressForm}
                        className="border border-gray-300 px-5 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* SAVED ADDRESSES */}
                {addressLoading ? (
                  <p className="text-center py-5 text-gray-500">
                    Loading addresses...
                  </p>
                ) : addressError ? (
                  <p className="text-center py-5 text-red-500">
                    Unable to load addresses
                  </p>
                ) : addresses.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">

                    {addresses.map((address) => (
                      <div
                        key={address._id}
                        onClick={() =>
                          setSelectedAddress(address._id)
                        }
                        className={`relative cursor-pointer border-2 rounded-xl p-4 transition ${
                          selectedAddress === address._id
                            ? "border-purple-600 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >

                        {selectedAddress === address._id && (
                          <span className="absolute top-3 right-3 bg-purple-700 text-white rounded-full p-1">
                            <Check size={14} />
                          </span>
                        )}

                        <div className="flex items-center gap-3 mb-3">
                          <MapPin
                            className="text-purple-700"
                            size={22}
                          />

                          <h3 className="font-bold text-gray-900">
                            {address.fullName}
                          </h3>
                        </div>

                        <p className="text-gray-600 text-sm mb-1">
                          {address.phoneNumber}
                        </p>

                        <p className="text-gray-600 text-sm leading-6">
                          {address.addressLine}, {address.city},{" "}
                          {address.state} - {address.pincode}
                        </p>

                        {/* EDIT & DELETE BUTTONS */}
                        <div className="flex gap-4 mt-4 border-t pt-3">

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(address);
                            }}
                            className="flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900"
                          >
                            <Edit2 size={16} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address);
                            }}
                            disabled={DeleteAddressMutation.isPending}
                            className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>

                        </div>
                      </div>
                    ))}

                  </div>
                ) : (
                  <p className="text-center py-5 text-gray-500">
                    No saved address found. Please add a new address.
                  </p>
                )}

              </section>

              {/* PAYMENT METHOD */}
              <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">

                <div className="flex items-center gap-3 mb-5">
                  <span className="bg-purple-700 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold">
                    2
                  </span>

                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Method
                  </h2>
                </div>

                <div className="border-2 border-purple-600 bg-purple-50 rounded-xl p-4 flex items-center gap-4">
                  <div className="text-purple-700">
                    <Banknote size={38} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">
                      Cash on Delivery (COD)
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Pay when your order arrives
                    </p>
                  </div>

                  <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Selected
                  </span>
                </div>
              </section>

              {/* ORDER SUMMARY */}
              <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">

                <div className="flex items-center gap-3 mb-5">
                  <span className="bg-purple-700 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold">
                    3
                  </span>

                  <h2 className="text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">

                  {cartItems.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="flex gap-4 border-b border-gray-100 pb-4"
                    >
                      <img
                        src={
                          Array.isArray(item.images)
                            ? item.images[0]
                            : item.images
                        }
                        alt={item.name}
                        className="w-24 h-28 object-cover rounded-xl bg-gray-100"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Brand: {item.brand}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          Color: {item.color}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          Size:{" "}
                          {Array.isArray(item.sizes)
                            ? item.sizes.join(", ")
                            : item.sizes}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          Qty: {item.quantity || 1}
                        </p>
                      </div>

                      <p className="font-bold text-gray-900">
                        ₹
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 1)
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}

                  {cartItems.length === 0 && (
                    <p className="text-center text-gray-500 py-5">
                      Your cart is empty.
                    </p>
                  )}

                </div>
              </section>

            </div>

            {/* RIGHT SECTION */}
            <div className="space-y-5">

              {/* FREE DELIVERY */}
              <div className="bg-purple-100 rounded-2xl p-5 flex items-center gap-4">
                <Truck size={40} className="text-purple-700" />

                <div>
                  <h3 className="font-bold text-purple-800">
                    Free Delivery
                  </h3>

                  <p className="text-sm text-gray-600">
                    On all orders
                  </p>
                </div>
              </div>

              {/* PRICE DETAILS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                <h2 className="text-xl font-bold mb-5 text-gray-900">
                  Price Details
                </h2>

                <div className="space-y-4 text-sm">

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Price ({cartItems.length} Items)
                    </span>

                    <span className="font-semibold">
                      ₹{Number(subtotal).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Delivery Charges
                    </span>

                    <span
                      className={
                        shipping === 0
                          ? "text-green-600 font-semibold"
                          : "font-semibold"
                      }
                    >
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-gray-300 pt-4 flex justify-between">
                    <span className="font-bold text-gray-900 text-base">
                      Total Amount
                    </span>

                    <span className="font-bold text-purple-700 text-xl">
                      ₹{Number(totalAmount).toLocaleString("en-IN")}
                    </span>
                  </div>

                </div>

                {/* PLACE ORDER */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={
                    !cartItems.length ||
                    !addresses.length ||
                    AddorderMutation.isPending
                  }
                  className="w-full mt-6 bg-purple-700 hover:bg-purple-800 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition"
                >
                  <Lock size={18} />
                  {AddorderMutation.isPending
                    ? "Placing Order..."
                    : "Place Orders"}
                  <ArrowRight size={20} />
                </button>

                <p className="text-xs text-center text-gray-500 mt-4 flex justify-center items-center gap-2">
                  <ShieldCheck
                    size={16}
                    className="text-green-600"
                  />
                  Your order is safe and secure
                </p>

              </div>

              {/* BENEFITS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 grid grid-cols-3 divide-x divide-gray-200">

                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck size={25} />
                  <span className="text-xs font-medium">
                    Secure Payment
                  </span>
                </div>

                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw size={25} />
                  <span className="text-xs font-medium">
                    Easy Returns
                  </span>
                </div>

                <div className="flex flex-col items-center text-center gap-2">
                  <Headset size={25} />
                  <span className="text-xs font-medium">
                    24x7 Support
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
