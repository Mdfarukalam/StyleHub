
import React, { useEffect, useState } from "react";
import {
  User,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Check,
} from "lucide-react";

import useGet from "../service/hooks/useGet";
import useMutationApi from "../service/hooks/useMutationApi";
import API from "../ApiEndPoint/ApiUrl";
import toastService from "./toastService";
import Navbar from "../component/navbar";
import Footer from "../component/Footer";
const User_Profile = () => {
  const { data, isLoading } = useGet(
    ["Profile"],
    API.Profile
  );

  const user = data?.UserData || data;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [addressData, setAddressData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  // GET Addresses
  const {
    data: addressResponse,
    isLoading: addressLoading,
    isError: addressError,
  } = useGet(
    ["UserAddresses"],
    API.listContactUsUsers
  );

  useEffect(() => {
    if (addressResponse) {
      const userAddresses = Array.isArray(addressResponse)
        ? addressResponse
        : addressResponse.NewAddresslist || [];

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
  }, [addressResponse]);

  // Mutations
  const AddAddressMutation = useMutationApi(
    "POST",
    API.addNewAddress,
    ["UserAddresses"]
  );

  const EditAddressMutation = useMutationApi(
    "PUT",
    API.EditNewAddressnew,
    ["UserAddresses"]
  );

  const DeleteAddressMutation = useMutationApi(
    "DELETE",
    API.DeleteNewAddressnew,
    ["UserAddresses"]
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

  // Input Change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add / Edit Address
  const handleAddressSubmit = (e) => {
    e.preventDefault();

    if (editingAddress) {
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
      AddAddressMutation.mutate(addressData, {
        onSuccess: (response) => {
          toastService.success("Address added successfully!");

          const newAddress = response?.address;

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

  // Edit Address
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

  // Delete Address
  const handleDeleteAddress = (address) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

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
            error.message || "Address delete failed"
          );
        },
      }
    );
  };

  return (
<> 
        <Navbar />
              <div className="pt-24"></div>
    <div className="bg-gray-50 py-8 px-4 md:px-8">

      <div className="max-w-5xl mx-auto">

        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              <User size={32} className="text-purple-700" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                My Profile
              </h1>

              {isLoading ? (
                <p className="text-gray-400">Loading profile...</p>
              ) : (
                <>
                  <p className="font-semibold text-gray-800">
                    {user?.fullName || "User"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {user?.Email || user?.email || ""}
                  </p>
                    <p className="text-sm text-gray-500">
                    {user?.phoneNumber || user?.phoneNumber || ""}
                  </p>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Delivery Addresses */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">

          <div className="flex justify-between items-center mb-5">

            <div className="flex items-center gap-3">
              <MapPin size={25} className="text-purple-700" />

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  My Addresses
                </h2>

                <p className="text-sm text-gray-500">
                  Manage your delivery addresses
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                resetAddressForm();
                setShowAddressForm(true);
              }}
              className="flex items-center gap-1 text-purple-700 font-semibold"
            >
              <Plus size={18} />
              Add Address
            </button>

          </div>

          {/* Address Form */}
          {showAddressForm && (
            <form
              onSubmit={handleAddressSubmit}
              className="border border-purple-200 rounded-xl p-4 mb-5 bg-purple-50 space-y-3"
            >
              <h3 className="font-semibold text-gray-800">
                {editingAddress ? "Edit Address" : "Add New Address"}
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
                  className="bg-purple-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
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

          {/* Saved Addresses */}
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
                  onClick={() => setSelectedAddress(address._id)}
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
                    <MapPin className="text-purple-700" size={22} />

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

                  <div className="flex gap-4 mt-4 border-t pt-3">

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAddress(address);
                      }}
                      className="flex items-center gap-2 text-sm font-semibold text-purple-700"
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
                      className="flex items-center gap-2 text-sm font-semibold text-red-600 disabled:opacity-50"
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

      </div>
    </div>
        <Footer />
    </>
  );
};

export default User_Profile;
