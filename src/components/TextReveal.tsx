// "use client";
// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import SplitType from "split-type";

// const TextReveal: React.FC = () => {
//   const textRef = useRef<HTMLHeadingElement | null>(null);
//   const splitRef = useRef<SplitType | null>(null);

//   useGSAP(() => {
//     if (!textRef.current) return;

//     // Clear any previous instances
//     if (splitRef.current) {
//       splitRef.current.revert();
//     }

//     // Create new Split-Type instance
//     splitRef.current = new SplitType(textRef.current, {
//       types: "lines",
//       lineClass: "split-line",
//     });

//     // Get all lines
//     const lines = splitRef.current.lines;

//     if (!lines || lines.length === 0) return;

//     // Wrap each line in a container for animation
//     lines.forEach((line) => {
//       // Create a wrapper with overflow hidden
//       const wrapper = document.createElement("div");
//       wrapper.className = "line-wrapper";
//       wrapper.style.overflow = "hidden";
//       wrapper.style.display = "block";

//       // Get the parent of the line
//       const parent = line.parentElement;
//       if (!parent) return;

//       // Replace the line with our wrapper
//       parent.insertBefore(wrapper, line);
//       wrapper.appendChild(line);

//       // Set line styles
//       line.style.display = "block";
//     });

//     // Set initial state for animation
//     gsap.set(lines, {
//       yPercent: 100,
//     });

//     // Animate each line
//     gsap.to(lines, {
//       yPercent: 0,
//       duration:2,
//       stagger: 0.2,
//       ease: "power3.out",
//     });
//   }, []);

//   // Handle text resplitting on window resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (splitRef.current && textRef.current) {
//         // Revert previous split
//         splitRef.current.revert();

//         // Run GSAP function again (will create new split)
//         gsap.killTweensOf(".split-line");

//         // Create new Split-Type instance
//         splitRef.current = new SplitType(textRef.current, {
//           types: "lines",
//           lineClass: "split-line",
//         });

//         // Get all lines
//         const lines = splitRef.current.lines;

//         if (!lines || lines.length === 0) return;

//         // Wrap each line in a container for animation
//         lines.forEach((line) => {
//           // Create a wrapper with overflow hidden
//           const wrapper = document.createElement("div");
//           wrapper.className = "line-wrapper";
//           wrapper.style.overflow = "hidden";
//           wrapper.style.display = "block";

//           // Get the parent of the line
//           const parent = line.parentElement;
//           if (!parent) return;

//           // Replace the line with our wrapper
//           parent.insertBefore(wrapper, line);
//           wrapper.appendChild(line);

//           // Set line styles
//           line.style.display = "block";
//         });

//         // Set initial state for animation
//         gsap.set(lines, {
//           yPercent: 100,
//           opacity: 0,
//         });

//         // Animate each line
//         gsap.to(lines, {
//           yPercent: 0,
//           opacity: 1,
//           duration : 2,
//           stagger: 0.15,
//           ease: "power3.out",
//         });
//       }
//     };

//     // Debounce resize event
//     let resizeTimeout: NodeJS.Timeout;
//     window.addEventListener("resize", () => {
//       clearTimeout(resizeTimeout);
//       resizeTimeout = setTimeout(handleResize, 200);
//     });

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       clearTimeout(resizeTimeout);
//       // Clean up split instance
//       if (splitRef.current) {
//         splitRef.current.revert();
//       }
//     };
//   }, []);

//   return (
//     <>

//     <h1
//       ref={textRef}
//       className="uppercase text-xl md:text-2xl lg:text-4xl font-semibold"
//     >
//       PRODUCT DETAILS LOREM IPSUM DOLOR SLT AMAT.
//     </h1>

//     <p  className="text-xs md:text-lg">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore.
//             </p>
//     </>
//   );
// };

// export default TextReveal;

"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TextReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const headingSplitRef = useRef<SplitType | null>(null);
  const paragraphSplitRef = useRef<SplitType | null>(null);

  const applyTextReveal = (
    element: HTMLElement,
    splitRef: React.MutableRefObject<SplitType | null>
  ) => {
    // Clear any previous instances
    if (splitRef.current) {
      splitRef.current.revert();
    }

    // Create new Split-Type instance
    splitRef.current = new SplitType(element, {
      types: "lines",
      lineClass: "split-line",
    });

    // Get all lines
    const lines = splitRef.current.lines;

    if (!lines || lines.length === 0) return lines;

    // Wrap each line in a container for animation
    lines.forEach((line) => {
      // Create a wrapper with overflow hidden
      const wrapper = document.createElement("div");
      wrapper.className = "line-wrapper";
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "block";

      // Get the parent of the line
      const parent = line.parentElement;
      if (!parent) return;

      // Replace the line with our wrapper
      parent.insertBefore(wrapper, line);
      wrapper.appendChild(line);

      // Set line styles
      line.style.display = "block";
    });

    // Set initial state
    gsap.set(lines, {
      yPercent: 100,
      opacity: 0,
    });

    return lines;
  };

  useGSAP(() => {
    if (!containerRef.current || !headingRef.current || !paragraphRef.current)
      return;

    // Apply text reveal to heading
    const headingLines = applyTextReveal(headingRef.current, headingSplitRef);

    // Apply text reveal to paragraph
    const paragraphLines = applyTextReveal(
      paragraphRef.current,
      paragraphSplitRef
    );

    // Create timeline that will be triggered when element enters viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Start animation when top of element is 80% from top of viewport
        toggleActions: "play none none none",
      },
    });

    // Add animations to timeline
    if (headingLines) {
      tl.to(headingLines, {
        yPercent: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    if (paragraphLines) {
      tl.to(
        paragraphLines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=1"
      ); // Overlap with previous animation by 1 second
    }
  }, []);

  // Handle text resplitting on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !headingRef.current || !paragraphRef.current)
        return;

      // Kill existing animations
      gsap.killTweensOf(".split-line");

      // Reapply text reveal to both elements
      const headingLines = applyTextReveal(headingRef.current, headingSplitRef);
      const paragraphLines = applyTextReveal(
        paragraphRef.current,
        paragraphSplitRef
      );

      // Create new timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Add animations to timeline
      if (headingLines) {
        tl.to(headingLines, {
          yPercent: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out",
        });
      }

      if (paragraphLines) {
        tl.to(
          paragraphLines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=1"
        );
      }
    };

    // Debounce resize event
    let resizeTimeout: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);

      // Clean up split instances
      if (headingSplitRef.current) {
        headingSplitRef.current.revert();
      }
      if (paragraphSplitRef.current) {
        paragraphSplitRef.current.revert();
      }

      // Kill any remaining animations
      gsap.killTweensOf(".split-line");

      // Kill ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="text-reveal-container">
      <h1
        ref={headingRef}
        className="uppercase text-xl md:text-2xl lg:text-4xl font-semibold"
      >
        PRODUCT DETAILS LOREM IPSUM DOLOR SLT AMAT.
      </h1>

      <p ref={paragraphRef} className="text-xs md:text-lg mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore.
      </p>
    </div>
  );
};

export default TextReveal;
