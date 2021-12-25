import { Document } from "mongoose";

export interface UserModelType extends Document {
  _id: number;
  email: string;
  password: string;
  name: String;
}

export interface TokenModelType extends Document {
  owner: string;
  accessToken: string;
  refreshToken: string;
}

export interface TodoModelType extends Document {
  owner: string;
  task: string;
  status: boolean;
}
