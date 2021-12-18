import { Document } from "mongoose";

export interface UserModelType extends Document {
  email: string | null;
  password: string | null;
  name: string | null;
}
