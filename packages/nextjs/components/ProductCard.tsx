"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../~/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  name: string;
  image: string;
  id: string;
}

export default function ProductCard({ name, image, id }: ProductCardProps) {
  const router = useRouter();

  const handleVisit = () => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg bg-gray-800 border-black">
        <CardHeader className="p-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={name} className="aspect-video w-full object-cover" />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="line-clamp-1 text-white">{name}</CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleVisit}>
            View Frame <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>{" "}
    </motion.div>
  );
}
