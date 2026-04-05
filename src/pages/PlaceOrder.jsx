import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Title from '../Components/Title.jsx'
import CartTotal from '../Components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import {
  buildAnalyticsItem,
  trackAddPaymentInfo,
  trackBeginCheckout,
  trackPurchase,
} from '../utils/analytics'

const PlaceOrder = () => {
  const [method, setMethod] = useState('razorpay')
  const {
    navigate,
    backendURL,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    getCartGST,
    delivery_fee,
    products,
    currency,
  } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const [serviceability, setServiceability] = useState(null)
  const [checkingServiceability, setCheckingServiceability] = useState(false)

  const buildOrderItems = () => {
    const orderItems = []

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = products.find((product) => product._id === items)
          if (itemInfo) {
            const itemPrice =
              itemInfo.sizeVariants && itemInfo.sizeVariants.length > 0
                ? itemInfo.sizeVariants.find((v) => v.size === item)?.price || itemInfo.price
                : itemInfo.price

            const itemMrpPrice =
              itemInfo.sizeVariants && itemInfo.sizeVariants.length > 0
                ? itemInfo.sizeVariants.find((v) => v.size === item)?.mrpPrice ||
                  itemInfo.Mrpprice
                : itemInfo.Mrpprice

            orderItems.push({
              _id: items,
              productId: items,
              name: itemInfo.name,
              category: itemInfo.category,
              price: itemPrice,
              mrpPrice: itemMrpPrice,
              quantity: cartItems[items][item],
              size: item,
              weight: itemInfo.weight,
              length: itemInfo.length,
              breadth: itemInfo.breadth,
              height: itemInfo.height,
            })
          }
        }
      }
    }

    return orderItems
  }

  const buildAnalyticsItems = (orderItems) =>
    orderItems
      .map((item) =>
        buildAnalyticsItem(
          {
            _id: item.productId || item._id,
            name: item.name,
            category: item.category,
            price: item.price,
          },
          {
            size: item.size,
            quantity: item.quantity,
            price: item.price,
          }
        )
      )
      .filter(Boolean)

  useEffect(() => {
    if (!token) {
      toast.error('Please login to place an order')
      navigate('/login')
    }
  }, [token, navigate])

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData({ ...formData, [name]: value })
    if (name === 'zipcode') {
      setServiceability(null)
    }
  }

  const checkServiceability = async () => {
    if (!formData.zipcode || formData.zipcode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode')
      return
    }

    setCheckingServiceability(true)
    try {
      let totalWeight = 0
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const productData = products.find((product) => product._id === items)
            if (productData) {
              const itemWeight = (productData.weight || 400) / 1000
              totalWeight += cartItems[items][item] * itemWeight
            }
          }
        }
      }

      totalWeight = Math.max(totalWeight, 0.5)

      const pickupPostcode =
        import.meta.env.VITE_SHIPROCKET_PICKUP_POSTCODE || '560018'
      const response = await axios.post(`${backendURL}/api/shipping/check-serviceability`, {
        pickup_postcode: pickupPostcode,
        delivery_postcode: formData.zipcode,
        weight: totalWeight,
        cod: 0,
      })

      if (response.data.success && response.data.data.data.available_courier_companies) {
        const couriers = response.data.data.data.available_courier_companies
        if (couriers.length > 0) {
          const lowestPriceCourier = couriers.reduce((min, courier) =>
            courier.rate < min.rate ? courier : min
          )

          const shippingFee = lowestPriceCourier.rate > 100 ? lowestPriceCourier.rate : 100

          setServiceability({
            available: true,
            estimated_days: lowestPriceCourier.estimated_delivery_days,
            shipping_fee: shippingFee,
            courier_name: lowestPriceCourier.courier_name,
            actual_rate: lowestPriceCourier.rate,
          })

          const message =
            shippingFee > 100
              ? `Delivery available via ${lowestPriceCourier.courier_name}! Estimated ${lowestPriceCourier.estimated_delivery_days} days - ${currency}${shippingFee}`
              : `Delivery available! Estimated ${lowestPriceCourier.estimated_delivery_days} days`

          toast.success(message)
        } else {
          setServiceability({ available: false })
          toast.error('Delivery not available to this pincode')
        }
      } else {
        setServiceability({ available: false })
        toast.error('Unable to check serviceability')
      }
    } catch (err) {
      console.log(err)
      toast.error('Error checking pincode availability')
      setServiceability({ available: false })
    } finally {
      setCheckingServiceability(false)
    }
  }

  const initPay = (order) => {
    if (!window.Razorpay) {
      toast.error('Razorpay SDK not loaded. Please refresh the page.')
      console.error('Razorpay SDK not loaded')
      return
    }

    const amountInPaise = Math.round(order.amount)

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: order.currency,
      name: 'Gift4corp',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: `${formData.street}, ${formData.city}, ${formData.state}`,
        zipcode: formData.zipcode,
      },
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendURL}/api/order/verifyRazorpay`,
            { response },
            { headers: { token } }
          )

          if (data.success) {
            const pendingPurchase = JSON.parse(
              sessionStorage.getItem('pending_purchase_analytics') || 'null'
            )
            if (pendingPurchase) {
              trackPurchase({
                transactionId: data.order?._id || order.receipt || order.id,
                items: pendingPurchase.items,
                value: pendingPurchase.value,
                tax: pendingPurchase.tax,
                shipping: pendingPurchase.shipping,
                paymentType: 'Razorpay',
              })
              sessionStorage.removeItem('pending_purchase_analytics')
            }
            toast.success('Payment successful! Redirecting...')
            setCartItems({})
            navigate('/thank-you')
          } else {
            sessionStorage.removeItem('pending_purchase_analytics')
            toast.error(data.message || 'Payment verification failed')
          }
        } catch (err) {
          sessionStorage.removeItem('pending_purchase_analytics')
          console.error('Payment verification error:', err)
          toast.error(err.response?.data?.message || err.message || 'Payment verification failed')
        }
      },
      modal: {
        ondismiss: function () {
          sessionStorage.removeItem('pending_purchase_analytics')
          toast.info('Payment cancelled')
        },
      },
      theme: {
        color: '#000000',
      },
    }

    try {
      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response) {
        sessionStorage.removeItem('pending_purchase_analytics')
        console.error('Payment failed:', response.error)
        toast.error(`Payment failed: ${response.error.description || 'Please try again'}`)
      })
      rzp.open()
    } catch (err) {
      sessionStorage.removeItem('pending_purchase_analytics')
      console.error('Razorpay initialization error:', err)
      toast.error('Failed to open payment gateway. Please try again or contact support.')
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!serviceability) {
      toast.error('Please check delivery availability for your pincode first')
      return
    }

    if (!serviceability.available) {
      toast.error('Delivery not available to this pincode')
      return
    }

    try {
      const orderItems = buildOrderItems()

      const shippingFee =
        serviceability && serviceability.available
          ? serviceability.shipping_fee
          : delivery_fee

      const totalTax = getCartGST().totalGST
      const orderValue = getCartAmount() + totalTax + shippingFee
      const analyticsItems = buildAnalyticsItems(orderItems)

      const orderData = {
        address: formData,
        items: orderItems,
        amount: orderValue,
      }

      trackBeginCheckout({
        items: analyticsItems,
        value: orderValue,
        tax: totalTax,
        shipping: shippingFee,
      })

      trackAddPaymentInfo({
        items: analyticsItems,
        value: orderValue,
        paymentType: method === 'razorpay' ? 'Razorpay' : method.toUpperCase(),
        tax: totalTax,
        shipping: shippingFee,
      })

      switch (method) {
        case 'cod': {
          const response = await axios.post(`${backendURL}/api/order/place`, orderData, {
            headers: { token },
          })

          if (response.data.success) {
            trackPurchase({
              transactionId: response.data.order?._id || response.data.orderId,
              items: analyticsItems,
              value: orderValue,
              tax: totalTax,
              shipping: shippingFee,
              paymentType: 'COD',
            })
            setCartItems({})
            navigate('/thank-you')
          } else {
            toast.error(response.data.message)
          }
          break
        }

        case 'stripe':
          break

        case 'razorpay':
          try {
            const responseRazorpay = await axios.post(
              `${backendURL}/api/order/razorpay`,
              orderData,
              { headers: { token } }
            )
            if (responseRazorpay.data.success) {
              sessionStorage.setItem(
                'pending_purchase_analytics',
                JSON.stringify({
                  items: analyticsItems,
                  value: orderValue,
                  tax: totalTax,
                  shipping: shippingFee,
                })
              )
              initPay(responseRazorpay.data.order)
            } else {
              toast.error(responseRazorpay.data.message || 'Failed to initiate Razorpay payment')
            }
          } catch (razorpayErr) {
            console.error('Razorpay initialization error:', razorpayErr)
            const errorMessage =
              razorpayErr.response?.data?.message ||
              razorpayErr.message ||
              'Failed to initiate payment'
            toast.error(errorMessage)
          }
          break
        default:
          break
      }
    } catch (err) {
      console.error('Order placement error:', err)
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to place order'
      toast.error(errorMessage)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="border-t border-border-light min-h-[80vh]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-6">
          <Title text1="Checkout" text2="Details" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-border-light px-3 py-2 text-sm"
              type="text"
              placeholder="First name"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-border-light px-3 py-2 text-sm"
              type="text"
              placeholder="Last name"
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-border-light px-3 py-2 text-sm w-full"
            type="email"
            placeholder="Email address"
          />

          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-border-light px-3 py-2 text-sm w-full"
            type="text"
            placeholder="Street"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-border-light px-3 py-2 text-sm"
              type="text"
              placeholder="City"
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-border-light px-3 py-2 text-sm"
              type="text"
              placeholder="State"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-border-light px-3 py-2 text-sm"
              type="number"
              placeholder="Pincode"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-border-light px-3 py-2 text-sm"
              type="text"
              placeholder="Country"
            />
          </div>

          <button
            type="button"
            onClick={checkServiceability}
            disabled={!formData.zipcode || checkingServiceability}
            className="bg-brand-black text-brand-white px-6 py-3 text-button disabled:bg-border-medium"
          >
            {checkingServiceability ? 'Checking...' : 'Check Delivery Availability'}
          </button>

          {serviceability && (
            <div className="border border-border-light bg-brand-cream p-4 text-sm text-text-secondary">
              {serviceability.available ? (
                <div>
                  <p className="text-text-primary font-semibold">Delivery Available</p>
                  <p className="mt-1">
                    Estimated delivery in {serviceability.estimated_days} days
                  </p>
                  <p className="mt-1 text-xs">
                    Shipping Fee: {currency}
                    {serviceability.shipping_fee}
                    {serviceability.courier_name && serviceability.actual_rate > 100 && (
                      <span className="text-text-tertiary ml-2">
                        via {serviceability.courier_name}
                      </span>
                    )}
                  </p>
                </div>
              ) : (
                <p>Delivery not available to this pincode</p>
              )}
            </div>
          )}

          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-border-light px-3 py-2 text-sm w-full"
            type="number"
            placeholder="Phone"
          />
        </div>

        <div className="space-y-6">
          <CartTotal customShippingFee={serviceability?.shipping_fee ?? delivery_fee} />

          <div className="border border-border-light bg-white p-6">
            <Title text1="Payment" text2="Method" />
            <div className="mt-6 flex flex-col gap-4">
              <button
                type="button"
                onClick={() => setMethod('razorpay')}
                className={`flex items-center justify-between border px-4 py-3 text-sm ${
                  method === 'razorpay' ? 'border-border-dark' : 'border-border-light'
                }`}
              >
                <span className="text-xs uppercase tracking-[0.2em]">Razorpay</span>
                <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
              </button>
            </div>

            <button type="submit" className="mt-8 w-full bg-brand-black text-brand-white py-3 text-button">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
