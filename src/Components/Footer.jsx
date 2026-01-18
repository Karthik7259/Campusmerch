import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-brand-white overflow-hidden">
      {/* Subtle Accent Glow */}
      <div className="absolute top-1/4 -right-20 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={assets.logo} className="h-10 w-auto mb-4 brightness-0 invert" alt="Gift4corp" />
            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              Gift4corp delivers premium corporate gifting and branded merchandise
              with a refined, end-to-end experience for teams and enterprises.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:+919620044401" className="hover:text-white transition">
                  +91 9620044401
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:sales@gifts4corp.com" className="hover:text-white transition">
                  sales@gifts4corp.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-caption text-white/70 mb-4">Shop</p>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link to="/collection" className="hover:text-white transition">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/CollegeMerchandise" className="hover:text-white transition">
                  College Merchandise
                </Link>
              </li>
              <li>
                <Link to="/category/gift-combos" className="hover:text-white transition">
                  Gift Combos
                </Link>
              </li>
              <li>
                <Link to="/category/eco-friendly" className="hover:text-white transition">
                  Eco-Friendly
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-caption text-white/70 mb-4">Support</p>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white transition">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/returns-refunds" className="hover:text-white transition">
                  Returns and Refunds
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-white transition">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 uppercase tracking-[0.2em]">
          <span>Gift4corp</span>
          <span>Premium Corporate Gifting</span>
          <span>2026</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
