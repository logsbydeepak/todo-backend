import { request } from "@tt-helper/request";
import { token, userData } from "@tt-helper/data";
import { SuccessResponse, SuccessStatusCode } from "@tt-helper/response";

export const deleteUserSuccessfully = async () => {
  const currentPassword = userData.password;
  const accessToken = token.getValue.tokenValue.accessToken.value;

  const user: any = await request
    .delete("/v1/user")
    .send({ currentPassword })
    .set("Cookie", [`accessToken=${accessToken}`]);

  expect(user.res.statusCode).toBe(SuccessStatusCode("AU", 13));
  expect(user.body).toStrictEqual(SuccessResponse(user, "AU", 13));
};
