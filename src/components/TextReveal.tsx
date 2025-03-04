"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    const headingLines = applyTextReveal(headingRef.current, headingSplitRef);
    const paragraphLines = applyTextReveal(
      paragraphRef.current,
      paragraphSplitRef
    );

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
  }, []);

  // Handle text resplitting on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !headingRef.current || !paragraphRef.current)
        return;
  
      // Kill existing animations
      gsap.killTweensOf(".split-line");
  
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
    const resizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    };
  
    window.addEventListener("resize", resizeHandler);
  
    // Store references in local variables
    const headingSplit = headingSplitRef.current;
    const paragraphSplit = paragraphSplitRef.current;
  
    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearTimeout(resizeTimeout);
  
      // Use the stored references in cleanup
      if (headingSplit) {
        headingSplit.revert();
      }
      if (paragraphSplit) {
        paragraphSplit.revert();
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