import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const TokenSchema: Schema = new Schema({
  owner: ObjectId,
  refreshToken: { type: String, required: true },
  accessToken: { type: String, required: true },
});
