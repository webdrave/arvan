import { TestimonialsManager } from "@/components/admin/testimonials-manager"

export default function TestimonialsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#1c1c1c] mb-6">Testimonials Management</h1>
      <TestimonialsManager />
    </div>
  )
}


// "use client";
// import React, { useState, ChangeEvent, FormEvent } from "react";
// import Image from 'next/image';
// import { Upload } from "lucide-react";
// import UploadPopup from "@/components/UploadPopup";

// // Define types for form data
// interface TestimonialFormData {
//   username: string;
//   role: string;
//   description: string;
//   image: string;
//   ratings: string;
// }

// const TestimonialForm: React.FC = () => {
//   const [formData, setFormData] = useState<TestimonialFormData>({
//     username: "",
//     role: "",
//     description: "",
//     image: "",
//     ratings: "",
//   });
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showUploadPopup, setShowUploadPopup] = useState<boolean>(false);

//   // Handle input changes
//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle image upload
//   // const handleImageUpload = (file: File) => {
//   //   setFormData({ ...formData, image: file });
//   //   setShowUploadPopup(false);
//   // };

//   const handleImageUpload = async (imageUrl: string) => {
//     setFormData({ ...formData, image: imageUrl });
//     setShowUploadPopup(false);
//   };

//   // Handle form submission
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const { username, role, description, image, ratings } = formData;

//     if (!username || !role || !description || !image || !ratings) {
//       alert("All fields are required!");
//       return;
//     }

//     const rating = parseInt(ratings, 10);
//     if (isNaN(rating) || rating < 1 || rating > 5) {
//       alert("Ratings must be between 1 and 5");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Upload image
//       const imageData = new FormData();
//       imageData.append("file", image);

//       const imageUploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
//         method: "POST",
//         body: imageData,
//       });

//       if (!imageUploadResponse.ok) {
//         throw new Error("Image upload failed");
//       }

//       const imageUploadData = await imageUploadResponse.json();
//       const imageUrl = imageUploadData.url;

//       // Create testimonial
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonials`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username,
//           role,
//           description,
//           ratings: rating,
//           image: imageUrl,
//         }),
//       });

//       if (response.ok) {
//         alert("Testimonial created successfully!");
//         setFormData({
//           username: "",
//           role: "",
//           description: "",
//           image: "",
//           ratings: "",
//         });
//       } else {
//         const errorData = await response.json();
//         alert("Error: " + errorData.message);
//       }
//     } catch (error) {
//       console.error("Error submitting testimonial:", error);
//       alert("Failed to submit testimonial. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Testimonial</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Username */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             {/* Role */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Role
//               </label>
//               <input
//                 type="text"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               rows={4}
//               className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Ratings */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Rating (1 to 5)
//             </label>
//             <select
//               name="ratings"
//               value={formData.ratings}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="" disabled>Select Rating</option>
//               {[1, 2, 3, 4, 5].map((rating) => (
//                 <option key={rating} value={rating.toString()}>{rating}</option>
//               ))}
//             </select>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Image Upload
//             </label>
//             <div className="mt-1 flex items-center space-x-4">
//               {formData.image ? (
//                 <div className="relative w-32 h-32 border border-gray-200 rounded-md overflow-hidden">
//                   <Image
//                     src={formData.image}
//                     alt="Testimonial image"
//                     layout="fill"
//                     objectFit="cover"
//                   />
//                 </div>
//               ) : (
//                 <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
//                   <span className="text-gray-500">No image</span>
//                 </div>
//               )}
              
//               <button
//                 type="button"
//                 onClick={() => setShowUploadPopup(true)}
//                 className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 flex items-center"
//               >
//                 <Upload size={18} className="mr-2" />
//                 <span>{formData.image ? "Change Image" : "Upload Image"}</span>
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end mt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className={` bg-[#4f507f] text-white py-2 px-4 rounded-md hover:bg-[#3e3f63] transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//             >
//               {loading ? "Submitting..." : "Add Testimonial"}
//             </button>
//           </div>        </form>
//       </div>

//       {/* Upload Popup Component */}
//       {showUploadPopup && (
//         <UploadPopup
//           onSuccess={handleImageUpload}
//           onClose={() => setShowUploadPopup(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default TestimonialForm;