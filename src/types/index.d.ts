import { JwtPayload } from "jsonwebtoken";
import { ErrorRequestHandler } from "express";
import { Schema, Document, ObjectId } from "mongoose";

export type QueryType =
  | string
  | QueryString.ParsedQs
  | string[]
  | QueryString.ParsedQs[]
  | undefined;

interface AccessPayloadId extends JwtPayload {
  id: string;
}

interface RefreshPayloadId extends JwtPayload {
  id: string;
  refreshTokenRefreshCount: number;
}

export type RefreshTokenValidatorType =
  | RefreshPayloadId
  | TokenExpiredError
  | null
  | "TokenExpiredError";

export type AccessTokenValidatorType =
  | AccessPayloadId
  | TokenExpiredError
  | null
  | "TokenExpiredError";

export interface UserModelType extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
}

export interface TokenModelType extends Document {
  id: string;
  owner: string;
  accessToken: string;
  refreshToken: string;
}

export interface TodoModelType extends Document {
  _id: string;
  owner: string;
  task: string;
  status: boolean;
  __v: string;
  updatedAt: string;
}

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
  };
}

export interface MyErrorRequestHandler
  extends ErrorRequestHandler,
    ErrorObjectType {}
