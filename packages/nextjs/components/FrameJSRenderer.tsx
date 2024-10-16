"use client";

import defaultImageLoader from "next/dist/shared/lib/image-loader";
import Image, { ImageLoaderProps } from "next/image";
import { fallbackFrameContext } from "@frames.js/render";
import { type FarcasterSigner, signFrameAction } from "@frames.js/render/farcaster";
import { FrameUI, type FrameUIComponents, type FrameUITheme } from "@frames.js/render/ui";
import { useFrame } from "@frames.js/render/use-frame";
import { APP_URL } from "~~/constants";
import { useProductJourney } from "~~/providers/ProductProvider";

/**
 * StylingProps is a type that defines the props that can be passed to the components to style them.
 */
type StylingProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * You can override components to change their internal logic or structure if you want.
 * By default it is not necessary to do that since the default structure is already there
 * so you can just pass an empty object and use theme to style the components.
 *
 * You can also style components here and completely ignore theme if you wish.
 */
const components: FrameUIComponents<StylingProps> = {
  Image(props, stylingProps) {
    if (props.status === "frame-loading") {
      return <div />;
    }

    /**
     * Because of how browsers behave we want to force browser to reload the dynamic image on each render
     * but for the rest of images we want default behaviour.
     */
    const url = new URL(props.src);
    const isDynamicUrl = true;

    const loader = (loaderProps: ImageLoaderProps) => {
      /**
       * This is debugger specific loader. We need that because dynamic images have static URL
       * and browser will not reload the url if it already has been rendered.
       *
       * The beautiful thing about this is that internally the cache headers of dynamic image are respected
       * because next.js caches them.
       */
      return `${defaultImageLoader(loaderProps as any)}&_id=${Date.now()}`;
    };

    // this is necessary for nextjs so it passes config to default image loader
    loader.__next_img_default = true;
    console.log("I AM IN IMG THIS IS MY URL", { url, isDynamicUrl });
    return (
      <Image
        {...stylingProps}
        loader={isDynamicUrl ? loader : undefined}
        src={props.src}
        onLoad={props.onImageLoadEnd}
        onError={props.onImageLoadEnd}
        alt="Frame image"
        sizes="100vw"
        height={0}
        width={0}
      />
    );
  },
};

/**
 * By default there are no styles so it is up to you to style the components as you wish.
 */
const theme: FrameUITheme<StylingProps> = {
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
      aspectRatio: "var(--frame-image-aspect-ratio)", // fixed loading skeleton size
    },
  },
  TextInput: {
    className: "p-[6px] border rounded border-gray-300 box-border w-full",
  },
  TextInputContainer: {
    className: "w-full px-2",
  },
};

export default function FrameJSRenderer() {
  const { productID, currentFrameId } = useProductJourney();
  const farcasterSigner: FarcasterSigner = {
    fid: 1,
    status: "approved",
    publicKey: "0x00000000000000000000000000000000000000000000000000000000000000000",
    privateKey: "0x00000000000000000000000000000000000000000000000000000000000000000",
  };
  const frameState = useFrame({
    homeframeUrl: `${APP_URL}/frame/${productID}/${currentFrameId}`,
    frameActionProxy: "/api/proxy/",
    frameGetProxy: "/api/proxy/",
    connectedAddress: undefined,
    frameContext: fallbackFrameContext,
    signerState: {
      hasSigner: farcasterSigner?.status === "approved",
      signer: farcasterSigner,
      isLoadingSigner: false,
      async onSignerlessFramePress() {
        // Only run if `hasSigner` is set to `false`
        // This is a good place to throw an error or prompt the user to login
        console.log("A frame button was pressed without a signer. Perhaps you want to prompt a login.");
      },
      signFrameAction,
      async logout() {
        // here you can add your logout logic
        console.log("logout");
      },
    },
  });

  frameState.onButtonPress = button => {
    console.log("Button pressed", button);
  };
  if (!currentFrameId)
    return (
      <div className="flex bg-base-300 rounded-l-full items-center gap-2 pr-2">
        <div className="skeleton bg-base-200 w-[35px] h-[35px] rounded-full shrink-0"></div>
        <div className="skeleton bg-base-200 h-3 w-20"></div>
      </div>
    );
  return <FrameUI key={currentFrameId} frameState={frameState} components={components} theme={theme} />;
}
