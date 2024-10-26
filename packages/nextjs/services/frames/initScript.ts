import { createFrame, saveFrame, saveJourney } from "../frames";
import { getBuyFrame, getDescriptionFrame, getEmailFrame, getProductFrame, getSuccessFrame } from "./frameGetters";
import { GetGitcoinDescriptionFrame, GetGitcoinLogoFrame } from "./gitcoinFrameGetters";
import { FrameMetadataType } from "@coinbase/onchainkit";
import { INITIAL_FRAME } from "~~/constants";
import { InternalFrameJSON } from "~~/types/commontypes";

export const initJourneyWithFrames = async (journeyId: string, productImage: string) => {
  const frames = [];
  for (let i = 0; i <= 4; i++) {
    const frameBody: InternalFrameJSON = INITIAL_FRAME as InternalFrameJSON;
    const frame = await createFrame({
      name: "Frame",
      frameJson: frameBody,
      connectedTo: [],
    });
    frames.push(frame._id);
  }
  const productFrameJson = getProductFrame(frames[1], frames[2], productImage);
  await saveFrame({
    _id: frames[0],
    name: "Product Frame",
    frameJson: productFrameJson,
    connectedTo: [frames[1], frames[2]],
  });
  const descriptionFrame = getDescriptionFrame(frames[0], frames[2]);
  await saveFrame({
    _id: frames[1],
    name: "Description Frame",
    frameJson: descriptionFrame,
    connectedTo: [frames[0], frames[2]],
  });
  const emailFrameJson = getEmailFrame(frames[3], productImage);
  await saveFrame({
    _id: frames[2],
    name: "Email Frame",
    frameJson: emailFrameJson,
    connectedTo: [frames[3]],
  });
  const buyFrameJSON = getBuyFrame(frames[4]);
  await saveFrame({
    _id: frames[3],
    name: "Buy Frame",
    frameJson: buyFrameJSON,
    connectedTo: [frames[4]],
  });
  const successFrameJSON = getSuccessFrame();
  await saveFrame({
    _id: frames[4],
    name: "Success Frame",
    frameJson: successFrameJSON,
    connectedTo: [],
  });
  const journey = await saveJourney({
    _id: journeyId,
    frames: frames,
  });
  return journey;
};

export const initGitcoinJourney = async (journeyId: string, data: any) => {
  const Frames = [];
  for (let i = 0; i <= 1; i++) {
    const frameBody: FrameMetadataType = {
      image: "https://via.placeholder.com/150",
    };
    const Frame = await createFrame({
      name: "Frame",
      frameJson: frameBody,
    });
    Frames.push(Frame._id);
  }
  // First Frame Logo Frame
  const LogoFrameJson = await GetGitcoinLogoFrame(
    journeyId,
    Frames[0]._id,
    Frames[1]._id,
    data.title,
    data.timeLeft,
    data.currentFundingRecieved,
  );
  await saveFrame({
    _id: Frames[0],
    name: "Gitcoin Logo Frame",
    frameJson: LogoFrameJson,
  });

  const DescriptionFrameJson = await GetGitcoinDescriptionFrame(
    journeyId,
    Frames[1]._id,
    data.url,
    data.title,
    data.textContent[3],
  );
  await saveFrame({
    _id: Frames[1],
    name: "Gitcoin Description Frame",
    frameJson: DescriptionFrameJson,
  });
  const journey = await saveJourney({
    _id: journeyId,
    frames: Frames,
  });
  return journey;
};
