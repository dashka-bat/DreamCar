import mongoose, { Schema, Document } from "mongoose";

export interface IRequest extends Document {
  categoryId: string;
  phoneNumber: string;
  quantity?: string;
  status?: "DECLINED" | "PENDING" | "APPROVED";
  createdAt?: Date;
}
const RequestSchema: Schema<IRequest> = new Schema({
  categoryId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
 quantity: { type: String },
    status: { type: String, default: "PENDING" },
    createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Request || mongoose.model<IRequest>("Request", RequestSchema);
