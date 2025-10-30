import { NextResponse } from "next/server";
import Lottery from "@/model/lottery";
import { connectToDatabase } from "@/lib/mongodb";

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { phoneNumber, lotteryId } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json({ message: "Missing phoneNumber" }, { status: 400 });
    }
    const query = lotteryId
      ? { _id: lotteryId, "participants.phoneNumber": phoneNumber }
      : { "participants.phoneNumber": phoneNumber };

    const lotteries = await Lottery.find(query);

    for (const lottery of lotteries) {
      lottery.participants = lottery.participants.filter(
        (p: any) => p.phoneNumber !== phoneNumber
      );
      lottery.soldNumber = lottery.participants.length;
      await lottery.save();
    }

    return NextResponse.json(
      { message: "Participants deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
