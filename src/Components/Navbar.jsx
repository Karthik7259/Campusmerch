import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { Menu, Search, ShoppingBag, User, X, ChevronDown } from 'lucide-react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext.jsx'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [merchandiseList, setMerchandiseList] = useState([])
  const [showMerchandiseDropdown, setShowMerchandiseDropdown] = useState(false)
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext)
  const backendURL = import.meta.env.VITE_BACKEND_URL

  const navItems = useMemo(
    () => [
      { label: 'Home', path: '/' },
      { label: 'Collection', path: '/collection' },
      { label: 'College Merchandise', path: '/CollegeMerchandise', hasDropdown: true },
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
    []
  )

  const fetchMerchandiseList = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/college-merchandise/list`)
      if (response.data.success) {
        const filteredList = response.data.merchandises.filter(
          (item) =>
            item.isActive &&
            item.name &&
            item.name.trim() !== '' &&
            item.name.toLowerCase() !== 'none'
        )
        setMerchandiseList(filteredList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMerchandiseList()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <header className="sticky top-0 z-[50] bg-gradient-to-r from-slate-900 via-gray-900 to-black">
      <div
        className={`transition-all duration-300 ${isScrolled ? 'border-b border-white/10 shadow-lg shadow-black/20' : 'border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} className="h-14 md:h-20 w-auto brightness-0 invert" alt="Gift4corp" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setShowMerchandiseDropdown(true)}
                  onMouseLeave={() => setShowMerchandiseDropdown(false)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-nav text-white/70 uppercase tracking-[0.2em] transition ${isActive ? 'text-white' : 'hover:text-white'
                      }`
                    }
                  >
                    <span className="inline-flex items-center gap-2">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </NavLink>
                  {showMerchandiseDropdown && merchandiseList.length > 0 && (
                    <div className="absolute left-0 top-full pt-4 z-[60]">
                      <div className="bg-white border border-border-light shadow-lg min-w-[240px]">
                        <Link
                          to="/CollegeMerchandise"
                          className="block px-4 py-3 text-xs uppercase tracking-[0.2em] text-text-secondary hover:text-text-primary"
                          onClick={() => setShowMerchandiseDropdown(false)}
                        >
                          All Merchandise
                        </Link>
                        <div className="h-px bg-border-light" />
                        {merchandiseList.map((merchandise) => (
                          <Link
                            key={merchandise._id}
                            to={`/CollegeMerchandise?merchandise=${encodeURIComponent(
                              merchandise.name
                            )}`}
                            className="block px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-brand-cream/60"
                            onClick={() => setShowMerchandiseDropdown(false)}
                          >
                            {merchandise.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-nav text-white/70 uppercase tracking-[0.2em] transition ${isActive ? 'text-white' : 'hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowSearch(true)}
              className="h-10 w-10 flex items-center justify-center border border-white/20 hover:border-white/50 hover:bg-white/10 transition text-white"
              aria-label="Open search"
            >
              <Search className="h-4 w-4" />
            </button>

            <div className="relative group hidden sm:block">
              <button
                type="button"
                onClick={() => (token ? null : navigate('/login'))}
                className="h-10 w-10 flex items-center justify-center border border-white/20 hover:border-white/50 hover:bg-white/10 transition text-white"
                aria-label="Account"
              >
                <User className="h-4 w-4" />
              </button>
              {token && (
                <div className="absolute right-0 pt-4 hidden group-hover:block">
                  <div className="bg-white border border-border-light shadow-lg min-w-[180px]">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-3 text-xs uppercase tracking-[0.2em] text-text-secondary hover:text-text-primary"
                    >
                      My Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/orders')}
                      className="w-full text-left px-4 py-3 text-xs uppercase tracking-[0.2em] text-text-secondary hover:text-text-primary"
                    >
                      Orders
                    </button>
                    <button
                      type="button"
                      onClick={logout}
                      className="w-full text-left px-4 py-3 text-xs uppercase tracking-[0.2em] text-text-secondary hover:text-text-primary"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/cart"
              className="relative h-10 w-10 flex items-center justify-center border border-white/20 hover:border-white/50 hover:bg-white/10 transition text-white"
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -bottom-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setVisible(true)}
              className="h-10 w-10 flex items-center justify-center border border-white/20 hover:border-white/50 hover:bg-white/10 transition lg:hidden text-white"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {visible && (
        <div className="fixed inset-0 z-[70] bg-black/40">
          <div className="absolute top-0 right-0 h-full w-full sm:w-[420px] bg-white animate-slide-in-right">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
              <p className="text-caption text-text-secondary">Menu</p>
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="h-10 w-10 flex items-center justify-center border border-border-light hover:border-border-dark transition"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  onClick={() => setVisible(false)}
                  className={({ isActive }) =>
                    `text-sm uppercase tracking-[0.2em] pb-3 border-b border-border-light ${isActive ? 'text-text-primary' : 'text-text-secondary'
                    }`
                  }
                  to={item.path}
                >
                  {item.label}
                </NavLink>
              ))}

              {merchandiseList.length > 0 && (
                <div className="pt-4">
                  <p className="text-caption text-text-tertiary mb-3">Merchandise</p>
                  <div className="grid gap-2">
                    {merchandiseList.map((item) => (
                      <Link
                        key={item._id}
                        to={`/CollegeMerchandise?merchandise=${encodeURIComponent(
                          item.name
                        )}`}
                        className="text-sm text-text-secondary"
                        onClick={() => setVisible(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
