import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { PlusCircle } from "lucide-react";
import { useProductJourney } from "~~/providers/ProductProvider";
import { parseHtmlString } from "~~/services/frames/extractHTML";

const NewFrameEditor = () => {
  const { frame, setFrame, currentFrame, setCurrentFrame } = useProductJourney();
  const [imageUrlOption, setImageUrlOption] = useState("url");
  const [htmlInput, setHtmlInput] = useState("");
  const [imageUrl, setImageUrl] = useState(currentFrame?.image?.src || "");
  const [textInput, setTextInput] = useState(currentFrame?.intents.find(intent => intent.type === "TextInput"));

  const handleImageUrlChange = (value: any) => {
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
  }, [currentFrame]);

  useEffect(() => {
    if (imageUrlOption === "html") {
      const image = parseHtmlString(htmlInput);
      console.log({ image });
      setCurrentFrame({
        ...currentFrame, // keep the existing properties of currentFrame
        // @ts-ignore
        image: {
          type: "html",
          style: image?.image.style,
          content: image?.image.content,
        },
      });
    }
  }, [htmlInput, imageUrlOption, currentFrame, setCurrentFrame]);

  if (!currentFrame) return null;

  return (
    <div className="space-y-3">
      {/* Frame Name Row */}
      <div className="flex gap-4 items-center">
        <div className="form-control flex-1">
          <label className="label py-0">
            <span className="label-text font-semibold">Frame Name</span>
          </label>
          <input
            type="text"
            value={frame?.name}
            onChange={e => {
              if (!frame) return;
              setFrame({
                ...frame,
                name: e.target.value,
              });
            }}
            className="input input-bordered input-sm w-full max-w-md"
          />
        </div>
      </div>

      {/* Image Configuration Row */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Image Configuration</h3>

        <div className="flex gap-4">
          <div className="form-control w-32">
            <select
              className="select select-bordered select-sm w-full"
              value={imageUrlOption}
              onChange={e => setImageUrlOption(e.target.value)}
            >
              <option value="url">URL</option>
              <option value="html">HTML</option>
            </select>
          </div>

          {imageUrlOption === "url" && (
            <div className="form-control flex-1">
              <input
                type="text"
                value={imageUrl}
                onChange={e => handleImageUrlChange(e.target.value)}
                placeholder="Enter image URL"
                className="input input-bordered input-sm w-full"
              />
            </div>
          )}
        </div>

        {imageUrlOption === "html" && (
          <div className="form-control w-full">
            <div className="border rounded-lg overflow-hidden bg-base-200" style={{ height: "150px" }}>
              <Editor
                theme="vs-dark"
                height="100%"
                language="html"
                value={currentFrame.image.content}
                onChange={value => {
                  if (!value) return;
                  setHtmlInput(value);
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 8 },
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Text Input Row */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Text Input</h3>
          {!textInput && (
            <button
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
              className="btn btn-ghost btn-xs gap-1"
            >
              <PlusCircle className="w-3 h-3" />
              Add
            </button>
          )}
        </div>

        {textInput && (
          <div className="form-control w-full max-w-md">
            <input
              type="text"
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
              placeholder="Enter placeholder text"
              className="input input-bordered input-sm w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewFrameEditor;
