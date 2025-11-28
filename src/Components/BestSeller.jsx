import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import Productitem from './Productitem';

const BestSeller = () => {
    const {products}=useContext(ShopContext);

    const [bestSeller,setBestSeller]=useState([])

   
    useEffect(()=>{
         const collegeProducts=products.filter((item)=>(item.collegeMerchandise === 'IIMB MERCHANDISE STORE'));
         console.log("collegeProducts:", collegeProducts);
         setBestSeller(collegeProducts.slice(0,5));
    },[products])

 



  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8 '>
       <Title text1={'IIMB '} text2={'MERCHANDISE STORE'}/>
       <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
       Explore exclusive IIMB merchandise featuring premium quality apparel and accessories. Show your pride with our official collection designed for students, alumni, and supporters.
       </p>
        </div>


        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
             {
            
                bestSeller.map((item,index)=>(
                  console.log("item in best seller:", item),
                    <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} Mrpprice={item.Mrpprice}/>

                ))
             }
        </div>
  
    


    </div>
  )
}

export default BestSeller