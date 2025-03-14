"use client";
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import Image from 'next/image';
import { Upload } from "lucide-react";

// Define types for form data
interface TestimonialFormData {
  username: string;
  role: string;
  description: string;
  image: File | null;
  ratings: string;
}

const TestimonialForm: React.FC = () => {
  const [formData, setFormData] = useState<TestimonialFormData>({
    username: "",
    role: "",
    description: "",
    image: null,
    ratings: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { username, role, description, image, ratings } = formData;

    if (!username || !role || !description || !image || !ratings) {
      alert("All fields are required!");
      return;
    }

    const rating = parseInt(ratings, 10);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      alert("Ratings must be between 1 and 5");
      return;
    }

    try {
      setLoading(true);

      // Upload image
      const imageData = new FormData();
      imageData.append("file", image);

      const imageUploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
        method: "POST",
        body: imageData,
      });

      if (!imageUploadResponse.ok) {
        throw new Error("Image upload failed");
      }

      const imageUploadData = await imageUploadResponse.json();
      const imageUrl = imageUploadData.url;

      // Create testimonial
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          role,
          description,
          ratings: rating,
          image: imageUrl,
        }),
      });

      if (response.ok) {
        alert("Testimonial created successfully!");
        setFormData({
          username: "",
          role: "",
          description: "",
          image: null,
          ratings: "",
        });
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert("Failed to submit testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Create Testimonial</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Username */}
        <label className="font-semibold">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded-md focus:ring-2 bg-white focus:ring-blue-500"
        />

        {/* Role */}
        <label className="font-semibold mt-2">Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded-md focus:ring-2 bg-white focus:ring-blue-500"
        />

        {/* Description */}
        <label className="font-semibold mt-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 p-2 border rounded-md focus:ring-2 bg-white focus:ring-blue-500"
        />

        {/* Image Upload */}
        <label className="font-semibold mt-2">Image Upload:</label>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            {formData.image && (
              <div className="relative w-32 h-32 border border-gray-200 rounded-md overflow-hidden">
                <Image
                  src={URL.createObjectURL(formData.image)}
                  alt="Product image"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
            <button
              type="button"
              onClick={handleImageUploadClick}
              className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-blue-500 hover:border-blue-500 transition-colors">
              <Upload size={24} />
              <span className="mt-2 text-sm">Add Image</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Ratings */}
        <label className="font-semibold mt-2">Rating (1 to 5):</label>
        <select
          name="ratings"
          value={formData.ratings}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded-md focus:ring-2 bg-white focus:ring-blue-500"
        >
          <option value="" disabled>Select Rating</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating.toString()}>{rating}</option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 p-2 text-white font-semibold rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
