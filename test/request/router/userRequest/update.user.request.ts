import {
  ErrorResponse,
  ErrorStatusCode,
  SuccessResponse,
  SuccessStatusCode,
} from "@tt-helper/response";

import { request } from "@tt-helper/request";
import { token, userData } from "@tt-helper/data";

export const updateUserWithDifferentDataSuccess = async (data: any) => {
  const accessToken = token.getValue.accessToken.value;
  const user: any = await request
    .put("/v1/user")
    .send(data)
    .set("Cookie", [`accessToken=${accessToken}`]);

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
};

export const updateUserWithDifferentDataError = async (
  data: object,
  messageTypeCode: string,
  messageCode: number
) => {
  const accessToken = token.getValue.accessToken.value;
  const user: any = await request
    .put("/v1/user")
    .send(data)
    .set("Cookie", [`accessToken=${accessToken}`]);

  expect(user.res.statusCode).toBe(
    ErrorStatusCode(messageTypeCode, messageCode)
  );
  expect(user.body).toStrictEqual(
    ErrorResponse(user, messageTypeCode, messageCode)
  );
};
