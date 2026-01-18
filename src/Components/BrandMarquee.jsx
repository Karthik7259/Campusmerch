import React from 'react'
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
  const brands = [
    { name: 'Adidas', logo: AdidasLogo },
    { name: 'Nike', logo: NikeLogo },
    { name: 'Puma', logo: PumaLogo },
    { name: 'Sony', logo: SonyLogo },
    { name: 'JBL', logo: JBLLogo },
    { name: 'boAt', logo: BoatLogo },
    { name: 'HP', logo: HPLogo },
    { name: 'Dell', logo: DellLogo },
    { name: 'Apple', logo: AppleLogo },
    { name: 'Samsung', logo: SamsungLogo },
    { name: 'Wildcraft', logo: WildcraftLogo },
  ]

  // Duplicate for seamless loop
  const duplicated = [...brands, ...brands, ...brands]

  return (
    <section className="py-16 border-y border-border-light bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-caption text-text-tertiary">Partners</p>
            <h2 className="text-h2 font-semibold mt-3">Brands We Serve</h2>
          </div>
          <p className="text-sm text-text-secondary max-w-xs">
            Trusted by leading brands for premium gifting and merchandise solutions.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="mt-10 overflow-hidden w-full">
        <div
          className="flex items-center gap-12 animate-scroll-left"
          style={{ width: 'max-content' }}
        >
          {duplicated.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="h-16 w-40 flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-14 max-w-full object-contain opacity-80 hover:opacity-100 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandMarquee
