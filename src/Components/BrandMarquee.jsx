import React from 'react'

const BrandMarquee = () => {
  // Brand logos - using reliable CDN sources
  const brands = [
    { name: 'Adidas', logo: 'https://logo.clearbit.com/adidas.com' },
    { name: 'Nike', logo: 'https://logo.clearbit.com/nike.com' },
    { name: 'Puma', logo: 'https://logo.clearbit.com/puma.com' },
    { name: 'Reebok', logo: 'https://logo.clearbit.com/reebok.com' },
    { name: 'Sony', logo: 'https://logo.clearbit.com/sony.com' },
    { name: 'JBL', logo: 'https://logo.clearbit.com/jbl.com' },
    { name: 'boAt', logo: 'https://logo.clearbit.com/boat-lifestyle.com' },
    { name: 'HP', logo: 'https://logo.clearbit.com/hp.com' },
    { name: 'Dell', logo: 'https://logo.clearbit.com/dell.com' },
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com' },
    { name: 'LG', logo: 'https://logo.clearbit.com/lg.com' },
    { name: 'Philips', logo: 'https://logo.clearbit.com/philips.com' },
    { name: 'Canon', logo: 'https://logo.clearbit.com/canon.com' },
    { name: 'Nikon', logo: 'https://logo.clearbit.com/nikon.com' },
    { name: 'Titan', logo: 'https://logo.clearbit.com/titan.co.in' },
    { name: 'Fastrack', logo: 'https://logo.clearbit.com/fastrack.in' },
    { name: 'Fossil', logo: 'https://logo.clearbit.com/fossil.com' },
    { name: 'Timex', logo: 'https://logo.clearbit.com/timex.com' },
    { name: 'Casio', logo: 'https://logo.clearbit.com/casio.com' },
    { name: 'Wildcraft', logo: 'https://logo.clearbit.com/wildcraft.com' },
    { name: 'Decathlon', logo: 'https://logo.clearbit.com/decathlon.in' },
    { name: 'Skybags', logo: 'https://logo.clearbit.com/skybags.co.in' },
    { name: 'American Tourister', logo: 'https://logo.clearbit.com/americantourister.com' },
    { name: 'Safari', logo: 'https://logo.clearbit.com/safari.co.in' },
    { name: 'VIP', logo: 'https://logo.clearbit.com/vip.co.in' },
    { name: 'Milton', logo: 'https://logo.clearbit.com/milton.in' },
    { name: 'Tupperware', logo: 'https://logo.clearbit.com/tupperware.com' },
    { name: 'Cello', logo: 'https://logo.clearbit.com/cello.world' },
    { name: 'Prestige', logo: 'https://logo.clearbit.com/prestigesmartKitchen.com' },
    { name: 'Hawkins', logo: 'https://logo.clearbit.com/hawkinscookers.com' },
    { name: 'Pigeon', logo: 'https://logo.clearbit.com/pigeonindia.in' },
    { name: 'Wonderchef', logo: 'https://logo.clearbit.com/wonderchef.com' },
    { name: 'Havells', logo: 'https://logo.clearbit.com/havells.com' },
    { name: 'Bajaj', logo: 'https://logo.clearbit.com/bajajelectricals.com' },
    { name: 'Crompton', logo: 'https://logo.clearbit.com/crompton.co.in' },
    { name: 'Syska', logo: 'https://logo.clearbit.com/syska.co.in' },
    { name: 'Usha', logo: 'https://logo.clearbit.com/usha.com' },
    { name: 'Orient', logo: 'https://logo.clearbit.com/orientelectric.com' },
    { name: 'Voltas', logo: 'https://logo.clearbit.com/voltasbeko.com' },
    { name: 'Blue Star', logo: 'https://logo.clearbit.com/bluestarindia.com' },
    { name: 'Godrej', logo: 'https://logo.clearbit.com/godrej.com' },
    { name: 'Whirlpool', logo: 'https://logo.clearbit.com/whirlpool.com' },
    { name: 'Bosch', logo: 'https://logo.clearbit.com/bosch-home.com' },
    { name: 'IFB', logo: 'https://logo.clearbit.com/ifbappliances.com' },
    { name: 'Kent', logo: 'https://logo.clearbit.com/kent.co.in' },
    { name: 'Eureka Forbes', logo: 'https://logo.clearbit.com/eurekaforbes.com' },
    { name: 'Livpure', logo: 'https://logo.clearbit.com/livpure.com' },
    { name: 'Aquaguard', logo: 'https://logo.clearbit.com/aquaguard.co.in' },
    { name: 'Pureit', logo: 'https://logo.clearbit.com/pureitwater.com' },
  ]

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands]

  return (
    <div className='py-16 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
            Brands We Serve
          </h2>
          <p className='text-gray-600 text-base md:text-lg max-w-2xl mx-auto'>
            Trusted by leading brands worldwide for quality merchandise and corporate solutions
          </p>
          <div className='mt-4 flex items-center justify-center gap-2'>
            <div className='h-1 w-20 bg-gradient-to-r from-transparent via-gray-800 to-transparent'></div>
            <div className='h-2 w-2 bg-gray-800 rounded-full'></div>
            <div className='h-1 w-20 bg-gradient-to-r from-transparent via-gray-800 to-transparent'></div>
          </div>
        </div>

        {/* Marquee Container */}
        <div className='relative'>
          {/* Gradient Overlays */}
          <div className='absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none'></div>
          <div className='absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none'></div>

          {/* Marquee Track */}
          <div className='marquee-container py-8'>
            <div className='marquee-content'>
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={index}
                  className='marquee-item flex-shrink-0 mx-8 group'
                >
                  <div className='bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-100 w-40 h-28 flex items-center justify-center'>
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className='max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100'
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = `<div class="text-gray-600 font-semibold text-lg">${brand.name}</div>`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-6'>
          <div className='text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
            <p className='text-3xl font-bold text-gray-900 mb-1'>500+</p>
            <p className='text-sm text-gray-600'>Brands Served</p>
          </div>
          <div className='text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
            <p className='text-3xl font-bold text-gray-900 mb-1'>10K+</p>
            <p className='text-sm text-gray-600'>Orders Delivered</p>
          </div>
          <div className='text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
            <p className='text-3xl font-bold text-gray-900 mb-1'>98%</p>
            <p className='text-sm text-gray-600'>Client Satisfaction</p>
          </div>
          <div className='text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
            <p className='text-3xl font-bold text-gray-900 mb-1'>50+</p>
            <p className='text-sm text-gray-600'>Cities Covered</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          overflow: hidden;
          position: relative;
        }

        .marquee-content {
          display: flex;
          animation: scroll 40s linear infinite;
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .marquee-item {
          min-width: fit-content;
        }

        @media (max-width: 768px) {
          .marquee-content {
            animation: scroll 30s linear infinite;
          }
        }
      `}</style>
    </div>
  )
}

export default BrandMarquee
