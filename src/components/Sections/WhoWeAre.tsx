import Image from "next/image";

const WhoWeAre = () => {
  return (
    <section className="px-6 sm:px-8 md:px-10  font-montserrat">
      {/* Centered Heading */}
      <div className="text-center relative py-10 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold">
          Who <span className="text-lime-400">We</span>{" "}
          <span className="relative">
            Are?
            <Image
              src={"/Star.svg"}
              width={40}
              height={40}
              alt="Star SVG"
              className="absolute -top-6 sm:-top-5 right-0 animate-[spin_3s_linear_infinite]"
            />
          </span>
        </h2>
      </div>

      {/* Flex/Grid Layout Below */}
      <div className="flex w-full h-full flex-col-reverse lg:flex-row items-start justify-center lg:items-start gap-8">
        {/* Left Content */}
        <div className="w-full md:w-[85%] text-center lg:text-left px-4 sm:px-6">
          <h3 className="text-5xl sm:text-6xl md:text-7xl font-bold">ARVAN</h3>
          <p className="text-gray-300 text-xs sm:text-sm md:text-lg mt-3 md:mt-6 leading-relaxed font-sans ">
            At The Arvan, we’re all about keeping it comfy without sacrificing
            style. We believe the right pair of slippers can totally elevate
            your day whether you’re relaxing at home, running errands, or just
            doing you in style. That’s why we’ve crafted slippers that blend
            coziness with the perfect amount of flair. we keep things simple,
            yet stylish. No over-the-top trends—just clean, classic designs that
            you can rock every day. We’re here for the laid-back moments, but
            with that little extra something that makes you feel like you’ve got
            it all together.
          </p>
          <button className="relative text-lg sm:text-xl font-light px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#c3e53a8a] to-[#b3d2343e] text-white uppercase shadow-[0px_0px_2px_#c3e53a] hover:shadow-[0px_0px_5px_#c3e53a] transition-all duration-300 mt-4 sm:mt-5">
            EXPLORE
          </button>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-[35%] flex justify-center md:justify-start items-center relative">
          <Image
            src="/logo.svg"
            alt="Chocolate"
            width={400}
            height={160}
            className="object-cover -translate-y-10 sm:-translate-y-16 md:-translate-y-10 max-w-[80%] sm:max-w-[60%] md:max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
