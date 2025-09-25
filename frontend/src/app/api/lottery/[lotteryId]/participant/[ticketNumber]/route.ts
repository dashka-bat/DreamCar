import { NextResponse } from "next/server";
import Lottery from "@/model/lottery";
async function deleteParticipantByTicketNumber(
  lotteryId: string,
  ticketNumber: string
) {
  try {
    const result = await Lottery.updateOne(
      { id: lotteryId },
      {
        $pull: {
          participants: { ticketNumber },
        },
      }
    );

    return result;
  } catch (error) {
    console.error("Participant устгах үед алдаа гарлаа:", error);
    throw error;
  }
}
export async function DELETE(
  request: Request,
  context: { params: Promise<{ lotteryId: string; ticketNumber: string }> }
) {
  try {
    const { lotteryId, ticketNumber } = await context.params; // ✅ params-г await хийв
    const result = await deleteParticipantByTicketNumber(lotteryId, ticketNumber);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

