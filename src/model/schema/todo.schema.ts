import { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

export const TodoSchema: Schema = new Schema(
  {
    owner: { type: ObjectId, required: true },
    task: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  { timestamps: { createdAt: false } }
);
