import { Schema, Document, ObjectId } from "mongoose";

export interface UserModelType extends Document {
  _id: string;
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
  _id: string;
  owner: string;
  task: string;
  status: boolean;
}
