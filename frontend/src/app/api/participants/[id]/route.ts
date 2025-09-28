
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Lottery from "@/model/lottery";
import mongoose, { Mongoose } from "mongoose";

interface Participant {
  phoneNumber: string;
  ticketNumber: string;
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { lotteryId, phoneNumber, quantity } = await request.json();
    if (!lotteryId || !phoneNumber || !quantity) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const lottery = await Lottery.findOne({ id: lotteryId });
    if (!lottery) 
      return NextResponse.json({ message: "Lottery not found" }, { status: 404 });

    const existingNumbers = lottery.participants?.map((p: Participant) => Number(p.ticketNumber)) || [];
    const maxTicket = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;

    const newParticipants = [];
    for (let i = 1; i <= quantity; i++) {
      const ticketNumber = (maxTicket + i).toString();
      newParticipants.push({ phoneNumber, ticketNumber });
    }

    lottery.participants = [...(lottery.participants || []), ...newParticipants];

    lottery.soldNumber = (lottery.soldNumber || 0) + newParticipants.length;

    await lottery.save();

    return NextResponse.json({ participants: newParticipants, soldNumber: lottery.soldNumber }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
} 

export async function GET(request: Request, context: { params: any }) {
  try {
    await connectToDatabase();

 const { id } = await context.params;


    if (!id) {
      return new Response(
        JSON.stringify({ message: "Missing lotteryId parameter" }),
        { status: 400 }
      );
    }

    const lottery = await Lottery.findOne({ id });

    if (!lottery) {
      return new Response(
        JSON.stringify({ message: "Lottery not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ participants: lottery.participants || [] }),
      { status: 200 }
    );

  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Server error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

