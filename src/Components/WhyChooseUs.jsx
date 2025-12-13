import React from "react";
import { Users, Award, TrendingUp, MessageCircle, Package, Truck } from "lucide-react";

const items = [
  { 
    icon: <Award size={34} />, 
    title: "7+ Years of Expertise", 
    desc: "In Corporate & Promotional Gifting" 
  },
  { 
    icon: <Users size={34} />, 
    title: "Dedicated Team", 
    desc: "Of young, professional, and creative minds" 
  },
  { 
    icon: <TrendingUp size={34} />, 
    title: "Marketing-Oriented", 
    desc: "Gifting Suggestions" 
  },
  { 
    icon: <MessageCircle size={34} />, 
    title: "End-to-End Solutions", 
    desc: "From ideation to delivery" 
  },
  { 
    icon: <Package size={34} />, 
    title: "Customization", 
    desc: "Printing, packaging, personalization" 
  },
  { 
    icon: <Truck size={34} />, 
    title: "Pan-India Service", 
    desc: "With timely deliveries" 
  },
];

const WhyChooseUs = () => {
  return (
    <div className="my-20 px-4 md:px-12 py-12 bg-section-bg rounded-2xl">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-3">
        Why <span className="text-red-500">Choose Us?</span>
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        Trusted expertise in corporate gifting with end-to-end personalized solutions
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 shadow-md rounded-xl bg-white/70 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="text-red-500 mb-4">{item.icon}</div>
            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
