import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Lottery from "@/model/lottery";


export async function GET(request: Request, context: { params: any }) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ message: "Lottery ID is required" }, { status: 400 });
    }

    const lottery = await Lottery.findOne({ id }).lean();
    if (!lottery) {
      return NextResponse.json({ message: "Lottery not found" }, { status: 404 });
    }

    return NextResponse.json(lottery, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching lottery:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

export async function PUT(
request: Request, context: { params: any }
) {
  try {
    await connectToDatabase();

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ message: "Lottery id is required" }, { status: 400 });
    }

    const body = await request.json();
    const update: any = {};

    if (body.name !== undefined) update.name = String(body.name);
    if (body.description !== undefined) update.description = String(body.description);
    if (body.img !== undefined && Array.isArray(body.img)) update.img = body.img.map(String);
    if (body.createdAt) update.createdAt = new Date(body.createdAt);
    if (body.endedAt) update.endedAt = new Date(body.endedAt);
    if (body.price !== undefined) update.price = Number(body.price);
    if (body.totalNumber !== undefined) update.totalNumber = Number(body.totalNumber);
    if (body.soldNumber !== undefined) update.soldNumber = Number(body.soldNumber);
    if (body.active !== undefined) update.active = Boolean(body.active);
    if (body.participants && Array.isArray(body.participants)) {
      update.participants = body.participants.map((p: any) => ({
        phoneNumber: String(p.phoneNumber),
        ticketNumber: String(p.ticketNumber),
      }));
    }
    if (body.winners && Array.isArray(body.winners)) {
      update.winners = body.winners.map((w: any) => ({
        name: String(w.name),
        ticketNumber: String(w.ticketNumber),
        description: String(w.description || ""),
        img: w.img ? String(w.img) : undefined,
        URL: w.URL ? String(w.URL) : undefined,
      }));
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ message: "No fields to update" }, { status: 400 });
    }

    const updatedLottery = await Lottery.findOneAndUpdate({ id }, { $set: update }, { new: true }).lean();

    if (!updatedLottery) {
      return NextResponse.json({ message: "Lottery not found" }, { status: 404 });
    }

    return NextResponse.json(updatedLottery, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/lottery/[id] error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

