import { token, userData } from "../../../helper/data.helper";
import { request } from "../../../helper/request.helper";
import {
  ErrorResponse,
  ErrorStatusCode,
  SuccessResponse,
  SuccessStatusCode,
} from "../../../helper/response.helper";

export const updateUserWithDifferentDataSuccess = async (data: any) => {
  const accessToken = token.getValue.tokenValue.accessToken.value;
  const user: any = await request
    .patch("/v1/user")
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
  const accessToken = token.getValue.tokenValue.accessToken.value;
  const user: any = await request
    .patch("/v1/user")
    .send(data)
    .set("Cookie", [`accessToken=${accessToken}`]);

  expect(user.res.statusCode).toBe(
    ErrorStatusCode(messageTypeCode, messageCode)
  );
  expect(user.body).toStrictEqual(
    ErrorResponse(user, messageTypeCode, messageCode)
  );
};
