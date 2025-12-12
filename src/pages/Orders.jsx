import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../Components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import TrackingModal from '../Components/TrackingModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

  const {backendURL,token,currency,navigate}=useContext(ShopContext);
  const navigateRouter = useNavigate();

  const [orderData,setOrderData]=useState([]);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [currentTracking, setCurrentTracking] = useState(null);
  const [loadingTracking, setLoadingTracking] = useState(false);

  const loadOrderData=async()=>{
        try{
          if(!token)return null;

          const response=await axios.post(backendURL+'/api/order/userorders',{},{headers:{token}})
          if(response.data.success){
            // Filter only successful payments and reverse to show latest first
            const filteredOrders = response.data.orders
              .filter(order => order.payment === true)
              .reverse();
            
            setOrderData(filteredOrders);
          }
         

        }catch(err){
            console.log(err);
        }
  }

  const handleTrackOrder = async (orderId) => {
    try {
      setLoadingTracking(true);
      const response = await axios.get(`${backendURL}/api/order/tracking/${orderId}`, {
        headers: { token }
      });
      
      if(response.data.success) {
        setCurrentTracking(response.data.tracking);
        setIsTrackingModalOpen(true);
      } else {
        toast.error('Tracking information not available');
      }
    } catch(err) {
      console.log(err);
      toast.error('Failed to fetch tracking details');
    } finally {
      setLoadingTracking(false);
    }
  }

  useEffect(()=>{
      loadOrderData();
  },[token]);


  const calculateOrderTotal = (order) => {
    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return subtotal;
  }

  return (
    <div className='border-t pt-16 pb-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      {orderData.length === 0 ? (
        <div className='text-center py-20'>
          <p className='text-gray-500 text-lg'>No orders found</p>
          <button 
            onClick={() => navigateRouter('/collection')}
            className='mt-4 bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-all'
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className='space-y-4'>
          {orderData.map((order, index) => (
            <div 
              key={index} 
              onClick={() => navigateRouter(`/order/${order._id}`)}
              className='border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer bg-white'
            >
              {/* Order Header */}
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b'>
                <div>
                  <p className='text-sm text-gray-500'>Order ID</p>
                  <p className='font-semibold text-gray-800'>#{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Order Date</p>
                  <p className='font-medium text-gray-800'>{new Date(order.date).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Total Amount</p>
                  <p className='font-semibold text-lg text-gray-800'>{currency}{calculateOrderTotal(order)}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <div className={`w-2 h-2 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-500' : 
                    order.status === 'Shipped' ? 'bg-blue-500' : 
                    order.status === 'Processing' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <p className='font-medium text-gray-800'>{order.status}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className='space-y-3'>
                {order.items.slice(0, 2).map((item, itemIndex) => (
                  <div key={itemIndex} className='flex items-center gap-4'>
                    <img 
                      src={item.image[0]} 
                      alt={item.name}
                      className='w-16 h-16 object-cover rounded border'
                    />
                    <div className='flex-1'>
                      <p className='font-medium text-gray-800'>{item.name}</p>
                      <p className='text-sm text-gray-500'>
                        Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                      </p>
                    </div>
                    <p className='font-medium text-gray-800'>{currency}{item.price}</p>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <p className='text-sm text-gray-500 pl-20'>
                    +{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Order Footer */}
              <div className='flex justify-between items-center mt-4 pt-4 border-t'>
                <div className='text-sm text-gray-600'>
                  <span className='font-medium'>Payment:</span> {order.paymentMethod}
                </div>
                <div className='flex gap-2'>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackOrder(order._id);
                    }}
                    disabled={loadingTracking}
                    className='border border-gray-300 px-4 py-2 text-sm font-medium rounded hover:bg-gray-50 transition-all disabled:opacity-50'
                  >
                    Track Order
                  </button>
                  <button 
                    className='bg-black text-white px-4 py-2 text-sm font-medium rounded hover:bg-gray-800 transition-all'
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tracking Modal */}
      <TrackingModal 
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        trackingData={currentTracking}
      />
    </div>
  )
}

export default Orders