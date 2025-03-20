"use client";

import { useEffect, useRef, useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function Testimonials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  interface Testimonial {
    description: string;
    ratings: number;
    image: string;
    username: string;
    role: string;
  }

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [isLoading , setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonials`);
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
      finally{
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading testimonials...
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold pb-6 text-white text-center">
        <span className="relative">
          Testimonials
          <Image
            src="/Star.svg"
            width={40}
            height={40}
            alt="Star SVG"
            className="absolute -top-6 sm:-top-5 right-0 animate-[spin_3s_linear_infinite]"
          />
        </span>
      </h2>

      {/* Swiper Container */}
      <div className="relative max-w-[90%] md:max-w-5xl w-full p-4 sm:p-8">
        <Swiper
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
              centeredSlides: false,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 50,
              centeredSlides: false,
            },
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation === "object"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            });
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper w-full h-full"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              <div className="relative w-full h-auto bg-[#1E1E1E] border border-gray-700 rounded-xl p-6 sm:p-9 flex flex-col items-center text-center shadow-lg">
                <div className="absolute w-40 h-40 bg-gradient-to-br blur-2xl from-[#6FD351] to-[#C2E53A] rounded-3xl opacity-30 -top-18 left-16"></div>

                <p className="text-6xl text-start absolute top-6 left-6">“ </p>
                <p className="text-white font-semibold mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed mt-14 text-left">
                  {testimonial.description}
            
                </p>
               

                {/* Star Rating */}
                <div className="flex mb-6 sm:mb-8">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg sm:text-xl ${
                        i < testimonial.ratings ? "text-[#FFA43C]" : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    width={50}
                    height={50}
                    alt={testimonial.username}
                    className={`rounded-full border border-gray-500`}
                  />
                  <div className="text-left">
                    <h3 className="text-white font-semibold">
                      {testimonial.username}
                    </h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute left-0 sm:left-[-30px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-white text-xl sm:text-3xl px-2 py-1 sm:px-3 sm:py-2 bg-black/40 sm:bg-black/50 rounded-full"
        >
          <FaChevronLeft />
        </button>
        <button
          ref={nextRef}
          className="absolute right-0 sm:right-[-30px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-white text-xl sm:text-3xl px-2 py-1 sm:px-3 sm:py-2 bg-black/40 sm:bg-black/50 rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}