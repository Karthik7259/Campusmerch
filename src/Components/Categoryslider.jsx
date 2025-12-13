import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTshirt,
  FaHatCowboy,
  FaBook,
  FaHome,
  FaLeaf,
  FaGift,
  FaRunning,
  FaPhoneAlt,
  FaStar,
  FaBoxes
} from "react-icons/fa";

const categories = [
  { id: 1, name: "Apparel & Clothing", slug: "apparel", icon: <FaTshirt size={32} /> },
  { id: 2, name: "Accessories", slug: "accessories", icon: <FaHatCowboy size={32} /> },
  { id: 3, name: "Stationery & Academic Supplies", slug: "stationery", icon: <FaBook size={32} /> },
  { id: 4, name: "Tech & Gadgets", slug: "tech-gadgets", icon: <FaPhoneAlt size={32} /> },
  { id: 5, name: "Event & Souvenir Merchandise", slug: "event-souvenir", icon: <FaStar size={32} /> },
  { id: 6, name: "Eco-Friendly & Sustainable Items", slug: "eco-friendly", icon: <FaLeaf size={32} /> },
  { id: 7, name: "Gift Sets & Combos", slug: "gift-combos", icon: <FaGift size={32} /> },
  { id: 8, name: "Sports & Fitness Merchandise", slug: "sports-fitness", icon: <FaRunning size={32} /> },
];

const Categoryslider = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {categories.map((c) => (
          <div
            key={c.id}
            onClick={() => navigate(`/category/${c.slug}`)}
            className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
          >
            <div className="bg-gray-100 p-5 rounded-full mb-4">
              {c.icon}
            </div>

            <span className="text-[17px] leading-tight font-medium text-gray-700 text-center">
              {c.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categoryslider;
