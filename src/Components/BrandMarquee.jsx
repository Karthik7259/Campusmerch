import React, { useState } from 'react'
// Import local brand images
import AdidasLogo from '../assets/brand/Adidas.png'
import NikeLogo from '../assets/brand/Nike.png'
import BoatLogo from '../assets/brand/boat.png'
import DellLogo from '../assets/brand/dell.png'
import HPLogo from '../assets/brand/hp.png'
import JBLLogo from '../assets/brand/jbl.png'
import AppleLogo from '../assets/brand/Apple.png'
import WildcraftLogo from '../assets/brand/wildcraft.png'
import PumaLogo from '../assets/brand/puma.png'
import SamsungLogo from '../assets/brand/samsung.png'
import SonyLogo from '../assets/brand/sony.png'

const BrandMarquee = () => {
  const [imageErrors, setImageErrors] = useState({});

  // Brand logos - using local images where available, CDN links for others
const brands = [
  { name: 'Adidas', logo: AdidasLogo },
  { name: 'Nike', logo: NikeLogo },
  { name: 'Puma', logo: PumaLogo },
  { name: 'Reebok', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Reebok_2019_logo.svg' },

  { name: 'Sony', logo: SonyLogo },
  { name: 'JBL', logo: JBLLogo },
  { name: 'boAt', logo: BoatLogo },

  { name: 'HP', logo: HPLogo },
  { name: 'Dell', logo: DellLogo },
  { name: 'Apple', logo: AppleLogo },
  { name: 'Samsung', logo: SamsungLogo },
  { name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_Logo.svg' },

  { name: 'Philips', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Philips_logo.svg' },
  { name: 'Canon', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Canon_wordmark.svg' },
  { name: 'Nikon', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Nikon_logo.svg' },

  { name: 'Titan', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Titan_Company_Logo.svg' },
  { name: 'Fastrack', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Fastrack_logo.svg' },
  { name: 'Fossil', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Fossil_logo.svg' },
  { name: 'Timex', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Timex_logo.svg' },
  { name: 'Casio', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Casio_logo.svg' },

  { name: 'Wildcraft', logo: WildcraftLogo },
  { name: 'Decathlon', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Decathlon_Logo.svg' },

  { name: 'American Tourister', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/American_Tourister_logo.svg' },
  { name: 'VIP', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/VIP_Industries_logo.svg' },

  { name: 'Tupperware', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Tupperware_Logo.svg' },
  { name: 'Prestige', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Prestige_Group_logo.svg' },
  { name: 'Hawkins', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Hawkins_Cookers_logo.svg' },

  { name: 'Havells', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Havells_Logo.svg' },
  { name: 'Bajaj', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Bajaj_Electricals_Logo.svg' },
  { name: 'Crompton', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Crompton_Greaves_logo.svg' },

  { name: 'Godrej', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Godrej_Logo.svg' },
  { name: 'Whirlpool', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Whirlpool_Corporation_logo.svg' },
  { name: 'Bosch', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg' },
  { name: 'IFB', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/IFB_Industries_logo.svg' }
];

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
                    {!imageErrors[`${brand.name}-${index}`] ? (
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className='max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100'
                        onError={() => {
                          setImageErrors(prev => ({ ...prev, [`${brand.name}-${index}`]: true }));
                        }}
                      />
                    ) : (
                      <div className='text-gray-400 text-sm font-medium'>{brand.name}</div>
                    )}
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
