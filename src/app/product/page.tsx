"use client";
import Navigation from "@/components/navigation";
import ProductGrid from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { productApi } from "@/lib/api/productdetails";
import { useQueries } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProductPage() {
  // const [{ data: products = [] }] = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["products"],
  //       queryFn: () => productApi.getAll(),
  //     },
  //   ],
  // });

  const router = useRouter();

  // const handleProductClick = (productId: string) => {
  //   router.push(`/products/${productId}`);
  // };

  //Test Products
  const products = [
    {
      id: 1,
      name: "LEATHER BLACK",
      price: 499,
      category: "Men's Flip Flops",
      image: "/slides/1.png",
    },
    {
      id: 2,
      name: "LEATHER WHITE",
      price: 499,
      category: "Men's Flip Flops",
      image: "/slides/2.png",
    },
    {
      id: 3,
      name: "HAUNTED SKULL",
      price: 599,
      originalPrice: 1199,
      category: "Men's Flip Flops",
      image: "/slides/3.png",
      saleTag: "50% OFF",
    },
    {
      id: 4,
      name: "LEATHER BLACK",
      price: 499,
      category: "Men's Flip Flops",
      image: "/slides/4.png",
    },
    {
      id: 5,
      name: "LEATHER WHITE",
      price: 499,
      category: "Men's Flip Flops",
      image: "/slides/5.png",
    },
    {
      id: 6,
      name: "HAUNTED SKULL",
      price: 599,
      originalPrice: 1199,
      category: "Men's Flip Flops",
      image: "/slides/6.png",
      saleTag: "50% OFF",
    },
    {
      id: 7,
      name: "LEATHER BLACK",
      price: 499,
      category: "Men's Flip Flops",
      image: "/slides/7.png",
    },
    {
      id: 8,
      name: "LEATHER WHITE",
      price: 499,
      category: "Men's Flip Flops",
      image: "/slides/12.png",
    },
    {
      id: 9,
      name: "HAUNTED SKULL",
      price: 599,
      originalPrice: 1199,
      category: "Men's Flip Flops",
      image: "/slides/9.png",
      saleTag: "50% OFF",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative h-[80dvh] lg:h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full bg-gray-200/40   blur-3xl"
          style={{
            boxShadow: "0 0 80px 120px rgba(255, 255, 255, 0.2)",
          }}
        ></div>

        <div className="w-full relative h-full  flex justify-center items-center p-2">
          <h1 className="text-[25vw] md:text-[20vw]  lg:text-[15vw]  absolute top-[45%] md:top-[45%] lg:top-[55%] -translate-y-1/2  left-[25%] lg:left-[32%] -translate-x-1/2 font-coluna font-bold tracking-wider z-10 text-center">
            STEP{" "}
          </h1>
          <img
            src={"/slides/2.png"}
            alt="Hero background"
            className="w-full h-full object-contain relative z-[15] -rotate-12"
          />
          <h2 className="text-4xl sm:top-[45%]  md:top-[45%] lg:top-[45%] -translate-y-1/2  md:text-6xl absolute left-[75%] md:left-[80%] lg:left-[65%] -translate-x-1/2  font-coluna font-bold tracking-wider z-[20] text-center">
            INTO
          </h2>
          <h1 className="text-[25vw] md:text-[20vw] lg:text-[15vw] top-[62%] md:top-[60%] lg:top-[65%] -translate-y-1/2  absolute left-[70%] -translate-x-1/2  font-coluna font-bold tracking-wider z-[20] text-center">
            STYLE.
          </h1>
        </div>
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

        <ProductGrid products={products} />

        <div className="flex justify-center mt-16">
          <Button
            variant="outline"
            className="text-white border-white/20 px-8 py-6 text-lg hover:bg-white/5"
          >
            LOAD MORE
          </Button>
        </div>
      </section>
    </div>
  );
}
