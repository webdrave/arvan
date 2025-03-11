"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { PiPencilSimple } from "react-icons/pi";

interface Address {
  id: string;
  name: string;
  details: string;
  isSelected: boolean;
}

const Checkout: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Home",
      details: "123 Main St, Cityville",
      isSelected: true,
    },
  ]);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");

  // Sample checkout data
  const subtotal = 599;
  const shippingCharges = 5999;
  const total = subtotal + shippingCharges;

  const selectAddress = (id: string) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isSelected: address.id === id,
      }))
    );
  };

  const addNewAddress = () => {
    setShowAddressForm(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <div className="container  mx-auto max-w-6xl relative">
        {/* Blurred circle in background */}
        <div className="absolute w-[80vw] h-[40vw] rounded-full bg-lime-600/20 blur-3xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-1"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center relative z-10">
          {/* Left column - Address and Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Section */}
            <div>
              <h2 className="text-4xl font-bold mb-4">Delivery To</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {/* Home Address Card */}
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 rounded-lg flex justify-between items-center cursor-pointer ${
                      address.isSelected
                        ? " border border-lime-400"
                        : "border-none"
                    }`}
                    style={{
                      backdropFilter: "blur(100px)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    onClick={() => selectAddress(address.id)}
                  >
                    <div className="flex items-start space-x-2">
                      {address.isSelected && (
                        <div className="bg-lime-400 rounded-full p-1 mt-1">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{address.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {address.details}
                        </p>
                      </div>
                    </div>

                    <button className="text-gray-200 hover:text-white">
                      <PiPencilSimple size={20} />
                    </button>
                  </div>
                ))}

                {/* Add New Address Button */}
                <Link
                  href={"/address"}
                  className="p-4 rounded-lg bg-transparent border-2 border-lime-900 flex items-center justify-center cursor-pointer h-full"
                  style={{
                    backdropFilter: "blur(100px)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                  //   onClick={addNewAddress}
                >
                  <div className="flex items-center text-lime-400">
                    {/* <PiPencilSimple size={20} color="white"/> */}
                    <span className="ml-2">Add New Address</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div>
              <h2 className="text-4xl font-bold mb-4">Payment Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* UPI Option */}
                <div
                  className={`p-4 rounded-lg bg-[#6c8118] border flex justify-between items-center cursor-pointer ${
                    paymentMethod === "upi"
                      ? "border-lime-400"
                      : "border-gray-800"
                  }`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded mr-3">
                      <Image
                        src="/upi.svg"
                        alt="UPI"
                        width={200}
                        height={200}
                        className="h-10 w-10"
                      />
                    </div>
                    <label htmlFor="upi-radio" className="cursor-pointer">
                      UPI (UNIFIED PAYMENTS INTERFACE)
                    </label>
                  </div>
                  <div className="radio-button">
                    <input
                      type="radio"
                      id="upi-radio"
                      name="payment-method"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="w-5 h-5 accent-lime-500 appearance-none checked:bg-lime-400 checked:border-lime-800 border-2  border-lime-400 rounded-full"
                      aria-label="Select UPI payment method"
                    />
                  </div>
                </div>

                {/* Cash on Delivery Option */}
                <div
                  className={`p-4 rounded-lg bg-[#6c8118] border flex justify-between items-center cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-lime-400"
                      : "border-gray-800"
                  }`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded mr-3">
                      <Image
                        src="/money.svg"
                        alt="COD"
                        width={200}
                        height={200}
                        className="h-10 w-10"
                      />
                    </div>
                    <label htmlFor="cod-radio" className="cursor-pointer">
                      Cash On Delivery
                    </label>
                  </div>
                  <div className="radio-button">
                    <input
                      type="radio"
                      id="cod-radio"
                      name="payment-method"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-5 h-5 accent-lime-500 appearance-none checked:bg-lime-400 checked:border-lime-800 border-2  border-lime-400 rounded-full"
                      aria-label="Select Cash on Delivery payment method"
                    />
                  </div>
                </div>

                {/* Credit Card Option */}
                <div
                  className={`p-4 rounded-lg bg-[#6c8118] border flex justify-between items-center cursor-pointer ${
                    paymentMethod === "credit"
                      ? "border-lime-400"
                      : "border-gray-800"
                  }`}
                  onClick={() => setPaymentMethod("credit")}
                >
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded mr-3">
                      <Image
                        src="/wallet.svg"
                        alt="Credit Card"
                        width={200}
                        height={200}
                        className="h-10 w-10"
                      />
                    </div>
                    <label htmlFor="credit-radio" className="cursor-pointer">
                      Credit Card
                    </label>
                  </div>
                  <div className="radio-button">
                    <input
                      type="radio"
                      id="credit-radio"
                      name="payment-method"
                      value="credit"
                      checked={paymentMethod === "credit"}
                      onChange={() => setPaymentMethod("credit")}
                      className="w-5 h-5 accent-lime-500 appearance-none checked:bg-lime-400 checked:border-lime-800 border-2  border-lime-400 rounded-full"
                      aria-label="Select Credit Card payment method"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Payment Details */}
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
                  <span className="text-gray-300">Shipping Charges</span>
                  <span>₹{shippingCharges}</span>
                </div>

                <div className="mt-4 relative">
                  <input
                    type="text"
                    placeholder="Enter Gift Code"
                    className="w-full bg-transparent border-b border-gray-600 pb-2 pr-10 focus:outline-none focus:border-lime-400"
                  />
                  <button className="absolute right-0 top-0 text-gray-400 hover:text-white">
                    <span>→</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-700 mt-6">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button className="w-full bg-[#748a1d] hover:bg-[#546415] rounded-lg py-3 font-bold mt-6 uppercase">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
