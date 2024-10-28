"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import EzFrames from "~~/public/EzFramesPnG.png";

interface ProductCardProps {
  name: string;
  image: string;
  id: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, id }) => {
  const router = useRouter();

  const handleVisit = () => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl w-[250px] max-w-[250px] max-h-[250px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-w-16 aspect-h-9">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          onError={e => (e.currentTarget.src = EzFrames.src)}
          className="h-full w-full object-fit transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        <h3 className="mb-2 text-lg font-semibold text-white">{name}</h3>
        <motion.button
          className="flex items-center justify-center space-x-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-purple-700"
          onClick={handleVisit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Visit Page</span>
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
