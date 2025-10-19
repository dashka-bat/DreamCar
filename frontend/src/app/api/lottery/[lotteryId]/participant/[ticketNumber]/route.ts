import { NextResponse } from "next/server";
import Lottery from "@/model/lottery";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ lotteryId: string; ticketNumber: string }> }
) {
  try {
    const { lotteryId, ticketNumber } = await context.params;N
    const lottery = await Lottery.findOne({ id: lotteryId });
    if (!lottery) throw new Error("Lottery олдсонгүй");
    lottery.participants = lottery.participants.filter(
      (p: any) => p.ticketNumber !== ticketNumber
    );


    lottery.soldNumber = lottery.participants.length;

    await lottery.save();

    return NextResponse.json({ success: true, lottery });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
