import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { trackPurchase } from '../utils/analytics';

const Verify = () => {

 const {navigate,token,setCartItems,backendURL}=useContext(ShopContext);
 const [searchParams,setSearchParams]=useSearchParams();


 const success=searchParams.get('success');
 const orderId=searchParams.get('orderId');


 const verifyPayment=async()=>{
  try{
    if(!token){
   
      return null;
    }


    const response=await axios.post(backendURL+'/api/order/verifyStripe',{orderId,success},{headers:{token}});


    if(response.data.success){
        const pendingPurchase = JSON.parse(
          sessionStorage.getItem('pending_purchase_analytics') || 'null'
        );
        if (pendingPurchase) {
          trackPurchase({
            transactionId: orderId,
            items: pendingPurchase.items,
            value: pendingPurchase.value,
            tax: pendingPurchase.tax,
            shipping: pendingPurchase.shipping,
            paymentType: 'Stripe',
          });
          sessionStorage.removeItem('pending_purchase_analytics');
        }
        setCartItems({});
        navigate('/Orders');
    }else{
        sessionStorage.removeItem('pending_purchase_analytics');
        navigate('/cart');
    }



 }catch(err){
    sessionStorage.removeItem('pending_purchase_analytics');
    console.log(err);

    toast.error(err.message);



 }
}

useEffect(()=>{
    verifyPayment();
},[token])



  return (
    <div>
     
    </div>
  )
}

export default Verify
