import { model } from "mongoose";

import { UserSchema } from "./schema/user.schema";
import { UserModelType } from "../types/model.types";

export const UserModel = model<UserModelType>("users", UserSchema);
