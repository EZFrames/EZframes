export interface Journey {
  _id: string;
  walletAddress: string;
  name: string;
  desc?: string;
  image?: string;
  frames: string[];
  createdAt: string;
  updatedAt: string;
}

type Image = {
  type: "html" | "src";
  src?: string;
  content?: string;
};
type IntentProps = {
  value?: string;
  action?: string;
  placeholder?: string;
  target?: string;
  href?: string;
  location?: string;
};

type IntentType =
  | "Button"
  | "Button.Link"
  | "Button.Mint"
  | "Button.Transaction"
  | "Button.Reset"
  | "Button.Location"
  | "TextInput";

export type Intent = {
  type: IntentType;
  props: IntentProps;
  content?: string; // Content corresponds to the label or text displayed
};

export type InternalFrameJSON = {
  image: Image;
  intents: Intent[];
};

export interface Frame {
  _id: string;
  name: string;
  frameJson: InternalFrameJSON;
  connectedTo: string[];
}
