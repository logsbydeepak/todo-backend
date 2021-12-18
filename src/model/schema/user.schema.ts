import { Schema } from "mongoose";

const defaultProperty = {
  required: true,
  type: String,
};

export const UserSchema = new Schema({
  name: defaultProperty,
  email: defaultProperty,
  password: defaultProperty,
});
