import React, { useEffect, useState } from "react";
import ButtonList from "./ButtonsList";
import Editor from "@monaco-editor/react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useProductJourney } from "~~/providers/ProductProvider";
import { generateHtmlString, parseHtmlString } from "~~/services/frames/extractHTML";

const FrameEditor = () => {
  const { frame, setFrame, currentFrame, setCurrentFrame } = useProductJourney();
  const [imageUrlOption, setImageUrlOption] = useState("url");
  const [htmlInput, setHtmlInput] = useState("");
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
    setImageUrl(currentFrame?.image?.src || "");
    setTextInput(currentFrame?.intents.find(intent => intent.type === "TextInput"));
    if (currentFrame?.image?.type === "html") {
      setImageUrlOption("html");
      setHtmlInput(generateHtmlString(currentFrame as any));
    }
  }, [currentFrame]);

  // This effect will run only when the user clicks "Done" for the HTML input
  useEffect(() => {
    if (imageUrlOption === "html" && htmlDone) {
      const image = parseHtmlString(htmlInput);
      console.log({ image });

      setCurrentFrame(prevFrame => ({
        ...prevFrame,
        image: {
          type: "html",
          style: image?.image.style,
          content: image?.image.content,
        },
      }));
      setHtmlDone(false); // Reset the state after parsing HTML
    }
  }, [htmlDone, imageUrlOption, htmlInput, setCurrentFrame]);
  console.log({ currentFrame });
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setHtmlDone(true); // Trigger the effect to parse HTML
            }}
          >
            Done
          </Button>
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
    </div>
  );
};

export default FrameEditor;
