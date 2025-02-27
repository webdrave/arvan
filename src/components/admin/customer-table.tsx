"use client"

import { useState } from "react"
import { Eye, Mail, Phone } from "lucide-react"

const initialCustomers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8901",
    totalOrders: 5,
    totalSpent: 499.95,
    lastOrderDate: "2023-06-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 8902",
    totalOrders: 3,
    totalSpent: 299.97,
    lastOrderDate: "2023-05-28",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 234 567 8903",
    totalOrders: 7,
    totalSpent: 799.93,
    lastOrderDate: "2023-06-03",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1 234 567 8904",
    totalOrders: 2,
    totalSpent: 159.98,
    lastOrderDate: "2023-05-15",
  },
  {
    id: "5",
    name: "Charlie Davis",
    email: "charlie@example.com",
    phone: "+1 234 567 8905",
    totalOrders: 4,
    totalSpent: 399.96,
    lastOrderDate: "2023-06-02",
  },
]

export function CustomerTable() {
  const [customers] = useState(initialCustomers)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Orders
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Spent
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Order
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.totalOrders}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${customer.totalSpent.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastOrderDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => setSelectedCustomer(customer)} className="text-indigo-600 hover:text-indigo-900">
                  <Eye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCustomer && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Details</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">Name: {selectedCustomer.name}</p>
                <p className="text-sm text-gray-500">Email: {selectedCustomer.email}</p>
                <p className="text-sm text-gray-500">Phone: {selectedCustomer.phone}</p>
                <p className="text-sm text-gray-500">Total Orders: {selectedCustomer.totalOrders}</p>
                <p className="text-sm text-gray-500">Total Spent: ${selectedCustomer.totalSpent.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Last Order Date: {selectedCustomer.lastOrderDate}</p>
              </div>
              <div className="flex justify-center mt-4 space-x-4">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
                  <Mail size={16} className="mr-2" />
                  Email
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center">
                  <Phone size={16} className="mr-2" />
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

