import { FrameMetadataType } from "@coinbase/onchainkit";
import { Abi } from "viem";

export const APP_URL = "https://ezframes.xyz";
export const txFrame = {
  buttons: [
    {
      action: "tx",
      label: "purchase",
      postUrl: `${APP_URL}/api/orchestrator/1`,
      target: "",
    },
  ],
  image: {
    src: `https://amber-causal-cougar-937.mypinata.cloud/ipfs/QmafH4oZDZWFynGyK9gHVvPRFTTFFrbwYwGQNps4FDLky2`,
  },
  input: {
    text: "Enter No of items",
  },
  state: {},
} as FrameMetadataType;

export const emailFrame = {
  buttons: [
    {
      action: "post",
      label: "Generate Receipt",
      target: ``,
    },
  ],
  image: {
    src: `https://amber-causal-cougar-937.mypinata.cloud/ipfs/QmcGop9sCSmcNktWcRXsokE9wjjcWqLhhMhWL3CywkqGXZ`,
  },
  input: {
    text: "Enter your email",
  },
} as FrameMetadataType;

export const DEFAULT_FRAME: FrameMetadataType = {
  buttons: [
    {
      action: "post",
      target: "http://localhost:3000/api/orchestrator/1",
      label: "Easy",
    },
    {
      action: "link",
      label: "Frame",
      target: "https://onchainkit.xyz",
    },
    {
      action: "post_redirect",
      label: "Creation",
    },
  ],
  image: {
    src: "https://placehold.co/600x400",
  },
  state: {
    time: "2024-06-28T16:14:14.986Z",
    journey_id: "1",
    frame_id: "2",
  },
  input: {
    text: "Type here",
  },
};

export const ABI: Abi = [
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_number",
				"type": "uint8"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const contract = "0x72D6c2fB6142ec0b946ED68A4a9eaD9E640B674c";
export const myAddress = "0x4CbEe7aD42d33e9D3B41e8b6FAcA2f6f173C8A94";
