import { useEffect, useState } from "react";
import { assets } from "../assets/assets"; // Fixed: changed to named import

const Hero = () => {
  const slides = [
    {
      image: assets.hero_img,
      badge: "OUR BESTSELLERS",
      title: "Latest Arrivals",
      cta: "SHOP NOW"
    },
    {
      image: assets.hero_img2,
      badge: "TRENDING NOW",
      title: "College Essentials",
      cta: "EXPLORE MORE"
    },
    {
      image: assets.hero_img3,
      badge: "NEW COLLECTION",
      title: "Premium Quality",
      cta: "DISCOVER NOW"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000); // 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full flex flex-col sm:flex-row border border-gray-400 rounded-2xl overflow-hidden shadow-lg '>
      
      {/* Hero Left Section - Text */}
      <div className='w-full sm:w-[35%] flex items-center justify-center py-6 sm:py-0'> 
        <div className='text-[#414141] px-8'> 
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base transition-all duration-700'>
              {slides[currentIndex].badge}
            </p>
          </div>

          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed transition-all duration-700'>
            {slides[currentIndex].title}
          </h1>

          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base transition-all duration-700'>
              {slides[currentIndex].cta}
            </p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      
      {/* Hero Right Section - Image */}
      <img
        src={slides[currentIndex].image}
        alt="hero"
        className='w-full sm:w-[65%] h-full object-cover transition-all duration-700'
      />

    </div>
  );
};

export default Hero;
