// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import Title from './Title';
// import Productitem from './Productitem';

// const LastestCollection = () => {


// const {products}=useContext(ShopContext);
//   const [latestProducts,setlatestProducts]=useState([])
  
//  useEffect(()=>{
//         setlatestProducts(products.slice(0,10));
//  },[])




//   return (
//     <div className='my-10'> 
//       <div className='text-center py-8 text-3xl '>
//          <Title text1={'LATEST '} text2={'COLLECTION'}/>
//          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
//          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus minus nihil illo itaque ad corporis, in quibusdam, voluptatem nam ipsam aliquid temporibus et expedita modi ex quam. Numquam, alias obcaecati.
//          </p>

//         </div>       
       
//          {/* Rendering products*/}
        
//         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//            {
//             latestProducts.map((item,index)=>(
//                <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
//             ))
//            }
//         </div>
//     </div>
//   )
// }

// export default LastestCollection


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import Productitem from './Productitem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Guard in case context delivers empty array on first run
    if (products?.length) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <section className="w-11/12 max-w-screen-2xl mx-auto my-16 px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="max-w-2xl mx-auto mt-4 text-sm md:text-base text-gray-500">
          Discover our newest arrivals, curated just for you. Limited stocks – grab yours before
          they’re gone!
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-7">
        {!latestProducts.length ? (
          // Skeleton loaders
          Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-xl animate-pulse aspect-[4/5]"
            />
          ))
        ) : (
          latestProducts.map((item) => (
            <Productitem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              Mrpprice={item.Mrpprice}
            />
          ))
        )}
      </div>

      {/* View-all button */}
      {latestProducts.length > 0 && (
        <div className="mt-12 flex justify-center opacity-0 animate-fade-in">
          <button className="px-7 py-3 rounded-full border-2 border-gray-800 text-gray-800 font-semibold
                              hover:bg-gray-800 hover:text-white transition-all duration-300">
            View all products
          </button>
        </div>
      )}

      {/* Quick fade-in animation */}
      <style jsx>{`
        @keyframes fade-in {
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default LatestCollection;