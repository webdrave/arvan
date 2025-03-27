"use client";

import { useEffect, useRef, useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { apiClient } from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";

export default function Testimonials() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  interface Testimonial {
    id: string;
    description: string;
    ratings: number;
    image: string;
    username: string;
    role: string;
  }
  const {data, isLoading} = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await apiClient.get("/api/testimonials");
      return response.data.testimonials;
    }
  });

  useEffect(() => {
    if (data) {
      setTestimonials(data);
    }
  }, [data]);

  useEffect(() => {
    const updateHeight = () => {
      if (testimonials.length > 0) {
        const heights = cardRefs.current.map(ref => ref?.offsetHeight || 0);
        const tallestHeight = Math.max(...heights);
        setMaxHeight(tallestHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [testimonials]);

  
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
                swiper.params?.navigation &&
                typeof swiper.params?.navigation === "object"
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
            <SwiperSlide key={testimonial.id} className="flex justify-center items-center">
              <div 
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="relative w-full bg-[#1E1E1E] border border-gray-700 rounded-xl p-6 sm:p-9 flex flex-col items-center text-center shadow-lg"
                style={{ minHeight: maxHeight > 0 ? `${maxHeight}px` : 'auto' }}
              >
                <div className="absolute w-40 h-40 bg-gradient-to-br blur-2xl from-[#6FD351] to-[#C2E53A] rounded-3xl opacity-30 -top-18 left-16"></div>

                <p className="text-6xl text-start absolute top-6 left-6">“</p>
                <div className="flex-1 flex flex-col justify-between mt-14">
                  <p className="text-white font-semibold mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed text-left">
                    {testimonial.description}
                  </p>

                  <div className="flex mb-6 sm:mb-8 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-lg sm:text-xl ${
                          i < testimonial.ratings ? "text-[#FFA43C]" : "text-gray-500"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative flex-shrink-0"> {/* Fixed container size */}
                      <Image
                        src={testimonial.image}
                        fill // Use fill instead of width/height
                        alt={testimonial.username}
                        className="rounded-full border border-gray-500 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-user.jpg';
                        }}
                        unoptimized // Added for external images
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold">
                        {testimonial.username}
                      </h3>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={prevRef}
          className="absolute left-[-30px] sm:left-[-30px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-white text-xl sm:text-3xl px-2 py-1 sm:px-3 sm:py-2 bg-black/40 sm:bg-black/50 rounded-full"
        >
          <FaChevronLeft />
        </button>
        <button
          ref={nextRef}
          className="absolute right-[-30px] sm:right-[-30px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-white text-xl sm:text-3xl px-2 py-1 sm:px-3 sm:py-2 bg-black/40 sm:bg-black/50 rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}