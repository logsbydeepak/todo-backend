import { Document } from "mongoose";

export interface UserModelType extends Document {
  _id: number;
  email: string;
  password: string;
  name: String;
}

export interface TokenModelType extends Document {
  sessions: [
    {
      refreshSession: string;
      accessSession: string;
    }
  ];
}

export interface TodoModelType extends Document {
  owner: string;
  task: string;
  status: boolean;
}
