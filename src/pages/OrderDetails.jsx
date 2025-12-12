import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import TrackingModal from '../Components/TrackingModal';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { backendURL, token, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [currentTracking, setCurrentTracking] = useState(null);
  const [loadingTracking, setLoadingTracking] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId, token]);

  const fetchOrderDetails = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        backendURL + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const foundOrder = response.data.orders.find(o => o._id === orderId);
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          toast.error('Order not found');
          navigate('/orders');
        }
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = async () => {
    try {
      setLoadingTracking(true);
      const response = await axios.get(`${backendURL}/api/order/tracking/${orderId}`, {
        headers: { token }
      });

      if (response.data.success) {
        setCurrentTracking(response.data.tracking);
        setIsTrackingModalOpen(true);
      } else {
        toast.error('Tracking information not available');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch tracking details');
    } finally {
      setLoadingTracking(false);
    }
  };

  const calculateSubtotal = () => {
    return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-xl text-gray-600'>Order not found</p>
          <button
            onClick={() => navigate('/orders')}
            className='mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800'
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Back Button */}
      <button
        onClick={() => navigate('/orders')}
        className='mb-6 flex items-center gap-2 text-gray-600 hover:text-black transition-all'
      >
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
        Back to Orders
      </button>

      {/* Order Header */}
      <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800 mb-2'>
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>
            <p className='text-gray-600'>
              Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={handleTrackOrder}
              disabled={loadingTracking}
              className='border border-gray-300 px-6 py-2 rounded hover:bg-gray-50 transition-all disabled:opacity-50 font-medium'
            >
              {loadingTracking ? 'Loading...' : 'Track Order'}
            </button>
          </div>
        </div>

        {/* Order Status */}
        <div className='flex items-center gap-4 p-4 bg-gray-50 rounded'>
          <div className={`w-3 h-3 rounded-full ${
            order.status === 'Delivered' ? 'bg-green-500' :
            order.status === 'Shipped' ? 'bg-blue-500' :
            order.status === 'Processing' ? 'bg-yellow-500' : 'bg-gray-500'
          }`}></div>
          <div>
            <p className='text-sm text-gray-600'>Order Status</p>
            <p className='font-semibold text-lg'>{order.status}</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Order Items */}
        <div className='lg:col-span-2'>
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <h2 className='text-xl font-semibold mb-4'>Order Items</h2>
            <div className='space-y-4'>
              {order.items.map((item, index) => (
                <div key={index} className='flex gap-4 p-4 border rounded hover:bg-gray-50 transition-all'>
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className='w-20 h-20 object-cover rounded border'
                  />
                  <div className='flex-1'>
                    <h3 className='font-semibold text-gray-800'>{item.name}</h3>
                    <div className='mt-1 text-sm text-gray-600 space-y-1'>
                      {item.size && <p>Size: {item.size}</p>}
                      <p>Quantity: {item.quantity}</p>
                      <p className='font-medium text-gray-800'>
                        {currency}{item.price} × {item.quantity} = {currency}{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary & Details */}
        <div className='space-y-6'>
          {/* Price Summary */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
            <div className='space-y-3'>
              <div className='flex justify-between text-gray-600'>
                <span>Subtotal ({order.items.length} items)</span>
                <span>{currency}{calculateSubtotal()}</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>Shipping Fee</span>
                <span>{currency}{order.shippingFee || 0}</span>
              </div>
              <div className='border-t pt-3 flex justify-between font-semibold text-lg'>
                <span>Total Amount</span>
                <span>{currency}{order.amount}</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <h2 className='text-xl font-semibold mb-4'>Payment Details</h2>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Payment Method</span>
                <span className='font-medium'>{order.paymentMethod}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Payment Status</span>
                <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-red-600'}`}>
                  {order.payment ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <h2 className='text-xl font-semibold mb-4'>Delivery Address</h2>
            <div className='text-gray-700 space-y-1'>
              <p className='font-medium'>{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state} - {order.address.zipcode}</p>
              <p className='pt-2 text-gray-600'>📞 {order.address.phone}</p>
              {order.address.email && <p className='text-gray-600'>✉️ {order.address.email}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Modal */}
      <TrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        trackingData={currentTracking}
      />
    </div>
  );
};

export default OrderDetails;
