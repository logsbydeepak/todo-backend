import { JwtPayload } from "jsonwebtoken";
import { ErrorRequestHandler } from "express";
import { Schema, Document, ObjectId } from "mongoose";

export interface UserModelType extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
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

interface PayloadId extends JwtPayload {
  id: string;
}

export type TokenValidatorType = PayloadId | TokenExpiredError | null;

export interface CreateUserBodyType extends Object, Array<string> {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserBodyType
  extends Object,
    Array<string>,
    CreateUserBodyType {
  currentPassword: string;
  toUpdate: string;
}
export interface CreateTodoBodyType extends Object, Array<string> {
  task: string;
  status: boolean;
}

export interface UpdateTodoBodyType
  extends Object,
    Array<string>,
    CreateTodoBodyType {
  id: string;
}

export interface BodyDataType
  extends CreateUserBodyType,
    CreateTodoBodyType,
    UpdateTodoBodyType,
    UpdateUserBodyType {}

export interface ErrorObjectType {
  ErrorObject: {
    messageTypeCode: string;
    messageCode: number;
    data: object | undefined;
  };
}

export interface MyErrorRequestHandler
  extends ErrorObjectType,
    ErrorRequestHandler {}
