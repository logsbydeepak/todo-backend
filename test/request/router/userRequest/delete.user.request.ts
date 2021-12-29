import { request } from "@tt-helper/request";
import { userData } from "@tt-helper/data";
import { SuccessResponse, SuccessStatusCode } from "@tt-helper/response";
import { TokenModel, UserModel } from "@model";
import { dbCreateToken } from "@helper/db";

export const deleteUserSuccessfully = async () => {
  const newUser = new UserModel(userData);
  const newToken = dbCreateToken(newUser._id, 1);

  await newUser.save();
  await newToken.save();

  const currentPassword = userData.password;

  const user: any = await request
    .delete("/v1/user")
    .send({ currentPassword })
    .set("Cookie", [`accessToken=${newToken.accessToken}`]);

  expect(user.res.statusCode).toBe(SuccessStatusCode("AU", 13));
  expect(user.body).toStrictEqual(SuccessResponse(user, "AU", 13));

  await UserModel.findByIdAndRemove(newUser._id);
  await TokenModel.findByIdAndRemove(newToken._id);
};
