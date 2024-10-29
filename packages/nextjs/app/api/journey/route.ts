import { NextRequest, NextResponse } from "next/server";
import Journey from "~~/model/journey";
import connectDB from "~~/services/connectDB";

export async function GET(req: NextRequest) {
  // const { searchParams } = new URL(req.url);
  // const walletAddress = searchParams.get("walletAddress") as string;

  // console.log(walletAddress);
  await connectDB();

  const journeys = await Journey.find({
    // TODO: uncomment
    // walletAddress,
  });

  console.log("yabba", journeys);
  return NextResponse.json(journeys);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const payload = await req.json();
  const journey = new Journey(payload);
  await journey.save();
  return new NextResponse(JSON.stringify(journey));
}
