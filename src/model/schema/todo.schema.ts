import { Schema } from "mongoose";

export const TodoSchema = new Schema({
  task: { type: String, required: true },
  status: { type: Boolean, required: true },
});
