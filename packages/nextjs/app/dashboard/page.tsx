"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@dynamic-labs/sdk-react-core";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import ProductCard from "~~/components/ProductCard";
import ProductTemplate from "~~/components/ProductTemplate";
import { getAllTemplates } from "~~/services/frames";
import { Journey } from "~~/types/commontypes";

const MyFrames = ({ frames }: any) => {
  const [showAll, setShowAll] = useState(false);
  const displayedTemplates = showAll ? frames.data : frames.data.slice(0, 4);
  return (
    <div className="flex flex-col justify-start items-start w-full gap-2 p-2">
      <div className="flex items-center gap-4 ">
        <p className="font-bold text-2xl">My Frames</p>
        {frames.data.length >= 5 && (
          <button
            className="p-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <ChevronUpIcon className="h-4 w-4 text-gray-700" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-gray-700" />
            )}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-4 justify-start w-full">
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
}) => {
  return (
    <div className="flex flex-col gap-2 w-64 h-80 p-4 bg-white rounded-lg shadow-md">
      <div className="relative">
        <img src={image} alt="template" className="w-full h-40 object-fit rounded-t-lg" />
      </div>
      <div className="flex flex-col mt-6">
        <div className="flex items-center justify-between gap-2">
          <p className="font-bold text-lg">{name}</p>
          <button
            className="p-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={onClick}
          >
            <ArrowRightIcon className="h-4 w-4 text-gray-700" />
          </button>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const FrameTemplates = () => {
  const [productOpen, setProductOpen] = useState(false);
  return (
    <div className="flex flex-col justify-start items-start w-full gap-2 p-2">
      <div className="flex items-center gap-4 ">
        <p className="font-bold text-2xl">Frames Templates</p>
      </div>
      <div className="flex flex-wrap gap-4 justify-start w-full">
        <SystemTemplate
          name="Product Frames"
          image="/ecommerce.png"
          description="Advertise on warpcast"
          onClick={() => {
            setProductOpen(true);
          }}
        />
        <ProductTemplate
          isOpen={productOpen}
          onClose={() => {
            setProductOpen(false);
          }}
        />
      </div>
    </div>
  );
};

const Dashboard: NextPage = () => {
  const myFrames = useQuery({
    queryKey: ["myFrames"],
    queryFn: getAllTemplates,
  });
  if (myFrames.isLoading)
    return (
      <div className="flex items-center justify-center h-[100vh] w-[100vw]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <MyFrames frames={myFrames} />
      <FrameTemplates />
    </div>
  );
};

export default Dashboard;
