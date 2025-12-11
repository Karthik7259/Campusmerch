import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../Components/Title';
import Productitem from '../Components/Productitem';


const Collection = () => {

   const {products, search,showSearch}=useContext(ShopContext);

   const [ShowFileter,setShowFilter]=useState(false);

     const [filteredProducts,setFilteredProducts]=useState([]);

     const [category,setcategory]=useState([]);
     const [subCategory,setSubCategory]=useState([]);
     const [selectedColors,setSelectedColors]=useState([]);
     const [availableColors,setAvailableColors]=useState([]);
     const [sortType,setSortType]=useState('relavent');

     const toggleCategory=(e)=>{

      if(category.includes(e.target.value)){
          setcategory(prev=>prev.filter(item=>item !== e.target.value));
      }
        else{
          setcategory(prev=>[...prev,e.target.value]);
        }


     }



      const toggleSubCategory=(e)=>{

        if(subCategory.includes(e.target.value)){
            setSubCategory(prev=>prev.filter(item=>item !== e.target.value));
        }else{
             setSubCategory(prev=>[...prev,e.target.value]);
        }

      }

      const toggleColor = (color) => {
        if(selectedColors.includes(color)){
          setSelectedColors(prev => prev.filter(item => item !== color));
        }
        else{
          setSelectedColors(prev => [...prev, color]);
        }
      }

         const applyFilter=()=>{
        let productsCopy= products.slice();

        // Filter to show only Apparels category and skip products without college merchandise
        productsCopy = productsCopy.filter(item => 
          item.category === 'Apparels' && item.collegeMerchandise && item.collegeMerchandise.trim() !== ''
        );

        if(showSearch && search){
         productsCopy=productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if(category.length>0){
          productsCopy=productsCopy.filter(item=>category.includes(item.category));
         }
        
         if(subCategory.length>0){
          productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory));
         }

         if(selectedColors.length>0){
          productsCopy=productsCopy.filter(item => {
            if(!item.color) return false;
            const productColor = item.color.toLowerCase();
            return selectedColors.some(color => productColor.includes(color.toLowerCase()));
          });
         }

          setFilteredProducts(productsCopy);
         

        }

    //  useEffect(()=>{
    //   setFilteredProducts(products);
    //  },[])


    const sortProduct=()=>{

        let fpCopy= filteredProducts.slice();

        switch (sortType){

          case 'low-high':
            setFilteredProducts(fpCopy.sort((a,b)=>a.price - b.price));
            break;
          case 'high-low':
            setFilteredProducts(fpCopy.sort((a,b)=>b.price - a.price));
            break;

          default:
           applyFilter();
           break;

        }


    }



     useEffect(()=>{

      applyFilter();
     },[category,subCategory,search,showSearch,products,selectedColors])
    

     useEffect(()=>{

      sortProduct();

     },[sortType])

     useEffect(()=>{
      // Extract unique colors from products
      const colors = new Set();
      products.forEach(product => {
        if(product.color && product.color.trim() !== '' && 
           product.category === 'Apparels' && 
           product.collegeMerchandise && product.collegeMerchandise.trim() !== ''){
          // Split colors by comma if multiple colors are present
          const productColors = product.color.split(',').map(c => c.trim());
          productColors.forEach(color => {
            if(color) colors.add(color);
          });
        }
      });
      setAvailableColors(Array.from(colors).sort());
     },[products])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 pb-20 border-t'>
      
          {/* Filter Section */}
         < div className='min-w-60'>
            <p onClick={()=>setShowFilter(!ShowFileter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 '>FILTERS
              <img  className={`h-3 sm:hidden ${ShowFileter ? 'rotate-90 ': ' '}`} src={assets.dropdown_icon} alt="" />
            </p>
            {/*category filter */}

            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ShowFileter ? '': 'hidden'} sm:block `}>

                 <p className='mb-3 text-sm font-medium '>CATEGORIES</p>
                 <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                  <p className='flex gap-2'> 

                   <input type="checkbox" className='w-3'  value={'Apparels'} onChange={toggleCategory} />Apparels
                  </p>
                 </div>

            </div>
          {/* subcategory filer */}
           <div className={`border border-gray-300 pl-5 py-3 my-5 ${ShowFileter ? '': 'hidden'} sm:block `}>

                 <p className='mb-3 text-sm font-medium '>TYPE</p>
                 <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                  <p className='flex gap-2'> 

                   <input type="checkbox" className='w-3'  value={'Men'}  onChange={toggleSubCategory} /> Men
                  </p>
                  <p className='flex gap-2'> 

                   <input type="checkbox" className='w-3'  value={'Women'} onChange={toggleSubCategory} /> Women
                  </p>
                  <p className='flex gap-2'> 

                   <input type="checkbox" className='w-3'  value={'Kids'} onChange={toggleSubCategory} /> Kids
                  </p>
                
                 </div>
            </div>

          {/* Color filter */}
           <div className={`border border-gray-300 pl-5 py-3 my-5 ${ShowFileter ? '': 'hidden'} sm:block `}>
                 <p className='mb-3 text-sm font-medium '>COLORS</p>
                 <div className='flex flex-wrap gap-2 text-sm font-light text-gray-700'>
                  {availableColors.map((color, index) => (
                    <button 
                      key={index}
                      onClick={() => toggleColor(color)}
                      className={`px-3 py-1 border rounded ${selectedColors.includes(color) ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
                    >
                      {color}
                    </button>
                  ))}
                 </div>
            </div>
         </div>




        {/* right side */}
           <div className='flex-1 '>


            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                       <Title text1={'All'} text2={'COLLECTIONS'}/>
                       {/* product sort */}

                       <select onChange={(e)=>setSortType(e.target.value)} className='broder-2 border-gray-300 text-sm px-2  '>
                        <option value="relavent">Sort by : Relavent</option>
                        <option value="low-high">Sort by : Low to High</option>
                        <option value="high-low">Sort by : High to Low</option>

                       </select>
            </div>



     {/* map product */}

     <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
        {
           filteredProducts.map((item,index)=>(
            <Productitem key={index} name={item.name} id={item._id} price={item.price} Mrpprice={item.Mrpprice} image={item.image} quantity={item.quantity} />

           ))

        }
            
     </div>
        






           </div>



    </div>
  )
}

export default Collection