// "use client";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import Image from "next/image";
// import React, { useRef } from "react";

// const BrushStroke = () => {
//   const clipPathRef = useRef<HTMLImageElement>(null);

//   useGSAP(() => {
//     if (!clipPathRef.current) return;

//     gsap.set(clipPathRef.current, {
//       opacity: 0,
//       clipPath: "inset(0 100% 0 0)",
//     });

//     gsap.to(clipPathRef.current, {
//       opacity: 1,
//       delay: 0.5,
//       duration: 0.3,
//       onComplete: () => {
//         gsap.to(clipPathRef.current, {
//           clipPath: "inset(0 0% 0 0)",
//           duration: 1.5,
//           ease: "power2.out",
//         });
//       },
//     });
//   }, []);

//   return (
//     <>
//       <h1 className="text-lg md:text-3xl lg:text-5xl px-[5vw] md:px-[15vw] lg:px-[10vw] leading-none uppercase font-semibold relative">
//         ARVAN CRAFTED FOR THOSE WHO VALUE COMFORT AND{" "}
//         <span className="relative inline-block">
//           STYLE.
//           <Image
//             src="/Vector.svg"
//             alt="Brush Stroke"
//             width={1000}
//             height={1000}
//             className="absolute left-0 top-0 md:top-1 lg:top-0 -z-10 opacity-0"
//             ref={clipPathRef}
//             style={{ clipPath: "inset(0 100% 0 0)" }}
//           />
//         </span>
//       </h1>
//     </>
//   );
// };

// export default BrushStroke;


"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef, useEffect } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const BrushStroke = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipPathRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!clipPathRef.current || !containerRef.current) return;

    // Set initial state
    gsap.set(clipPathRef.current, {
      opacity: 0,
      clipPath: "inset(0 100% 0 0)",
    });

    // Create timeline that will be triggered when element enters viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", // Start animation when top of element is 75% from top of viewport
        toggleActions: "play none none none"
      }
    });

    // Add animations to timeline
    tl.to(clipPathRef.current, {
      opacity: 1,
      duration: 0.3,
    }).to(clipPathRef.current, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.5,
      ease: "power2.out",
    });
  }, []);

  // Clean up ScrollTrigger instances on unmount
  useEffect(() => {
    return () => {
      // Kill all ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      <h1 className="text-lg md:text-3xl lg:text-5xl px-[5vw] md:px-[15vw] lg:px-[10vw] leading-none uppercase font-semibold relative">
        ARVAN CRAFTED FOR THOSE WHO VALUE COMFORT AND{" "}
        <span className="relative inline-block">
          STYLE.
          <Image
            src="/Vector.svg"
            alt="Brush Stroke"
            width={1000}
            height={1000}
            className="absolute left-0 top-0 md:top-1 lg:top-0 -z-10 opacity-0"
            ref={clipPathRef}
            style={{ clipPath: "inset(0 100% 0 0)" }}
          />
        </span>
      </h1>
    </div>
  );
};

export default BrushStroke;