"use client";
import PageLoader from "@/components/Loader";
import Navigation from "@/components/navigation";
import ProductGrid from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { productApi } from "@/lib/api/productdetails";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { Products } from "@/components/admin/products-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type SortOption = {
  label: string;
  value:
    | "price_asc"
    | "price_desc"
    | "name_asc"
    | "name_desc"
    | "newest"
    | "oldest";
};

const sortOptions: SortOption[] = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Name: Z to A", value: "name_desc" },
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
];

type FilterOptions = {
  priceRanges: string[];
};

const filterOptions = {
  priceRanges: ["Under ₹1000", "₹1000 - ₹2000", "₹2000 - ₹3000", "Above ₹3000"],
};

export default function ProductPage() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filters, setFilters] = useState<FilterOptions>({
    priceRanges: [],
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      window.addEventListener("load", () => setPageLoaded(true));
    }

    return () =>
      window.removeEventListener("load", () => setPageLoaded(true));
  }, []);

  const fetchProducts = async ({
    pageParam = 1,
    search = "",
  }: {
    pageParam: number;
    search?: string;
  }) => {
    const limit = 12;
    const response = await productApi.getProducts(
      pageParam,
      limit,
      search,
      "PUBLISHED"
    );

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
    queryKey: ["products", filters, sortBy],
    queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      return pagination?.currentPage < pagination?.totalPages
        ? pagination.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const getAllProducts = useMemo(() => {
    if (!products?.pages) return [];

    const sortProducts = (products: Products[]) => {
      return [...products].sort((a, b) => {
        switch (sortBy) {
          case "price_asc":
            return (a.price || 0) - (b.price || 0);
          case "price_desc":
            return (b.price || 0) - (a.price || 0);
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "newest":
            return (
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
            );
          case "oldest":
            return (
              new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime()
            );
          default:
            return 0;
        }
      });
    };

    const matchesFilters = (product: Products) => {
      if (filters.priceRanges.length > 0) {
        const price = product.price || 0;
        const matchesPrice = filters.priceRanges.some((range) => {
          switch (range) {
            case "Under ₹1000":
              return price < 1000;
            case "₹1000 - ₹2000":
              return price >= 1000 && price <= 2000;
            case "₹2000 - ₹3000":
              return price >= 2000 && price <= 3000;
            case "Above ₹3000":
              return price > 3000;
            default:
              return true;
          }
        });
        if (!matchesPrice) return false;
      }
      return true;
    };

    const allProducts = products.pages.flatMap((group) => group.products);
    const filteredProducts = allProducts.filter(matchesFilters);
    return sortProducts(filteredProducts);
  }, [products, filters, sortBy]);

  const handleFilterChange = (type: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  if (!pageLoaded) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen font-montserrat bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="shop relative h-[70dvh] lg:h-screen xl:h-[80dvh] flex items-center justify-center">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full bg-gray-200/40 blur-3xl"
          style={{ boxShadow: "0 0 80px 120px rgba(255, 255, 255, 0.2)" }}
        ></div>

        <div className="w-full relative h-full flex justify-center items-center p-2">
          <h1 className="text-[25vw] md:text-[20vw] lg:text-[15vw] absolute top-[45%] left-[25%] lg:left-[35%] -translate-x-1/2 -translate-y-1/2 font-coluna font-bold tracking-wider z-10 text-center">
            STEP
          </h1>
          <Image
            src={"/slides/2.png"}
            alt="Hero background"
            width={500}
            height={500}
            className="w-full h-full object-contain relative z-[15] -rotate-12"
          />
          <h1 className="text-[25vw] md:text-[20vw] lg:text-[15vw] top-[62%] absolute left-[70%] -translate-x-1/2 -translate-y-1/2 font-coluna font-bold tracking-wider z-[20] text-center flex flex-col leading-none">
            <span className="text-4xl inline-block">INTO</span>STYLE.
          </h1>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full pb-10">
        <div className="flex justify-between items-center mb-8 px-5">
          <h2 className="text-md md:text-xl font-medium">All Products</h2>
          <div className="flex items-center justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-white border-white/20 text-xs"
                >
                  SORT BY:{" "}
                  {sortOptions.find((option) => option.value === sortBy)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-white/20">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    className="text-white hover:bg-white/10 cursor-pointer"
                    onClick={() => setSortBy(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-white flex items-center border-white/20"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/95 text-white border-white/20">
                <DialogHeader>
                  <DialogTitle>Filter Products</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Price Range</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {filterOptions.priceRanges.map((range) => (
                        <div
                          key={range}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={range}
                            checked={filters.priceRanges.includes(range)}
                            onCheckedChange={() =>
                              handleFilterChange("priceRanges", range)
                            }
                            className="border-white/20"
                          />
                          <Label htmlFor={range} className="text-white">
                            {range}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-16">
            <Loader className="animate-spin" />
          </div>
        ) : isError ? (
          <h1 className="text-center mt-16">Something went wrong</h1>
        ) : getAllProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
            {getAllProducts.map((product: Products, i: number) => (
              <ProductGrid
                key={`${product.id}-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center my-16">
            <p>No Products available for this range.</p>
          </div>
        )}

        {hasNextPage && (
          <div ref={loadMoreRef} className="flex justify-center mt-16">
            <Loader className="animate-spin" />
          </div>
        )}
      </section>
    </div>
  );
}
