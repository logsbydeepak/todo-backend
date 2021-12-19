import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const TokenSchema = new Schema({
  id: ObjectId,
  tokens: [
    {
      refreshToken: { type: String, required: true },
      accessToken: [{ token: { type: String, required: true } }],
    },
  ],
});
