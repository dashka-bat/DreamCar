// src/model/lottery.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ILottery extends Document {
  id: string;
  name: string;
  description?: string;
  img?: string[];
  createdAt: Date;
  endedAt: Date;
  price: number;
  totalNumber: number;
  soldNumber: number;
  active: boolean;
  winners?: {
    name: string;
    ticketNumber: string;
    description: string;
    img?: string;
    URL?: string;
  }[];
}

const LotterySchema: Schema<ILottery> = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  img: [{ type: String }],
  createdAt: { type: Date, required: true },
  endedAt: { type: Date, required: true },
  price: { type: Number, required: true },
  totalNumber: { type: Number, required: true },
  soldNumber: { type: Number, required: true },
  active: { type: Boolean, required: true },
  winners: [
    {
      name: { type: String, required: true },
      ticketNumber: { type: String, required: true },
      description: { type: String, required: true },
      img: { type: String },
      URL: { type: String },
    },
  ],
});

export default mongoose.models.Lottery || mongoose.model<ILottery>("Lottery", LotterySchema);

