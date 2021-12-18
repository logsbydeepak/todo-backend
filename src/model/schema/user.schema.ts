import { Schema } from "mongoose";
import { hash } from "bcryptjs";

const defaultProperty = {
  required: true,
  type: String,
};

export const UserSchema = new Schema({
  name: defaultProperty,
  email: defaultProperty,
  password: defaultProperty,
});

UserSchema.pre("save", async function (next: any) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 8);
  return next();
});
