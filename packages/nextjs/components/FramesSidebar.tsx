"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { INITIAL_FRAME } from "~~/constants";
import { useProductJourney } from "~~/providers/ProductProvider";
import { getFrameById } from "~~/services/frames";
import { Frame, InternalFrameJSON } from "~~/types/commontypes";
import { notification } from "~~/utils/scaffold-eth";
import { Button } from "~~/~/components/ui/button";
import { ScrollArea } from "~~/~/components/ui/scroll-area";
import { Skeleton } from "~~/~/components/ui/skeleton";

export default function FrameSidebar() {
  const { productQuery, frame, setFrame, setCurrentFrame, createFrame, currentFrameId, setCurrentFrameId } =
    useProductJourney();
  const [frames, setFrames] = useState<Frame[] | undefined>(undefined);

  const framesQuery = useQuery({
    queryKey: ["frames", productQuery.data],
    queryFn: async () => {
      if (!productQuery.data) return;
      return Promise.all(productQuery.data.frames.map(frameId => getFrameById(frameId)));
    },
    enabled: !!productQuery.data,
  });

  useEffect(() => {
    if (framesQuery.data) {
      setFrames(framesQuery.data);
    }
  }, [framesQuery.data]);

  useEffect(() => {
    if (frame?._id) {
      setCurrentFrameId(frame._id);
    }
  }, [frame, setCurrentFrameId]);

  const handleCreateFrame = async () => {
    try {
      await createFrame.mutateAsync({
        name: "New Frame",
        frameJson: INITIAL_FRAME as InternalFrameJSON,
        connectedTo: [],
      });
      notification.success("Frame created successfully");
    } catch (error: any) {
      notification.error(`Failed to create frame: ${error.message}`);
    }
  };

  const handleFrameSelect = (selectedFrame: Frame) => {
    setCurrentFrameId(selectedFrame._id);
    setFrame(selectedFrame);
    setCurrentFrame(selectedFrame.frameJson);
  };

  if (framesQuery.isLoading) {
    return (
      <div className="flex h-full flex-col space-y-4 bg-background p-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (framesQuery.isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-background p-4 text-center">
        <p className="text-sm text-muted-foreground">Failed to load frames</p>
        <Button variant="outline" onClick={() => framesQuery.refetch()} className="mt-2">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-[93vh] flex-col bg-background">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Frames</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {frames?.map(frame => (
            <Button
              key={frame._id}
              variant={frame._id === currentFrameId ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleFrameSelect(frame)}
            >
              <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
              <span className="truncate">{frame.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4 text-white">
        <Button onClick={handleCreateFrame} className="w-full" disabled={createFrame.isPending}>
          {createFrame.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          Add Frame
        </Button>
      </div>
    </div>
  );
}
