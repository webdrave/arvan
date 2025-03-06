import Link from "next/link"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "LEATHER BLACK",
    price: 499,
    category: "Men's Flip Flops",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "LEATHER WHITE",
    price: 499,
    category: "Men's Flip Flops",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "HAUNTED SKULL",
    price: 599,
    originalPrice: 1199,
    category: "Men's Flip Flops",
    image: "/placeholder.svg?height=400&width=400",
    saleTag: "50% OFF",
  },
  {
    id: 4,
    name: "LEATHER BLACK",
    price: 499,
    category: "Men's Flip Flops",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 5,
    name: "LEATHER WHITE",
    price: 499,
    category: "Men's Flip Flops",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 6,
    name: "HAUNTED SKULL",
    price: 599,
    originalPrice: 1199,
    category: "Men's Flip Flops",
    image: "/placeholder.svg?height=400&width=400",
    saleTag: "50% OFF",
  },
  {
    id: 7,
    name: "LEATHER BLACK",
    price: 499,
    category: "Men's Flip Flops",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 8,
    name: "LEATHER WHITE",
    price: 499,
    category: "Men's Flip Flops",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 9,
    name: "HAUNTED SKULL",
    price: 599,
    originalPrice: 1199,
    category: "Men's Flip Flops",
    image: "/placeholder.svg?height=400&width=400",
    saleTag: "50% OFF",
  },
]

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.name.toLowerCase().replace(" ", "-")}`} className="group">
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4">
            {product.saleTag && (
              <span className="absolute top-2 right-2 bg-[#CCFF00] text-black px-2 py-1 text-sm rounded">
                {product.saleTag}
              </span>
            )}
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <div className="text-right">
                <div className="font-bold">₹{product.price}</div>
                {product.originalPrice && (
                  <div className="text-sm text-gray-400 line-through">₹{product.originalPrice}</div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-400">{product.category}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

