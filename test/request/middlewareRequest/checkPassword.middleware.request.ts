import { token } from "@tt-helper/data";
import { request } from "@tt-helper/request";
import { ErrorResponse, ErrorStatusCode } from "@tt-helper/response";

export const checkPasswordWithDifferentValue = async (
  method: string,
  path: string,
  password: object,
  messageTypeCode: string,
  messageCode: number
) => {
  const accessToken = token.getValue.accessToken.value;
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
