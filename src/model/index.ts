import { model } from "mongoose";

import { UserSchema } from "./schema/user.schema";
import { TokenSchema } from "./schema/token.schema";
import { TokenModelType, UserModelType } from "../types/model.types";

export const UserModel = model<UserModelType>("users", UserSchema);
export const TokenModel = model<TokenModelType>("tokens", TokenSchema);
