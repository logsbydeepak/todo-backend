import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const TodoSchema = new Schema({
  owner: { type: ObjectId, required: true },
  task: { type: String, required: true },
  status: { type: Boolean, required: true },
});
