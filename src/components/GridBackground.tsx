"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
}

const GridBackground: React.FC<InteractiveGridPatternProps> = ({
  width = 60,
  height = 70,
  squares = [50],
  // squares = [50, 60],
}) => {
  const [horizontal] = squares;
  const [vertical, setVertical] = useState(50);
  const ImageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ImageContainerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      gsap.fromTo(
        ImageContainerRef.current,
        { x: "100vw" },
        {
          x: "0vw",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ImageContainerRef.current,
            start: "top 70%",
            end: "top top",
            scrub: 2,
          },
        }
      );
    });

    mm.add("(max-width: 1024px)", () => {
      // console.log("LG")
      gsap.fromTo(
        ImageContainerRef.current,
        { x: "100vw" },
        {
          x: "0vw",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ImageContainerRef.current,
            start: "top 80%",
            end: "top top",
            scrub: 2,
            // markers: true,
          },
        }
      );
    });

    mm.add("(max-width: 640px)", () => {
      // console.log("MD")
      gsap.fromTo(
        ImageContainerRef.current,
        { x: "100vw" },
        {
          x: "0vw",
          delay: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ImageContainerRef.current,
            start: "top 90%",
            end: "top 20%",
            scrub: 0.5,
            // markers: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const updateVertical = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setVertical(80); // Small screens (sm)
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setVertical(50); // Medium screens (md)
      } else {
        setVertical(60); // Large screens (lg)
      }
    };

    updateVertical(); // Initial check
    window.addEventListener("resize", updateVertical); // Listen for screen resize

    return () => window.removeEventListener("resize", updateVertical);
  }, []);

  return (
    <>
      <div className="absolute w-full h-[120dvh] overflow-hidden">
        <svg
          width={width * horizontal}
          height={height * vertical}
          className="h-auto w-full"
        >
          <defs>
            <radialGradient id="fadeMask" cx="45%" cy="31%" r="40%">
              <stop offset="60%" stopColor="white" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            <mask id="gridMask">
              <rect width="110%" height="110%" fill="url(#fadeMask)" />
            </mask>
          </defs>

          {Array.from({ length: horizontal * vertical }).map((_, index) => {
            const x = (index % horizontal) * width;
            const y = Math.floor(index / horizontal) * height;
            return (
              <rect
                key={index}
                x={x}
                y={y}
                width={width}
                height={height}
                className="stroke-[#C2E53A]/10 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000 fill-transparent"
                mask="url(#gridMask)"
              />
            );
          })}
        </svg>
      </div>

      <div className="relative flex flex-col py-5 gap-10 md:gap-48 overflow-hidden">
        <div className="w-full h-full flex justify-end pt-10 text-end mb-20 ">
          <div className="pr-[8vw] pl-[0vw] w-[60%] md:w-1/2">
            <TextReveal />
          </div>
        </div>
        <div
          ref={ImageContainerRef}
          className="image-container absolute  left-1/2 top-1/2 object-cover overflow-hidden -translate-x-1/2 -translate-y-1/2 "
        >
          <Image src="/slideImg.svg" alt="My SVG" width={1000} height={500} />
        </div>
        <div className="w-full h-full  flex items-end mt-20">
          <div className="pl-[8vw] pr-[0vw] w-[60%] md:w-1/2">
            <TextReveal />
          </div>
        </div>
      </div>
    </>
  );
};

export default GridBackground;
