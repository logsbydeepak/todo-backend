import { Model, model } from "mongoose";

import { TokenModelType, UserModelType, TodoModelType } from "@types";
import { UserSchema } from "./schema/user.schema";
import { TodoSchema } from "./schema/todo.schema";
import { TokenSchema } from "./schema/token.schema";

export const UserModel: Model<UserModelType> = model("users", UserSchema);
export const TodoModel: Model<TodoModelType> = model("todos", TodoSchema);
export const TokenModel: Model<TokenModelType> = model("tokens", TokenSchema);
