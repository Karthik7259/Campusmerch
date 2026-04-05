import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import RelatedProduct from '../Components/RelatedProduct'
import PincodeChecker from '../Components/PincodeChecker'
import { trackViewItem } from '../utils/analytics'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart, cartItems } = useContext(ShopContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('details')
  const [currentPrice, setCurrentPrice] = useState(0)
  const [currentMrpPrice, setCurrentMrpPrice] = useState(0)
  const [currentStock, setCurrentStock] = useState(0)

  const hasSizeVariants =
    productData && productData.sizeVariants && productData.sizeVariants.length > 0

  const availableStock = hasSizeVariants
    ? productData.sizeVariants.reduce((sum, v) => sum + (Number(v.quantity) || 0), 0)
    : productData && typeof productData.quantity === 'number'
    ? productData.quantity
    : 0

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])

        if (item.sizeVariants && item.sizeVariants.length > 0) {
          setCurrentPrice(item.sizeVariants[0].price)
          setCurrentMrpPrice(item.sizeVariants[0].mrpPrice)
          setCurrentStock(item.sizeVariants[0].quantity)
        } else {
          setCurrentPrice(item.price)
          setCurrentMrpPrice(item.Mrpprice)
          setCurrentStock(item.quantity || 0)
        }
      }
    })
  }

  useEffect(() => {
    fetchProductData()
    window.scrollTo(0, 0)
    setSize('')
  }, [productId, products])

  useEffect(() => {
    if (!productData) {
      return
    }

    trackViewItem({
      product: productData,
      price: productData.price,
    })
  }, [productData])

  const sizeKey = productData?.category === 'Apparels' ? size : 'default'
  const currentQuantityInCart = productData ? cartItems[productData._id]?.[sizeKey] || 0 : 0
  const stockForSelection = hasSizeVariants ? currentStock : productData?.quantity || 0
  const canAdd = stockForSelection > 0 && currentQuantityInCart < stockForSelection

  if (!productData) {
    return <div className="opacity-0" />
  }

  return (
    <section className="border-t border-border-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {productData.image.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setImage(item)}
                  className={`h-20 w-20 border ${
                    image === item ? 'border-border-dark' : 'border-border-light'
                  }`}
                >
                  <img src={item} alt={productData.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 border border-border-light bg-white">
              <img src={image} alt={productData.name} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-caption text-text-tertiary">Product</p>
              <h1 className="text-3xl font-semibold mt-3">{productData.name}</h1>
              <p className="text-sm text-text-secondary mt-4">{productData.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold">
                {currency}
                {hasSizeVariants ? currentPrice : productData.price}
              </p>
              <p className="text-sm text-text-tertiary line-through">
                {currency}
                {hasSizeVariants ? currentMrpPrice : productData.Mrpprice}
              </p>
            </div>

            <div className="text-sm text-text-secondary">
              <span className="font-semibold">Stock:</span>{' '}
              {availableStock === 0 ? 'Out of stock' : `${availableStock} available`}
            </div>

            {productData.category === 'Apparels' && (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
                  Select Size
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {(hasSizeVariants
                    ? productData.sizeVariants.map((v) => v.size)
                    : ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].filter(
                        (s) => productData.sizes && productData.sizes.includes(s)
                      )
                  ).map((item) => {
                    const variant = hasSizeVariants
                      ? productData.sizeVariants.find((v) => v.size === item)
                      : null
                    const isOutOfStock = hasSizeVariants
                      ? variant && variant.quantity === 0
                      : productData.quantity === 0

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          if (!isOutOfStock) {
                            setSize(item)
                            if (hasSizeVariants && variant) {
                              setCurrentPrice(variant.price)
                              setCurrentMrpPrice(variant.mrpPrice)
                              setCurrentStock(variant.quantity)
                            } else {
                              setCurrentPrice(productData.price)
                              setCurrentMrpPrice(productData.Mrpprice)
                              setCurrentStock(productData.quantity || 0)
                            }
                          }
                        }}
                        disabled={isOutOfStock}
                        className={`px-4 py-2 border text-xs uppercase tracking-[0.2em] ${
                          size === item ? 'border-border-dark bg-brand-black text-brand-white' : 'border-border-light'
                        } ${isOutOfStock ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                      >
                        {item}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                if (productData.category === 'Apparels' && !size) {
                  toast.error('Please select a size')
                  return
                }

                if (!canAdd) {
                  toast.error('No more stock available')
                  return
                }

                addToCart(productData._id, productData.category === 'Apparels' ? size : 'default')
              }}
              disabled={!canAdd}
              className={`px-8 py-3 text-button ${
                canAdd ? 'bg-brand-black text-brand-white' : 'bg-border-medium text-white'
              }`}
            >
              {canAdd ? 'Add to Cart' : 'Unavailable'}
            </button>

            <PincodeChecker productWeight={0.5} />

            <div className="border-t border-border-light pt-6 text-sm text-text-secondary">
              <p>Pan-India delivery with dedicated support.</p>
              <p className="text-text-tertiary mt-2">Confirm sizing before checkout.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border-light pt-10">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`px-5 py-2 text-xs uppercase tracking-[0.2em] border ${
                activeTab === 'details' ? 'border-border-dark bg-brand-black text-brand-white' : 'border-border-light'
              }`}
            >
              Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mission')}
              className={`px-5 py-2 text-xs uppercase tracking-[0.2em] border ${
                activeTab === 'mission' ? 'border-border-dark bg-brand-black text-brand-white' : 'border-border-light'
              }`}
            >
              Mission
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vision')}
              className={`px-5 py-2 text-xs uppercase tracking-[0.2em] border ${
                activeTab === 'vision' ? 'border-border-dark bg-brand-black text-brand-white' : 'border-border-light'
              }`}
            >
              Vision
            </button>
          </div>

          <div className="mt-6 border border-border-light bg-white p-6 text-sm text-text-secondary">
            {activeTab === 'details' && (
              <div className="space-y-3">
                <p>
                  Crafted to deliver a refined gifting experience with consistent quality
                  and precise branding.
                </p>
                <p>Contact our team for custom branding and bulk order support.</p>
              </div>
            )}
            {activeTab === 'mission' && (
              <div className="space-y-3">
                <p>
                  Our mission is to create memorable gifting experiences that strengthen
                  business relationships and brand perception.
                </p>
                <p>
                  We prioritize premium materials, responsive service, and a tailored
                  approach for every client.
                </p>
              </div>
            )}
            {activeTab === 'vision' && (
              <div className="space-y-3">
                <p>
                  Our vision is to become the most valued gifting partner for businesses
                  seeking elevated, thoughtful merchandise.
                </p>
                <p>
                  We continue to innovate through sustainable sourcing and refined product
                  curation.
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
      </div>
    </section>
  )
}

export default Product
