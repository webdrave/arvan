"use client";

import React, { useEffect, useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import ReviewWritings from "../reviewWriting";
import { useQueries } from "@tanstack/react-query";
import { productApi } from "@/lib/api/productdetails";
import { useCart } from "@/context/CartContext";
import Loading from "@/app/product/[id]/loading";
import Navigation from "../navigation";
import BestSellers from "./bestSellers";
import Footer from "../Footer";
import { productReviewApi } from "@/lib/api/productreview";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import cuid from "cuid";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const ProductDetails: React.FC<{ productId: string }> = ({ productId }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("White");
  const [selectedSize, setSelectedSize] = useState("7");
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const { addToCart } = useCart();
  const router = useRouter();

  const handlecloseReviewModal = () => {
    setShowReviewModal(false);
  };
  const handleWriteReview = () => {
    setShowReviewModal(true);
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ["products", productId],
        queryFn: ({ queryKey }) => productApi.getById(queryKey[1] as string),
      },

      {
        queryKey: ["reviews", productId],
        queryFn: ({ queryKey }) =>
          productReviewApi.getById(queryKey[1] as string),
      },
    ],
  });

  const [productData, fetchedReviews] = results;
  useEffect(() => {
    if (productData.data) {
      // Default color selection - always select first color
      const defaultColor = productData.data.colors[0]?.color || "";
      setSelectedColor(defaultColor);

      // Find the default color's data
      const defaultColorData = productData.data.colors.find(
        (color) => color.color === defaultColor
      );

      if (defaultColorData) {
        // Set available sizes for the selected color
        const sizes = defaultColorData.sizes
          .map((size) => size.size.replace("SIZE_", ""))
          .sort((a, b) => Number(a) - Number(b));

        setAvailableSizes(sizes);

        // Set default selected size (first available size)
        if (sizes.length > 0) {
          setSelectedSize(sizes[0]);
        }

        // Set color-specific images only
        const colorImages: string[] = [];
        defaultColorData.assets.forEach((asset) => {
          if (asset.type === "IMAGE") {
            colorImages.push(asset.asset_url);
          }
        });

        // If no color-specific images, fallback to main product images
        if (colorImages.length === 0) {
          productData.data.assets.forEach((asset) => {
            if (asset.type === "IMAGE") {
              colorImages.push(asset.asset_url);
            }
          });
        }

        setImages(colorImages);

        // Set default selected image
        if (colorImages.length > 0) {
          setSelectedImage(colorImages[0]);
        }
      }
    }
  }, [productData.data]);

  useEffect(() => {
    if (productData.data && selectedColor) {
      // Find the currently selected color's data
      const currentColor = productData.data.colors.find(
        (color) => color.color === selectedColor
      );

      if (currentColor) {
        // Set only color-specific images
        const colorImages: string[] = [];

        // Add only the selected color's assets
        currentColor.assets.forEach((asset) => {
          if (asset.type === "IMAGE") {
            colorImages.push(asset.asset_url);
          }
        });

        // If no color-specific images, fallback to main product images
        if (colorImages.length === 0) {
          productData.data.assets.forEach((asset) => {
            if (asset.type === "IMAGE") {
              colorImages.push(asset.asset_url);
            }
          });
        }

        setImages(colorImages);

        // Update available sizes for the selected color
        const sizes = currentColor.sizes
          .map((size) => size.size.replace("SIZE_", ""))
          .sort((a, b) => Number(a) - Number(b));
        setAvailableSizes(sizes);

        // Update selected size if current selection is no longer available
        if (sizes.length > 0 && !sizes.includes(selectedSize)) {
          setSelectedSize(sizes[0]);
        }

        // Update selectedImage to first color-specific asset when color changes
        if (colorImages.length > 0) {
          setSelectedImage(colorImages[0]);
        }
      }
    }
  }, [productData.data, selectedColor, selectedSize]);

  return (
    <>
      {productData.isLoading ? (
        <Loading />
      ) : productData.data ? (
        <>
          <Navigation />
          <div className="w-full min-h-screen relative mx-auto pt-10 pb-10 px-6 md:px-12 ">
            <div className="w-full h-full relative mx-auto pb-10  grid grid-cols-1 lg:grid-cols-2 items-start gap-6 lg:gap-8 ">
              {/* Left Section - Image Gallery */}
              <div className="flex flex-col  lg:sticky lg:top-5 sm:flex-row items-center gap-4 ">
                <div className="flex sm:flex-col overflow-x-auto gap-3 order-2 sm:order-1">
                  {images.map((img, index) => (
                    <>
                      <Image
                        key={index}
                        src={img || ""}
                        alt="Thumbnail"
                        height={200}
                        width={200}
                        className={`h-12 w-14 cursor-pointer border-2 transition-all duration-200 ${
                          selectedImage === img
                            ? "border-[#c2e53a]"
                            : "border-white"
                        }`}
                        onClick={() => setSelectedImage(img)}
                      />
                    </>
                  ))}
                </div>
                <div className="w-full sm:h-[50dvh] my-10 md:my-0 md:h-[80dvh] order-1 sm:order-2 shadow-[0_4px_20px_rgba(255,255,255,0.3)] rounded-2xl overflow-hidden ">
                  {selectedImage !== "" && (
                    <Image
                      src={selectedImage}
                      height={500}
                      width={500}
                      alt="Product"
                      className="w-full h-full object-cover "
                    />
                  )}
                </div>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row justify-between w-full  items-start sm:items-center mt-3">
                  <div className="md:w-[80%]">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-montserrat uppercase">
                      {productData.data.name}
                    </h2>
                    <div className="flex items-center gap-2  my-2 flex-wrap">
                      <p className="text-white font-montserrat text-lg sm:text-xl font-bold">
                        {/* {remainProduct.currency} */}
                        {productData.data.discountPrice
                          ? productData.data.discountPrice
                          : productData.data.price}
                      </p>
                      {productData.data.discountPrice && (
                        <p className="text-[#858585] text-lg sm:text-xl font-bold  line-through">
                          {productData.data.price}
                        </p>
                      )}
                      {productData.data.discountPrice && (
                        <div className="text-black text-normal border font-montserrat  rounded-xl  bg-[#C2E53A] font-bold px-2">
                          {(
                            ((productData.data.price -
                              productData.data.discountPrice!) /
                              productData.data.price) *
                            100
                          ).toFixed(2)}
                          %
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:w-[20%] flex flex-col items-start sm:items-center gap-1 mt-2 sm:mt-0">
                    <div className="border border-[#c2e53a] px-2 py-1 rounded-md flex items-center gap-1">
                      <Star className="text-[#c2e53a] h-4 w-4" />
                      {fetchedReviews.data &&
                        fetchedReviews.data.reviews.length > 0 && (
                          <>
                            {/* <span className="text-sm">{productData.data.rating}</span> */}
                            <span className="text-sm">
                              {fetchedReviews.data.reviews.length}
                            </span>
                          </>
                        )}
                    </div>
                    <button
                      className="text-[#bababa] w-full text-sm underline"
                      onClick={handleWriteReview}
                    >
                      Write a Review
                    </button>
                    {showReviewModal && (
                      <ReviewWritings
                        onClose={handlecloseReviewModal}
                        productId={productId}
                      />
                    )}
                  </div>
                </div>

                {/* </div> */}
                <hr className="border-gray-600 my-4" />
                {/* Color Selection */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3">
                  <div className="w-full">
                    <p className="text-base mb-4">
                      Select Color: {selectedColor}
                    </p>
                    <div className="flex gap-3 mb-4">
                      {productData.data?.colors.map((color, index) => (
                        <Image
                          key={index}
                          src={
                            color.assets[0].asset_url ||
                            productData.data.assets[0]?.asset_url
                          }
                          width={200}
                          height={200}
                          alt={color.color}
                          className={`w-12 h-12 rounded-sm border-2 cursor-pointer transition-all duration-200 ${
                            selectedColor === color.color
                              ? "border-[#c2e53a]"
                              : "border-white"
                          }`}
                          onClick={() => setSelectedColor(color.color)}
                        />
                      ))}
                    </div>

                    {/* Size Selection */}
                    <div className="flex items-center justify-between w-full">
                      <p className="text-base ">Select Size (UK):</p>
                      {/* <button className="text-white underline text-sm font-medium font-montserrat  w-fit uppercase mt-4 sm:mt-0">
                        Size Chart
                      </button> */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-white underline text-sm font-medium font-montserrat  w-fit uppercase mt-4 sm:mt-0">
                            Size Chart
                          </button>
                        </DialogTrigger>
                        <DialogContent
                          aria-describedby="Size Chart"
                          aria-description="Size Chart"
                          className="bg-black/95 text-white border-white/20"
                        >
                          <div className="p-2 rounded-xl overflow-hidden  object-cover">
                          <Image
                            width={100}
                            height={100}
                            src={"/sizeChart.png"}
                            alt="Size Chart"
                            className="w-full h-full object-cover rounded-md"
                          />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          className={`w-12 h-12 rounded-lg border-2 ${
                            selectedSize === size
                              ? "border-[#c2e53a]"
                              : "border-white"
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {/* Size Chart Button */}

                    {/* Buttons */}

                    <div className="mt-10 flex flex-row sm:flex-col md:flex-row w-full justify-between items-center gap-4">
                      <button
                        className="w-full h-10 bg-[#c2e53a] rounded-xl text-black text-xl font-medium uppercase font-montserrat"
                        onClick={() => {
                          addToCart({
                            id: cuid(),
                            productId: productData.data.id,
                            productVariantId: productData.data.colors
                              .find((color) => color.color === selectedColor)
                              ?.sizes.find(
                                (size) => size.size === `SIZE_${selectedSize}`
                              )?.id,
                            name: productData.data.name,
                            price:
                              productData.data.discountPrice ||
                              productData.data.price,
                            quantity: 1,
                            color: selectedColor,
                            size: selectedSize,
                            asset: selectedImage,
                            image: selectedImage,
                            // stock: stockInfo?.stock || 0,
                            material: productData.data.material,
                          });

                          toast.success(
                            `${productData.data.name} has been added to your cart.`,
                            {
                              duration: 2500,
                            }
                          );

                          router.push("/cart");
                        }}
                      >
                        Buy Now
                      </button>
                      <div className="w-full flex items-center  justify-center gap-1">
                        <button
                          className="w-full h-10 border border-[#c2e53a] text-white  text-sm md:text-xl font-normal uppercase font-montserrat flex items-center justify-center gap-2 rounded-xl"
                          onClick={() => {
                            addToCart({
                              id: cuid(),
                              productId: productData.data.id,
                              productVariantId: productData.data.colors
                                .find((color) => color.color === selectedColor)
                                ?.sizes.find(
                                  (size) => size.size === `SIZE_${selectedSize}`
                                )?.id,
                              name: productData.data.name,
                              price:
                                productData.data.discountPrice ||
                                productData.data.price,
                              quantity: 1,
                              color: selectedColor,
                              size: selectedSize,
                              asset: selectedImage,
                              image: selectedImage,
                              // stock: stockInfo?.stock || 0,
                              material: productData.data.material,
                            });

                            toast.success(
                              `${productData.data.name} has been added to your cart.`,
                              {
                                duration: 2500,
                              }
                            );
                          }}
                        >
                          <ShoppingCart className="h-5 w-5" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="mt-10 border-t border-white pt-4">
                  <h3 className="text-2xl mt-5 sm:text-3xl font-montserrat lg:text-4xl font-bold">
                    Product Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-base lg:text-lg">
                    <p className="text-[#b3b3b3]">Description</p>{" "}
                    <p className="text-white uppercase">
                      {productData.data.description}
                    </p>
                    <p className="text-[#b3b3b3]">Material</p>{" "}
                    <p className="text-white uppercase">
                      {productData.data.material}
                    </p>
                    <p className="text-[#b3b3b3]">Color</p>{" "}
                    <p className="text-white">{selectedColor}</p>
                    <p className="text-[#b3b3b3] ">Name</p>{" "}
                    <p className="text-white ">{productData.data.name}</p>
                    <p className="text-[#b3b3b3]">Size</p>{" "}
                    <p className="text-white">{selectedSize}</p>
                  </div>
                </div>
                <div className="mt-10 border-t border-white pt-4">
                  <h3 className="text-2xl  mt-5 sm:text-3xl lg:text-4xl font-bold">
                    Ratings & Reviews
                  </h3>

                  {/* Rating Overview */}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between my-3  gap-4 sm:gap-0">
                    <div className="flex items-center gap-1">
                      <div className="border border-gray-700 rounded-lg px-3 py-1  flex items-center gap-1">
                        <Star className="text-[#c2e53a]  h-4 w-4" />
                        <span className="text-md">{5}</span>
                      </div>
                      <span className="text-[#bababa] text-sm">
                        {/* Total Ratings {fetchedReviews.reviews.length} */}
                      </span>
                    </div>

                    {/* Rate Product Button */}
                    <button
                      className="text-base px-4 py-2 rounded-lg bg-gradient-to-r from-[#c3e53a85] via-[#3a5b0b] to-[#3a5b0b5e] border border-[#C2E53A] w-full sm:w-48 h-10"
                      onClick={handleWriteReview}
                    >
                      Rate Product
                    </button>
                  </div>

                  {/* Review Filters */}
                  <div className="mt-3 flex flex-wrap gap-3 sm:gap-6">
                    {["Color", "Comfort", "Perfect Fit", "Value for Money"].map(
                      (filter) => (
                        <button
                          key={filter}
                          className="border border-[#c2e53a] px-3 sm:px-6 py-1 rounded-sm text-sm sm:text-base"
                        >
                          {filter}
                        </button>
                      )
                    )}
                  </div>

                  <hr className="opacity-10 my-5 border" />

                  {/* Show Reviews or Empty State */}
                  {fetchedReviews.data &&
                    fetchedReviews.data.reviews.length > 0 && (
                      <div className="flex flex-col gap-2 w-full">
                        {fetchedReviews.data.reviews.map((review, i) => (
                          <>
                            <div
                              className=" w-full  flex  gap-2 items-center"
                              key={i}
                            >
                              <h1 className="font-montserrat text-zinc-500 text-xl">
                                {review.title}
                              </h1>
                              <div className="border border-[#c2e53a] px-2 py-1 rounded-md flex items-center gap-1">
                                <Star className="text-[#c2e53a] h-4 w-4" />
                                <span className="text-sm">
                                  {review.rating}
                                </span>{" "}
                              </div>
                            </div>
                            <div className=" w-full ">
                              <p className="text-sm md:text-lg">
                                {review.description}
                              </p>
                            </div>
                          </>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          <hr className="opacity-50 my-4" />

          <div className="w-full mb-22 h-full">
            <BestSellers />
          </div>

          <div className="w-full mt-10">
            <Footer />
          </div>
        </>
      ) : (
        productData.isError && <h1>Something went wrong.</h1>
      )}
    </>
  );
};
export default ProductDetails;
