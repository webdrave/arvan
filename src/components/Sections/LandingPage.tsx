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
      {/* <div
        className=" max-sm:hidden absolute top-0 right-0 z-[20] bg-[#121212] w-full h-full hidden lg:block "
        style={{
          clipPath:
            "polygon(100% 0px, 100% 25%, 97% 35%, 97% 60%, 100% 70%, 100% 100%, 100% 100%)",
        }}
      >
        <h2 className="w-fit  absolute top-[47%] -translate-y-1/2 -right-12 font-semibold text-xl rotate-90  ">
          BEST SELLER
        </h2>
      </div> */}
      {/* Bottom CLipPath */}
      {/* <div
        className=" max-sm:hidden absolute top-0 z-[20] right-0 bg-[#121212] text-white w-full h-full hidden lg:block "
        style={{
          clipPath: "polygon(100% 100%, 60% 100%, 55% 93%, 45% 93%, 40% 100%)",
        }}
      >
        <h2 className="w-fit  absolute bottom-2 left-1/2 -translate-x-1/2 text-xl   ">
          BEST SELLER
        </h2>
      </div> */}

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
        className="absolute inset-0 w-full h-full z-0"
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
            className="absolute left-28 text-9xl font-bold font-coluna mb-10 tracking-wide max-sm:relative max-sm:left-4"
          >
            THE <br />
            ARVAN
          </h2>
          <p className="absolute bottom-6 left-6 text-sm w-[30%] font-montserrat max-sm:relative max-sm:w-[90%]">
            Ready to level up your comfort game? Slip into The Arvan, and feel
            the difference. We’ve got the perfect pair waiting for you.
          </p>
        </div>
      </main>
      <button
        onClick={(e) => {
          e.stopPropagation();
          animateOverlay(true);
        }}
        className="px-2 py-1 top-6 left-10 absolute border-2 border-white cursor-pointer w-52 z-[100] animate-bounce"
      >
        <span className="text-center font-montserrat text-white text-md transition-all">
          {slidestext[activeIndex]}
        </span>
      </button>

      <div className="absolute bottom-4 right-8   z-10 flex flex-col items-center space-y-2  w-[35vw]">
        {/* Slide Index (e.g., 1/3) */}
        <div className="text-white text-sm font-semibold font-montserrat  relative h-3  w-full">
          <span className="absolute right-10">
            {activeIndex + 1}/{backgroundImages.length}
          </span>
        </div>

        {/* Progress Indicators (using spans) */}
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
      </div>
    </div>
  );
};

export default LandingPage;
