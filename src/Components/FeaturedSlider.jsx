import React, { useContext, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Productitem from './Productitem'

const FeaturedSlider = () => {
  const { products } = useContext(ShopContext)
  const navigate = useNavigate()
  const featured = products.slice(0, 6)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (featured.length === 0) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [featured.length])

  if (featured.length === 0) {
    return null
  }

  const activeProduct = featured[activeIndex]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-caption text-text-tertiary">Featured Edit</p>
            <h2 className="text-h2 font-semibold mt-2">Editorial Picks</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                setActiveIndex((prev) => (prev - 1 + featured.length) % featured.length)
              }
              className="h-10 w-10 border border-border-light hover:border-border-dark transition flex items-center justify-center"
              aria-label="Previous featured product"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % featured.length)}
              className="h-10 w-10 border border-border-light hover:border-border-dark transition flex items-center justify-center"
              aria-label="Next featured product"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/collection')}
              className="bg-brand-black text-brand-white px-6 py-3 text-button hover:bg-black/80 transition"
            >
              Explore Collection
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[280px]">
          {/* Large Featured Item - spans 2 cols and 2 rows */}
          <div className="col-span-2 row-span-2 border border-border-light bg-white p-4 hover:shadow-lg transition-shadow">
            <Productitem
              id={activeProduct._id}
              image={activeProduct.image}
              name={activeProduct.name}
              price={activeProduct.price}
              Mrpprice={activeProduct.Mrpprice}
              quantity={activeProduct.quantity}
            />
          </div>

          {/* Other items in bento grid */}
          {featured
            .filter((item) => item._id !== activeProduct._id)
            .slice(0, 4)
            .map((item, idx) => (
              <div
                key={item._id}
                className={`border border-border-light bg-white p-3 hover:shadow-lg transition-shadow ${idx === 0 ? 'col-span-1 row-span-1' :
                  idx === 1 ? 'col-span-1 row-span-1' :
                    idx === 2 ? 'col-span-1 row-span-1' :
                      'col-span-1 row-span-1'
                  }`}
              >
                <Productitem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  Mrpprice={item.Mrpprice}
                  quantity={item.quantity}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSlider
