import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from './Title'
import Productitem from './Productitem'
import ComingSoonComponent from './ComingSoonComponent'

const CategoryPageWithFilters = ({ categoryName, title1, title2, description }) => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [availableBrands, setAvailableBrands] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands((prev) => prev.filter((item) => item !== brand))
    } else {
      setSelectedBrands((prev) => [...prev, brand])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice()

    productsCopy = productsCopy.filter((item) => item.category === categoryName)

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (selectedBrands.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        if (!item.brand) return false
        return selectedBrands.includes(item.brand)
      })
    }

    setFilteredProducts(productsCopy)
  }

  const sortProducts = () => {
    const fpCopy = filteredProducts.slice()

    switch (sortType) {
      case 'low-high':
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price))
        break
      default:
        applyFilter()
        break
    }
  }

  useEffect(() => {
    if (products.length > 0) {
      const brandsSet = new Set()
      products.forEach((product) => {
        if (product.category === categoryName && product.brand && product.brand.trim() !== '') {
          brandsSet.add(product.brand)
        }
      })
      setAvailableBrands(Array.from(brandsSet).sort())
    }
  }, [products, categoryName])

  useEffect(() => {
    applyFilter()
  }, [selectedBrands, search, showSearch, products, categoryName])

  useEffect(() => {
    sortProducts()
  }, [sortType])

  if (products.filter((p) => p.category === categoryName).length === 0) {
    return <ComingSoonComponent />
  }

  return (
    <section className="border-t border-border-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Title text1={title1} text2={title2} />
            {description && (
              <p className="text-sm text-text-secondary mt-4 max-w-2xl">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">Sort</p>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-border-light bg-white px-3 py-2 text-xs uppercase tracking-[0.2em]"
            >
              <option value="relavent">Relevant</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
        <aside className="border border-border-light bg-white p-5 h-fit sticky top-28">
          <button
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-text-secondary"
          >
            Filters
            <img
              className={`h-3 lg:hidden transition ${showFilter ? 'rotate-90' : ''}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </button>

          <div className={`mt-6 ${showFilter ? '' : 'hidden lg:block'}`}>
            <p className="text-caption text-text-tertiary mb-3">Brands</p>
            <div className="flex flex-wrap gap-2">
              {availableBrands.length > 0 ? (
                availableBrands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => toggleBrand(brand)}
                    className={`px-3 py-1 border text-xs uppercase tracking-[0.2em] ${
                      selectedBrands.includes(brand)
                        ? 'border-border-dark bg-brand-black text-brand-white'
                        : 'border-border-light text-text-secondary'
                    }`}
                  >
                    {brand}
                  </button>
                ))
              ) : (
                <p className="text-xs text-text-tertiary">No brands available</p>
              )}
            </div>
          </div>
        </aside>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
            Showing {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <Productitem
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  Mrpprice={item.Mrpprice}
                  quantity={item.quantity}
                  category={item.category}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-text-tertiary text-sm">No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryPageWithFilters
