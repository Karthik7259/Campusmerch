import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export const ShopContext=createContext();


const ShopContextProvider=(props)=>{


    const currency='₹';
    const delivery_fee=10;
    const backendURL=import.meta.env.VITE_BACKEND_URL;
     const [search,setSearch]=useState('');
     const [showSearch,setShowSearch]=useState(false);


     const [cartItems,setCartItems]=useState({});

     const [token,setToken]=useState('');
     const navigate=useNavigate();
   
    const addToCart = async (itemId,size)=>{
          // Find the product to check available quantity
          const product = products.find(p => p._id === itemId);
          
          if(!product){
            toast.error("Product not found");
            return;
          }
          
          // If size is not provided (for non-clothing items), use 'default' as the size key
          const sizeKey = size || 'default';
          
          // Determine available stock for this specific size or overall
          let availableStock = 0;
          if(product.sizeVariants && product.sizeVariants.length > 0){
            // Has size-based pricing - check specific size stock
            const sizeVariant = product.sizeVariants.find(v => v.size === sizeKey);
            if(sizeVariant){
              availableStock = sizeVariant.quantity || 0;
            } else {
              availableStock = 0;
            }
          } else {
            // No size variants - use overall product stock
            availableStock = product.quantity || 0;
          }
          
          if(availableStock === 0){
            toast.error(`⚠️ Out of Stock - ${sizeKey !== 'default' ? `Size ${sizeKey}` : 'This product'} is currently unavailable`);
            return;
          }
          
          let cartData=structuredClone(cartItems);
          
          // Calculate current quantity in cart for this item + size
          let currentQuantity = 0;
          if(cartData[itemId] && cartData[itemId][sizeKey]){
            currentQuantity = cartData[itemId][sizeKey];
          }
          
          // Check if adding one more would exceed available stock
          if(currentQuantity >= availableStock){
            toast.error(`⚠️ No More Stock - Only ${availableStock} ${availableStock === 1 ? 'item' : 'items'} available for ${sizeKey !== 'default' ? `size ${sizeKey}` : 'this product'}`);
            return;
          }
          
          if(cartData[itemId]){
            if(cartData[itemId][sizeKey]){
              cartData[itemId][sizeKey]+=1;
            }else{
               cartData[itemId][sizeKey]=1;  
            }
    }
    else{
         cartData[itemId]={};
            cartData[itemId][sizeKey]=1;
    }

    setCartItems(cartData);


    if(token){
      try{
        const response = await axios.post(backendURL+'/api/cart/add',{itemId,size: sizeKey},{headers:{token}});
        
        if(response.data.success){
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || 'Failed to add to cart');
          // Rollback local cart if backend fails
          setCartItems(structuredClone(cartItems));
        }

      }catch(err){
        console.log('Add to cart error:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to add to cart';
        toast.error(errorMessage);
        // Rollback local cart if backend fails
        setCartItems(structuredClone(cartItems));
      }
    } else {
      toast.success('Added to cart');
    }
    }



 const getCartCount=()=>{
  let totalCount=0;
   for(const items in cartItems){
      for(const item in cartItems[items]){
try{
     if(cartItems[items][item]>0){
         totalCount+=cartItems[items][item];

     }
}catch(err){
  console.log(err);
}
      }
    } 
   

    return totalCount;
 }


 const updateQuantity=async(itemId,size,quantity)=>{
      // Find the product to check available quantity
      const product = products.find(p => p._id === itemId);
      
      if(!product){
        toast.error("Product not found");
        return;
      }
      
      // Determine available stock for this specific size or overall
      let availableStock = 0;
      if(product.sizeVariants && product.sizeVariants.length > 0){
        // Has size-based pricing - check specific size stock
        const sizeVariant = product.sizeVariants.find(v => v.size === size);
        if(sizeVariant){
          availableStock = sizeVariant.quantity || 0;
        } else {
          availableStock = 0;
        }
      } else {
        // No size variants - use overall product stock
        availableStock = product.quantity || 0;
      }
      
      // Validate quantity against available stock
      if(quantity > availableStock){
        toast.error(`Only ${availableStock} items available in stock for ${size !== 'default' ? `size ${size}` : 'this product'}`);
        return;
      }
      
      let cartData=structuredClone(cartItems);
          
      cartData[itemId][size]=quantity;



      setCartItems(cartData);

      if(token){
        try{
          await axios.post(backendURL+'/api/cart/update',{itemId,size,quantity},{headers:{token}}); 

        }catch(err){
          console.log(err);
          toast.error(err.message);
        }
 }  
 }


  const getCartAmount=()=>{
      let totalAmount=0;
      for(const items in cartItems){
      
           let itemInfo=products.find(product=>product._id===items);
           
           if(!itemInfo) continue;
               
      for(const item in cartItems[items]){

        try{
               if(cartItems[items][item]>0){
                    // Check if product has size variants
                    if(itemInfo.sizeVariants && itemInfo.sizeVariants.length > 0){
                      // Use size-specific price
                      const sizeVariant = itemInfo.sizeVariants.find(v => v.size === item);
                      const price = sizeVariant ? sizeVariant.price : itemInfo.price;
                      totalAmount += price * cartItems[items][item];
                    } else {
                      // Use regular price
                      totalAmount += itemInfo.price * cartItems[items][item];
                    }
               }
        }catch(err){
          console.log(err);
        }

      }
      } 


        return totalAmount;

  } 

  const getCartGST=()=>{
      let apparelAmount=0;
      let otherAmount=0;
      
      for(const items in cartItems){
           let itemInfo=products.find(product=>product._id===items);
           
           if(!itemInfo) continue;
               
      for(const item in cartItems[items]){
        try{
               if(cartItems[items][item]>0){
                    // Check if product has size variants
                    let itemTotal = 0;
                    if(itemInfo.sizeVariants && itemInfo.sizeVariants.length > 0){
                      // Use size-specific price
                      const sizeVariant = itemInfo.sizeVariants.find(v => v.size === item);
                      const price = sizeVariant ? sizeVariant.price : itemInfo.price;
                      itemTotal = price * cartItems[items][item];
                    } else {
                      // Use regular price
                      itemTotal = itemInfo.price * cartItems[items][item];
                    }
                    
                    if(itemInfo.category === 'Apparels'){
                      apparelAmount += itemTotal;
                    } else {
                      otherAmount += itemTotal;
                    }
               }
        }catch(err){
          console.log(err);
        }
      }
      } 

      const apparelGST = apparelAmount * 0.05; // 5% for Apparels
      const otherGST = otherAmount * 0.18; // 18% for others
      const totalGST = apparelGST + otherGST;

      return {
        apparelGST: Math.round(apparelGST * 100) / 100,
        otherGST: Math.round(otherGST * 100) / 100,
        totalGST: Math.round(totalGST * 100) / 100
      };
  }



  const [products,setProducts]=useState([]);


  const getProductsData=async()=>{
      try{
        const response=await axios.get(backendURL+'/api/product/list');
     
        const data=response.data;
        if(data.success){
          setProducts(data.products);
        }else{
          toast.error(data.message);
        }
      }catch(err){
        console.log(err);
        toast.error("Error in fetching products data");
      }

    }


    const getUserCart=async(token)=>{
        if(token){
          try{  
            const response=await axios.post(backendURL+'/api/cart/get',{},{headers:{token}});
            const data=response.data;
            if(data.success){
              setCartItems(data.cartData);
            }

          }catch(err){
            console.log(err);
            toast.error("Error in fetching cart data");
          }
        }
    }


useEffect(()=>{
 getProductsData();
},[])


useEffect(()=>{

   if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
    getUserCart( localStorage.getItem('token') );

   }

},[])

    const value = {
             products,
             currency,
             delivery_fee,
                search,
                setSearch,
                showSearch,
                setShowSearch,
                cartItems,addToCart,setCartItems,
                getCartCount,updateQuantity,
                getCartAmount,
                getCartGST,
                navigate,
                backendURL,
                token,
                setToken
            
    }



    return (
        <ShopContext.Provider value={value}>

            {
                 props.children
            }

        </ShopContext.Provider>
    )
}


export default ShopContextProvider;