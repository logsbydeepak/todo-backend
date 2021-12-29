import { dbCreateToken } from "@helper/db";
import { TokenModel, UserModel } from "@model";
import { userData } from "@tt-helper/data";
import { request } from "@tt-helper/request";
import { SuccessResponse, SuccessStatusCode } from "@tt-helper/response";

export const getUserInfoSuccessfully = async () => {
  const newUser = new UserModel(userData);
  const newToken = dbCreateToken(newUser._id, 1);

  await newUser.save();
  await newToken.save();

  const user: any = await request
    .get("/v1/user")
    .set("Cookie", [`accessToken=${newToken.accessToken}`]);

  const { name, email } = userData;

  expect(user.res.statusCode).toBe(SuccessStatusCode("AU", 11));
  expect(user.body).toStrictEqual(
    SuccessResponse(user, "AU", 11, { name, email })
  );

  await UserModel.findByIdAndRemove(newUser._id);
  await TokenModel.findByIdAndRemove(newToken._id);
};
