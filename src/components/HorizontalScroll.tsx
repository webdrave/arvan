"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import GridBackground from "./GridBackground";
import { useGSAPContext } from "@/context/GSAPContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const wrapperRef = useRef(null);
  const innerDivRef = useRef<HTMLDivElement>(null);
  const headingsContainerRef = useRef(null);
  const paraRef = useRef(null);
  const mobileInnerRef = useRef<HTMLDivElement>(null);
  const mobileHeadingsRef = useRef(null);
  const mobileParaRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      image: "/slides/11.png",
      heading: "Haunted Skull",
      para: "Step into the bold with Haunted Skull Slides – crafted for comfort and designed to turn heads.",
    },
    {
      image: "/shoe5.png",
      heading: "Cube",
      para: "Elevate your style with the Cube Slides – a perfect fusion of futuristic design and everyday comfort.",
    },
    {
      image: "/slides/slideImage6.png",
      heading: "Red Dragon",
      para: "A fierce blend of style and comfort, the Red Dragon slides feature a striking emblem on a sleek black base.",
    },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 100);
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const ctx = useGSAPContext();


  // Desktop horizontal scroll animation
  useGSAP(() => {
    if (isMobile || !innerDivRef.current || !wrapperRef.current) return;

    ctx.add(() => {
      //@ts-expect-error: Property 'offsetWidth' does not exist on type 'HTMLElement'.
      const totalWidth = innerDivRef?.current?.offsetWidth - window.innerWidth;

      // Modified ScrollTrigger configuration
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          anticipatePin: 1,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: true,
          invalidateOnRefresh: true,
          pinSpacing: true,
          fastScrollEnd: true,
        },
      });

      tl.to(innerDivRef.current, {
        x: -totalWidth,
        ease: "none",
      });

      // Make scroll restoration smoother
      ScrollTrigger.normalizeScroll(true);
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      // Heading animations
      const headings: Array<HTMLDivElement> =
        gsap.utils.toArray(".heading-item");
      const headingHeight = 200;

      // Para animation setup
      const paras: Array<HTMLDivElement> = gsap.utils.toArray(".para-item");
      const paraHeight = 150;

      // Set initial positions for paras
      paras.forEach((para, i) => {
        gsap.set(para, {
          y: i === 0 ? 0 : paraHeight,
          opacity: i === 0 ? 1 : 0,
        });
      });

      // Set initial positions for headings
      headings.forEach((heading, i) => {
        gsap.set(heading, {
          y: i === 0 ? 0 : headingHeight * i,
          opacity: i === 0 ? 1 : 0,
        });
      });

      // Create scroll-triggered animations
      headings.forEach((heading, i) => {
        if (i < headings.length - 1) {
          const sectionWidth = totalWidth / (headings.length - 1);
          const startPoint = i * sectionWidth;

          gsap.timeline({
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: `+=${totalWidth}`,
              scrub: 1,
              onUpdate: (self) => {
                const progress = self.progress;
                const sectionProgress =
                  (progress * totalWidth - startPoint) / sectionWidth;

                if (sectionProgress >= 0 && sectionProgress <= 1) {
                  // Current heading moves up and fades
                  gsap.to(heading, {
                    y: -headingHeight * sectionProgress,
                    opacity: 1,
                    duration: 0,
                  });
                  // Next heading moves up and becomes more visible
                  gsap.to(headings[i + 1], {
                    y: headingHeight * (1 - sectionProgress),
                    opacity: 1,
                    duration: 0,
                  });
                }
              },
            },
          });
        }
      });

      // Update para animations
      paras.forEach((para, i) => {
        if (i < paras.length - 1) {
          const sectionWidth = totalWidth / (paras.length - 1);
          const startPoint = i * sectionWidth;

          gsap.timeline({
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: `+=${totalWidth}`,
              scrub: 1,
              onUpdate: (self) => {
                const progress = self.progress;
                const sectionProgress =
                  (progress * totalWidth - startPoint) / sectionWidth;

                if (sectionProgress >= 0 && sectionProgress <= 1) {
                  // Current para moves up
                  gsap.to(para, {
                    y: -paraHeight * sectionProgress,
                    opacity: 1 - 0.7 * sectionProgress,
                    duration: 0,
                  });
                  // Next para moves up from bottom
                  gsap.to(paras[i + 1], {
                    y: paraHeight * (1 - sectionProgress),
                    opacity: 0.3 + 0.7 * sectionProgress,
                    duration: 0,
                  });
                }
              },
            },
          });
        }
      });

      const resizeHandler = () => {
        ScrollTrigger.refresh(true);
      };
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    });

    return () => {
      ctx.revert();
      ScrollTrigger.normalizeScroll(false);
    };
  }, [isMobile]);

  // Mobile setup - initialize positions
  useGSAP(() => {
    if (
      !isMobile ||
      !mobileInnerRef.current ||
      !mobileHeadingsRef.current ||
      !mobileParaRef.current
    )
      return;

    // Reset mobile slide position
    gsap.set(mobileInnerRef.current, {
      x: 0,
    });

    // Initialize mobile headings
    const mobileHeadings: Array<HTMLDivElement> = gsap.utils.toArray(
      ".mobile-heading-item"
    );
    const headingHeight = 200;

    mobileHeadings.forEach((heading, i) => {
      gsap.set(heading, {
        y: i === 0 ? 0 : headingHeight,
        opacity: i === 0 ? 1 : 0.3,
      });
    });

    // Initialize mobile paragraphs
    const mobileParas: Array<HTMLDivElement> =
      gsap.utils.toArray(".mobile-para-item");
    const paraHeight = 200;

    mobileParas.forEach((para, i) => {
      gsap.set(para, {
        y: i === 0 ? 0 : paraHeight,
      });
    });
  }, [isMobile]);

  const handleNext = () => {
    if (isAnimating || activeSlide >= slides.length - 1) return;

    const nextSlide = activeSlide + 1;
    animateToSlide(activeSlide, nextSlide, "next");
    setActiveSlide(nextSlide);
  };

  const handlePrev = () => {
    if (isAnimating || activeSlide <= 0) return;

    const prevSlide = activeSlide - 1;
    animateToSlide(activeSlide, prevSlide, "prev");
    setActiveSlide(prevSlide);
  };

  const animateToSlide = (
    currentSlide: number,
    targetSlide: number,
    direction: "next" | "prev" = "next"
  ) => {
    if (
      !mobileInnerRef.current ||
      !mobileHeadingsRef.current ||
      !mobileParaRef.current
    )
      return;

    const slideWidth = window.innerWidth;
    const duration = 0.8;
    const isForward = direction === "next";

    // 1. Animate the slides horizontally
    gsap.to(mobileInnerRef.current, {
      x: -targetSlide * slideWidth,
      duration,
      ease: "power2.inOut",
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    // 2. Animate headings with the vertical motion
    const mobileHeadings: Array<HTMLDivElement> = gsap.utils.toArray(
      ".mobile-heading-item"
    );
    const headingHeight = 150;

    if (isForward) {
      gsap.to(mobileHeadings[currentSlide], {
        y: -headingHeight,
        opacity: 0.3,
        duration,
        ease: "power2.inOut",
      });

      gsap.fromTo(
        mobileHeadings[targetSlide],
        {
          y: headingHeight,
          opacity: 0.3,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power2.inOut",
        }
      );
    } else {
      gsap.to(mobileHeadings[currentSlide], {
        y: headingHeight,
        opacity: 0.3,
        duration,
        ease: "power2.inOut",
      });

      gsap.fromTo(
        mobileHeadings[targetSlide],
        {
          y: -headingHeight,
          opacity: 0.3,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power2.inOut",
        }
      );
    }

    // 3. Animate paragraphs with the vertical motion
    const mobileParas: Array<HTMLDivElement> =
      gsap.utils.toArray(".mobile-para-item");
    const paraHeight = 400;

    if (isForward) {
      gsap.to(mobileParas[currentSlide], {
        y: -paraHeight,
        opacity: 0.3,
        duration,
        ease: "power2.inOut",
      });

      gsap.fromTo(
        mobileParas[targetSlide],
        {
          y: paraHeight,
          opacity: 0.3,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power2.inOut",
        }
      );
    } else {
      gsap.to(mobileParas[currentSlide], {
        y: paraHeight,
        opacity: 0.3,
        duration,
        ease: "power2.inOut",
      });

      gsap.fromTo(
        mobileParas[targetSlide],
        {
          y: -paraHeight,
          opacity: 0.3,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power2.inOut",
        }
      );
    }
  };

  const router = useRouter();

  if (!isMobile) return null;
  return (
    <>
      {/* Desktop/Laptop Version */}
      <div className={`${isMobile ? "hidden" : "block"}`}>
        <div
          ref={wrapperRef}
          className="wrapper relative w-screen h-screen font-montserrat  overflow-hidden"
        >
          <GridBackground />

          <div className="relative z-10 w-full h-full">
            <div
              ref={innerDivRef}
              className="inner relative flex flex-row flex-nowrap will-change-transform transform-gpu"
              style={{ width: `${slides.length * 100}vw`, height: "100vh" }}
            >
              {slides.map((slide, index) => (
                <div
                  key={`slide-${index}`}
                  className="slide-item flex-shrink-0 w-screen h-full flex items-center justify-center"
                >
                  <div className=" relative">
                    <Image
                      src={slide.image}
                      alt={`Slide image ${index + 1}`}
                      width={800}
                      height={500}
                      priority={index < 2}
                      className={`${index > 0 && "pb-[10%]"}`}
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              ref={headingsContainerRef}
              className="absolute top-[15%] left-0 w-full z-0 -translate-y-1/2 h-[20vh] overflow-hidden"
              style={{ pointerEvents: "none" }}
            >
              {slides.map((slide, index) => (
                <div
                  key={`heading-${index}`}
                  className="heading-item absolute w-full flex items-center justify-center"
                  style={{
                    willChange: "transform",
                    height: "25vh",
                  }}
                >
                  <span className="text-[7vw] font-bold text-white tracking-widest whitespace-nowrap">
                    {slide.heading}
                  </span>
                </div>
              ))}
            </div>

            <div
              ref={paraRef}
              className="absolute top-[75%] left-0 w-full z-0 -translate-y-1/2 h-[10vh] overflow-hidden"
              style={{ pointerEvents: "none" }}
            >
              {slides.map((slide, index) => (
                <div
                  key={`para-${index}`}
                  className="para-item absolute w-full h-[10vh] flex items-center justify-center"
                  style={{
                    willChange: "transform",
                    // height: "10vh",
                  }}
                >
                  <p className="text-[1.5vw] text-center px-20 font-semibold text-white tracking-widest ">
                    {slide.para}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push("/shop")}
              className="absolute hidden md:block md:top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-sm md:text-xl font-semibold p-5 px-10 bg-transparent
                    border border-[#c3e53ab9] bg-gradient-to-r from-[#c3e53a77] via-[#6c7f2069] to-[#6c7f2069] 
                    transition-all duration-300 shadow-[0px_4px_20px_#c3e53a77]"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div
        className={`${
          isMobile ? "block" : "hidden"
        } relative w-screen h-screen font-montserrat  overflow-hidden`}
      >
        <GridBackground />
        <div className="relative w-full h-full">
          <div
            ref={mobileInnerRef}
            className="mobile-inner relative z-10 flex   flex-nowrap will-change-transform transform-gpu h-full"
            style={{ width: `${slides.length * 100}vw` }}
          >
            {slides.map((slide, index) => (
              <div
                key={`mobile-slide-${index}`}
                className="mobile-slide-item flex-shrink-0 w-screen h-full flex items-center justify-center"
              >
                <div className="relative">
                  <Image
                    src={slide.image}
                    alt={`Slide image ${index + 1}`}
                    width={800}
                    height={500}
                    className={`${index > 0 && "pb-[10%]"}`}
                    priority={index === activeSlide}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            ref={mobileHeadingsRef}
            className="absolute top-[20%] md:top-[10%] left-0 w-full z-0 -translate-y-1/2 h-[10vh] overflow-hidden"
            style={{ pointerEvents: "none" }}
          >
            {slides.map((slide, index) => (
              <div
                key={`mobile-heading-${index}`}
                className="mobile-heading-item absolute w-full flex items-center justify-center"
                style={{
                  willChange: "transform",
                  height: "10vh",
                }}
              >
                <span className="text-[10vw] px-2 md:text-[8vw] font-bold text-white tracking-widest whitespace-nowrap">
                  {slide.heading}
                </span>
              </div>
            ))}
          </div>

          <div
            ref={mobileParaRef}
            className="absolute top-[70%] md:top-[75%] left-0 w-full z-0 -translate-y-1/2 h-[15vh] md:h-[20vh] overflow-hidden "
            style={{ pointerEvents: "none" }}
          >
            {slides.map((slide, index) => (
              <div
                key={`mobile-para-${index}`}
                className="mobile-para-item p-5 absolute w-full h-[15vh] md:h-[20vh] flex items-center justify-center"
                style={{
                  willChange: "transform",
                }}
              >
                <p className=" text-[3vw] md:text-[3vw] text-center  font-semibold text-white tracking-widest ">
                  {slide.para}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push("/shop")}
            className="absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-sm md:text-xl font-semibold p-5 px-10 bg-transparent
                    border border-[#c3e53ab9] bg-gradient-to-r from-[#c3e53a77] via-[#6c7f2069] to-[#6c7f2069] 
                    transition-all duration-300 shadow-[0px_4px_20px_#c3e53a77]"
          >
            BUY NOW
          </button>

          {/* Navigation Buttons */}

          <div className="absolute top-1/2 left-0 right-0 flex items-center justify-between px-4 z-20 -translate-y-1/2 w-full">
            <button
              onClick={handlePrev}
              className={`bg-white bg-opacity-80 text-black p-3 rounded-full transition duration-300 ${
                activeSlide === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white"
              }`}
              disabled={activeSlide === 0 || isAnimating}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className={`bg-white bg-opacity-80 text-black p-3 rounded-full transition duration-300 ${
                activeSlide === slides.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white"
              }`}
              disabled={activeSlide === slides.length - 1 || isAnimating}
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalScroll;
