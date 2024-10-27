import { APP_URL } from "~~/constants";
import { InternalFrameJSON } from "~~/types/commontypes";

export const getProductFrame = (frame_id_2: string, frame_id_3: string, productImage: string) => {
  const PRODUCT_FRAME: InternalFrameJSON = {
    intents: [
      {
        type: "Button",
        props: {
          action: "post",
          target: APP_URL + "/api/orchestrator/" + frame_id_2,
        },
        content: "Get Details",
      },
      {
        type: "Button",
        props: {
          action: "post",
          target: APP_URL + "/api/orchestrator/" + frame_id_3,
        },
        content: "Buy Now",
      },
    ],
    image: {
      type: "src",
      src: productImage,
    },
  };
  return PRODUCT_FRAME;
};

export const getDescriptionFrame = (previousFrameId: string, nextFrameId: string) => {
  const DESCRIPTION_FRAME: InternalFrameJSON = {
    intents: [
      {
        type: "Button",
        props: {
          action: "post",
          target: APP_URL + "/api/orchestrator/" + previousFrameId,
        },
        content: "Back",
      },
      {
        type: "Button",
        props: {
          action: "post",
          target: APP_URL + "/api/orchestrator/" + nextFrameId,
        },
        content: "Next",
      },
    ],
    image: {
      type: "html",
      content: `<div style="display:flex;padding: 20px; background-color: #f1f1f1; text-align: center;">Description</div>`,
    },
  };
  return DESCRIPTION_FRAME;
};

export const getEmailFrame = (frameId: string, productImage: string) => {
  const EMAIL_FRAME: InternalFrameJSON = {
    intents: [
      {
        type: "Button",
        props: {
          action: "post",
          target: APP_URL + "/api/orchestrator/" + frameId,
        },
        content: "Next",
      },
      {
        type: "TextInput",
        props: {
          placeholder: "Enter your email address",
        },
      },
    ],
    image: {
      type: "src",
      src: productImage,
    },
  };
  return EMAIL_FRAME;
};

export const getBuyFrame = (next_frame_id: string) => {
  const newTxFrame: InternalFrameJSON = {
    intents: [
      {
        type: "Button.Transaction",
        props: {
          target: `${APP_URL}/api/orchestrator/tx`,
          action: `${APP_URL}/api/orchestrator/` + next_frame_id,
        },
        content: "Buy",
      },
    ],
    image: {
      type: "src",
      src: `https://amber-causal-cougar-937.mypinata.cloud/ipfs/QmafH4oZDZWFynGyK9gHVvPRFTTFFrbwYwGQNps4FDLky2`,
    },
  };
  return newTxFrame;
};

export const getSuccessFrame = () => {
  const SUCCESS_FRAME: InternalFrameJSON = {
    image: {
      type: "src",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_BNf9b9fUN735sATwS1OfxlfV-LD9RhVMA&s",
    },
    intents: [
      {
        type: "Button.Link",
        props: {
          href: `${APP_URL}/dashboard`,
        },
        content: "Check your journey here!",
      },
    ],
  };
  return SUCCESS_FRAME;
};
