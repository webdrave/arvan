"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      <div className="absolute w-full h-[120dvh] overflow-visible">
        <svg
          width={width * horizontal}
          height={height * vertical}
          className="h-auto w-full"
        >
            <defs>
            {/* Center gradient for visibility */}
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset="80%" stopColor="transparent" />
            </radialGradient>

            {/* Edge gradients for shadows */}
            <linearGradient id="topGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="black" />
              <stop offset="60%" stopColor="transparent" />
            </linearGradient>

            <linearGradient id="bottomGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="black" />
              <stop offset="60%" stopColor="transparent" />
            </linearGradient>

            <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="black" />
              <stop offset="60%" stopColor="transparent" />
            </linearGradient>

            <linearGradient id="rightGradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="black" />
              <stop offset="60%" stopColor="transparent" />
            </linearGradient>

            <mask id="gridMask">
              {/* Base white background */}
              <rect width="100%" height="100%" fill="white" />
              
              {/* Center visible area */}
              <rect width="100%" height="100%" fill="url(#centerGradient)" />
              
              {/* Edge shadows */}
              <rect width="100%" height="20%" fill="url(#topGradient)" />
              <rect width="100%" height="20%" y="80%" fill="url(#bottomGradient)" />
              <rect width="20%" height="100%" fill="url(#leftGradient)" />
              <rect width="20%" height="100%" x="80%" fill="url(#rightGradient)" />
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
    </>
  );
};

export default GridBackground;
