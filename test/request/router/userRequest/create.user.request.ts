import cookieParser from "set-cookie-parser";

import { request } from "../../../helper/request.helper";
import {
  SuccessResponse,
  ErrorResponse,
  SuccessStatusCode,
  ErrorStatusCode,
} from "../../../helper/response.helper";

import { token } from "../../../helper/data.helper";

export const createUserWithDifferentData = async (data: object) => {
  const createUser: any = await request.post("/v1/user").send(data);

  expect(createUser.res.statusCode).toBe(ErrorStatusCode("BP", 10));
  expect(createUser.body).toStrictEqual(ErrorResponse(createUser, "BP", 10));
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

  token.setValue = cookie;

  expect(createUser.res.statusCode).toBe(SuccessStatusCode("AU", 10));
  expect(createUser.body).toStrictEqual(SuccessResponse(createUser, "AU", 10));
};