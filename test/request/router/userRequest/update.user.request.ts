import {
  ErrorResponse,
  ErrorStatusCode,
  SuccessResponse,
  SuccessStatusCode,
} from "@tt-helper/response";

import { request } from "@tt-helper/request";
import { userData } from "@tt-helper/data";
import { TokenModel, UserModel } from "@model";
import { dbCreateToken } from "@helper/db";

export const updateUserWithDifferentDataSuccess = async (data: any) => {
  const newUser = new UserModel(userData);
  const newToken = dbCreateToken(newUser._id, 1);

  await newUser.save();
  await newToken.save();

  const user: any = await request
    .put("/v1/user")
    .send(data)
    .set("Cookie", [`accessToken=${newToken.accessToken}`]);

  expect(user.res.statusCode).toBe(SuccessStatusCode("AU", 12));
  expect(user.body).toStrictEqual(SuccessResponse(user, "AU", 12));

  switch (data.toUpdate) {
    case "name":
      userData.name = data.name;
      break;

    case "email":
      userData.email = data.email;
      break;

    case "password":
      userData.password = data.password;
      break;
  }

  await UserModel.findByIdAndRemove(newUser._id);
  await TokenModel.findByIdAndRemove(newToken._id);
};

export const updateUserWithDifferentDataError = async (
  data: object,
  messageTypeCode: string,
  messageCode: number
) => {
  const newUser = new UserModel(userData);
  const newToken = dbCreateToken(newUser._id, 1);

  await newUser.save();
  await newToken.save();

  const user: any = await request
    .put("/v1/user")
    .send(data)
    .set("Cookie", [`accessToken=${newToken.accessToken}`]);

  expect(user.res.statusCode).toBe(
    ErrorStatusCode(messageTypeCode, messageCode)
  );
  expect(user.body).toStrictEqual(
    ErrorResponse(user, messageTypeCode, messageCode)
  );

  await UserModel.findByIdAndRemove(newUser._id);
  await TokenModel.findByIdAndRemove(newToken._id);
};
