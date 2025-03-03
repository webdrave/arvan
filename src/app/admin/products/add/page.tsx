import { AddProductForm } from "@/components/admin/add-product-form"

export const addProduct = async (product: any) => {

  try {
    console.log("Adding product:", product);
    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    console.log("Product added successfully!", response);
    const data = await response.json(); 
    console.log(data); // 

    return data; 
  } catch (error) {
    console.error("Error adding product:", error);
    return null; 
  }
};


export default function AddProductPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1c1c1c]">Add New Product</h1>
        <p className="text-gray-500 mt-1">Create a new product to add to your inventory</p>
      </div>
      <AddProductForm />
    </div>
  )
}


