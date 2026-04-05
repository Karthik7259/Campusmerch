import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import Productitem from '../Components/Productitem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setcategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [availableColors, setAvailableColors] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [availableBrands, setAvailableBrands] = useState([])
  const [availableCategories, setAvailableCategories] = useState([])
  const [availableSubCategories, setAvailableSubCategories] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setcategory((prev) => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setSubCategory((prev) => [...prev, e.target.value])
    }
  }

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors((prev) => prev.filter((item) => item !== color))
    } else {
      setSelectedColors((prev) => [...prev, color])
    }
  }

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands((prev) => prev.filter((item) => item !== brand))
    } else {
      setSelectedBrands((prev) => [...prev, brand])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice()

    productsCopy = productsCopy.filter(
      (item) =>
        item.category === 'Apparels' &&
        item.collegeMerchandise &&
        item.collegeMerchandise.trim() !== ''
    )

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory))
    }

    if (selectedColors.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        if (!item.color) return false
        const productColor = item.color.toLowerCase()
        return selectedColors.some((color) => productColor.includes(color.toLowerCase()))
      })
    }

    if (selectedBrands.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        if (!item.brand) return false
        return selectedBrands.includes(item.brand)
      })
    }

    setFilteredProducts(productsCopy)
  }

  const sortProduct = () => {
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
    applyFilter()
  }, [category, subCategory, search, showSearch, products, selectedColors, selectedBrands])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  useEffect(() => {
    const colors = new Set()
    const brands = new Set()
    const categories = new Set()
    const subCategories = new Set()

    products.forEach((product) => {
      if (
        product.color &&
        product.color.trim() !== '' &&
        product.category === 'Apparels' &&
        product.collegeMerchandise &&
        product.collegeMerchandise.trim() !== ''
      ) {
        const productColors = product.color.split(',').map((c) => c.trim())
        productColors.forEach((color) => {
          if (color) colors.add(color)
        })
      }

      if (
        product.brand &&
        product.brand.trim() !== '' &&
        product.category === 'Apparels' &&
        product.collegeMerchandise &&
        product.collegeMerchandise.trim() !== ''
      ) {
        brands.add(product.brand)
      }

      if (
        product.category === 'Apparels' &&
        product.collegeMerchandise &&
        product.collegeMerchandise.trim() !== ''
      ) {
        categories.add(product.category)
      }

      if (
        product.subCategory &&
        product.subCategory.trim() !== '' &&
        product.category === 'Apparels' &&
        product.collegeMerchandise &&
        product.collegeMerchandise.trim() !== ''
      ) {
        subCategories.add(product.subCategory)
      }
    })

    setAvailableColors(Array.from(colors).sort())
    setAvailableBrands(Array.from(brands).sort())
    setAvailableCategories(Array.from(categories).sort())
    setAvailableSubCategories(Array.from(subCategories).sort())
  }, [products])

  return (
    <section className="border-t border-border-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Title text1="Collection" text2="Apparels" />
            <p className="text-sm text-text-secondary mt-4">
              Curated apparel merchandise crafted for premium brand moments.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
              Sort
            </p>
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

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
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

          <div className={`mt-6 space-y-6 ${showFilter ? '' : 'hidden lg:block'}`}>
            <div>
              <p className="text-caption text-text-tertiary mb-3">Categories</p>
              <div className="grid gap-2 text-sm text-text-secondary">
                {availableCategories.length > 0 ? (
                  availableCategories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-3 w-3"
                        value={cat}
                        onChange={toggleCategory}
                        checked={category.includes(cat)}
                      />
                      {cat}
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-text-tertiary">No categories available</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-caption text-text-tertiary mb-3">Type</p>
              <div className="grid gap-2 text-sm text-text-secondary">
                {availableSubCategories.length > 0 ? (
                  availableSubCategories.map((subCat) => (
                    <label key={subCat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-3 w-3"
                        value={subCat}
                        onChange={toggleSubCategory}
                        checked={subCategory.includes(subCat)}
                      />
                      {subCat}
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-text-tertiary">No types available</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-caption text-text-tertiary mb-3">Colors</p>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => toggleColor(color)}
                    className={`px-3 py-1 border text-xs uppercase tracking-[0.2em] ${
                      selectedColors.includes(color)
                        ? 'border-border-dark bg-brand-black text-brand-white'
                        : 'border-border-light text-text-secondary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
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
          </div>
        </aside>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
            Showing {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <Productitem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                Mrpprice={item.Mrpprice}
                image={item.image}
                quantity={item.quantity}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Collection
