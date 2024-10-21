import { Abi } from "viem";
import { InternalFrameJSON } from "~~/types/commontypes";

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const ENZYME_API_KEY = process.env.ENZYME_API_KEY;

export const DEFAULT_FRAME = {
  image: `<div style={{ color: 'black',height:'300px',width:'300px', display: 'flex', fontSize: 60 }}> Select your fruit! </div>`,
  intents: `[
    <Button value="apple"> Apple </Button>,
    <Button value="banana"> Banana </Button>,
    <Button value="mango"> Mango </Button>
  ]`,
};

export const INITIAL_FRAME: InternalFrameJSON = {
  image: {
    type: "html",
    content: `<div style={{ color: 'black',height:'300px',width:'300px', display: 'flex', fontSize: 60 }}> Select your fruit! </div>`,
  },
  intents: [
    {
      type: "Button",
      props: {
        value: "apple",
      },
      content: "DIDNT ASKKKK",
    },
    {
      type: "Button.Link",
      props: {
        href: "https://google.com",
      },
      content: "Google",
    },
    {
      type: "Button.Transaction",
      props: {
        value: "mango",
      },
      content: "Mango",
    },
    { type: "TextInput", props: { placeholder: "Enter your favourite fruit" } },
  ],
};

export const ABI: Abi = [
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_number",
        type: "uint8",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const contract = "0x72D6c2fB6142ec0b946ED68A4a9eaD9E640B674c";
export const myAddress = "0x4CbEe7aD42d33e9D3B41e8b6FAcA2f6f173C8A94";
