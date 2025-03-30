"use client"; // Ensure this runs only on the client side

import {
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    const animate = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
};

// Custom Hook to access Lenis if needed
export default function useLenis() {
  return useContext(LenisContext);
}
