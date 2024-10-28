"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "~~/components/ProductCard";
import ProductTemplate from "~~/components/ProductTemplate";
import { getAllTemplates } from "~~/services/frames";
import { Journey } from "~~/types/commontypes";
import { Button } from "~~/~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~~/~/components/ui/card";
import { Skeleton } from "~~/~/components/ui/skeleton";

const MyFrames = ({ frames }: { frames: any }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedTemplates = showAll ? frames.data : frames.data.slice(0, 4);

  return (
    <div className="flex flex-col justify-start items-start w-full gap-4 p-4">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-purple-300">My Frames</h2>
        {frames.data.length >= 5 && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowAll(!showAll)}
            className="bg-purple-800 text-white hover:bg-purple-700"
          >
            {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {displayedTemplates.map((frameTemplate: Journey) => (
          <ProductCard
            key={frameTemplate._id}
            name={frameTemplate.name}
            image={frameTemplate.image as string}
            id={frameTemplate._id}
          />
        ))}
      </div>
    </div>
  );
};

const SystemTemplate = ({
  name,
  image,
  description,
  onClick,
}: {
  name: string;
  image: string;
  description: string;
  onClick: () => void;
}) => (
  <Card className="w-64 bg-white border-purple-500 hover:border-purple-400 transition-colors">
    <CardHeader className="p-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-t-lg" />
    </CardHeader>
    <CardContent className="p-4">
      <CardTitle className="flex items-center justify-between text-purple-600">
        {name}
        <Button
          variant="outline"
          size="icon"
          onClick={onClick}
          className="bg-purple-800 text-white hover:bg-purple-700"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardTitle>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </CardContent>
  </Card>
);

const FrameTemplates = () => {
  const [productOpen, setProductOpen] = useState(false);

  return (
    <div className="flex flex-col justify-start items-start w-full gap-4 p-4">
      <h2 className="text-2xl font-bold text-purple-300">System Templates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <SystemTemplate
          name="Product Frames"
          image="/ecommerce.png"
          description="Advertise on warpcast"
          onClick={() => setProductOpen(true)}
        />
        <ProductTemplate isOpen={productOpen} onClose={() => setProductOpen(false)} />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const myFrames = useQuery({
    queryKey: ["myFrames"],
    queryFn: getAllTemplates,
  });

  if (myFrames.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Skeleton className="h-12 w-12 rounded-full bg-purple-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-8">
          <MyFrames frames={myFrames} />
          <FrameTemplates />
        </div>
      </div>
    </div>
  );
}
