"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Slidebox from "../Slidebox";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { analyticApi } from "@/lib/api/analytic";
import Link from "next/link";

// type Slide = {
//   img: string;
//   name: string;
//   price: number;
//   category: string;
//   discount?: number;
// };
const BestSellers: React.FC = () => {
  // const slides: Slide[] = [
  //   {
  //     img: "/slides/slideImage1.jpg",
  //     name: "Wireless Headphones",
  //     price: 99.99,
  //     category: "Electronics",
  //     discount: 0,
  //   },
  //   {
  //     img: "/slides/slideImage2.jpg",
  //     name: "Leather Jacket",
  //     price: 149.99,
  //     category: "Fashion",
  //     discount: 15,
  //   },
  //   {
  //     img: "/slides/slideImage3.jpg",
  //     name: "Smart Watch",
  //     price: 199.99,
  //     category: "Electronics",
  //     discount: 0,
  //   },
  //   {
  //     img: "/slides/slideImage4.jpg",
  //     name: "Running Shoes",
  //     price: 89.99,
  //     category: "Sports",
  //     discount: 20,
  //   },
  //   {
  //     img: "/slides/slideImage5.jpg",
  //     name: "Life Is Good",
  //     price: 59.99,
  //     category: "Home Appliances",
  //     discount: 0,
  //   },
  //   {
  //     img: "/slides/slideImage6.png",
  //     name: "Red Dragon",
  //     price: 49.99,
  //     category: "Accessories",
  //     discount: 10,
  //   },
  //   {
  //     img: "/slides/slideImage7.jpg",
  //     name: "Leo",
  //     price: 79.99,
  //     category: "Electronics",
  //     discount: 0,
  //   },
  //   {
  //     img: "/slides/slideImage8.jpg",
  //     name: "Cube",
  //     price: 79.99,
  //     category: "Electronics",
  //     discount: 0,
  //   },
  // ];
  const [autoplayDelay, setAutoplayDelay] = useState(3000); // Default delay

  const { data: slides } = useQuery({
    queryKey: ["top-products"],
    queryFn: async () => analyticApi.getBestSellers(),
  });

  useEffect(() => {
    const updateAutoplay = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 450) {
        setAutoplayDelay(1000); // 1s delay for small screens
      } else {
        setAutoplayDelay(3000); // 3s delay for others
      }
    };

    updateAutoplay(); // Initial run
    window.addEventListener("resize", updateAutoplay); // Listen for resize

    return () => {
      window.removeEventListener("resize", updateAutoplay);
    };
  }, []);
  return (
    <div className="w-full min-h-[50dvh] mt-16">
      <div className="flex sm:flex-row gap-4 items-center justify-start w-full px-6">
        <div className="w-full sm:w-fit p-2 flex items-center gap-4 max-sm:gap-1 sm:justify-start">
          <h5 className="font-general_sans text-2xl max-sm:text-xl font-semibold whitespace-nowrap">
            Best Sellers • Best Sellers
          </h5>
          {/* ArrowLeft Icon */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-lime-400 flex items-center justify-center relative overflow-hidden group cursor-pointer -rotate-[130deg] shrink-0">
            <div className="absolute transform transition-transform duration-300 ease-in-out group-hover:-translate-x-[120%]">
              <ArrowLeft className="text-black w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
            </div>
            <div className="absolute transform translate-x-[120%] transition-transform duration-300 ease-in-out group-hover:translate-x-0">
              <ArrowLeft className="text-black w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
            </div>
          </div>

          {/* Text */}
        </div>
      </div>

      <div className="w-full h-auto p-4 mt-10 overflow-hidden">
        {slides && (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: autoplayDelay, // Delay between slides in milliseconds
              disableOnInteraction: true, // Continue autoplay even after user interaction
              reverseDirection: true,
            }}
            loop={true}
            speed={1000}
            breakpoints={{
              450: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              451: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1600: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            className="w-full h-full flex items-center justify-center"
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                className="h-full flex justify-center items-center p-2"
              >
                <Link href={`/product/${slide.productid}`}>
                  <Slidebox
                    image={slide.img}
                    name={slide.name}
                    price={slide.price}
                    category={slide.category}
                    discount={slide.discount}
                    transform="scaleX(-1)"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default BestSellers;
