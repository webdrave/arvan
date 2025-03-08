"use client";
import { forwardRef, useState } from "react";
import { useOverlayContext } from "@/context/OverlayContext";
import Image from "next/image";

const Landing_overlay = forwardRef<HTMLDivElement>((_, ref) => {
  const { animateOverlay } = useOverlayContext();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track hovered item

  const slides = [
    { name: "leather", image: "/slides/1.png" },
    { name: "red dragon", image: "/slides/2.png" },
    { name: "jungle walker", image: "/slides/3.png" },
    { name: "haunted skull", image: "/slides/4.png" },
    { name: "leo", image: "/slides/5.png" },
    { name: "life is sgood", image: "/slides/6.png" },
    { name: "star mustard", image: "/slides/7.png" },
    { name: "the arvan", image: "/slides/9.png" },
    { name: "fancy", image: "/slides/10.png" },
  ];
  return (
    <div
      ref={ref}
      className="w-full h-screen bg-black lg:block fixed top-0 left-0 z-50"
      style={{ transform: "translateY(-100%)", visibility: "hidden" }}
    >
      <div className="w-full h-full flex flex-col gap-2 relative items-center justify-center">
        {hoveredIndex !== null && (
          <Image
            width={500}
            height={500}
            src={slides[hoveredIndex].image}
            alt=""
            className="w-full h-full bg-contain z-10 absolute transition-opacity duration-200"
          />
        )}

        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative z-40"
            onMouseEnter={() => setHoveredIndex(i)} // Set hovered index
            onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index
          >
            <h3
              className={`text-6xl font-coluna font-bold hover:scale-110 cursor-pointer 
                          after:content-[''] after:absolute after:left-[-5%] after:right-[-5%] 
                          after:top-[42%] after:h-[7px] after:bg-[#C2E53A] 
                          after:scale-0 hover:after:scale-100 after:transition-all after:duration-200 after:origin-center
                          transition-opacity duration-400 ${
                            hoveredIndex === null || hoveredIndex === i
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
            >
              {slide.name}
            </h3>
          </div>
        ))}

        <button
          className="absolute top-8 right-8 text-white hover:scale-110 cursor-pointer"
          onClick={() => animateOverlay(false)} // Slide back up when clicked
        >
          ✖ Close
        </button>
      </div>
    </div>
  );
});

Landing_overlay.displayName = "Overlay";
export default Landing_overlay;