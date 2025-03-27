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

  const bannerBackground = [
    "/BannerImages/Banner-1.jpg",
    "/BannerImages/Banner-2.jpg",
    "/BannerImages/Banner-3.jpg",
  ];

  const slidestext = ["JUNGLE WALKER", "LIFE IS GOOD", "A4 BLACK"];

  return (
    <div className="relative h-[100dvh] overflow-hidden ">
      {/* Top ClipPath with logo */}
      <div
        className="clippath1 absolute max-sm:hidden -top-1 left-0  z-[20] bg-[#121212] w-full h-full  justify-center items-start  object-cover hidden lg:flex "
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
        className="clippath1 max-sm:hidden absolute top-0 right-0 z-[20] bg-[#121212] w-full h-full hidden lg:block "
        style={{
          clipPath:
            "polygon(100% 0%, 100% 25%, 98% 35%, 98% 55%, 100% 65%, 100% 100%)",
          // "polygon(100% 0%, 100% 25%, 98% 35%, 98% 55%, 100% 65%, 100% 100%)",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling (optional)
            animateOverlay(true);
          }}
          className="w-fit  absolute top-[45%] -translate-y-1/2 -right-14 font-semibold text-xl rotate-90  "
        >
          BEST SELLER
        </button>
      </div>
      {/* Left side */}
      <div
        className="clippath1 max-sm:hidden absolute top-0 left-0 z-[20] bg-[#121212] w-full h-full hidden lg:block "
        style={{
          clipPath: "polygon(0% 0%, 0% 25%, 2% 35%, 2% 55%, 0% 65%,0% 100%)",
        }}
      ></div>
      {/* Bottom CLipPath */}
      <div
        className="clippath1 max-sm:hidden absolute top-0 z-[20] right-0 bg-[#121212] text-white w-full h-full hidden lg:block "
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
        className=" absolute top-0 z-[20] right-0 bg-[#121212] text-white w-full h-full block lg:hidden "
        style={{
          clipPath: "polygon(0% 100%, 30% 100%, 35% 96%, 65% 96%, 70% 100%)",
        }}
      >
        <h2 className="w-fit  absolute font-montserrat bottom-1 left-1/2 -translate-x-1/2 text-xs md:text-xl  block lg:hidden">
          SCROLL DOWN
        </h2>
      </div>

      <div
        className="absolute top-0 left-0 z-[30] bg-[#121212] w-full h-full block lg:hidden "
        style={{
          clipPath: "polygon(0% 0%, 0% 40%, 5% 45%, 5% 55%, 0% 60%,0% 100%)",
        }}
      ></div>

      <div
        className="clippath1  absolute top-0 right-0 z-[20] bg-[#121212] w-full h-full block lg:hidden "
        style={{
          clipPath:
            "polygon(100% 0%, 100% 40%, 95% 45%, 95% 55%, 100% 60%, 100% 100%)",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling (optional)
            animateOverlay(true);
          }}
          className="w-fit  absolute top-[50%] lg:hidden -translate-y-1/2 -right-7 md:-right-12  font-semibold text-sm md:text-lg rotate-90  "
        >
          BEST SELLER
        </button>
      </div>

      <div
        className="clippath1 absolute  -top-1 left-0  z-[20] bg-[#121212] w-full h-full  justify-center items-start  object-cover flex md:hidden "
        style={{
          clipPath:
            "polygon(0px 0px, 35% 0px, 40% 5%,60% 5%, 65% 0px, 100% 0px)",
        }}
      >
        <Image
          src={"/logo.svg"}
          width={20}
          height={80}
          alt="logo"
          className="object-cover absolute top-2 sm:top-3 left-1/2 -translate-x-1/2"
        />
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
            className="mainText absolute sm:left-28 md:left-10 text-[25vw] md:text-[20vw] lg:text-[12vw] leading-none font-bold font-coluna tracking-wide max-sm:relative max-sm:left-4"
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

      <div className="absolute hidden lg:block w-[35%] h-[35%] right-0 bottom-0 px-5 py-2">
        {/* SVG Clip Path Definition */}
        <svg width="0" height="0">
          <defs>
            <clipPath id="customClip" clipPathUnits="objectBoundingBox">
              <path
                d="M0 0.133C0 0.13 0.001 0.126 0.003 0.123L0.053 0.004C0.054 0.002 0.057 0 0.061 0H0.932H0.994C0.998 0 1 0.002 1 0.006V0.867C1 0.87 0.999 0.873 0.998 0.875L0.947 0.996C0.946 0.998 0.943 1 0.939 1H0.069H0.006C0.002 1 0 0.998 0 0.994V0.133Z"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>

        {/* Swiper with Clipping Path */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          className="absolute inset-0 w-full h-full z-[100] overflow-hidden"
          style={{ clipPath: "url(#customClip)" }}
        >
          {bannerBackground.map((image, index) => (
            <SwiperSlide key={index} className="w-full h-full overflow-hidden">
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
      </div>

      {/* <button
        onClick={(e) => {
          e.stopPropagation();
          animateOverlay(true);
        }}
        className="px-2 lg:hidden py-1 top-4 md:top-3 lg:top-6 left-3 md:left-10 absolute border-2 border-white cursor-pointer w-42 lg:w-52 z-[50] "
      >
        <span className="text-center font-montserrat text-white text-xs md:text-md transition-all">
          {"Best Sellers"}
        </span>
      </button> */}
    </div>
  );
};

export default LandingPage;
