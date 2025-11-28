import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className=''>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
           <div >
            <img src={assets.logo} className='mb-5 w-32 ' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
Gifts4Corporate is a leading provider of Branded merchandise, Custom uniform solutions, Merchandising, Corporate Gifts and Hampers
            </p>
           </div>

        <div>
            <p className='text-xl font-medium mb-5 '>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600 '>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

     <div>
        <p className='text-xl font-medium mb-5 '>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91-9620044002</li>
            <li>sales@gifts4corp.com</li>
        </ul>
     </div>




        </div>
        <div className=''>
               <hr />
                  <p className='py-5 text-sm text-center'> Copright 2025@ Gift4corp </p>

        </div>
    </div>
  )
}

export default Footer