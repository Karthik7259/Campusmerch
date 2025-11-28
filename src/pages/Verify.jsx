import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
        setCartItems({});
        navigate('/Orders');
    }else{
        navigate('/cart');
    }



  }catch(err){
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