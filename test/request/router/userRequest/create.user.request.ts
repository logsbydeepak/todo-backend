import cookieParser from "set-cookie-parser";

import {
  SuccessResponse,
  ErrorResponse,
  SuccessStatusCode,
  ErrorStatusCode,
} from "@tt-helper/response";

import { userData } from "@tt-helper/data";
import { request } from "@tt-helper/request";
import { TokenModel, UserModel } from "@model";

export const createUserWithDifferentData = async (
  data: object,
  messageTypeCode: string,
  messageCode: number
) => {
  const createUser: any = await request.post("/v1/user").send(data);

  expect(createUser.res.statusCode).toBe(
    ErrorStatusCode(messageTypeCode, messageCode)
  );
  expect(createUser.body).toStrictEqual(
    ErrorResponse(createUser, messageTypeCode, messageCode)
  );
};

export const createUserSuccessfully = async (data: object) => {
  const createUser: any = await request.post("/v1/user").send(data);

  const cookie = cookieParser(createUser.res, {
    map: true,
  });

  expect(cookie.accessToken.value).toBeTruthy();
  expect(cookie.accessToken.path).toBe("/v1");
  expect(cookie.refreshToken.value).toBeTruthy();
  expect(cookie.refreshToken.path).toBe("/v1/session/refresh");

  expect(createUser.res.statusCode).toBe(SuccessStatusCode("AU", 10));
  expect(createUser.body).toStrictEqual(SuccessResponse(createUser, "AU", 10));

  await UserModel.deleteOne({ email: userData.email });
  await TokenModel.deleteOne({ accessToken: cookie.accessToken.value });
};

export const userAlreadyExist = async (data: any) => {
  const newUser = new UserModel(data);
  await newUser.save();

  const createUser: any = await request.post("/v1/user").send(data);

  expect(createUser.res.statusCode).toBe(ErrorStatusCode("AU", 11));
  expect(createUser.body).toStrictEqual(ErrorResponse(createUser, "AU", 11));

  await UserModel.findByIdAndRemove(newUser._id);
};
