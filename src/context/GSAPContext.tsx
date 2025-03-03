"use client";
import { createContext, useContext, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Create GSAP context
const gsapContext = gsap.context(() => {});
export const GSAPContext = createContext(gsapContext);

export const GSAPProvider = ({ children }: { children: React.ReactNode }) => {
  // Reload on window resize (existing logic)
  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log("RELOAD");
      window.location.reload();
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", () => {
        window.location.reload();
      });
    };
  }, []);

  return (
    <GSAPContext.Provider value={gsapContext}>
      {children}
    </GSAPContext.Provider>
  );
};

export const useGSAPContext = () => {
  const context = useContext(GSAPContext);
  if (!context) {
    throw new Error("useGSAPContext must be used within a GSAPProvider");
  }
  return context;
};