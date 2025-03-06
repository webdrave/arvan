import { Button } from "@/components/ui/button"
import ProductGrid from "@/components/product-grid"
import { SlidersHorizontal } from "lucide-react"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ARVAN_WEB_DESIGN.png-gfnCMpX8nFTGR082iGIcVlYnKF25va.jpeg`}
            alt="Hero background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-wider z-10 text-center">
          STEP <span className="inline-block">INTO</span> STYLE.
        </h1>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-medium">All Products</h2>
          <div className="flex gap-4">
            <Button variant="outline" className="text-white border-white/20">
              SORT BY
            </Button>
            <Button variant="outline" className="text-white border-white/20">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              FILTER
            </Button>
          </div>
        </div>

        <ProductGrid />

        <div className="flex justify-center mt-16">
          <Button variant="outline" className="text-white border-white/20 px-8 py-6 text-lg hover:bg-white/5">
            LOAD MORE
          </Button>
        </div>
      </section>
    </div>
  )
}

