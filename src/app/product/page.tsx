"use client";
import Navigation from "@/components/navigation";
import ProductGrid from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { productApi } from "@/lib/api/productdetails";
// import { Product } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Products } from "@/components/admin/products-table";

interface ProductGroup {
  success: boolean;
  products: Products[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export default function ProductPage() {
  const fetchProducts = async ({
    pageParam = 1,
    search = "",
  }: {
    pageParam: number;
    search?: string;
  }) => {
    const limit = 10;
    const response = await productApi.getProducts(pageParam, limit, search, "PUBLISHED");

    return response;
  };

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      return pagination?.currentPage < pagination?.totalPages
        ? pagination.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });


  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      {/* Hero Section */}
      <section className="shop relative h-[100dvh] lg:h-screen flex items-center justify-center overflow-hidden">
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
          <Image
            src={"/slides/2.png"}
            alt="Hero background"
            width={500}
            height={500}
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

        {isLoading ? (
          <>
            <div className="flex justify-center my-16">
              <Loader className="animate-spin" />
            </div>
          </>
        ) : products?.pages && products?.pages.length > 0 ? (
          <>
            {
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.pages.map((group: ProductGroup, index: number) =>
                  group.products.map((product: Products) => (
                    <ProductGrid key={index} product={product} />
                  ))
                )}
              </div>
            }
          </>
        ) : isError ? (
          <h1>Something went wrong</h1>
        ) : null}

        {hasNextPage && (
          <div className="flex justify-center mt-16">
            <Button
              variant="outline"
              className="text-white border-white/20 px-8 py-6 uppercase text-lg hover:bg-white/5"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <Loader className="animate-spin" />
              ) : (
                "Load More"
              )}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
