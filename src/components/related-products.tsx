import Image from "next/image"

const products = [
  {
    id: 1,
    name: "LEATHER WHITE",
    price: 499,
    originalPrice: 999,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ARVAN_WEB_DESIGN-p2JyYr15cvjuCiJgh4uVW096O2B1l2.png",
    category: "Men's Flip Flops",
  },
  {
    id: 2,
    name: "HAUNTED SKULL",
    price: 499,
    originalPrice: 999,
    image: "/placeholder.svg?height=300&width=300",
    category: "Men's Flip Flops",
    discount: "50% OFF",
  },
  {
    id: 3,
    name: "THE ARYAN",
    price: 599,
    originalPrice: 1199,
    image: "/placeholder.svg?height=300&width=300",
    category: "Men's Flip Flops",
  },
]

export default function RelatedProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.id} className="group">
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4">
            {product.discount && (
              <span className="absolute top-2 right-2 bg-[#CCFF00] text-black px-2 py-1 text-sm rounded">
                {product.discount}
              </span>
            )}
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">{product.name}</h3>
              <div className="text-right">
                <div className="font-bold">₹{product.price}</div>
                <div className="text-sm text-gray-400 line-through">₹{product.originalPrice}</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">{product.category}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

