

import React from 'react'

const NewsletteBox = () => {
   const onSubmitHandler = (e) => {
      e.preventDefault(); 
   }

   return (
      <div className='text-center'>
         <p className='text-2xl font-medium text-gray-800'>Contact Information</p>

         <p className='text-gray-600 mt-4 leading-relaxed'>
            <span className='font-semibold'>Address:</span> Gifts4Corporate, Bengaluru, India<br/>
            <span className='font-semibold'>Phone:</span> +91-9620044002<br/>
            <span className='font-semibold'>Email:</span> sales@gifts4corp.com<br/>
            <span className='font-semibold'>Working Hours:</span> Mon – Sat, 10:00 AM – 6:00 PM
         </p>

      </div>
   )
}

export default NewsletteBox
