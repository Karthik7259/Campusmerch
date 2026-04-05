import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './Productitem'
import Title from './Title'

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice()
      productsCopy = productsCopy.filter((item) => category === item.category)
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
      setRelated(productsCopy.slice(0, 4))
    }
  }, [products, category, subCategory])

  if (related.length === 0) {
    return null
  }

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between">
        <Title text1="Related" text2="Products" />
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            Mrpprice={item.Mrpprice}
            image={item.image}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </div>
    </section>
  )
}

export default RelatedProduct
