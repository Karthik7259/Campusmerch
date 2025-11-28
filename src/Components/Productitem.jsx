import React, {  useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Productitem = ({id,image,name,price,Mrpprice}) => {

    const {currency}=useContext(ShopContext);
 

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
      
      <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />


      </div>

 <p className='pt-3 pb-1 text-sm'>{name}</p>

{/* <p className='text-sm font-medium '>{currency}{price}</p>
<p className='text-sm font-medium line-through text-gray-500'>{currency}{Mrpprice}</p> */}
<div className="flex items-center gap-3">
  {/* Sale Price */}
  <p className="text-base font-semibold text-red-600">
    {currency}{price}
  </p>

  {/* MRP */}
  <p className="text-sm line-through text-gray-500">
    {currency}{Mrpprice}
  </p>

  {/* Discount Badge */}
  <span className="text-xs bg-green-100 text-green-700 px-2 py-[2px] rounded-lg font-medium">
    Sale
  </span>
</div>

    </Link>
  )
}

export default Productitem