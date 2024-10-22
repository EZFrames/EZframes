import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, FrameTransactionResponse } from "@coinbase/onchainkit/lib/frame/types";
import { encodeFunctionData, parseEther } from "viem";
import { ABI, contract, myAddress } from "~~/constants";
import { getJourneyById } from "~~/services/frames";
import { Journey } from "~~/types/commontypes";
import { storeAnalytics } from "~~/utils/analytics";

export async function POST(req: NextRequest): Promise<NextResponse<FrameTransactionResponse>> {
  console.log("hey")
  const body: FrameRequest = await req.json();
  const { untrustedData } = body;
  let state;
  console.log(untrustedData)
  if (untrustedData?.state && typeof untrustedData.state === "string") {
    
    state = JSON.parse(decodeURIComponent(untrustedData?.state as string));
  }
  const journeyId = state?.journey_id || "";
  let journey: Journey;
  if (state?.journey) {
    journey = state.journey;
  } else {
    journey = await getJourneyById(journeyId);
  }
  console.log({ journey });
  storeAnalytics(body, state).catch(err => console.error("Error Saving Analytics", err));
  const callData = encodeFunctionData({
    abi: ABI,
    functionName: "mintNFT",
    args: [myAddress],
  });
  return NextResponse.json({
    chainId: "eip155:137",
    method: "eth_sendTransaction",
    params: {
      abi: ABI,
      to: contract,
      data: callData,
      value: "0x0",
    },
  });
}
