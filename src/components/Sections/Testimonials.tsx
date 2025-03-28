"use client";

import { useEffect, useRef, useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
// import { apiClient } from "@/lib/axiosClient";
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
      // const response = await apiClient.get("https://arvan-kappa.vercel.app/backend/api/testimonials");
      // return response.data.testimonials
      return [{"id":"cm8rkjgsp002hbd2fn9cwoblt","username":"Vivek Jaiswal","role":"UI Designer at WebDrave","description":"Valuable & Reliable Slides","image":"https://res.cloudinary.com/dlqooiewh/image/upload/v1743092950/uploads/icav9g02kyesvrqiesgn.jpg","ratings":5,"createdAt":"2025-03-27T16:29:15.873Z","updatedAt":"2025-03-27T16:29:15.873Z"},{"id":"cm8rknwz9002ibd2fl7h3z8nb","username":"Abhishek Chaudhary","role":"CEO & Founder of WebDrave","description":"Edgy, stylish, and super comfortable Sliders","image":"https://res.cloudinary.com/dlqooiewh/image/upload/v1743093158/uploads/kifvuszkdpdle22clqab.jpg","ratings":5,"createdAt":"2025-03-27T16:32:43.475Z","updatedAt":"2025-03-27T16:32:43.475Z"},{"id":"cm8rkq6ct002jbd2fvwt8hcly","username":"Khushwant Singh","role":"COO & Co-Founder of WebDrave","description":"ARVAN never disappoints! I’ve bought multiple pairs, and every design is unique and stylish. The quality is outstanding, and the comfort level is unbeatable.","image":"https://res.cloudinary.com/dlqooiewh/image/upload/v1743093266/uploads/ub1ljbiev4w6rkx0v6zb.jpg","ratings":5,"createdAt":"2025-03-27T16:34:28.938Z","updatedAt":"2025-03-27T16:34:28.938Z"},{"id":"cm8rl0i54002kbd2faw6g01ee","username":"Khushi Rawat","role":"Project Manager","description":"Best sliders in the market! The designs are bold, the material is durable, and they fit like a dream. Whether at home or outside, these sliders are my go-to choice. Highly recommended!","image":"https://res.cloudinary.com/dlqooiewh/image/upload/v1743093746/uploads/tu63jqgzwkpog0t6grjd.jpg","ratings":5,"createdAt":"2025-03-27T16:42:30.771Z","updatedAt":"2025-03-27T16:42:30.771Z"}]
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
        {testimonials.map((testimonial: Testimonial, index) => (
  <SwiperSlide key={index} className="flex justify-center items-center">
    <div className="relative w-full h-80 bg-[#1E1E1E] border border-gray-700 rounded-xl p-4 sm:p-6 flex flex-col justify-between text-center shadow-lg overflow-hidden">
      <div className="absolute w-40 h-40 bg-gradient-to-br blur-2xl from-[#6FD351] to-[#C2E53A] rounded-3xl opacity-30 -top-18 left-16"></div>
      
      <div className="flex flex-col flex-1">
        <p className="text-4xl sm:text-5xl text-start absolute top-3 left-4"> “</p>
        
        {/* Testimonial text - made scrollable if needed */}
        <div className="mt-10 mb-3 overflow-y-auto max-h-32 pr-2 text-left">
          <p className="text-white font-semibold text-xs sm:text-sm leading-relaxed">
            {testimonial.description}
          </p>
        </div>
      
        {/* Star Rating - reduced margins */}
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-base sm:text-lg ${
                i < testimonial.ratings ? "text-[#FFA43C]" : "text-gray-500"
              }`}
            />
          ))}
            

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
        </div>
      </div>
      
      {/* User Info - kept at bottom with reduced size */}
      <div className="flex items-center gap-2 mt-auto">
        <Image
          src={testimonial.image}
          width={40}
          height={40}
          alt={testimonial.username}
          className="rounded-full border border-gray-500"
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