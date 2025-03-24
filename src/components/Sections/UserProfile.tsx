'use client';

import { useState } from 'react';
import { Pencil, LogOut } from 'lucide-react';
import Image from 'next/image';
import { FaUser, FaShoppingBag, FaMapMarkerAlt } from "react-icons/fa"; // Importing icons from react-icons

// export default function ProfilePage({ user }: { user: any }) {
export default function ProfilePage() {
    const [activeSection, setActiveSection] = useState('personal'); // Track active section

    const profile = {
        fullName: 'Abhishek Chaudhary',
        email: 'example@gmail.com',
        phone: '9876543210',
        address1: 'Hno 2, Indore-458441, Madhya Pradesh',
        address2: 'Add',
        avatar: '/userProfile.png'
    };

    return (
        <div className="text-white min-h-screen p-4 sm:p-6 md:p-10 lg:p-16 flex flex-col w-full">
            <div className="max-w-7xl mx-auto w-full flex-grow">
                <h1 className="text-3xl font-semibold mb-6 sm:mb-8 text-center sm:text-left">My Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6 sm:gap-8">
                    {/* Sidebar */}
                    <div className="border border-gray-700 rounded-sm">
                        <div className="flex items-center space-x-4 text-white p-4 sm:p-6">
                            <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                                <Image src={profile.avatar} alt="Profile" width={64} height={64} className="rounded-full object-cover" />
                            </div>
                            <div>
                                <h2 className="text-base font-medium">{profile.fullName}</h2>
                                <p className="text-xs text-gray-400">{profile.email}</p>
                            </div>
                        </div>
                        <hr className="border-[#959595] w-full mb-6" />

                        <nav>
                            <ul className="space-y-2 w-full">
                                <li
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-sm cursor-pointer w-full transition ${
                                        activeSection === 'personal'
                                            ? 'text-white font-semibold'
                                            : 'text-gray-400 hover:bg-gray-700'
                                    }`}
                                    onClick={() => setActiveSection('personal')}
                                >
                                    <FaUser className={`w-4 h-4 ${activeSection === 'personal' ? 'text-[#C2E53A]' : 'text-gray-400'}`} />
                                    <span>Personal Details</span>
                                </li>

                                <li
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-sm cursor-pointer w-full transition ${
                                        activeSection === 'orders'
                                            ? 'text-white font-semibold'
                                            : 'text-gray-400 hover:bg-gray-700'
                                    }`}
                                    onClick={() => setActiveSection('orders')}
                                >
                                    <FaShoppingBag className={`w-4 h-4 ${activeSection === 'orders' ? 'text-[#C2E53A]' : 'text-gray-400'}`} />
                                    <span>My Orders</span>
                                </li>

                                <li
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-sm cursor-pointer w-full transition ${
                                        activeSection === 'address'
                                            ? 'text-white font-semibold'
                                            : 'text-gray-400 hover:bg-gray-700'
                                    }`}
                                    onClick={() => setActiveSection('address')}
                                >
                                    <FaMapMarkerAlt className={`w-4 h-4 ${activeSection === 'address' ? 'text-[#C2E53A]' : 'text-gray-400'}`} />
                                    <span>Manage Address</span>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Dynamic Content Section */}
                    <div className="p-4 sm:p-6 w-full relative">
                        <div className="absolute w-2/3 h-1/3 bg-gradient-to-br blur-3xl from-[#6FD351] to-[#C2E53A] rounded-3xl opacity-10 left-1/2 transform -translate-x-1/2 top-1/3"></div>
                        {activeSection === 'personal' && (
                            <div>
                                <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-10">
                                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden">
                                        <Image src={profile.avatar} alt="Profile" width={112} height={112} className="rounded-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center text-center sm:text-left w-full">
                                        <h2 className="text-xl font-semibold">{profile.fullName}</h2>
                                        <p className="text-sm text-gray-400">{profile.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
                                    {[
                                        { label: 'Full Name', value: profile.fullName },
                                        { label: 'Address 1', value: profile.address1 },
                                        { label: 'Phone No.', value: profile.phone },
                                        { label: 'Address 2', value: profile.address2 },
                                        { label: 'Email', value: profile.email }
                                    ].map((field, index) => (
                                        <div key={index} className="w-full">
                                            <label className="block text-sm text-gray-400 mb-1">{field.label}</label>
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    value={field.value}
                                                    className="w-full text-sm bg-[#C2E53A2E] border border-[#C2E53A] rounded-sm px-4 py-2.5 pr-10"
                                                />
                                                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                    <Pencil className="w-4 h-4 text-[#beaaaa]" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeSection === 'orders' && (
                            <div>
                            <h2 className="text-4xl mb-6">My Orders</h2>
                            {[
                                { status: 'Delivered', message: 'Delivered On 29 Feb 2024', color: 'bg-green-500', actions: ['Buy Again'] },
                                { status: 'In Process', message: 'Your Order Has Been In Process', color: 'bg-yellow-500', actions: ['Cancel Order'] },
                                { status: 'Shipping', message: 'Expected Delivery On 19 March 2025', color: 'bg-yellow-500', actions: ['Cancel Order'] }
                            ].map((order, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 py-4 space-y-4 sm:space-y-0 text-center sm:text-left">
                                    {/* Left Section: Product Details */}
                                    <div className="flex flex-col sm:flex-row w-full space-y-4 sm:space-y-0 sm:space-x-4 items-center sm:items-start">
                                        <div className="flex-shrink-0">
                                            <Image src="/images/shoe1.png" alt="Product" width={80} height={80} className="rounded-sm" />
                                        </div>
                                        <div className="flex flex-col w-full items-center sm:items-start">
                                            <h3 className="text-lg font-medium">Skull Haunted Sliders</h3>
                                            <p className="text-sm text-gray-400">Size: 6</p>
                                            <p className="text-sm text-gray-400">Qty: 1</p>
                                            <p className="text-sm text-gray-400">Color: Black</p>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <span className={`text-xs ${order.color} text-black px-2 py-1 rounded-sm`}>
                                                    {order.status}
                                                </span>
                                                <p className="text-xs text-gray-400">{order.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-2xl text-white sm:mr-4">₹599</p>
                        
                                    {/* Right Section: Buttons */}
                                    <div className="flex flex-col space-y-2 min-w-[150px] sm:ml-4 w-full sm:w-auto items-center sm:items-start">
                                        <button className="border border-white px-6 py-2 rounded-sm hover:bg-gray-700 transition w-full sm:w-auto">
                                            View Product
                                        </button>
                                        {order.actions.map((action, i) => (
                                            <button
                                                key={i}
                                                className={`px-6 py-2 rounded-sm w-full sm:w-auto ${
                                                    action === 'Cancel Order' ? 'bg-[#9C2918] hover:bg-[#7a1f12]' : 'bg-[#C2E53A] hover:bg-[#a8c72f] text-black'
                                                } transition`}
                                                style={{ minWidth: '150px' }} // Ensure consistent button width
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}

                        {activeSection === 'address' && (
                            <div>
                                <h2 className="text-4xl  mb-4 sm:mb-6">Manage Address</h2>
                                <button className="flex items-center space-x-2 bg-[#C2E53A4D]/30 border border-[#C2E53A] px-6 py-3 sm:px-20 sm:py-4 rounded-sm mb-10 hover:bg-[#B5D632] transition">
                                    <span className="text-lg">+ Add New Address</span>
                                </button>

                                {/* Address List */}
                                <div className="space-y-6">
                                    {[
                                        {
                                            name: "Abhishek Chaudhary",
                                            address: "Opposite Godi Dharam, Behind MohanKheda Warehouse, Off Neemuch",
                                            city: "Ratlam District, Madhya Pradesh",
                                            phone: "+91 9052347856"
                                        },
                                        {
                                            name: "Abhishek Chaudhary",
                                            address: "Opposite Godi Dharam, Behind MohanKheda Warehouse, Off Neemuch",
                                            city: "Ratlam District, Madhya Pradesh",
                                            phone: "+91 9052347856"
                                        },
                                        {
                                            name: "Abhishek Chaudhary",
                                            address: "Opposite Godi Dharam, Behind MohanKheda Warehouse, Off Neemuch",
                                            city: "Ratlam District, Madhya Pradesh",
                                            phone: "+91 9052347856"
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 py-4">
                                            {/* Address Details */}
                                            <div className="flex-1">
                                                <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                                                <p className="text-sm text-gray-400 mb-1">{item.address}</p>
                                                <p className="text-sm text-gray-400 mb-1">{item.city}</p>
                                                <p className="text-sm text-gray-400">{item.phone}</p>
                                            </div>

                                            {/* Edit and Delete Buttons */}
                                            <div className="flex flex-col space-y-2 mt-4 sm:mt-0 w-full sm:w-auto">
                                                <button className="border border-white px-6 py-2 rounded-sm hover:bg-gray-700 transition">
                                                    Edit
                                                </button>
                                                <button className="bg-[#9C2918] text-white px-6 py-2 rounded-sm hover:bg-red-700 transition">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="mt-6 self-center sm:self-end w-full flex justify-center sm:justify-end">
                <button className="flex items-center space-x-2 bg-[#B22B2B] text-white px-6 py-2 rounded-sm hover:bg-red-500/20 transition">
                    <span>Log Out</span>
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}