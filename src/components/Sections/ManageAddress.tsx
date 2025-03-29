import { Session } from 'next-auth'
import React from 'react'

const ManageAddress = ({user}: {user: Session["user"]}) => {

  if (!user) {
    return <div>Loading...</div>
  }
  return (
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
                      address:
                        "Opposite Godi Dharam, Behind MohanKheda Warehouse, Off Neemuch",
                      city: "Ratlam District, Madhya Pradesh",
                      phone: "+91 9052347856",
                    },
                    {
                      name: "Abhishek Chaudhary",
                      address:
                        "Opposite Godi Dharam, Behind MohanKheda Warehouse, Off Neemuch",
                      city: "Ratlam District, Madhya Pradesh",
                      phone: "+91 9052347856",
                    },
                    {
                      name: "Abhishek Chaudhary",
                      address:
                        "Opposite Godi Dharam, Behind MohanKheda Warehouse, Off Neemuch",
                      city: "Ratlam District, Madhya Pradesh",
                      phone: "+91 9052347856",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 py-4"
                    >
                      {/* Address Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-1">
                          {item.address}
                        </p>
                        <p className="text-sm text-gray-400 mb-1">
                          {item.city}
                        </p>
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
  )
}

export default ManageAddress