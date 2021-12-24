import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const TokenSchema: Schema = new Schema({
  _id: ObjectId,
  tokens: [
    {
      _id: false,
      refreshToken: { type: String, required: true },
      accessToken: { type: String, required: true },
    },
  ],
});
