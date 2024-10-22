import { FrameRequest } from "@coinbase/onchainkit";
import Analytics from "~~/model/analytics";

export const storeAnalytics = async (body: FrameRequest, state: any) => {
  const analyticsEntry = new Analytics({
    journeyId: state?.journey_id || "",
    frameId: state?.frame_id || "",
    fid: body.untrustedData.fid,
    buttonClicked: body.untrustedData.buttonIndex || 0,
    inputtedText: body.untrustedData.inputText || "",
    timestamp: body.untrustedData.timestamp,
  });
  await analyticsEntry.save();
  console.log(analyticsEntry);
};
