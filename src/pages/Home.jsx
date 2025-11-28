import React from 'react'
import Hero from '../Components/Hero'
import LastestCollection from '../Components/LastestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import NewsletteBox from '../Components/NewsletteBox'
import FeaturedSlider from '../Components/FeaturedSlider'
import WhyChooseUs from '../Components/WhyChooseUs'

const Home = () => {
  return (
    <div>
      <Hero/>
      <FeaturedSlider/>
      <LastestCollection/>
      
      <BestSeller/>
      <WhyChooseUs/>
      <OurPolicy/>
      {/* <NewsletteBox/> */}

    </div>
  )
}

export default Home