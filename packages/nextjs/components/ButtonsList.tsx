import { useState } from "react";
import CustomButton from "./Button/CustomButton";
import ButtonEditor from "./ButtonEditor";
import FarcasterModal from "./FarcasterModal";
import { IconButton } from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useProductJourney } from "~~/providers/ProductProvider";
import { Intent, InternalFrameJSON } from "~~/types/commontypes";
import { notification } from "~~/utils/scaffold-eth";

const ButtonList = () => {
  const { currentFrame, setCurrentFrame, frame, saveFrame, deleteFrame } = useProductJourney();
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const buttons = currentFrame?.intents.filter(intent => intent.type.includes("Button")) as Intent[];
  if (!currentFrame) return null;

  const handleAddButton = () => {
    const newButton = {
      type: "Button" as Intent["type"],
      content: "New Button",
      props: {},
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
    console.log(newButtons);
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
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex items-center">
        <label htmlFor="buttons" className="block text-sm font-medium text-gray-700 ">
          Buttons
        </label>
        {/* @ts-ignore*/}
        {buttons?.length < 4 && (
          <IconButton onClick={handleAddButton}>
            <PlusIcon className="w-4 h-4 text-gray-700 border-2 border-black" />
          </IconButton>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="btn bg-black rounded-md text-white px-4 py-2"
            style={{
              flex: "1 1 0px",
              cursor: "pointer",
            }}
            onClick={() => handleButtonClick(index)}
          >
            {button.content}
          </button>
        ))}
      </div>
      {/* @ts-ignore */}
      {buttons[activeButtonIndex] && (
        <ButtonEditor button={buttons[activeButtonIndex]} onSave={handleSave} onDelete={handleDelete} />
      )}
      <div className="flex items-center">
        <CustomButton
          // @ts-ignore
          onClick={() => {
            deleteFrame.mutateAsync(frame?._id as string);
          }}
          buttonType="delete"
          variant="contained"
          size="small"
        >
          Delete Frame
        </CustomButton>
        <CustomButton buttonType="success" variant="contained" onClick={handleSaveFrame}>
          Save Frame
        </CustomButton>
        <button onClick={() => setOpen(!open)} className="btn btn-primary mt-2 flex items-center justify-center">
          Export Product
        </button>
      </div>
      {open && <FarcasterModal isOpen={open} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ButtonList;
