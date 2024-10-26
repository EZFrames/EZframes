import { NextRequest, NextResponse } from "next/server";
import Transaction from "~~/model/transaction";
import connectDB from "~~/services/connectDB";

// all of this is based on frame_id

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const frame_id = params.id;
  const transaction = await Transaction.findOne({ frameId: frame_id });
  if (!transaction) {
    return new NextResponse(JSON.stringify({ message: "transaction not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(transaction));
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const frame_id = params.id;
  const payload = await req.json();
  const transaction = await Transaction.updateOne({ frameId: frame_id }, payload, { new: true });
  if (!transaction) {
    return new NextResponse(JSON.stringify({ message: "transaction not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(transaction));
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const frame_id = params.id;
  const transaction = await Transaction.deleteOne({ frameId: frame_id });
  if (!transaction) {
    return new NextResponse(JSON.stringify({ message: "transaction not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(transaction));
}
