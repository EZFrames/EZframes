import { useState } from "react";
import ButtonEditor from "./ButtonEditor";
import FarcasterModal from "./FarcasterModal";
import { Plus, Save, Share2, Trash2 } from "lucide-react";
import { useProductJourney } from "~~/providers/ProductProvider";
import { Intent, InternalFrameJSON } from "~~/types/commontypes";
import { notification } from "~~/utils/scaffold-eth";

const NewButtonList = () => {
  const { currentFrame, setCurrentFrame, frame, saveFrame, deleteFrame } = useProductJourney();
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const buttons = currentFrame?.intents.filter(intent => intent.type.includes("Button")) as Intent[];

  if (!currentFrame) return null;

  const handleAddButton = () => {
    const newButton = {
      type: "Button" as Intent["type"],
      content: "New Button",
      props: {
        value: "",
        location: "",
        action: "",
        href: "",
        target: "",
      },
    };
    setCurrentFrame({
      ...currentFrame,
      intents: [...currentFrame.intents, newButton],
    });
  };

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index);
  };

  const handleSaveFrame = async () => {
    notification.info("Frame saved successfully");
    await saveFrame.mutateAsync({
      _id: frame?._id as string,
      name: frame?.name as string,
      frameJson: currentFrame as InternalFrameJSON,
      connectedTo: [],
    });
  };

  const handleSave = (button: Intent) => {
    if (!button) return;
    const newButtons = [...currentFrame.intents];
    newButtons[activeButtonIndex] = button;
    setCurrentFrame({
      ...currentFrame,
      intents: newButtons,
    });
  };

  const handleDelete = () => {
    const buttons = currentFrame.intents.filter(intent => intent.type.includes("Button"));
    if (buttons?.length === 1) {
      notification.error("At least one button is required");
      return;
    }
    const newButtons = [...currentFrame.intents];
    newButtons.splice(activeButtonIndex, 1);
    setCurrentFrame({
      ...currentFrame,
      intents: newButtons,
    });
    setActiveButtonIndex(0);
  };

  return (
    <div className="space-y-3">
      {/* Header Row */}
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">Buttons</h3>
          {buttons?.length < 4 && (
            <button onClick={handleAddButton} className="btn btn-ghost btn-xs btn-square" title="Add new button">
              <Plus className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`btn btn-sm ${activeButtonIndex === index ? "btn-primary" : "btn-outline"} w-full`}
            onClick={() => handleButtonClick(index)}
          >
            {button.content}
          </button>
        ))}
      </div>

      {/* Button Editor */}
      {buttons[activeButtonIndex] && (
        <div className="card bg-base-200 p-3 rounded-lg">
          <ButtonEditor button={buttons[activeButtonIndex]} onSave={handleSave} onDelete={handleDelete} />
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={handleSaveFrame} className="btn btn-success btn-sm gap-1">
          <Save className="w-3 h-3" />
          Save
        </button>
        <button onClick={() => setOpen(!open)} className="btn btn-primary btn-sm gap-1">
          <Share2 className="w-3 h-3" />
          Export
        </button>
        <button onClick={() => deleteFrame.mutateAsync(frame?._id as string)} className="btn btn-error btn-sm gap-1">
          <Trash2 className="w-3 h-3" />
          Delete Frame
        </button>
      </div>

      {/* Modal */}
      {open && <FarcasterModal isOpen={open} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default NewButtonList;
