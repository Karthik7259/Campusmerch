import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import Productitem from '../Components/Productitem'

const Collegemerchandise = () => {
  const { products, search, showSearch, backendURL } = useContext(ShopContext)
  const [searchParams] = useSearchParams()
  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [merchandiseList, setMerchandiseList] = useState([])
  const [selectedMerchandise, setSelectedMerchandise] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [availableColors, setAvailableColors] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [availableBrands, setAvailableBrands] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const fetchMerchandiseList = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/college-merchandise/list`)
      if (response.data.success) {
        const raw = Array.isArray(response.data.merchandises) ? response.data.merchandises : []
        /* Match API: treat missing isActive as active (legacy docs); only hide soft-deleted */
        const filteredList = raw.filter(
          (item) =>
            item.isActive !== false &&
            item.name &&
            item.name.trim() !== '' &&
            item.name.toLowerCase() !== 'none'
        )
        console.log('Merchandise List:', filteredList)
        setMerchandiseList(filteredList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const merchandiseParam = searchParams.get('merchandise')
    if (merchandiseParam) {
      setSelectedMerchandise([merchandiseParam])
    }
  }, [searchParams])

  const toggleMerchandise = (e) => {
    const value = e.target.value
    if (selectedMerchandise.includes(value)) {
      setSelectedMerchandise((prev) => prev.filter((item) => item !== value))
    } else {
      setSelectedMerchandise((prev) => [...prev, value])
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

  const extractColors = () => {
    const colorMap = {
      Black: '#000000',
      White: '#FFFFFF',
      Red: '#FF0000',
      Blue: '#0000FF',
      Green: '#008000',
      Yellow: '#FFFF00',
      Orange: '#FFA500',
      Purple: '#800080',
      Pink: '#FFC0CB',
      Grey: '#808080',
      Gray: '#808080',
      Brown: '#A52A2A',
      Navy: '#000080',
      Maroon: '#800000',
      Beige: '#F5F5DC',
      Cream: '#FFFDD0',
      Gold: '#FFD700',
      Silver: '#C0C0C0',
      Olive: '#808000',
      Teal: '#008080',
      Cyan: '#00FFFF',
      Magenta: '#FF00FF',
      Violet: '#EE82EE',
      Indigo: '#4B0082',
    }

    const colorsFound = []
    const brandsSet = new Set()

    Object.keys(colorMap).forEach((colorName) => {
      const hasColor = products.some((product) => {
        if (
          product.collegeMerchandise &&
          product.collegeMerchandise.toLowerCase() !== 'none' &&
          product.collegeMerchandise.trim() !== ''
        ) {
          return product.name.toLowerCase().includes(colorName.toLowerCase())
        }
        return false
      })

      if (hasColor) {
        colorsFound.push({ name: colorName, hex: colorMap[colorName] })
      }
    })

    products.forEach((product) => {
      if (
        product.collegeMerchandise &&
        product.collegeMerchandise.toLowerCase() !== 'none' &&
        product.collegeMerchandise.trim() !== '' &&
        product.brand &&
        product.brand.trim() !== ''
      ) {
        brandsSet.add(product.brand)
      }
    })

    setAvailableColors(colorsFound)
    setAvailableBrands(Array.from(brandsSet).sort())
  }

  const applyFilter = () => {
    let productsCopy = products.slice()

    productsCopy = productsCopy.filter(
      (item) =>
        item.collegeMerchandise &&
        item.collegeMerchandise.toLowerCase() !== 'none' &&
        item.collegeMerchandise.trim() !== ''
    )

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (selectedMerchandise.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedMerchandise.includes(item.collegeMerchandise)
      )
    }

    if (selectedColors.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        const productName = item.name.toLowerCase()
        return selectedColors.some((color) => productName.includes(color.toLowerCase()))
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
    fetchMerchandiseList()
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      extractColors()
    }
  }, [products])

  useEffect(() => {
    applyFilter()
  }, [selectedMerchandise, selectedColors, selectedBrands, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <section className="border-t border-border-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Title text1="College" text2="Merchandise" />
            <p className="text-sm text-text-secondary mt-4">
              Customized apparel and accessories tailored for campus pride.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">Sort</p>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-border-light bg-white px-3 py-2 text-xs uppercase tracking-[0.2em]"
            >
              <option value="relevant">Relevant</option>
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
              <p className="text-caption text-text-tertiary mb-3">Merchandise</p>
              <div className="grid gap-2 text-sm text-text-secondary max-h-[260px] overflow-y-auto">
                {merchandiseList.length > 0 ? (
                  merchandiseList.map((merchandise) => (
                    <label key={merchandise._id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-3 w-3"
                        value={merchandise.name}
                        onChange={toggleMerchandise}
                        checked={selectedMerchandise.includes(merchandise.name)}
                      />
                      {merchandise.name}
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-text-tertiary">No merchandise available</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-caption text-text-tertiary mb-3">Colors</p>
              <div className="flex flex-wrap gap-2">
                {availableColors.length > 0 ? (
                  availableColors.map((colorObj) => (
                    <button
                      key={colorObj.name}
                      type="button"
                      onClick={() => toggleColor(colorObj.name)}
                      className={`px-3 py-1 border text-xs uppercase tracking-[0.2em] ${
                        selectedColors.includes(colorObj.name)
                          ? 'border-border-dark bg-brand-black text-brand-white'
                          : 'border-border-light text-text-secondary'
                      }`}
                      title={colorObj.name}
                      style={{ backgroundColor: selectedColors.includes(colorObj.name) ? '' : colorObj.hex }}
                    >
                      {colorObj.name}
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-text-tertiary">No colors found</p>
                )}
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
                  <p className="text-xs text-text-tertiary">No brands found</p>
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
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

export default Collegemerchandise
