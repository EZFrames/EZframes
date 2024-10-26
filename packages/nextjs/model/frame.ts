import mongoose, { Document, Schema } from "mongoose";

interface FrameDocument extends Document {
  name: string;
  frameJson: any;
  connectedTo: string[];
}

const FrameSchema: Schema<FrameDocument> = new Schema<FrameDocument>(
  {
    name: String,
    frameJson: Object as any as any,
    connectedTo: [String],
  },
  {
    timestamps: true,
  },
);

// Define and export the Frame model
const Frame = mongoose.models.Frame || mongoose.model<FrameDocument>("Frame", FrameSchema);

export default Frame;
