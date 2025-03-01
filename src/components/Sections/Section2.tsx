import React from "react";
import StrokeMarquee from "../StrokeMarquee";
import GridBackground from "../GridBackground";
import BrushStroke from "../BrushStroke";

const Section2 = () => {
  return (
    <div className="relative w-full min-h-[50dvh] ">
      {/* Right to left */}
      <StrokeMarquee
        direction="left"
        text="STYLISH / COMFORT / AFFORDABLE /&nbsp;"
      />
      {/* Left to Right */}
      <StrokeMarquee
        direction="right"
        text="STYLISH / COMFORT / AFFORDABLE /&nbsp;"
        StrokeColor="2px #6FD351"
      />

      <div className="relative w-full min-h-[50dvh] mt-10">
        <div className="heading relative text-center">
          <BrushStroke />
          <p className="px-[10vw] mt-2 md:px-[20vw] text-xs md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="relative -z-10 ">
          <GridBackground />
        </div>

        <div className=" text-center mt-10">
          <button className=" text-sm md:text-xl font-semibold p-5 bg-gradient-to-r from-[#c3e53a8a] to-[#b3d2343e] text-white uppercase shadow-[0px_0px_15px_#c3e53a] hover:shadow-[0px_0px_25px_#c3e53a] transition-all duration-300">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section2;
