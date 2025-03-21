import Link from "next/link";
import Image from "next/image";
import { Loader } from "lucide-react";

export default function ProductGrid({ products }: { products: any }) {
  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4">
                {product.saleTag && (
                  <span className="absolute top-2 right-2 bg-[#CCFF00] text-black px-2 py-1 text-sm rounded">
                    {product.saleTag}
                  </span>
                )}
                <Image
                  src={product.assets[0]?.asset_url || "/placeholder.svg"}
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
                      <div className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-400">{product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center flex justify-center w-full text-gray-500">
          <Loader />
        </p>
      )}
    </>
  );
}
