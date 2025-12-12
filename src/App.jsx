import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Searchbar from './Components/Searchbar'
import { ToastContainer } from 'react-toastify'

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'))
const Collection = lazy(() => import('./pages/Collection'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'))
const Orders = lazy(() => import('./pages/Orders'))
const OrderDetails = lazy(() => import('./pages/OrderDetails'))
const Verify = lazy(() => import('./pages/Verify'))
const Accesories = lazy(() => import('./pages/Accesories'))
const Stationery = lazy(() => import('./pages/stationery'))
const Techgadgets = lazy(() => import('./pages/Techgadgets'))
const Eventsouvenir = lazy(() => import('./pages/Eventsouvenir'))
const Ecofriendly = lazy(() => import('./pages/Ecofriendly'))
const Giftcombos = lazy(() => import('./pages/Giftcombos'))
const Sportsfitness = lazy(() => import('./pages/Sportsfitness'))
const Collegemerchandise = lazy(() => import('./pages/Collegemerchandise'))
const Lifestyle = lazy(() => import('./pages/Lifestyle'))
const ThankYou = lazy(() => import('./pages/ThankYou'))

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
)

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        limit={1}
      />
      <Navbar />
      <Searchbar/>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
                 <Route path='/' element={<Home />} />
                 <Route path='/collection'  element={<Collection/>} />
                 <Route path='/about' element={<About />} />
                 <Route path='/contact' element={<Contact />} />
                 <Route path='/CollegeMerchandise' element={<Collegemerchandise />} />
                 <Route path='/product/:productId' element={<Product/>} />
                  <Route path='/category/apparel' element={<Collection/>} />
                 <Route path='/category/accessories' element={<Accesories/>} />
                 <Route path='/category/stationery' element={<Stationery/>} />
                 <Route path='/category/accessories' element={<Accesories/>} />
                 <Route path='/category/tech-gadgets' element={<Techgadgets/>} />
                 <Route path='/category/event-souvenir' element={<Eventsouvenir/>} />
                 <Route path='/category/eco-friendly' element={<Ecofriendly/>} />
                 <Route path='/category/gift-combos' element={<Giftcombos/>} />
                 <Route path='/category/sports-fitness' element={<Sportsfitness/>} />
                 <Route path='/category/lifestyle' element={<Lifestyle/>} />
                
                 <Route path='/cart' element={<Cart/>} />
                 <Route path='/Login' element={<Login/>} />
                 <Route path='/place-order' element={<PlaceOrder/>} />
                 <Route path='/Orders' element={<Orders/>} />
                 <Route path='/order/:orderId' element={<OrderDetails/>} />
                 <Route  path='/verify' element={<Verify/>} />
                 <Route path='/thank-you' element={<ThankYou/>} />
        </Routes>
      </Suspense>
   <Footer />

    </div>
  )
}

export default App