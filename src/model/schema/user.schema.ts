import { Schema } from "mongoose";

import { generateHashAndSalt } from "@helper/security";

const defaultProperty: {
  required: boolean;
  type: StringConstructor;
} = {
  required: true,
  type: String,
};

export const UserSchema: Schema = new Schema({
  name: defaultProperty,
  email: defaultProperty,
  password: defaultProperty,
});

UserSchema.pre("save", async function (next: any) {
  if (!this.isModified("password")) return next();
  this.password = await generateHashAndSalt(this.password);
  return next();
});
