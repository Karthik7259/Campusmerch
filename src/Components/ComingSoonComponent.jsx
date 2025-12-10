import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets';

const ComingSoonComponent = () => {
  return (
    <div className='min-h-[60vh] flex items-center justify-center py-16 px-4'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-center max-w-2xl mx-auto'
      >
        {/* Coming Soon Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mb-8'
        >
          <img 
            src={assets.image} 
            alt="Coming Soon" 
            className='w-full max-w-lg mx-auto drop-shadow-2xl'
          />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
            Exciting Products On The Way!
          </h2>
          <p className='text-gray-600 text-base md:text-lg mb-6 leading-relaxed'>
            We're working hard to bring you amazing new products. <br className='hidden sm:block' />
            Stay tuned for something special!
          </p>
        </motion.div>

        {/* Animated dots */}
        <motion.div 
          className='flex justify-center gap-2 mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className='w-3 h-3 bg-red-500 rounded-full'
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='space-y-4'
        >
          <p className='text-sm text-gray-500 uppercase tracking-wider font-semibold'>
            🔔 Get Notified When We Launch
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto'>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
            />
            <button className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
              Notify Me
            </button>
          </div>
        </motion.div>

        {/* Back to shopping */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className='mt-12'
        >
          <Link 
            to="/Collection" 
            className='inline-flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-300 font-medium'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ComingSoonComponent