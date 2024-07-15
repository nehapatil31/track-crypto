// pages/api/crypto/[id].ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("crypto_data");
    const data = await collection
      .find({ id: params.id })
      .sort({ _id: -1 })
      .limit(20)
      .toArray();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching crypto data" },
      { status: 500 }
    );
  }
}
