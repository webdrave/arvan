"use client";

import { useEffect, useRef, useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

export default function Testimonials() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Removed duplicate declaration of testimonials
  const [maxHeight, setMaxHeight] = useState<number>(0);

  interface Testimonial {
    id: string;
    description: string;
    ratings: number;
    image: string;
    username: string;
    role: string;
  }

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      return [
        {
          id: "cm8rkjgsp002hbd2fn9cwoblt",
          username: "Vivek Jaiswal",
          role: "UI Designer at WebDrave",
          description: "Valuable & Reliable Slides",
          image:
            "https://res.cloudinary.com/dlqooiewh/image/upload/v1743092950/uploads/icav9g02kyesvrqiesgn.jpg",
          ratings: 5,
        },
        {
          id: "cm8rknwz9002ibd2fl7h3z8nb",
          username: "Abhishek Chaudhary",
          role: "CEO & Founder of WebDrave",
          description: "Edgy, stylish, and super comfortable Sliders",
          image:
            "https://res.cloudinary.com/dlqooiewh/image/upload/v1743093158/uploads/kifvuszkdpdle22clqab.jpg",
          ratings: 5,
        },
        {
          id: "cm8rkq6ct002jbd2fvwt8hcly",
          username: "Khushwant Singh",
          role: "COO & Co-Founder of WebDrave",
          description:
            "ARVAN never disappoints! I've bought multiple pairs, and every design is unique and stylish. The quality is outstanding, and the comfort level is unbeatable.",
          image:
            "https://res.cloudinary.com/dlqooiewh/image/upload/v1743093266/uploads/ub1ljbiev4w6rkx0v6zb.jpg",
          ratings: 5,
        },
        {
          id: "cm8rl0i54002kbd2faw6g01ee",
          username: "Khushi Rawat",
          role: "Project Manager",
          description:
            "Best sliders in the market! The designs are bold, the material is durable, and they fit like a dream. Whether at home or outside, these sliders are my go-to choice. Highly recommended!",
          image:
            "https://res.cloudinary.com/dlqooiewh/image/upload/v1743093746/uploads/tu63jqgzwkpog0t6grjd.jpg",
          ratings: 5,
        },
      ];
    },
  });

  useEffect(() => {
    if (data) {
      setTestimonials(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading testimonials...
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60dvh] lg:min-h-[50vh] w-full py-[10%] px-[5%]">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pb-4 sm:pb-6 text-white text-center">
        <span className="relative">
          Testimonials
          <Image
            src="/Star.svg"
            width={40}
            height={40}
            alt="Star SVG"
            className="absolute -z-[10] -top-1/2 right-0 w-[1em] sm:w-[1.2em] animate-[spin_3s_linear_infinite]"
          />
        </span>
      </h2>

      <div className="relative w-full  xl:max-w-[90%]">
        <Swiper
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: true,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
              centeredSlides: true,
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
          className="mySwiper w-full h-full center-testimonial-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center testimonial-slide"
            >
              <div
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="testimonial-card relative w-full h-[20rem] sm:h-[25rem] md:h-[25rem] bg-[#1E1E1E] border border-gray-700 rounded-xl p-4 sm:p-6  flex flex-col justify-between text-center shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform scale-75 opacity-80 "
              >
                <div className="absolute w-1/2 h-1/2 bg-gradient-to-br blur-2xl from-[#6FD351] to-[#C2E53A] rounded-3xl opacity-30 -top-[10%] left-[20%]"></div>

                <div className="flex flex-col flex-1">
                  <p className="text-4xl sm:text-5xl text-start absolute top-2 left-2">
                    "
                  </p>

                  {/* Testimonial text */}
                  <div className="mt-[15%] mb-3 overflow-y-auto max-h-[50%] pr-2 text-left">
                    <p className="text-white font-semibold text-sm sm:text-base leading-relaxed">
                      {testimonial.description}
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex justify-start mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-base sm:text-lg ${
                          i < testimonial.ratings
                            ? "text-[#FFA43C]"
                            : "text-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-2 mt-auto">
                  <Image
                    src={testimonial.image}
                    width={40}
                    height={40}
                    alt={testimonial.username}
                    className="rounded-full border border-gray-500 w-10 h-10 object-cover"
                  />
                  <div className="text-left">
                    <h3 className="text-white font-semibold text-sm">
                      {testimonial.username}
                    </h3>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={prevRef}
          className="absolute left-[-7%] sm:left-[-5%] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-white text-xl sm:text-2xl md:text-3xl p-2 bg-black/40 rounded-full"
        >
          <FaChevronLeft />
        </button>
        <button
          ref={nextRef}
          className="absolute right-[-7%] sm:right-[-5%] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-white text-xl sm:text-2xl md:text-3xl p-2 bg-black/40 rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Center testimonial effect */}
      <style jsx global>{`
        .center-testimonial-swiper .swiper-slide-active .testimonial-card {
          transform: scale(1) !important;
          opacity: 1 !important;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
