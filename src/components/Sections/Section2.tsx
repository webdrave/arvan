import React from "react";
import StrokeMarquee from "../StrokeMarquee";
import BrushStroke from "../BrushStroke";

import HorizontalScroll from "../HorizontalScroll";


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

        <div className="relative  overflow-x-hidden ">
          <HorizontalScroll />
        </div>
      </div>
    </div>
  );
};

export default Section2;