import Footer from "@/components/Footer"
import ProductGallery from "@/components/product-gallery"
import ProductInfo from "@/components/product-info"
import RelatedProducts from "@/components/related-products"
import Link from "next/link"

export default function ProductPage({ params }: { params: { id: number } }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <Link href="/products" className="hover:text-white">
            All Products
          </Link>
          <span>/</span>
          <Link href="/products/slippers" className="hover:text-white">
            Slippers
          </Link>
          <span>/</span>
          <span>Red Dragon</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <ProductGallery />
          <ProductInfo />
        </div>
      </div>

      {/* Best Sellers Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold">Best Seller • Best Seller</h2>
          <div className="w-12 h-12 rounded-full bg-[#CCFF00] flex items-center justify-center">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        <RelatedProducts />
      </section>
      <Footer></Footer>
    </div>
  )
}

