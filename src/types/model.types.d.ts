import { Schema, Document } from "mongoose";

export type ObjectIdType = Schema.Types.ObjectId;

export interface UserModelType extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  name: String;
}

export interface TokenModelType extends Document {
  owner: ObjectId;
  accessToken: string;
  refreshToken: string;
}

export interface TodoModelType extends Document {
  owner: ObjectId;
  task: string;
  status: boolean;
}
