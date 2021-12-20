import { request } from "../../helper/request.helper";
import {
  SuccessResponse,
  ErrorResponse,
  SuccessStatusCode,
  ErrorStatusCode,
} from "../../helper/response.helper";

export const createUserWithDifferentData = async (data: object) => {
  const createUser: any = await request.post("/v1/user").send(data);

  expect(createUser.res.statusCode).toBe(ErrorStatusCode("BP", 10));
  expect(createUser.body).toStrictEqual(ErrorResponse(createUser, "BP", 10));
};

export const createUserSuccessfully = async (data: object) => {
  const createUser: any = await request.post("/v1/user").send(data);

  console.log(createUser.res.statusCode);

  expect(createUser.res.statusCode).toBe(SuccessStatusCode("AU", 10));
  expect(createUser.body).toStrictEqual(SuccessResponse(createUser, "AU", 10));
};
