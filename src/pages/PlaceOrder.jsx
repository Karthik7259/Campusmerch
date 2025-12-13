import React, { useContext, useState, useEffect } from 'react'
import Title from '../Components/Title.jsx';
import CartTotal from '../Components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const PlaceOrder = () => {

 const [method,setMethod]=useState('razorpay');
const {navigate, backendURL,token ,cartItems,setCartItems,getCartAmount,getCartGST,delivery_fee,products}=useContext(ShopContext);
 const [formData,setFormData]=useState({
   firstName:'',
   lastName:'',
   email:'',
   street:'',
   city:'',
   state:'',
   zipcode:'',
   country:'',
   phone:''
 });

 const [serviceability, setServiceability] = useState(null);
 const [checkingServiceability, setCheckingServiceability] = useState(false);

 // Check if user is logged in
 useEffect(() => {
   if(!token) {
     toast.error('Please login to place an order');
     navigate('/login');
   }
 }, [token, navigate]);


 const onChangeHandler=(e)=>{
     const name=e.target.name;
     const value=e.target.value;

     setFormData({...formData,[name]:value});

     // Reset serviceability when zipcode changes
     if(name === 'zipcode') {
       setServiceability(null);
     }
   }

   const checkServiceability = async () => {
     if(!formData.zipcode || formData.zipcode.length !== 6) {
       toast.error('Please enter a valid 6-digit pincode');
       return;
     }

     setCheckingServiceability(true);
     try {
       // Calculate total weight using actual product weights
       let totalWeight = 0;
       for(const items in cartItems) {
         for(const item in cartItems[items]) {
           if(cartItems[items][item] > 0) {
             const productData = products.find(product => product._id === items);
             if(productData) {
               // Product weight is in grams, convert to kg (default 400g if not set)
               const itemWeight = (productData.weight || 400) / 1000;
               totalWeight += cartItems[items][item] * itemWeight;
             }
           }
         }
       }

       // Ensure minimum weight of 0.5kg for Shiprocket
       totalWeight = Math.max(totalWeight, 0.5);

       const response = await axios.post(backendURL + '/api/shipping/check-serviceability', {
         pickup_postcode: '560070', // Bangalore warehouse pincode
         delivery_postcode: formData.zipcode,
         weight: totalWeight,
         cod: 0
       });

       if(response.data.success && response.data.data.data.available_courier_companies) {
         const couriers = response.data.data.data.available_courier_companies;
         if(couriers.length > 0) {
           // Get the lowest shipping price courier
           const lowestPriceCourier = couriers.reduce((min, courier) => 
             courier.rate < min.rate ? courier : min
           );
           
           const shippingFee = lowestPriceCourier.rate > 100 ? lowestPriceCourier.rate : 100;
           
           console.log('Selected courier:', {
             name: lowestPriceCourier.courier_name,
             rate: lowestPriceCourier.rate,
             estimatedDays: lowestPriceCourier.estimated_delivery_days,
             finalShippingFee: shippingFee
           });
           
           setServiceability({
             available: true,
             estimated_days: lowestPriceCourier.estimated_delivery_days,
             shipping_fee: shippingFee,
             courier_name: lowestPriceCourier.courier_name,
             actual_rate: lowestPriceCourier.rate
           });
           
           const message = shippingFee > 100 
             ? `Delivery available via ${lowestPriceCourier.courier_name}! Estimated ${lowestPriceCourier.estimated_delivery_days} days - ₹${shippingFee}`
             : `Delivery available! Estimated ${lowestPriceCourier.estimated_delivery_days} days`;
           
           toast.success(message);
         } else {
           setServiceability({ available: false });
           toast.error('Delivery not available to this pincode');
         }
       } else {
         setServiceability({ available: false });
         toast.error('Unable to check serviceability');
       }
     } catch(err) {
       console.log(err);
       toast.error('Error checking pincode availability');
       setServiceability({ available: false });
     } finally {
       setCheckingServiceability(false);
     }
   }


   const initPay=(order)=>{
       // Check if Razorpay is loaded
       if(!window.Razorpay) {
          toast.error('Razorpay SDK not loaded. Please refresh the page.');
          console.error('Razorpay SDK not loaded');
          return;
       }

       // Ensure amount is integer in paise
       const amountInPaise = Math.round(order.amount);
       console.log('Razorpay payment - Amount in paise:', amountInPaise);

       const options={
         key:import.meta.env.VITE_RAZORPAY_KEY_ID,
         amount: amountInPaise,
         currency: order.currency,
         name: 'YourCampusMerch',
         description: 'Order Payment',
         order_id: order.id,
         receipt: order.receipt,
         prefill: {
            name: formData.firstName + ' ' + formData.lastName,
            email: formData.email,
            contact: formData.phone
         },
         notes: {
            address: formData.street + ', ' + formData.city + ', ' + formData.state,
            zipcode: formData.zipcode
         },
         handler: async(response)=>{
             console.log('Razorpay payment response:', response);
             try{
               const {data}=await axios.post(backendURL+'/api/order/verifyRazorpay',{
                  response,
               },{headers:{token}})

               if(data.success){
                  toast.success('Payment successful! Redirecting...');
                  setCartItems({});
                  navigate('/thank-you');
               }else{
                  toast.error(data.message || 'Payment verification failed');
               }
             }catch(err){
               console.error('Payment verification error:', err);
               toast.error(err.response?.data?.message || err.message || 'Payment verification failed');
             }
         },
         modal: {
            ondismiss: function() {
               toast.info('Payment cancelled');
            }
         },
         theme: {
            color: '#F37254'
         }
       }

       try {
          console.log('Initializing Razorpay with options:', {
             key: import.meta.env.VITE_RAZORPAY_KEY_ID ? 'Present' : 'Missing',
             amount: amountInPaise,
             currency: order.currency,
             order_id: order.id
          });

          const rzp=new window.Razorpay(options);
          
          rzp.on('payment.failed', function (response){
             console.error('Payment failed:', response.error);
             toast.error(`Payment failed: ${response.error.description || 'Please try again'}`);
          });
          
          rzp.open();
       } catch(err) {
          console.error('Razorpay initialization error:', err);
          toast.error('Failed to open payment gateway. Please try again or contact support.');
       }

   }



const onSubmitHandler= async(e)=>{
    e.preventDefault(); 
    
      // Check if serviceability has been verified
      if(!serviceability) {
        toast.error('Please check delivery availability for your pincode first');
        return;
      }

      if(!serviceability.available) {
        toast.error('Delivery is not available to your pincode');
        return;
      }

      try{
         let orderItems=[]
         
         for(const items in cartItems ){
            for(const item in cartItems[items]){
               if(cartItems[items][item]>0){
                  const itemInfo=structuredClone(products.find(product => product._id === items));
                  if(itemInfo){
                     itemInfo.size=item;
                     itemInfo.quantity=cartItems[items][item];
                     orderItems.push(itemInfo);      
                  }
            }
         }
      }

      const gstData = getCartGST();
      
      // Use shipping fee from serviceability check, or default to 100
      const actualShippingFee = serviceability?.shipping_fee || 100;
      const totalAmount = getCartAmount() + gstData.totalGST + actualShippingFee;
      
      // Validate amount
      if(!totalAmount || totalAmount <= 0) {
         toast.error('Invalid order amount. Please check your cart.');
         return;
      }
      
      // Ensure amount has maximum 2 decimal places
      const roundedAmount = Math.round(totalAmount * 100) / 100;
 
      let orderData={
         address:formData,
         items:orderItems,
         paymentMethod:method,
         amount:roundedAmount,
         shippingFee: actualShippingFee
      }

      switch(method){
         // api calls for cod
         case 'cod':
           const response=await axios.post(backendURL+'/api/order/place', orderData,{headers:{token}})
          
           if(response.data.success){
            setCartItems({});
            navigate('/thank-you');
           }else{
            toast.error(response.data.message);
           } 
           break;

         case 'stripe':
            // api calls for stripe
            break
            
         case 'razorpay':
            // api calls for razorpay
            try {
               const responseRazorpay=await axios.post(backendURL+'/api/order/razorpay',orderData,{headers:{token}})
               if(responseRazorpay.data.success){
                  initPay(responseRazorpay.data.order);
               } else {
                  toast.error(responseRazorpay.data.message || 'Failed to initiate Razorpay payment');
               }
            } catch(razorpayErr) {
               console.error('Razorpay initialization error:', razorpayErr);
               const errorMessage = razorpayErr.response?.data?.message || razorpayErr.message || 'Failed to initiate payment';
               toast.error(errorMessage);
            }
            break;
         default:
            break;
      }
      }catch(err){
        console.error('Order placement error:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to place order';
        toast.error(errorMessage);
      }
}  


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 pb-16 min-h-[80vh] border-t '>
{/*  ------------- leftside */}
                 <div className='flex flex-col gap-4 w-full sm:max-w-[480px] '>
 
                 <div className='text-xl sm:text-2xl my-3 '>
                    <Title text1={'Place'} text2={'Your Order'}/>
                 </div>


                 <div className='flex gap-3 '>
                     <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                      <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                 </div>

          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
              
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

         <div className='flex gap-3 '>
                     <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                      <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                 </div>
  

   <div className='flex gap-3 '>
                     <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='zipcode' />
                      <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country ' />
                 </div>

                 {/* Pincode Check Button */}
                 <button 
                   type='button'
                   onClick={checkServiceability}
                   disabled={!formData.zipcode || checkingServiceability}
                   className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all'
                 >
                   {checkingServiceability ? 'Checking...' : 'Check Delivery Availability'}
                 </button>

                 {/* Serviceability Status */}
                 {serviceability && (
                   <div className={`p-4 rounded-lg ${serviceability.available ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                     {serviceability.available ? (
                       <div className='flex items-center gap-2'>
                         <span className='text-green-600 text-xl'>✓</span>
                         <div>
                           <p className='font-semibold text-green-700'>Delivery Available</p>
                           <p className='text-sm text-green-600 mt-1'>Estimated delivery in {serviceability.estimated_days} days</p>
                           <p className='text-sm text-gray-600 mt-1'>
                             Shipping Fee: ₹{serviceability.shipping_fee}
                             {serviceability.courier_name && serviceability.actual_rate > 100 && (
                               <span className='text-xs text-gray-500 ml-2'>
                                 (via {serviceability.courier_name})
                               </span>
                             )}
                           </p>
                         </div>
                       </div>
                     ) : (
                       <div className='flex items-center gap-2'>
                         <span className='text-red-600 text-xl'>✗</span>
                         <p className='font-semibold text-red-700'>Delivery not available to this pincode</p>
                       </div>
                     )}
                   </div>
                 )}

 <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
                 </div>
 

 {
/*  ------------- rightside */}
 
       <div className='mt-8 '>
              <div className='mt-8 min-w-80 '>
                 <CartTotal customShippingFee={serviceability?.shipping_fee || 100} />
              </div>
              <div className='mt-12'>
              <Title text1={'Payment'} text2={'Method'}/>
              {/* ------------- payment method  selction  ------------- */}
              <div className='flex gap-3 flex-col lg:flex-row'>
               {/* <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img 
              className='h-5 mx-4 '
               src={assets.stripe_logo} alt="" />
               </div> */}
               <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img 
              className='h-5 mx-4 '
               src={assets.razorpay_logo} alt="" />
               </div>


              </div>
            <div className='w-full text-end mt-8 '>
               <button type='submit'  className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>


              </div>
       </div>
    

    </form>
  )
}

export default PlaceOrder