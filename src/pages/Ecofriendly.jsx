import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import Productitem from '../Components/Productitem'
import ComingSoonComponent from '../Components/ComingSoonComponent'

const Ecofriendly = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(prev => prev.filter(item => item !== brand));
    } else {
      setSelectedBrands(prev => [...prev, brand]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    productsCopy = productsCopy.filter(item => item.category === 'Eco-Friendly & Sustainable Merchandise');
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedBrands.length > 0) {
      productsCopy = productsCopy.filter(item => {
        if (!item.brand) return false;
        return selectedBrands.includes(item.brand);
      });
    }
    setFilteredProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = filteredProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const brandsSet = new Set();
      products.forEach(product => {
        if (product.category === 'Eco-Friendly & Sustainable Merchandise' && product.brand && product.brand.trim() !== '') {
          brandsSet.add(product.brand);
        }
      });
      setAvailableBrands(Array.from(brandsSet).sort());
    }
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [selectedBrands, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  if (products.filter(p => p.category === 'Eco-Friendly & Sustainable Merchandise').length === 0) {
    return <ComingSoonComponent />;
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>BRANDS</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 max-h-[400px] overflow-y-auto'>
            {availableBrands.length > 0 ? (
              availableBrands.map((brand, index) => (
                <p className='flex gap-2' key={index}>
                  <input type="checkbox" className='w-3' checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                  {brand}
                </p>
              ))
            ) : (
              <p className='text-gray-400 italic'>No brands available</p>
            )}
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ECO-FRIENDLY &'} text2={'SUSTAINABLE'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 rounded'>
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <p className='text-sm text-gray-600 mb-4'>
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} Mrpprice={item.Mrpprice} quantity={item.quantity} />
            ))
          ) : (
            <div className='col-span-full text-center py-16'>
              <p className='text-gray-400 text-lg'>No products found</p>
              <p className='text-gray-400 text-sm mt-2'>Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Ecofriendly