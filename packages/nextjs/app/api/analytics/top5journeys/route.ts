import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Analytics from "~~/model/analytics";
import Journey from "~~/model/journey";
import connectDB from "~~/services/connectDB";

interface TopJourney {
  _id: Types.ObjectId | string;
  count: number;
  journeyName?: string;
}

export async function GET() {
  await connectDB();

  try {
    const topJourneys: TopJourney[] = await Analytics.aggregate([
      { $group: { _id: "$journeyId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    for (const journey of topJourneys) {
      if (Types.ObjectId.isValid(journey._id)) {
        const journeyBody = await Journey.findById(journey._id);
        journey.journeyName = journeyBody?.name;
      } else {
        console.warn(`Invalid journey ID: ${journey._id}`);
        journey.journeyName = "Unknown";
      }
    }

    return NextResponse.json(topJourneys);
  } catch (error) {
    console.error("Error fetching top journeys:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
