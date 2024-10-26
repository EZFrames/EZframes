import { NextRequest, NextResponse } from "next/server";
import Transaction from "~~/model/transaction";
import connectDB from "~~/services/connectDB";

export async function GET() {
  await connectDB();
  const transaction = await Transaction.find();
  return new NextResponse(JSON.stringify(transaction));
}

export async function POST(req: NextRequest) {
  await connectDB();
  const payload = await req.json();
  const transaction = new Transaction(payload);
  await transaction.save();
  return new NextResponse(JSON.stringify(transaction));
}
