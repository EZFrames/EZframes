"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ChevronDown, ChevronUp, Loader2, Plus } from "lucide-react";
import { useAccount } from "wagmi";
import ProductCard from "~~/components/ProductCard";
import ProductTemplate from "~~/components/ProductTemplate";
import { getAllTemplates } from "~~/services/frames";
import { Journey } from "~~/types/commontypes";
import { Button } from "~~/~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~~/~/components/ui/card";
import { ScrollArea } from "~~/~/components/ui/scroll-area";
import { Skeleton } from "~~/~/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~~/~/components/ui/tabs";

const MyFrames = ({ frames }: { frames: Journey[] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedFrames = showAll ? frames : frames.slice(0, 4);

  if (frames.length === 0) {
    return (
      <Card className="w-full bg-gray-800 border-purple-500 text-white">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full bg-purple-900 p-3">
            <Plus className="h-6 w-6 text-purple-300" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-purple-300">No frames yet</h3>
          <p className="mt-2 text-sm text-purple-200">
            Get started by creating your first frame or pick a system template
          </p>
          <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">Create Frame</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-purple-300">My Frames</h2>
        {frames.length > 4 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="border-purple-500 text-purple-300 hover:bg-purple-900 hover:text-purple-100"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show All <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayedFrames.map(frame => (
          <ProductCard key={frame._id} name={frame.name} image={frame.image as string} id={frame._id} />
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
  <Card className="overflow-hidden transition-all hover:shadow-lg bg-gray-800 border-purple-500">
    <CardHeader className="p-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={name} className="aspect-video w-full object-cover" />
    </CardHeader>
    <CardContent className="p-4">
      <CardTitle className="flex items-center justify-between text-purple-300">
        {name}
        <Button
          variant="outline"
          size="icon"
          onClick={onClick}
          className="border-purple-500 text-purple-300 hover:bg-purple-900 hover:text-purple-100"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardTitle>
      <p className="mt-2 text-sm text-purple-200">{description}</p>
    </CardContent>
  </Card>
);

const FrameTemplates = () => {
  const [productOpen, setProductOpen] = useState(false);

  return (
    <div className="space-y-4 text-white">
      <h2 className="text-2xl font-bold text-purple-300">System Templates</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
  const { address } = useAccount();
  const myFrames = useQuery({
    queryKey: ["myFrames", address],
    queryFn: async () => {
      if (!address) throw new Error("No address provided");
      return getAllTemplates(address as `0x${string}`);
    },
    enabled: !!address,
  });

  if (!address) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <Card className="w-full max-w-md bg-gray-800 border-purple-500">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-purple-900 p-3">
              <Loader2 className="h-6 w-6 animate-spin text-purple-300" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-purple-300">Connecting Wallet</h3>
            <p className="mt-2 text-sm text-purple-200">Please connect your wallet to view your dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="container mx-auto space-y-8 p-6">
        <Tabs defaultValue="my-frames" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger
              value="my-frames"
              className="p-2 text-purple-200 data-[state=active]:bg-purple-700 data-[state=active]:text-white"
            >
              My Frames
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="p-2 text-purple-200 data-[state=active]:bg-purple-700 data-[state=active]:text-white"
            >
              Templates
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my-frames" className="mt-6">
            {myFrames.isLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-video w-full rounded-lg bg-gray-700" />
                ))}
              </div>
            ) : myFrames.isError ? (
              <Card className="bg-gray-800 border-purple-500">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-purple-900 p-3">
                    <Loader2 className="h-6 w-6 animate-spin text-purple-300" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-purple-300">Error loading frames</h3>
                  <p className="mt-2 text-sm text-purple-200">Please try again later.</p>
                  <Button
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => myFrames.refetch()}
                  >
                    Retry
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <MyFrames frames={myFrames.data || []} />
            )}
          </TabsContent>
          <TabsContent value="templates" className="mt-6">
            <FrameTemplates />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
