import { dbCreateToken } from "@helper/db";
import { TodoModel, TokenModel, UserModel } from "@model";
import { todoData, userData } from "@tt-helper/data";
import { request } from "@tt-helper/request";
import {
  ErrorStatusCode,
  ErrorResponse,
  SuccessResponse,
  SuccessStatusCode,
} from "@tt-helper/response";

export const deleteTodoWithDifferentData = async (
  data: string,
  messageTypeCode: string,
  messageCode: number
) => {
  const newUser = new UserModel(userData);
  const newToken = dbCreateToken(newUser._id, 1);

  await newUser.save();
  await newToken.save();
  const todoRequest: any = await request
    .delete(`/v1/todo/${data}`)
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

export const deleteTodoSuccessfully = async () => {
  const { task, status } = todoData;
  const newUser = new UserModel(userData);
  const newToken = dbCreateToken(newUser._id, 1);
  const newTodo = new TodoModel({
    owner: newUser._id,
    task,
    status,
  });

  await newUser.save();
  await newToken.save();
  await newTodo.save();

  const todoRequest: any = await request
    .delete(`/v1/todo/?id=${newTodo._id}`)
    .set("Cookie", `accessToken=${newToken.accessToken}`);

  expect(todoRequest.res.statusCode).toBe(SuccessStatusCode("TD", 11));
  expect(todoRequest.body).toStrictEqual(
    SuccessResponse(todoRequest, "TD", 11)
  );

  await UserModel.findByIdAndRemove(newUser._id);
  await TokenModel.findByIdAndRemove(newToken._id);
};
