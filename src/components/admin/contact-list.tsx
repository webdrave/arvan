"use client"

import { useState } from "react"
import { Eye, Mail, Trash2 } from "lucide-react"

const initialContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Product Inquiry",
    message: "I have a question about...",
    date: "2023-06-15",
    status: "New",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Order Issue",
    message: "There's a problem with my order...",
    date: "2023-06-14",
    status: "Responded",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    subject: "Return Request",
    message: "I'd like to return an item...",
    date: "2023-06-13",
    status: "New",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    subject: "Feedback",
    message: "I wanted to share my experience...",
    date: "2023-06-12",
    status: "Closed",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    subject: "Partnership Proposal",
    message: "I have a business proposal...",
    date: "2023-06-11",
    status: "New",
  },
]

export function ContactList() {
  const [contacts, setContacts] = useState(initialContacts)
  const [selectedContact, setSelectedContact] = useState<any>(null)

  const handleDelete = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-green-100 text-green-800"
      case "Responded":
        return "bg-blue-100 text-blue-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.subject}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contact.status)}`}
                >
                  {contact.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => setSelectedContact(contact)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  <Eye size={18} />
                </button>
                <button className="text-blue-600 hover:text-blue-900 mr-2">
                  <Mail size={18} />
                </button>
                <button onClick={() => handleDelete(contact.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedContact && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Details</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">Name: {selectedContact.name}</p>
                <p className="text-sm text-gray-500">Email: {selectedContact.email}</p>
                <p className="text-sm text-gray-500">Subject: {selectedContact.subject}</p>
                <p className="text-sm text-gray-500">Date: {selectedContact.date}</p>
                <p className="text-sm text-gray-500">Status: {selectedContact.status}</p>
                <p className="text-sm text-gray-500 mt-2">Message:</p>
                <p className="text-sm text-gray-700 mt-1">{selectedContact.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

