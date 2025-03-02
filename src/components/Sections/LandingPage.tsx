"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay} from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { useState } from 'react';

const LandingPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
  const backgroundImages = [
    '/bgslides/bg-1.png',
    '/bgslides/bg-2.png',
    '/bgslides/bg-3.png',
  ];
  const slidestext = [
    'JUNGLE WALKER',
    'LIFE IS GOOD',
    'A4 BLACK',
  ];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Swiper for Background Images */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000, // Delay between slides in milliseconds
          disableOnInteraction: false, // Continue autoplay even after user interaction
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop={true} // Enable infinite loop
        speed={1000} // Transition speed in milliseconds
        className="absolute inset-0 w-full h-full z-0"
      >
        {backgroundImages.map((image, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`Background Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

     
        <main className=' absolute inset-0 z-10 min-h-screen h-screen w-full bg-black/30 '>
        <div className='w-full h-full p-2 flex justify-center items-center relative max-sm:flex-col max-sm:items-start'>
    <h2 className='absolute left-28 text-9xl font-bold font-coluna mb-10 tracking-wide max-sm:relative max-sm:left-4'>THE <br />ARVAN</h2>
    <p className='absolute bottom-6 left-6 text-sm w-[30%] font-montserrat max-sm:relative max-sm:w-[90%]'>Ready to level up your comfort game?
Slip into The Arvan, and feel the difference.
We’ve got the perfect pair waiting for you.</p>
        </div>
        <button className='px-2 py-1 top-6 left-10 absolute border-2 border-white cursor-pointer w-40 z-50'>
        
            
              <span className="text-center font-montserrat text-white text-md transition-all ">{slidestext[activeIndex]}</span>
         
        </button>
    </main>

    <div className="absolute bottom-4 right-8   z-10 flex flex-col items-center space-y-2  w-[35vw]">
        {/* Slide Index (e.g., 1/3) */}
        <div className="text-white text-sm font-semibold font-montserrat  relative h-3  w-full">
          <span className='absolute right-10'>{activeIndex + 1}/{backgroundImages.length}</span>
        </div>

        {/* Progress Indicators (using spans) */}
        <div className="flex space-x-2 w-full">
          {backgroundImages.map((_, index) => (
            <span
              key={index}
              className={`block w-[30%] h-[3px] rounded-md  transition-colors ${
                index === activeIndex ? 'bg-white' : 'bg-gray-500'
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;