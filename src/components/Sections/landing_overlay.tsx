"use client";
import { forwardRef, useState } from "react";
import { useOverlayContext } from "@/context/OverlayContext";
import Image from "next/image";

const Landing_overlay = forwardRef<HTMLDivElement>((_, ref) => {
  const { animateOverlay } = useOverlayContext();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track hovered item

  const slides = [
    { name: "leather", image: "/Menu-Images/img-1.jpg" },
    { name: "red dragon", image: "/Menu-Images/img-2.jpg" },
    { name: "jungle walker", image: "/Menu-Images/img-3.png" },
    { name: "haunted skull", image: "/Menu-Images/img-4.jpg" },
    { name: "leo", image: "/Menu-Images/img-5.jpg" },
    { name: "life is good", image: "/Menu-Images/img-6.jpg" },
    { name: "star mustard", image: "/Menu-Images/img-7.jpg" },
    { name: "the arvan", image: "/Menu-Images/img-8.jpg" },
    // { name: "fancy", image: "/Menu-Images/img-9.jpg" },
  ];

  return (
    <div
      ref={ref}
      className="w-full h-[100dvh] bg-black lg:block fixed top-0 left-0 z-50"
      style={{ transform: "translateY(-100%)", visibility: "hidden" }}
    >
      <div className="w-full h-full flex flex-col gap-2 relative items-center justify-center">
        {/* Render all images but only show the hovered one */}
        {slides.map((slide, i) => (
          <div
            key={`img-${i}`}
            className={`absolute w-full h-full top-0 left-0 z-10 transition-opacity duration-500 ease-in-out ${
              hoveredIndex === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              width={600}
              height={500}
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative z-40"
            onMouseEnter={() => setHoveredIndex(i)} // Set hovered index
            onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index
          >
            <h3
              className={`text-5xl  md:text-6xl font-coluna font-medium md:font-bold hover:scale-110 cursor-pointer
                    after:content-[''] after:absolute  after:left-[-5%]  after:right-[-5%]  after:top-[42%] after:-translate-y-1/2 after:h-[7px] after:bg-[#C2E53A] after:scale-x-0 hover:after:scale-x-100 after:transition-all after:duration-500 after:origin-left transition-opacity duration-400 ${
                      hoveredIndex === null || hoveredIndex === i
                        ? "opacity-100"
                        : "opacity-0"
                    }
                `}
            >
              {slide.name}
            </h3>
          </div>
        ))}

        <button
          className="absolute z-20 top-8 right-8 text-white hover:scale-110 cursor-pointer"
          onClick={() => {
            animateOverlay(false);
          }} // Slide back up when clicked
        >
          <Image
            alt="Menu Close Button"
            width={50}
            height={100}
            src={"/Menu-Close-Btn.svg"}
          />
        </button>
      </div>
    </div>
  );
});

Landing_overlay.displayName = "Overlay";
export default Landing_overlay;
