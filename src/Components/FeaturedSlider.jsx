import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import Productitem from "./Productitem";

const FeaturedSlider = () => {
  const { products } = useContext(ShopContext);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  // take only first 4 products for slider
  const featured = products.slice(0, 4);

  useEffect(() => {
    if (featured.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 2) % featured.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [featured.length]);

  const visibleProducts = featured.length > 0 
    ? [
        featured[index],
        featured[(index + 1) % featured.length],
      ].filter(item => item !== undefined)
    : [];

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between my-16 px-4 md:px-12 py-12 bg-section-bg rounded-2xl">
      
      {/* Left Text */}
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-3xl font-semibold tracking-wide">
          Handpicked <span className="text-red-500">Featured Drops</span>
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Discover our most trending & value-packed outfits chosen from our latest
          collection. Crafted for comfort, fashion, and a lasting impression.
        </p>
        <button 
          onClick={() => navigate('/collection')}
          className="mt-4 bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-all duration-300"
        >
          Explore Collection →
        </button>
      </div>

      {/* Sliding Products */}
      <div className="md:w-1/2 grid grid-cols-2 gap-4 mt-8 md:mt-0 transition-all duration-500">
        {visibleProducts.map((item) => (
          <div
            key={item._id}
            className="bg-white/70 rounded-xl p-3 backdrop-blur shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
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
    
  );
};

export default FeaturedSlider;
