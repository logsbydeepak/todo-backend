import { token } from "../../helper/data.helper";
import { request } from "../../helper/request.helper";
import { ErrorResponse, ErrorStatusCode } from "../../helper/response.helper";

export const checkPasswordWithDifferentValue = async (
  method: string,
  path: string,
  password: object,
  messageTypeCode: string,
  messageCode: number
) => {
  const accessToken = token.getValue.tokenValue.accessToken.value;

  // @ts-ignore
  const user = await request[method](path)
    .send(password)
    .set("Cookie", [`accessToken=${accessToken}`]);

  expect(user.res.statusCode).toBe(
    ErrorStatusCode(messageTypeCode, messageCode)
  );
  expect(user.body).toStrictEqual(
    ErrorResponse(user, messageTypeCode, messageCode)
  );
};
