import { Model, model } from "mongoose";

import { UserSchema } from "./schema/user.schema";
import { TodoSchema } from "./schema/todo.schema";
import { TokenSchema } from "./schema/token.schema";
import { TokenModelType, UserModelType, TodoModelType } from "@types";

export const UserModel: Model<UserModelType> = model("users", UserSchema);
export const TodoModel: Model<TodoModelType> = model("todos", TodoSchema);
export const TokenModel: Model<TokenModelType> = model("tokens", TokenSchema);
