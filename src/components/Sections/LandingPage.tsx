"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useState } from "react";
import { useOverlayContext } from "@/context/OverlayContext";
const LandingPage = () => {
  const { animateOverlay } = useOverlayContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const backgroundImages = [
    "/bgslides/bg-1.png",
    // "/bgslides/bg-2.png",
    // "/bgslides/bg-3.png",
  ];

  const slidestext = ["JUNGLE WALKER", "LIFE IS GOOD", "A4 BLACK"];

  return (
    <div className="relative h-screen overflow-hidden ">
      {/* Top ClipPath with logo */}
      <div
        className="absolute max-sm:hidden -top-1 left-0  z-[20] bg-[#121212] w-full h-full  justify-center items-start  object-cover hidden lg:flex "
        style={{
          clipPath:
            "polygon(0px 0px, 40% 0px, 45% 4%, 55% 4%, 60% 0px, 100% 0px)",
        }}
      >
        <Image
          src={"/logo.svg"}
          width={20}
          height={80}
          alt="logo"
          className="object-cover absolute top-1 left-1/2 -translate-x-1/2"
        />
      </div>
      {/* Right ClipPath */}
      <div
        className=" max-sm:hidden absolute top-0 right-0 z-[20] bg-[#121212] w-full h-full hidden lg:block "
        style={{
          clipPath:
            "polygon(100% 0%, 100% 25%, 98% 35%, 98% 55%, 100% 65%, 100% 100%)",
          // "polygon(100% 0%, 100% 25%, 98% 35%, 98% 55%, 100% 65%, 100% 100%)",
        }}
      >
        {/* <h2 className="w-fit  absolute top-[47%] -translate-y-1/2 -right-12 font-semibold text-xl rotate-90  ">
          BEST SELLER
        </h2> */}
      </div>
      {/* Left side */}
      <div
        className=" max-sm:hidden absolute top-0 left-0 z-[20] bg-[#121212] w-full h-full hidden lg:block "
        style={{
          clipPath: "polygon(0% 0%, 0% 25%, 2% 35%, 2% 55%, 0% 65%,0% 100%)",
        }}
      ></div>
      {/* Bottom CLipPath */}
      <div
        className=" max-sm:hidden absolute top-0 z-[20] right-0 bg-[#121212] text-white w-full h-full hidden lg:block "
        style={{
          clipPath: "polygon(0% 100%, 40% 100%, 45% 96%, 55% 96%, 60% 100%)",
        }}
      >
        <h2 className="w-fit font-montserrat absolute bottom-0 hidden  lg:block left-1/2 -translate-x-1/2 text-md   ">
          SCROLL DOWN
        </h2>
      </div>

      {/* Mobile Bottom ClipPath */}
      <div
        className=" absolute top-0 z-[20] right-0 bg-[#121212] text-white w-full h-full block md:hidden "
        style={{
          clipPath: "polygon(0% 100%, 30% 100%, 35% 96%, 65% 96%, 70% 100%)",
        }}
      >
        <h2 className="w-fit  absolute font-montserrat bottom-1 left-1/2 -translate-x-1/2 text-xs  block md:hidden">
          SCROLL DOWN
        </h2>
      </div>

      {/* Swiper for Background Images */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000, // Delay between slides in milliseconds
          disableOnInteraction: false, // Continue autoplay even after user interaction
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop={true} // Enable infinite loop
        speed={1000} // Transition speed in milliseconds
        className="absolute inset-0 w-full h-full z-10"
      >
        {backgroundImages.map((image, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`Background Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <main className=" absolute inset-0 z-10 min-h-screen h-screen w-full bg-black/30 pointer-events-auto">
        <div className="w-full h-full p-2 flex justify-center items-center relative max-sm:flex-col max-sm:items-start">
          <h2
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling (optional)
              animateOverlay(true);
            }}
            className="absolute sm:left-28 md:left-10 text-[25vw] md:text-[20vw] lg:text-[12vw] leading-none font-bold font-coluna tracking-wide max-sm:relative max-sm:left-4"
          >
            THE <br />
            ARVAN
          </h2>
          <p className="absolute bottom-0 md:bottom-6 left-6 text-md w-[25%] md:w-[45%] lg:w-[25%] font-montserrat max-sm:relative max-sm:w-[90%]">
            Ready to level up your comfort game? <br />
            Slip into The Arvan, and feel the difference. We’ve got the perfect
            pair waiting for you.
          </p>
        </div>
      </main>
      <button
        onClick={(e) => {
          e.stopPropagation();
          animateOverlay(true);
        }}
        className="px-2 py-1 top-4 md:top-3 lg:top-6 left-3 md:left-10 absolute border-2 border-white cursor-pointer w-42 lg:w-52 z-[50] "
      >
        <span className="text-center font-montserrat text-white text-xs md:text-md transition-all">
          {slidestext[activeIndex]}
        </span>
      </button>

      {/* <div className="absolute bottom-4 right-8   z-10 flex flex-col items-center space-y-2  w-[35vw]">
        <div className="text-white text-sm font-semibold font-montserrat  relative h-3  w-full">
          <span className="absolute right-10">
            {activeIndex + 1}/{backgroundImages.length}
          </span>
        </div>

        <div className="flex space-x-2 w-full">
          {backgroundImages.map((_, index) => (
            <span
              key={index}
              className={`block w-[30%] h-[3px] rounded-md  transition-colors ${
                index === activeIndex ? "bg-white" : "bg-gray-500"
              }`}
            ></span>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default LandingPage;
