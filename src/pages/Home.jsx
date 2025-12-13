import React from 'react'
import Hero from '../Components/Hero'
import LastestCollection from '../Components/LastestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import NewsletteBox from '../Components/NewsletteBox'
import FeaturedSlider from '../Components/FeaturedSlider'
import WhyChooseUs from '../Components/WhyChooseUs'
import Categoryslider from '../Components/Categoryslider'
import ProductRating from '../Components/ProductRating'
import CategoryShowcase from '../Components/CategoryShowcase'
import BrandMarquee from '../Components/BrandMarquee'

const Home = () => {
  return (
    <div>
      <div className='mx-1 sm:mx-2 md:mx-4 lg:mx-0.5'>
        <Hero/>
      </div>
      <CategoryShowcase/>
      
      <FeaturedSlider/>
      <Categoryslider/>
      {/* <LastestCollection/> */}

      <BrandMarquee/>
    
      {/* <BestSeller/> */}
      <WhyChooseUs/>
      <OurPolicy/>
      {/* <NewsletteBox/> */}
        <ProductRating/>

    </div>
  )
}

export default Home