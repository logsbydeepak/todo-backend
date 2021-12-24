import { ErrorRequestHandler } from "express";

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

export interface UpdateTodoBodyType extends Object, Array<string> {
  id: string;
}
export interface BodyDataType
  extends CreateUserBodyType,
    CreateTodoBodyType,
    UpdateTodoBodyType,
    UpdateUserBodyType {}

export interface ThrowErrorType {
  ThrowError: {
    messageTypeCode: string;
    messageCode: number;
    data: object | undefined;
  };
}

export interface ErrorRequest extends ErrorRequestHandlerm, ThrowErrorType {}
