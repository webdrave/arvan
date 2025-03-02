// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';

// Mock database
let products = [
  {
    id: "1",
    name: "Sample Product",
    description: "Sample description",
    price: 99.99,
    categories: ["Electronics"],
    stock: 100,
    images: ["/placeholder.svg"],
    status: "draft",
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = products.find(p => p.id === params.id);
  return NextResponse.json(product || { error: "Product not found" });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updatedProduct = await request.json();
  const index = products.findIndex(p => p.id === params.id);
  
  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  products[index] = { ...products[index], ...updatedProduct };
  return NextResponse.json(products[index]);
}