import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const PincodeChecker = ({ productWeight = 0.5, onServiceabilityCheck = null }) => {
  const { backendURL, currency } = useContext(ShopContext)
  const [pincode, setPincode] = useState('')
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState(null)

  const checkPincode = async () => {
    if (!pincode || pincode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode')
      return
    }

    setChecking(true)
    try {
      const pickupPostcode =
        import.meta.env.VITE_SHIPROCKET_PICKUP_POSTCODE || '560018'
      const response = await axios.post(`${backendURL}/api/shipping/check-serviceability`, {
        pickup_postcode: pickupPostcode,
        delivery_postcode: pincode,
        weight: productWeight,
        cod: 1,
      })

      if (response.data.success && response.data.data.data.available_courier_companies) {
        const couriers = response.data.data.data.available_courier_companies
        if (couriers.length > 0) {
          const lowestPriceCourier = couriers.reduce((min, courier) =>
            courier.rate < min.rate ? courier : min
          )
          const fastest = couriers.reduce((min, courier) =>
            courier.estimated_delivery_days < min.estimated_delivery_days ? courier : min
          )
          const shippingFee = lowestPriceCourier.rate > 100 ? lowestPriceCourier.rate : 100
          setResult({
            available: true,
            days: fastest.estimated_delivery_days,
            shipping_fee: shippingFee,
          })
          toast.success(`Delivery available in ${fastest.estimated_delivery_days} days`)
          if (onServiceabilityCheck) {
            onServiceabilityCheck({ available: true, shipping_fee: shippingFee })
          }
        } else {
          setResult({ available: false })
          toast.error('Delivery not available to this pincode')
          if (onServiceabilityCheck) {
            onServiceabilityCheck({ available: false })
          }
        }
      } else {
        setResult({ available: false })
        toast.error('Unable to check serviceability')
      }
    } catch (err) {
      console.log(err)
      toast.error('Error checking pincode')
      setResult({ available: false })
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="border border-border-light bg-white p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
        Delivery Availability
      </p>
      <div className="mt-3 flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value)
            setResult(null)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              checkPincode()
            }
          }}
          placeholder="Enter pincode"
          className="border border-border-light px-3 py-2 text-sm flex-1 bg-white"
          maxLength={6}
        />
        <button
          type="button"
          onClick={checkPincode}
          disabled={checking || !pincode}
          className="bg-brand-black text-brand-white px-6 py-2 text-button disabled:bg-border-medium"
        >
          {checking ? 'Checking...' : 'Check'}
        </button>
      </div>

      {result && (
        <div
          className={`mt-3 p-3 text-sm ${
            result.available ? 'border border-border-light bg-brand-cream' : 'border border-border-light bg-white'
          }`}
        >
          {result.available ? (
            <div>
              <p className="text-text-primary font-semibold">Delivery Available</p>
              <p className="text-text-secondary mt-1">
                Expected delivery in {result.days} days.
              </p>
              <p className="text-text-secondary text-xs mt-1">
                Shipping Fee: {currency}
                {result.shipping_fee || 100}
              </p>
            </div>
          ) : (
            <p className="text-text-secondary">Delivery not available to this pincode.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default PincodeChecker
