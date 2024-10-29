/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { APP_URL } from "~~/constants";
import { useProductJourney } from "~~/providers/ProductProvider";

/**
 * By default, there are no styles so it is up to you to style the components as you wish.
 */
const theme = {
  ButtonsContainer: {
    className: "flex gap-[8px] px-2 pb-2 bg-white",
  },
  Button: {
    className: "border text-sm text-gray-700 rounded flex-1 bg-white border-gray-300 p-2",
  },
  Root: {
    className: "flex flex-col w-full gap-2 border rounded-lg overflow-hidden bg-white relative",
  },
  Error: {
    className:
      "flex text-red-500 text-sm p-2 bg-white border border-red-500 rounded-md shadow-md aspect-square justify-center items-center",
  },
  LoadingScreen: {
    className: "absolute top-0 left-0 right-0 bottom-0 bg-gray-300 z-10",
  },
  Image: {
    className: "w-full object-cover max-h-full",
  },
  ImageContainer: {
    className: "relative w-full h-full border-b border-gray-300 overflow-hidden",
    style: {
      aspectRatio: 1.91,
    },
  },
  TextInput: {
    className: "p-[6px] border rounded border-gray-300 box-border w-full",
  },
  TextInputContainer: {
    className: "w-full px-2",
  },
  Skeleton: {
    className: "h-full w-full bg-gray-300 animate-pulse", // Skeleton style
  },
};

function FrameRender() {
  const { currentFrame, buttons, textInput, currentFrameId, productID } = useProductJourney();
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading
  const [imageError, setImageError] = useState(false);

  if (!currentFrame) return null;

  return (
    <div className={theme.Root.className}>
      {/* Image container for the image */}
      <div className={theme.ImageContainer.className} style={theme.ImageContainer.style}>
        {!imageLoaded && <div className={theme.Skeleton.className} />} {/* Show skeleton while loading */}
        {/* Rendering the image based on its type using the components defined in the theme */}
        {!imageError ? (
          // Display the image based on its type, and show error fallback on failure
          <>
            {currentFrame.image.type === "html" && (
              <img
                src={`${APP_URL}/api/frog/${productID}/${currentFrameId}/img`}
                alt="Frame HTML Image"
                className={theme.Image.className}
                onLoad={() => setImageLoaded(true)} // Set loaded state on image load
                onError={() => setImageError(true)} // Set error state on image load failure
              />
            )}
            {currentFrame.image.type === "src" && (
              <img
                src={currentFrame.image.src}
                alt="Frame image"
                className={theme.Image.className}
                onLoad={() => setImageLoaded(true)}
              />
            )}
          </>
        ) : (
          // Render fallback content when image fails to load
          <div
            className={theme.Image.className}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px", // Optional for spacing
              wordWrap: "break-word", // Ensures long text wraps within the container
            }}
          >
            <p>
              Image failed to load since error in HTML
              <br />
              <br />
              <br />
              - if using HTML try using a Satori Playground to make sure image renders correct <br />
              - Make sure if a div has more than two child elements use display: flex <br />
              - Make sure your css supports the satori standards <br />
            </p>
          </div>
        )}
      </div>

      {/* Render TextInput using the styled component from the theme */}
      {textInput && (
        <div className={theme.TextInputContainer.className}>
          <input className={theme.TextInput.className} type="text" placeholder={textInput?.props?.placeholder} />
        </div>
      )}

      {/* Rendering buttons */}
      <div className={theme.ButtonsContainer.className}>
        {buttons?.map((intent: any, index: number) => (
          <button
            type="button"
            className={theme.Button.className}
            key={index}
            style={{
              flex: "1 1 0px",
              cursor: "pointer",
            }}
          >
            {intent.content}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FrameRender;
