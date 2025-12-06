import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Title from './Title'

const ProductRating = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Sample customer reviews data
  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      college: "IIT Delhi",
      rating: 5,
      comment: "Amazing quality! The college merchandise is exactly what I was looking for. The fabric is premium and the print quality is outstanding.",
      product: "College Hoodie",
      image: "https://i.pravatar.cc/150?img=12",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Priya Patel",
      college: "BITS Pilani",
      rating: 5,
      comment: "Fast delivery and excellent customer service. The t-shirt fits perfectly and the design is really cool. Highly recommend!",
      product: "College T-Shirt",
      image: "https://i.pravatar.cc/150?img=45",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Arjun Reddy",
      college: "NIT Trichy",
      rating: 4,
      comment: "Good quality products at reasonable prices. The material is durable and comfortable. Will definitely order again!",
      product: "College Cap",
      image: "https://i.pravatar.cc/150?img=33",
      date: "3 days ago"
    },
    {
      id: 4,
      name: "Sneha Gupta",
      college: "DU",
      rating: 5,
      comment: "Love the variety of products available! Got matching merchandise for my entire group. Great experience shopping here.",
      product: "College Mug Set",
      image: "https://i.pravatar.cc/150?img=25",
      date: "5 days ago"
    },
    {
      id: 5,
      name: "Vikram Singh",
      college: "IIM Ahmedabad",
      rating: 5,
      comment: "Top-notch quality and the customization options are fantastic. The team was very helpful throughout the ordering process.",
      product: "Custom Jacket",
      image: "https://i.pravatar.cc/150?img=51",
      date: "1 week ago"
    },
    {
      id: 6,
      name: "Ananya Iyer",
      college: "VIT Vellore",
      rating: 4,
      comment: "Really impressed with the product range and quality. The college logo looks great on the merchandise. Shipping was quick too!",
      product: "College Backpack",
      image: "https://i.pravatar.cc/150?img=48",
      date: "4 days ago"
    }
  ]

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  const renderStars = (rating) => {
    return (
      <div className='flex gap-1'>
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  // Get visible reviews (3 at a time on desktop, 1 on mobile)
  const getVisibleReviews = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length])
    }
    return visible
  }

  return (
    <div className='my-16 px-4'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'CUSTOMER'} text2={'REVIEWS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          What our customers say about us
        </p>
      </div>

      {/* Reviews Carousel */}
      <div className='relative max-w-7xl mx-auto'>
        {/* Navigation Buttons */}
        <button
          onClick={prevReview}
          className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors hidden md:block'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextReview}
          className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors hidden md:block'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Reviews Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 py-8'>
          {getVisibleReviews().map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'
            >
              {/* Customer Info */}
              <div className='flex items-center gap-4 mb-4'>
                <img
                  src={review.image}
                  alt={review.name}
                  className='w-16 h-16 rounded-full object-cover border-2 border-gray-200'
                />
                <div className='flex-1'>
                  <h3 className='font-semibold text-lg text-gray-800'>{review.name}</h3>
                  <p className='text-sm text-gray-500'>{review.college}</p>
                  <p className='text-xs text-gray-400'>{review.date}</p>
                </div>
              </div>

              {/* Rating */}
              <div className='mb-3'>
                {renderStars(review.rating)}
              </div>

              {/* Review Text */}
              <p className='text-gray-600 text-sm mb-4 line-clamp-4'>
                "{review.comment}"
              </p>

              {/* Product Tag */}
              <div className='flex items-center gap-2 text-xs'>
                <span className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium'>
                  📦 {review.product}
                </span>
              </div>

              {/* Verified Badge */}
              <div className='mt-4 flex items-center gap-2 text-xs text-green-600'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Purchase
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Navigation Dots */}
        <div className='flex justify-center gap-2 mt-6 md:hidden'>
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-gray-800' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Overall Rating Summary */}
        <div className='mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 text-center'>
          <div className='flex flex-col md:flex-row items-center justify-center gap-8'>
            <div>
              <div className='text-6xl font-bold text-gray-800 mb-2'>4.8</div>
              <div className='flex justify-center mb-2'>
                {renderStars(5)}
              </div>
              <p className='text-gray-600 text-sm'>Based on 1000+ reviews</p>
            </div>
            
            <div className='text-left space-y-2 flex-1 max-w-md'>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className='flex items-center gap-3'>
                  <span className='text-sm w-8'>{star} ⭐</span>
                  <div className='flex-1 bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-yellow-400 h-2 rounded-full'
                      style={{ width: `${star === 5 ? 75 : star === 4 ? 20 : star === 3 ? 3 : star === 2 ? 1 : 1}%` }}
                    />
                  </div>
                  <span className='text-sm text-gray-600 w-12 text-right'>
                    {star === 5 ? '75%' : star === 4 ? '20%' : star === 3 ? '3%' : star === 2 ? '1%' : '1%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductRating
