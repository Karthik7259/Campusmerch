import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../Components/Title'
import Productitem from '../Components/Productitem'

const Lifestyle = () => {
  const { products } = useContext(ShopContext);
  const [lifestyleProducts, setLifestyleProducts] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(product => product.category === 'Lifestyle & Utility Items');
      setLifestyleProducts(filtered);
    }
  }, [products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  const sortProducts = () => {
    let productsCopy = lifestyleProducts.slice();

    switch (sortType) {
      case 'low-high':
        setLifestyleProducts(productsCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setLifestyleProducts(productsCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        // Keep original order
        if (products.length > 0) {
          const filtered = products.filter(product => product.category === 'Lifestyle & Utility Items');
          setLifestyleProducts(filtered);
        }
        break;
    }
  };

  return (
    <div className='border-t pt-10 pb-20'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LIFESTYLE & '} text2={'UTILITY ITEMS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover our premium collection of lifestyle and utility items designed for everyday convenience and style.
        </p>
      </div>

      <div className='flex justify-between items-center mb-6 px-4'>
        <p className='text-base sm:text-xl font-medium'>
          {lifestyleProducts.length} Products
        </p>
        {/* Sort Dropdown */}
        <select 
          onChange={(e) => setSortType(e.target.value)} 
          className='border-2 border-gray-300 text-sm px-4 py-2 rounded'
        >
          <option value="relavent">Sort by: Relevant</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>

      {lifestyleProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {lifestyleProducts.map((item, index) => (
            <Productitem 
              key={index} 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price} 
              Mrpprice={item.Mrpprice}
              quantity={item.quantity}
            />
          ))}
        </div>
      ) : (
        <div className='text-center py-10'>
          <p className='text-gray-500 text-lg'>No lifestyle products available at the moment.</p>
        </div>
      )}
    </div>
  )
}

export default Lifestyle