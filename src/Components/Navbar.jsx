import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';
import axios from 'axios';

const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const [merchandiseList, setMerchandiseList] = useState([]);
  const [showMerchandiseDropdown, setShowMerchandiseDropdown] = useState(false);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Fetch college merchandise list
  const fetchMerchandiseList = async () => {
    try {
      const response = await axios.get(backendURL + '/api/college-merchandise/list');
      if (response.data.success) {
        // Filter out inactive items and those with empty/None names
        const filteredList = response.data.merchandises.filter(item => 
          item.isActive && 
          item.name && 
          item.name.trim() !== '' && 
          item.name.toLowerCase() !== 'none'
        );
        setMerchandiseList(filteredList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMerchandiseList();
  }, []);


  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});


  }



  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className="w-48" alt="YourCampusMerch" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>
            Home
          </p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />


        </NavLink>
        <NavLink to='/Collection' className='flex flex-col items-center gap-1'>
          <p>
            Collection
          </p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />


        </NavLink>
         <div 
          className='relative group'
          onMouseEnter={() => setShowMerchandiseDropdown(true)}
          onMouseLeave={() => setShowMerchandiseDropdown(false)}
        >
          <NavLink to='/CollegeMerchandise' className='flex flex-col items-center gap-1'>
            <p className='flex items-center gap-1'>
              College Merchandise
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          
          {/* Dropdown Menu */}
          {showMerchandiseDropdown && merchandiseList.length > 0 && (
            <div className='absolute left-0 top-full pt-4 z-50'>
              <div className='bg-white shadow-lg rounded-lg py-3 px-2 min-w-[200px] max-h-[400px] overflow-y-auto'>
                <Link 
                  to='/CollegeMerchandise'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors'
                  onClick={() => setShowMerchandiseDropdown(false)}
                >
                  <span className='font-semibold'>All Merchandise</span>
                </Link>
                <hr className='my-2' />
                {merchandiseList.map((merchandise) => (
                  <Link
                    key={merchandise._id}
                    to={`/CollegeMerchandise?merchandise=${encodeURIComponent(merchandise.name)}`}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors'
                    onClick={() => setShowMerchandiseDropdown(false)}
                  >
                    {merchandise.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <NavLink to='/About' className='flex flex-col items-center gap-1'>
          <p>
            About Us
          </p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />


        </NavLink>
       
        <NavLink to='/Contact' className='flex flex-col items-center gap-1'>
          <p>
            Contact
          </p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />


        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer ' alt="" />


        <div className='group relative'>
          <img onClick={() => token ? null : navigate('/login')} className="w-5 cursor-pointer" src={assets.profile_icon} alt="" />
          {/* Dropdown menu */}
          {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 '>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
              <p className='cursor-pointer hover:text-black '>My Profile</p>
              <p onClick={()=>navigate("/orders")} className='cursor-pointer hover:text-black '>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black '>Logout</p>
            </div>
          </div>}
        </div>

        <Link to='/cart' className='relative'>

          <img src={assets.cart_icon} className='w-5 min-w-5 ' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>{getCartCount()}</p>

        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden ' alt="" />



      </div>

      {/* sidebar menu for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'} `}>
        <div className='flex flex-col text-gray-600  '>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/Collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/About'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/Contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar