import React, { useEffect, useState } from "react";
import ButtonList from "./ButtonsList";
import Editor from "@monaco-editor/react";
import { Button, Dialog, DialogActions, DialogContent, MenuItem, Select, TextField } from "@mui/material";
import { useProductJourney } from "~~/providers/ProductProvider";
import { InternalFrameJSON } from "~~/types/commontypes";

const FrameEditor = () => {
  const { frame, setFrame, currentFrame, setCurrentFrame } = useProductJourney();
  const [imageUrlOption, setImageUrlOption] = useState("url");
  const [htmlInput, setHtmlInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal open/close
  // @ts-ignore
  const [imageUrl, setImageUrl] = useState(currentFrame?.image.src || "");
  const [textInput, setTextInput] = useState<any>(undefined);
  const [htmlDone, setHtmlDone] = useState(false); // New state to track when HTML is done

  const handleImageUrlChange = (value: string) => {
    setImageUrl(value);
    if (!currentFrame) return;
    setCurrentFrame({
      ...currentFrame,
      image: {
        type: "src",
        src: value,
      },
    });
  };

  useEffect(() => {
    setTextInput(currentFrame?.intents.find(intent => intent.type === "TextInput"));
    if (currentFrame?.image?.type === "html") {
      setImageUrlOption("html");
      setHtmlInput(currentFrame?.image?.content || "");
    } else {
      setImageUrlOption("url");
      setImageUrl(currentFrame?.image?.src || "");
      setHtmlInput("");
    }
  }, [currentFrame, currentFrame?.image?.src]);

  useEffect(() => {
    if (imageUrlOption === "html" && htmlDone) {
      setCurrentFrame((prevFrame: InternalFrameJSON) => ({
        ...prevFrame,
        image: {
          type: "html",
          content: htmlInput,
        },
      }));
      setHtmlDone(false);
    }
  }, [htmlDone, imageUrlOption, htmlInput, setCurrentFrame]);

  const handleModalClose = () => {
    setHtmlDone(true); // Ensure the HTML is processed
    setIsModalOpen(false); // Close the modal
  };

  if (!currentFrame) return null;

  return (
    <div className="bg-white flex flex-col gap-4 p-4 h-[100%]">
      <label className="block text-sm font-medium text-gray-700">Frame Name</label>
      <TextField
        size="small"
        id="outlined-basic"
        variant="outlined"
        value={frame?.name}
        fullWidth
        onChange={e => {
          if (!frame) return;
          setFrame({
            ...frame,
            name: e.target.value,
          });
        }}
      />
      <label htmlFor="imageInput" className="block text-sm font-medium text-gray-700">
        Image Type
      </label>
      <Select
        size="small"
        id="imageInput"
        value={imageUrlOption}
        onChange={e => {
          setImageUrlOption(e.target.value);
        }}
        variant="outlined"
      >
        <MenuItem value="url">URL</MenuItem>
        <MenuItem value="html">HTML</MenuItem>
      </Select>
      {imageUrlOption === "url" ? (
        <>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <TextField
            size="small"
            id="imageUrl"
            value={imageUrl}
            onChange={e => handleImageUrlChange(e.target.value)}
            placeholder="Image URL"
          />
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <label htmlFor="htmlInput" className="block text-sm font-medium text-gray-700">
            HTML
          </label>
          <Editor
            theme="vs-dark"
            height="300px"
            width="100%"
            language="html"
            value={htmlInput}
            onChange={value => {
              if (!value) return;
              setHtmlInput(value);
            }}
          />
          <div className="flex gap-2">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setHtmlDone(true); // Trigger the effect to parse HTML
              }}
            >
              Done
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setIsModalOpen(true); // Open the modal for fullscreen editor
              }}
            >
              Expand Editor
            </Button>
          </div>
        </div>
      )}
      {textInput ? (
        <>
          <label htmlFor="additionalInput" className="block text-sm font-medium text-gray-700">
            Text Input
          </label>
          <TextField
            size="small"
            id="additionalInput"
            value={textInput.props.placeholder}
            onChange={e => {
              if (e.target.value === "") {
                setTextInput(undefined);
              }
              setCurrentFrame({
                ...currentFrame,
                intents: currentFrame.intents.map(intent => {
                  if (intent.type === "TextInput") {
                    return {
                      ...intent,
                      props: {
                        ...intent.props,
                        placeholder: e.target.value,
                      },
                    };
                  }
                  return intent;
                }),
              });
            }}
          />
        </>
      ) : (
        <button
          className="btn bg-black rounded-md text-white px-4 py-2"
          onClick={() => {
            setCurrentFrame({
              ...currentFrame,
              intents: [
                ...currentFrame.intents,
                {
                  type: "TextInput",
                  props: {
                    placeholder: "Enter text here",
                  },
                },
              ],
            });
          }}
        >
          Add Text Input
        </button>
      )}

      <ButtonList />

      {/* Modal for full-page HTML editor */}
      <Dialog open={isModalOpen} onClose={handleModalClose} fullWidth maxWidth="xl">
        <DialogContent style={{ padding: "0px" }}>
          <Editor
            theme="vs-dark"
            height="90vh"
            width="100%"
            language="html"
            value={htmlInput}
            onChange={value => {
              if (!value) return;
              setHtmlInput(value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleModalClose}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FrameEditor;