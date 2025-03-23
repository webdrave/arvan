"use client"

import { useState } from "react"
import { Eye, Mail, Trash2 } from "lucide-react"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export interface Contact {
  id: number
  name: string
  email: string
  subject: string
  message: string
  updatedAt: string
  Status: string
}

// Fetch contacts
const fetchContacts = async (): Promise<Contact[]> => {
  const { data } = await axios.get<Contact[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send`)
  return data
}

// Delete contact
const deleteContact = async (id: number): Promise<void> => {
  await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send/${id}`)
}

export function ContactList() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isMailFormOpen, setIsMailFormOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [Status, setStatus] = useState("")

  const queryClient = useQueryClient()

  // Fetch contacts
  const { data: contacts, isLoading, error } = useQuery<Contact[], Error>({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  })

  // Mutation for deletion
  const mutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] })
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const handleDelete = (id: number) => {
    mutation.mutate(id, {
      onError: (error) => {
        console.error("Failed to delete contact:", error)
      },
    })
  }

  const handleMailClick = (contact: Contact) => {
    setIsMailFormOpen(true) // Mail form ko open karega
    setSelectedContact(contact) // Selected contact ko set karega
  }

  const handleSendMessage = async () => {
    if (selectedContact) {
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send/${selectedContact.id}`, {
          message: message,
          Status: "Responded",  // Update status along with the message
        })
        queryClient.invalidateQueries({ queryKey: ["contacts"] }) // Refresh the contact list
        setIsMailFormOpen(false) // Close the mail form
        setStatus("")
        setMessage("") // Clear the message input
      } catch (error) {
        console.error("Failed to send message:", error)
      }
    }
  }

  const getStatusColor = (status: string): string => {
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contacts?.map((contact) => (
            <tr key={contact.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.message}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.updatedAt.split("T")[0]}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contact.Status)}`}
                >
                  {contact.Status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => setSelectedContact(contact)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleMailClick(contact)} // Mail button pe click karne par handleMailClick call hoga
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
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

      {/* Mail Form */}
      {isMailFormOpen && selectedContact && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setIsMailFormOpen(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Send Message to {selectedContact.name}</h3>
            <textarea
              className="w-full border p-2 rounded-md mb-4 bg-white"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleSendMessage}>
                Send
              </button>
              <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={() => setIsMailFormOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {selectedContact && !isMailFormOpen && (
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
                <p className="text-sm text-gray-500">Message: {selectedContact.message}</p>
                <p className="text-sm text-gray-500">Date: {selectedContact.updatedAt.split("T")[0]}</p>
                <p className="text-sm text-gray-500">Status: {selectedContact.Status}</p>
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