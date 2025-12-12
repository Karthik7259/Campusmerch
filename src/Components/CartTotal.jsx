import React, { useContext } from 'react'
import Title from './Title';
import { ShopContext } from '../context/ShopContext';

const CartTotal = ({ customShippingFee = null }) => {

     const { currency,delivery_fee,getCartAmount,getCartGST} = useContext(ShopContext);
     
     const subtotal = getCartAmount();
     const gstData = getCartGST();
     const actualShippingFee = customShippingFee !== null ? customShippingFee : 100; // Default ₹100 shipping
     const total = subtotal === 0 ? 0 : subtotal + gstData.totalGST + actualShippingFee;


  return (
    <div className='w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200'>

      <div className='text-2xl mb-4'>
          <Title text1={'CART'} text2={'TOTAL'}/>
      </div>

      <div className='flex flex-col gap-3 text-sm'>
           <div className='flex justify-between pb-2 border-b border-dashed border-gray-300'>
            <p>Subtotal</p>
            <p>{currency}{subtotal.toFixed(2)}</p>
           </div>
           {gstData.totalGST > 0 && (
               <div className='flex justify-between pb-2 border-b border-dashed border-gray-300'>
                 <p>GST Charges</p>
                 <p>{currency}{gstData.totalGST.toFixed(2)}</p>
               </div>
           )}
           <div className='flex justify-between pb-2 border-b border-dashed border-gray-300'>
             <p>Shipping Fee</p>
             <p>{currency}{actualShippingFee.toFixed(2)}</p>
           </div>
           <div className='flex justify-between pt-2 text-base'>
               <b>Total</b>
               <b>{currency}{total.toFixed(2)}</b>
           </div>
      </div>

    </div>
  )
}

export default CartTotal