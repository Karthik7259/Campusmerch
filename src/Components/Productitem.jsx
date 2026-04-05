import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { trackSelectItem } from '../utils/analytics'

const Productitem = ({ id, image, name, price, Mrpprice, quantity, category }) => {
  const { currency } = useContext(ShopContext)
  const isSoldOut = quantity === 0
  const isLowStock = quantity > 0 && quantity < 10

  return (
    <Link
      className="group flex flex-col h-full border border-border-light bg-white"
      to={`/product/${id}`}
      onClick={() =>
        trackSelectItem({
          product: {
            _id: id,
            name,
            category,
            price,
          },
        })
      }
    >
      <div className="relative aspect-[4/5] bg-brand-cream image-zoom">
        <img className="h-full w-full object-cover" src={image[0]} alt={name} />

        {isSoldOut && (
          <span className="absolute top-3 left-3 bg-brand-black text-brand-white text-[11px] uppercase tracking-[0.2em] px-3 py-1">
            Sold Out
          </span>
        )}
        {isLowStock && !isSoldOut && (
          <span className="absolute top-3 left-3 bg-accent text-brand-black text-[11px] uppercase tracking-[0.2em] px-3 py-1">
            Low Stock
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-text-primary line-clamp-2">
          {name}
        </p>
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold">
            {currency}
            {price}
          </p>
          {Mrpprice && (
            <p className="text-xs text-text-tertiary line-through">
              {currency}
              {Mrpprice}
            </p>
          )}
          {Mrpprice && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent">
              Sale
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default Productitem
