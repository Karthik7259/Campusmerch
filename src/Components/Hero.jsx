import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  const slides = [
    {
      image: assets.hero_img,
      eyebrow: 'Premium Corporate Gifting',
      title: 'Gift With Intent',
      description: 'Curated merchandise and luxury gifting experiences that elevate brand presence.',
      cta: 'Explore Collection',
    },
    {
      image: assets.hero_img2,
      eyebrow: 'Corporate Essentials',
      title: 'Modern Work Kits',
      description: 'Refined gift sets designed for teams, events, and executive moments.',
      cta: 'Shop Essentials',
    },
    {
      image: assets.hero_img3,
      eyebrow: 'Limited Drop',
      title: 'Signature Editions',
      description: 'Premium materials, minimalist detailing, and memorable unboxing.',
      cta: 'Discover Now',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const activeSlide = slides[currentIndex]

  return (
    <section className="relative overflow-hidden text-brand-white">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />

      {/* Hero Container - 2 Column Grid */}
      <div className="relative h-screen lg:h-auto lg:min-h-screen max-w-full grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Side - Content with Modern Glassmorphism */}
        <div className="relative flex flex-col justify-center items-start px-8 sm:px-12 lg:px-16 py-16 lg:py-24 bg-gradient-to-br from-black/70 via-gray-900/60 to-black/50 backdrop-blur-sm">
          {/* Subtle Accent Glow */}
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

          {/* Eyebrow Tag */}
          <span className="relative inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-orange-400 border border-orange-500/30 rounded-full bg-orange-500/10 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            {activeSlide.eyebrow}
          </span>

          {/* Main Title */}
          <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter max-w-md bg-clip-text">
            {activeSlide.title}
          </h1>

          {/* Description */}
          <p className="relative mt-8 text-base sm:text-lg text-white/80 leading-relaxed max-w-sm font-light">
            {activeSlide.description}
          </p>

          {/* CTA Buttons */}
          <div className="relative mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              to="/collection"
              className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 text-button rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 text-center font-medium"
            >
              {activeSlide.cta}
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 text-button text-white rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-center font-medium"
            >
              Start a Project
            </Link>
          </div>

          {/* Trust Indicators - Modern Style */}
          <div className="relative mt-12 flex items-center gap-2 text-white/40 text-xs tracking-wide">
            <span className="w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span>Trusted by Leading Brands • Premium Gifting Solutions</span>
          </div>
        </div>

        {/* Right Side - Image Carousel with same background */}
        <div className="relative h-full min-h-[500px] lg:min-h-screen overflow-hidden bg-gradient-to-bl from-black/50 via-gray-900/60 to-black/70">
          {/* Subtle Accent Glow for right side */}
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />

          {/* Images with smooth transition - Floating style */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-out flex items-center justify-center p-4 lg:p-6 ${index === currentIndex
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-4'
                }`}
            >
              <div className="relative w-full h-[70%] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 backdrop-blur-sm bg-white/5">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          ))}

          {/* Slide Indicators - Modern pill style */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
            {slides.map((_, index) => (
              <button
                key={`hero-dot-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'w-8 bg-orange-500 shadow-lg shadow-orange-500/50'
                  : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
