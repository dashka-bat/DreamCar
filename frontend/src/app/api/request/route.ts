import { connectToDatabase } from "@/lib/mongodb";
import Lottery from "@/model/lottery";
import RequestModel from "@/model/request";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectToDatabase();
    const requests = await RequestModel.find({});
    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch requests:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch requests", error: error.message }),
      { status: 500 }
    );
  }
}
export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { id } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ message: "Missing request ID" }), { status: 400 });
    }
    const deletedRequest = await RequestModel.findOneAndDelete({ _id: id });
    if (!deletedRequest) {
      return new Response(JSON.stringify({ message: "Request not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Request deleted successfully" }), { status: 200 });
  }
    catch (error: any) {
    console.error("Failed to delete request:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete request", error: error.message }),
      { status: 500 }
    );          
    }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { categoryId, phoneNumber, quantity} = await request.json();

    if (!categoryId || !phoneNumber || !quantity) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }
    if(quantity<=0){
      return new Response(
        JSON.stringify({ message: "Quantity must be greater than zero" }),
        { status: 400 }
      );
    }

    const newRequest = new RequestModel({  phoneNumber, quantity, categoryId });
    const savedRequest = await newRequest.save();

    return new Response(JSON.stringify(savedRequest), { status: 201 });
  } catch (error: any) {
    console.error("Failed to create request:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to create request",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
interface Participant {
  phoneNumber: string;
  ticketNumber: string;
  soldAt: Date;
}
export async function PATCH(request: Request) {
  try {
    await connectToDatabase();
    const {id, categoryId, phoneNumber, quantity, status } = await request.json();
    const _id = new mongoose.Types.ObjectId(id);

    if (!categoryId || !phoneNumber || !quantity || !status || !_id) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }
    
    const requestOne=await RequestModel.findById(_id);
    const soldAt = new Date(requestOne?.createdAt || Date.now());
    if(!requestOne){
      return new Response(
        JSON.stringify({ message: "Request not found" }),
        { status: 404 }
      );
    }


    const lottery = await Lottery.findOne({ id: categoryId });
    if (!lottery) {
      return new Response(
        JSON.stringify({ message: "Lottery not found" }),
        { status: 404 }
      );
    }

    if (status === "APPROVED") {
      const existingNumbers =
        lottery.participants?.map((p: Participant) =>
          Number(p.ticketNumber)
        ) || [];
      const maxTicket =
        existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;

      const newParticipants: Participant[] = [];
      for (let i = 1; i <= quantity; i++) {
        const ticketNumber = (maxTicket + i).toString();
        newParticipants.push({ phoneNumber, ticketNumber , soldAt });
      }

      lottery.participants = [
        ...(lottery.participants || []),
        ...newParticipants,
      ];
      lottery.soldNumber =
        (lottery.soldNumber || 0) + newParticipants.length;

      await lottery.save();

        await RequestModel.findOneAndDelete({ _id });

      return new Response(
        JSON.stringify({
          participants: newParticipants,
          soldNumber: lottery.soldNumber,
        }),
        { status: 200 }
      );
    }

    if (status === "DECLINED") {
      await RequestModel.findOneAndDelete({ _id });
      return new Response(
        JSON.stringify({ message: "Request declined" }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Invalid status value" }),
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Failed to update lottery:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to update lottery",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

