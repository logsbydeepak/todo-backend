import { model } from "mongoose";

import { UserSchema } from "./schema/user.schema";
import { TodoSchema } from "./schema/todo.schema";
import { TokenSchema } from "./schema/token.schema";

import {
  TokenModelType,
  UserModelType,
  TodoModelType,
} from "../types/model.types";

export const UserModel = model<UserModelType>("users", UserSchema);
export const TodoModel = model<TodoModelType>("todos", TodoSchema);
export const TokenModel = model<TokenModelType>("tokens", TokenSchema);
