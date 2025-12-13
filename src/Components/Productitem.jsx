import React, {  useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Productitem = ({id,image,name,price,Mrpprice,quantity}) => {

    const {currency}=useContext(ShopContext);
 

  return (
    <Link className='text-gray-700 cursor-pointer flex flex-col h-full' to={`/product/${id}`}>
      <div className='overflow-hidden relative aspect-square bg-gray-100'>
      
      <img className='hover:scale-110 transition ease-in-out w-full h-full object-cover' src={image[0]} alt="" />

      {/* Sold Out Badge */}
      {quantity === 0 ? (
        <div className='absolute top-2 left-2 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded'>
          SOLD OUT
        </div>
      ) : quantity > 0 && quantity < 10 ? (
        <div className='absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 text-xs font-bold rounded animate-pulse'>
          HURRY! LOW STOCK
        </div>
      ) : null}

      </div>

 <p className='pt-3 pb-1 text-sm line-clamp-2 flex-grow'>{name}</p>

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