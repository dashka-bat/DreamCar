
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Lottery, { ILottery } from "@/model/lottery";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { lotteryId, winner  } = await request.json();

    if (!lotteryId || !winner) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const { name, ticketNumber, description, img, URL,endedAt } = winner;

    if (!name || !ticketNumber || !description || !endedAt) {
      return NextResponse.json(
        { message: "Winner must have name, ticketNumber, and description" },
        { status: 400 }
      );
    }

    const lottery = await Lottery.findOne({ id: lotteryId });
    if (!lottery) {
      return NextResponse.json(
        { message: "Lottery not found" },
        { status: 404 }
      );
    }
    const newWinner = { name, ticketNumber, description, img, URL,endedAt };
    lottery.winners = [...(lottery.winners || []), newWinner];
    const ticketNum = Number(ticketNumber);
    if (!isNaN(ticketNum) && (!lottery.soldNumber || ticketNum > lottery.soldNumber)) {
      lottery.soldNumber = ticketNum;
    }

    await lottery.save();

    return NextResponse.json({ winner: newWinner, lotteryId }, { status: 200 });
  } catch (error: any) {
    console.log("Add winner error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
export async function GET() {
try {
    await connectToDatabase();

    const winners = await Lottery.find({},"winners");
    return NextResponse.json(winners, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to fetch winners', error: error.message },
      { status: 500 }
    );
  }
}