import {
  ErrorResponse,
  ErrorStatusCode,
  SuccessResponse,
  SuccessStatusCode,
} from "@tt-helper/response";

import { userData } from "@tt-helper/data";
import { dbCreateToken } from "@helper/db";
import { request } from "@tt-helper/request";
import { TodoModel, TokenModel, UserModel } from "@model";

export const createTodoWithDifferentData = async (
  data: any,
  messageTypeCode: string,
  messageCode: number
) => {
  const newUser = new UserModel(userData);
  const newToken = dbCreateToken(newUser._id, 1);

  await newUser.save();
  await newToken.save();
  const todoRequest: any = await request
    .post("/v1/todo")
    .send(data)
    .set("Cookie", `accessToken=${newToken.accessToken}`);

  expect(todoRequest.res.statusCode).toBe(
    ErrorStatusCode(messageTypeCode, messageCode)
  );
  expect(todoRequest.body).toStrictEqual(
    ErrorResponse(todoRequest, messageTypeCode, messageCode)
  );

  await UserModel.findByIdAndRemove(newUser._id);
  await TokenModel.findByIdAndRemove(newToken._id);
};

export const createTodoSuccessfully = async (data: any) => {
  const newUser = new UserModel(userData);
  const newToken = dbCreateToken(newUser._id, 1);

  await newUser.save();
  await newToken.save();
  const todoRequest: any = await request
    .post("/v1/todo")
    .send(data)
    .set("Cookie", `accessToken=${newToken.accessToken}`);

  expect(todoRequest.res.statusCode).toBe(SuccessStatusCode("TD", 10));
  expect(todoRequest.body).toStrictEqual(
    SuccessResponse(todoRequest, "TD", 10)
  );

  await UserModel.findByIdAndRemove(newUser._id);
  await TokenModel.findByIdAndRemove(newToken._id);
  await TodoModel.findOneAndDelete(data.task);
};
