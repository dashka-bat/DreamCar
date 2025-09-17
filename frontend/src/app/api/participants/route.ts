
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Lottery from "@/model/lottery";

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
