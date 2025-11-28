import React from 'react'
import Title from '../Components/Title';
import { assets } from '../assets/assets';
import NewsletteBox from '../Components/NewsletteBox';
const About = () => {
  return (
    <div>
       <div className='text-2xl text-center pt-8 border-t '>
              <Title text1={'ABOUT'} text2={'US'} />
       </div>

        <div className='my-10  flex flex-col md:flex-row gap-16'>
              <img
               className='w-full md:max-w-[450px] '
              src={assets.about_img} alt="" />
              <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Gifts4Corporate is a leading provider of branded merchandise, custom uniform solutions, corporate gifts, hampers, and merchandising services. Partnering with businesses across India, we specialize in delivering unique, practical, and impact-driven products that enhance ROI on marketing campaigns, employee engagement programs, and brand-building initiatives.</p>
                    <p>What sets us apart is our relentless pursuit of innovation and our commitment to meaningful storytelling. This philosophy is beautifully reflected in our signature gift hampers—each thoughtfully curated box includes captivating stories showcasing India’s folk art traditions and the craftsmanship of artisans from diverse regions. By supporting these artisans, we contribute to preserving India’s rich cultural heritage for future generations.</p>
<b className='text-gray-800'>Our mission</b>
<p>
  With meticulous attention to detail and rigorous quality checks, Gifts4Corporate has earned the trust of leading organizations for decades. Whether it’s elevating your brand presence or creating memorable experiences for your stakeholders, we are your reliable partner for all corporate gifting and merchandising needs.

</p>
              </div>
        </div>

        <div className='text-xl py-4 '>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>


      <div className='flex flex-col md:flex-row text-sm mb-20 '>
              <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
                <b>Quality Assurance</b>
                <p className='text-gray-600 '>We meticulously select and vet each product to ensure it meets our stringent quality standards.

</p>

              </div>
              <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
                <b>Convenience:
</b>
                <p className='text-gray-600 '>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.



</p>

              </div>
              <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
                <b>Exceptional Customer Service:
</b>
                <p className='text-gray-600 '>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority

</p>

              </div>
      </div>

      <NewsletteBox/>

    </div>
  )
}

export default About