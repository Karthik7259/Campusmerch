import React from "react";
import { ShieldCheck, Truck, RefreshCcw, Leaf, BadgeCheck, CreditCard } from "lucide-react";

const items = [
  { icon: <Truck size={34} />, title: "Fast Delivery", desc: "2–4 days anywhere in India" },
  { icon: <BadgeCheck size={34} />, title: "Premium Quality", desc: "100% bio-washed cotton" },
  { icon: <CreditCard size={34} />, title: "Secure Payment", desc: "SSL secured checkout" },
  { icon: <RefreshCcw size={34} />, title: "Easy Returns", desc: "7-day return policy" },
  { icon: <Leaf size={34} />, title: "Eco-Friendly", desc: "Made from BCI cotton" },
  { icon: <ShieldCheck size={34} />, title: "Trusted Brand", desc: "10,000+ happy customers" },
];

const WhyChooseUs = () => {
  return (
    <div className="my-20 px-4 md:px-12">
      <h2 className="text-center text-3xl font-semibold mb-3">
        Why <span className="text-red-500">Choose Us?</span>
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        We focus on more than just fashion — we deliver value, comfort, and premium experience.
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
