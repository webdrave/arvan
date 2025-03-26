import Link from "next/link";
import Image from "next/image";
import { Products } from "./admin/products-table";
export default function ProductGrid({ product }: { product: Products }) {
  return (
    <>
      <Link  href={`/product/${product.id}`} className="group">
        <div className="relative aspect-square   shadow-[0_4px_20px_rgba(255,255,255,0.6)] rounded-xl overflow-hidden mb-4">
          {/* {product.saleTag && (
                    <span className="absolute top-2 right-2 bg-[#CCFF00] text-black px-2 py-1 text-sm rounded">
                      {product.saleTag}
                    </span>
                  )} */}
          <Image
            src={product?.assets![0].asset_url || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover  group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <div className="text-right">
              <div className="font-bold">₹{product.discountPrice  }</div>
              {product.price && (
                <div className="text-sm text-gray-400 line-through">
                  ₹{product.price}
                </div>
              )}
            </div>
          </div>
          {/* <p className="text-sm text-gray-400">{product.description}</p> */}
        </div>
      </Link>
    </>
  );
}
