import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { TRIAL_FRAME } from "~~/constants";
import { useProductJourney } from "~~/providers/ProductProvider";
import { getFrameById } from "~~/services/frames";
import { Frame, InternalFrameJSON } from "~~/types/commontypes";

function FrameSidebar() {
  const { productQuery, frame, setFrame, setCurrentFrame, createFrame, currentFrameId, setCurrentFrameId } =
    useProductJourney();
  const [frames, setFrames] = useState<Frame[] | undefined>(undefined);

  const framesQuery = useQuery({
    queryKey: ["frames", productQuery.data],
    queryFn: () => {
      if (!productQuery.data) return;
      return Promise.all(productQuery?.data?.frames.map(frame => getFrameById(frame)));
    },
  });

  useEffect(() => {
    if (framesQuery.data) {
      setFrames(framesQuery?.data);
    }
  }, [framesQuery.data]);

  useEffect(() => {
    setCurrentFrameId(frame?._id as string);
  }, [frame, setCurrentFrameId]);

  const onCreate = async () => {
    await createFrame.mutateAsync({
      name: "Frame",
      frameJson: TRIAL_FRAME as InternalFrameJSON,
      connectedTo: [],
    });
  };

  if (!frames) return null;

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="mt-1 p-3 pb-1 border-b b1rder-gray-200">
        <h1 className="text-lg font-semibold">Frames</h1>
      </div>
      {/* Frames List */}
      <div className="flex-1 overflow-y-auto p-3 mt-1">
        <div className="space-y-2">
          {frames.map(slide => (
            <button
              key={slide._id}
              onClick={() => {
                setCurrentFrameId(slide._id as string);
                setFrame(slide);
                setCurrentFrame(slide.frameJson);
              }}
              className={`
                w-full rounded-lg px-4 py-2 text-left transition-all
                ${
                  slide._id === currentFrameId
                    ? "bg-blue-50 text-blue-700 ring-2 ring-blue-200"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                }
              `}
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-current opacity-75" />
                <span className="text-sm font-medium">{slide.name}</span>
              </div>
            </button>
          ))}
          <button
            onClick={onCreate}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Frame
          </button>
        </div>
      </div>
    </div>
  );
}

export default FrameSidebar;
