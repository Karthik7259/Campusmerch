import React from 'react'

const AnnouncementBar = () => {
  const messages = [
   
    'PAN-INDIA DELIVERY AVAILABLE',
    'BULK ORDERS? CALL +91 9620044401',
    'For Any Queries, Contact Us At +91 9620044401',
  ]

  return (
    <div className="bg-brand-black text-brand-white h-8 sm:h-9 overflow-hidden relative">
      <div className="flex items-center h-full animate-scroll-left">
        {[...messages, ...messages, ...messages].map((message, index) => (
          <React.Fragment key={`${message}-${index}`}>
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase whitespace-nowrap px-6">
              {message}
            </span>
            <span className="text-white/40 mx-4">-</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default AnnouncementBar
