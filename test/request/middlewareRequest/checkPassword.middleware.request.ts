import { dbCreateToken } from "@helper/db";
import { TokenModel, UserModel } from "@model";
import { userData } from "@tt-helper/data";
import { request } from "@tt-helper/request";
import { ErrorResponse, ErrorStatusCode } from "@tt-helper/response";

export const checkPasswordWithDifferentValue = async (
  method: string,
  path: string,
  password: object,
  messageTypeCode: string,
  messageCode: number
) => {
  const newUser = new UserModel(userData);
  const newToken = dbCreateToken(newUser._id, 1);

  await newUser.save();
  await newToken.save();

  // @ts-ignore
  const user = await request[method](path)
    .send(password)
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
