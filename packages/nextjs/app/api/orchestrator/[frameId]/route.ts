import { NextRequest, NextResponse } from "next/server";
import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import connectDB from "~~/services/connectDB";
import { getFrameAtServer, getJourneyById } from "~~/services/frames";
import { Journey } from "~~/types/commontypes";
import { storeAnalytics } from "~~/utils/analytics";

// scripts to create frames + journey
// orders schema + orders
// get price and quantity for each order
// create attestation for each order

async function getResponse(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const url = req.nextUrl.pathname;
  const frameId = url.replace(`/api/orchestrator`, "");
  const body = await req.json();
  console.log("body", body);
  let state;
  if (body.untrustedData?.state && typeof body.untrustedData.state === "string") {
    console.log("Parsing State");
    state = JSON.parse(decodeURIComponent(body.untrustedData?.state as string));
  }
  const journeyId = state?.journey_id || "";
  const journey: Journey = await getJourneyById(journeyId);

  let stateUpdate;
  if (state && typeof state === "object") {
    console.log("in HERE");

    // Creating Analytics for the frame asynchronously
    storeAnalytics(body, state).catch(err => console.error("Error Saving Analytics", err));

    // Adding State for Button Press and Inputted Text on last frame
    state.frame_id = frameId;
    stateUpdate = {
      ...state,
      [`${frameId}ButtonPressed`]: body.untrustedData.buttonIndex,
      [`${frameId}InputtedText`]: body.untrustedData.inputText,
    };
  }

  const dbFrame = await getFrameAtServer(frameId);
  if (!dbFrame) {
    return new NextResponse(JSON.stringify({ message: "Frame not found" }), { status: 404 });
  }
  const nextFrame = dbFrame.frameJson;
  if (state && typeof state === "object") {
    nextFrame.state = {
      ...stateUpdate,
      journey,
    };
  }

  return new NextResponse(getFrameHtmlResponse(nextFrame));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
