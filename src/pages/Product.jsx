import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../Components/RelatedProduct';
import PincodeChecker from '../Components/PincodeChecker';
import { toast } from 'react-toastify';

const Product = () => {
  const {productId} = useParams();
 const {products,currency,addToCart,cartItems} = useContext(ShopContext);
  
  const [productData,setProductData] = useState(false);

   const [image,setImage] = useState('');

   const [size,setSize] = useState('');
   
   const [activeTab, setActiveTab] = useState('mission');
   
   const [currentPrice, setCurrentPrice] = useState(0);
   const [currentMrpPrice, setCurrentMrpPrice] = useState(0);
   const [currentStock, setCurrentStock] = useState(0);
   
   // Check if product has size variants
   const hasSizeVariants = productData && productData.sizeVariants && productData.sizeVariants.length > 0;

const fetchProductData = async() => {
   
  products.map((item) => {
     if(item._id === productId){
        setProductData(item);
        setImage(item.image[0]);
        
        // Set initial prices and stock
        if (item.sizeVariants && item.sizeVariants.length > 0) {
          // Has size variants - use first variant's pricing
          setCurrentPrice(item.sizeVariants[0].price);
          setCurrentMrpPrice(item.sizeVariants[0].mrpPrice);
          setCurrentStock(item.sizeVariants[0].quantity);
        } else {
          // No size variants - use overall product pricing and stock
          setCurrentPrice(item.price);
          setCurrentMrpPrice(item.Mrpprice);
          setCurrentStock(item.quantity || 0);
        }
       
        return null;
     }
  })
}

useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
    setSize('');
}, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 pb-16 transition-opacity ease-in duration-500 opacity-100'>
  {/* Product   data */}
  <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
 {/* Product images */}

    <div className='flex-1 flex  flex-col-reverse gap-3 sm:flex-row'>
      <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
         {
             productData.image.map((item,index)=>(
               <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'  alt='' />
             ))
         }


      </div>
      <div className='w-full sm:w-[80%]'>
          <img src={image} alt="" className='w-full h-auto' />
      </div>
    </div>

    {/* Product details */}
     <div className='flex-1 '>
      <h1 className='font-medium text-2xl mt-2 '>{productData.name}</h1>

      <div className='flex items-center gap-1 mt-2 '>
             <img src={assets.star_icon} alt="" className="w-3 5" />
             <img src={assets.star_icon} alt="" className="w-3 5" />
             <img src={assets.star_icon} alt="" className="w-3 5" />
             <img src={assets.star_icon} alt="" className="w-3 5" />
             <img src={assets.star_dull_icon} alt="" className="w-3 5" />
             <p className='pl-2 '>{122}</p>
      </div>
       <p  className='mt-5 text-3xl font-medium'>{currency}{hasSizeVariants ? currentPrice : productData.price}</p>
        <p className='text-sm text-gray-500 line-through '>M.R.P: {currency}{hasSizeVariants ? currentMrpPrice : productData.Mrpprice}</p>
        {hasSizeVariants && !size && (
          <p className='text-xs text-orange-600 mt-1'>* Price varies by size. Select a size to see final price.</p>
        )}
      <p className='mt-5 text-gray-500 md:w'>{productData.description}</p>
      
      {/* Stock Status */}
      {(hasSizeVariants ? currentStock : (productData.quantity || 0)) === 0 ? (
        <div className='mt-5 mb-5'>
          <p className='text-red-600 font-bold text-lg'>SOLD OUT</p>
          <p className='text-sm text-gray-500'>This product is currently out of stock</p>
        </div>
      ) : (hasSizeVariants ? currentStock : (productData.quantity || 0)) < 10 ? (
        <div className='mt-5 mb-5'>
          <p className='text-orange-600 font-bold text-base animate-pulse'>⚡ HURRY! Limited stock available</p>
          <p className='text-sm text-gray-500'>Order now before it runs out!</p>
        </div>
      ) : (
        <p className='mt-5 text-green-600 text-sm'>✓ In Stock</p>
      )}

      {/* Only show size selector for Apparels category */}
      {productData.category === 'Apparels' && (
        <div className='flex flex-col gap-4 my-8'>
          <p>Select Size</p>
          <div className='flex gap-2 flex-wrap'>
            {
              (hasSizeVariants ? productData.sizeVariants.map(v => v.size) : ['S', 'M', 'L', 'XL', 'XXL'].filter(s => productData.sizes && productData.sizes.includes(s))).map((item,index)=>{
                const variant = hasSizeVariants ? productData.sizeVariants.find(v => v.size === item) : null;
                // For size variants, check individual size stock; otherwise check overall stock
                const isOutOfStock = hasSizeVariants ? (variant && variant.quantity === 0) : (productData.quantity === 0);
                
                return (
                  <button 
                    onClick={()=>{
                      if (!isOutOfStock) {
                        setSize(item);
                        if (hasSizeVariants && variant) {
                          // Use size variant pricing and stock
                          setCurrentPrice(variant.price);
                          setCurrentMrpPrice(variant.mrpPrice);
                          setCurrentStock(variant.quantity);
                        } else {
                          // Use overall product pricing and stock
                          setCurrentPrice(productData.price);
                          setCurrentMrpPrice(productData.Mrpprice);
                          setCurrentStock(productData.quantity || 0);
                        }
                      }
                    }}
                    disabled={isOutOfStock}
                    className={`border py-2 px-4 bg-gray-100 ${size === item ? 'border-orange-500 bg-orange-50' : ''} ${isOutOfStock ? 'opacity-40 cursor-not-allowed line-through' : 'cursor-pointer hover:border-orange-300'} relative`}
                    key={index}
                  >
                    {item}
                    {hasSizeVariants && variant && (
                      <span className='text-xs block text-gray-600'>{currency}{variant.price}</span>
                    )}
                    {isOutOfStock && <span className='absolute top-0 right-0 text-red-500 text-xs'>✕</span>}
                  </button>
                )
              })
            }
          </div>
        </div>
      )}

      <button 
        onClick={()=>{
          // Determine the available stock (size variant or overall)
          const availableStock = hasSizeVariants ? currentStock : (productData.quantity || 0);
          
          // Check if item is already at stock limit in cart
          const sizeKey = productData.category === 'Apparels' ? size : 'default';
          const currentQuantityInCart = cartItems[productData._id]?.[sizeKey] || 0;
          
          if(currentQuantityInCart >= availableStock) {
            toast.error(`⚠️ No More Stock - Only ${availableStock} ${availableStock === 1 ? 'item' : 'items'} available`);
            return;
          }
          
          // Validate size selection for Apparels
          if(productData.category === 'Apparels' && !size) {
            toast.error('Please select a size');
            return;
          }
          addToCart(productData._id, productData.category === 'Apparels' ? size : 'default');
        }} 
        disabled={(() => {
          // Determine the available stock (size variant or overall)
          const availableStock = hasSizeVariants ? currentStock : (productData.quantity || 0);
          
          // Check if product is out of stock OR if cart already has max quantity
          if(availableStock === 0) return true;
          
          const sizeKey = productData.category === 'Apparels' ? size : 'default';
          const currentQuantityInCart = cartItems[productData._id]?.[sizeKey] || 0;
          
          return currentQuantityInCart >= availableStock;
        })()}
        className={`px-8 py-3 text-sm ${(() => {
          const availableStock = hasSizeVariants ? currentStock : (productData.quantity || 0);
          
          if(availableStock === 0) return 'bg-gray-400 cursor-not-allowed';
          
          const sizeKey = productData.category === 'Apparels' ? size : 'default';
          const currentQuantityInCart = cartItems[productData._id]?.[sizeKey] || 0;
          
          if(currentQuantityInCart >= availableStock) return 'bg-gray-400 cursor-not-allowed';
          
          return 'bg-black active:bg-gray-700';
        })()} text-white`}
      >
        {(() => {
          const availableStock = hasSizeVariants ? currentStock : (productData.quantity || 0);
          
          if(availableStock === 0) return 'Sold Out';
          
          const sizeKey = productData.category === 'Apparels' ? size : 'default';
          const currentQuantityInCart = cartItems[productData._id]?.[sizeKey] || 0;
          
          if(currentQuantityInCart >= availableStock) return 'Out of Stock';
          
          return 'Add to Cart';
        })()}
      </button>

      {/* Pincode Checker */}
      <PincodeChecker productWeight={0.5} />

      <hr className='mt-8 sm:w-4/5 ' />
      <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1 '
      >
       <p className=''>Pan-India Service With timely deliveries</p>
       <p className='text-orange-600 font-medium'>💡 Tip: Check size chart before purchase</p>
      </div>
     </div>
  </div>
  {/* Mission & Vision Section */}

  <div className='mt-20'>
     <div className='flex'>
      <button 
        onClick={() => setActiveTab('mission')}
        className={`border px-5 py-3 text-sm font-medium transition-colors ${activeTab === 'mission' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
      >
        Our Mission
      </button>
      <button 
        onClick={() => setActiveTab('vision')}
        className={`border px-5 py-3 text-sm font-medium transition-colors ${activeTab === 'vision' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
      >
        Our Vision
      </button>
     </div>
     <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700'>
         {activeTab === 'mission' ? (
           <>
             <h3 className='font-bold text-lg text-gray-900 mb-2'>Our Mission</h3>
             <p>Our extensive range of customizable & branded gifting options enables companies to express appreciation, foster loyalty and differentiate themselves in a competitive marketplace.</p>
             <p>Our mission is to create memorable gifting experiences that not only enhance business relationships but also drive sustainable growth for years to come.</p>
             
             <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
               <div className='flex gap-3 items-start'>
                 <div className='w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0'>
                   <span className='text-2xl'>👥</span>
                 </div>
                 <div>
                   <h4 className='font-semibold text-gray-900'>Stakeholder Care</h4>
                   <p className='text-xs text-gray-600 mt-1'>We are dedicated to caring for our stakeholders, environment, customers, shareholders, community, and our people (employees & partners).</p>
                 </div>
               </div>
               
               <div className='flex gap-3 items-start'>
                 <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0'>
                   <span className='text-2xl'>⚡</span>
                 </div>
                 <div>
                   <h4 className='font-semibold text-gray-900'>Speed & Responsiveness</h4>
                   <p className='text-xs text-gray-600 mt-1'>We prioritize speed, responsiveness, and proactive approaches, fostered through collaboration and the empowerment of our employees.</p>
                 </div>
               </div>
               
               <div className='flex gap-3 items-start'>
                 <div className='w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0'>
                   <span className='text-2xl'>🌱</span>
                 </div>
                 <div>
                   <h4 className='font-semibold text-gray-900'>Sustainability</h4>
                   <p className='text-xs text-gray-600 mt-1'>We are committed to eco-friendly and safe practices, sourcing sustainable materials, and reducing our environmental footprint.</p>
                 </div>
               </div>
               
               <div className='flex gap-3 items-start'>
                 <div className='w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0'>
                   <span className='text-2xl'>⚖️</span>
                 </div>
                 <div>
                   <h4 className='font-semibold text-gray-900'>Integrity</h4>
                   <p className='text-xs text-gray-600 mt-1'>We uphold the highest standards of ethics, driven by integrity and mutual trust.</p>
                 </div>
               </div>
             </div>
           </>
         ) : (
           <>
             <h3 className='font-bold text-lg text-gray-900 mb-2'>Our Vision</h3>
             <p>Our vision is to become the most valued gifting partner for businesses looking to build valuable connections and enhance brand recognition through thoughtful and personalized gifts.</p>
             <p>We aim to continue evolving by offering innovative and sustainable gifting solutions that align with corporate values and help companies grow and make a long lasting impact.</p>
           </>
         )}
     </div>
  </div>


{/* ---------- display realted product ---------- */}
  

  <RelatedProduct category={productData.category} subCategory={productData.subCategory} />




    </div>
  ) : <div className='opacity-0'></div>
}

export default Product