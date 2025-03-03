"use client";
import { createContext, useContext, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const gsapContext = gsap.context(() => {});
export const GSAPContext = createContext(gsapContext);

export const GSAPProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(()=>{

        window.addEventListener("resize", ()=>{
          console.log("RELOAD")
          window.location.reload();
        })
      })
  return (
    <GSAPContext.Provider value={gsapContext}>
      {children}
    </GSAPContext.Provider>
  );
};

export const useGSAPContext = () => useContext(GSAPContext);
