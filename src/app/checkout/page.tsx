"use client";

import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { AddressApi } from "@/lib/api/address";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PiPencilSimple } from "react-icons/pi";

interface Address {
  id: string;
  name: string;
  details: string;
  isSelected: boolean;
}

const Checkout: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const { cart } = useCart();

  // Fetch addresses from API
  const { data: addresses, isLoading, isError } = useQuery({
    queryKey: ["address"],
    queryFn: async ()  => {
      const rawAddress = await AddressApi.getAddress();
      return rawAddress.map((addr: any) => ({
        id: addr.id,
        name: "Home", // Static name for now
        details: `${addr.street}, ${addr.city}, ${addr.state}, ${addr.country} - ${addr.zipCode}`,
        isSelected: addr.isSelected || true,
      }));
    },
  });

  const handleSubmit = () => {
      if(!selectAddress){
        alert("Select an address first..")
      }
  }

  // Sync selected address with fetched data
  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const selected = addresses.find((address) => address.isSelected);
      if (selected) {
        setSelectedAddress(selected.id);
      } else {
        setSelectedAddress(addresses[0].id); // Default to first address
      }
    }
  }, [addresses]);

  const selectAddress = (id: string) => {
    setSelectedAddress(id);
    // Optionally, update backend state if needed
    // AddressApi.updateSelectedAddress(id);
  };

  // Checkout calculations
  const subtotal = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shippingCharges = 149;
  const tax = subtotal * 0.18; // 18% tax
  const total = cart.length > 0 ? subtotal + shippingCharges + tax : 0;

  return (
    <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <Navbar />
      <div className="container mx-auto max-w-6xl relative">
        {/* Blurred Background */}
        <div className="absolute w-[80vw] h-[40vw] rounded-full bg-lime-600/15 blur-3xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-1"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center relative z-10">
          {/* Left Section: Address & Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Section */}
            <div>
              <h2 className="text-4xl font-bold mb-4">Delivery To</h2>
              {/* {isLoading && <p>Loading addresses...</p>}
              {isError && <p>Error fetching addresses.</p>} */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Address Cards */}
                {addresses &&
                  addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`p-4 rounded-lg flex justify-between items-center cursor-pointer ${
                        selectedAddress === address.id ? "border border-lime-400" : "border-none"
                      }`}
                      style={{
                        backdropFilter: "blur(100px)",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                      onClick={() => selectAddress(address.id)}
                    >
                      <div className="flex items-start space-x-2">
                        {selectedAddress === address.id && (
                          <div className="bg-lime-400 rounded-full p-1 mt-1">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium">{address.name}</h3>
                          <p className="text-gray-400 text-sm">{address.details}</p>
                        </div>
                      </div>
                      <button className="text-gray-200 hover:text-white">
                        <PiPencilSimple size={20} />
                      </button>
                    </div>
                  ))}

                {/* Add New Address Button */}
                <Link
                  href="/address"
                  className="p-4 rounded-lg bg-transparent border-2 border-lime-900 flex items-center justify-center cursor-pointer h-full"
                  style={{
                    backdropFilter: "blur(100px)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <span className="text-lime-400">Add New Address</span>
                </Link>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div>
              <h2 className="text-4xl font-bold mb-4">Payment Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { id: "upi", label: "UPI (Unified Payments Interface)", icon: "/upi.svg" },
                  { id: "cod", label: "Cash On Delivery", icon: "/money.svg" },
                  { id: "credit", label: "Credit Card", icon: "/wallet.svg" },
                ].map(({ id, label, icon }) => (
                  <div
                    key={id}
                    className={`p-4 rounded-lg bg-[#6c8118] border flex justify-between items-center cursor-pointer ${
                      paymentMethod === id ? "border-lime-400" : "border-gray-800"
                    }`}
                    onClick={() => setPaymentMethod(id)}
                  >
                    <div className="flex items-center">
                      <div className="bg-white p-2 rounded mr-3">
                        <Image src={icon} alt={label} width={40} height={40} />
                      </div>
                      <label htmlFor={`${id}-radio`} className="cursor-pointer">
                        {label}
                      </label>
                    </div>
                    <input
                      type="radio"
                      id={`${id}-radio`}
                      name="payment-method"
                      value={id}
                      checked={paymentMethod === id}
                      onChange={() => setPaymentMethod(id)}
                      className="w-5 h-5 accent-lime-500 appearance-none checked:bg-lime-400 checked:border-lime-800 border-2 border-lime-400 rounded-full"
                      aria-label={`Select ${label} payment method`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section: Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="border-2 border-lime-500 rounded-lg lg:mt-5 p-6"
              style={{
                backdropFilter: "blur(100px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <h2 className="text-xl font-bold mb-6">Payment Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span>₹{shippingCharges}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => handleSubmit()} className="w-full mt-4 p-3 bg-lime-500 text-black font-bold rounded-lg">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
