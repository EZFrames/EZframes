import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, FrameTransactionResponse } from "@coinbase/onchainkit/lib/frame/types";
import { encodeFunctionData, parseEther } from "viem";
import { ABI, contract, myAddress } from "~~/constants";
import { getJourneyById } from "~~/services/frames";
import { Journey } from "~~/types/commontypes";

export async function POST(req: NextRequest): Promise<NextResponse<FrameTransactionResponse>> {
  const body: FrameRequest = await req.json();
  const { untrustedData } = body;
  let state;
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
  const address = myAddress;
  const callData = encodeFunctionData({
    abi: ABI,
    functionName: "trf",
    args: [address, parseEther("0.001"), BigInt(untrustedData?.inputText || 1)],
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
