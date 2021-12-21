import { token, userData } from "../../../helper/data.helper";
import { request } from "../../../helper/request.helper";
import {
  SuccessResponse,
  SuccessStatusCode,
} from "../../../helper/response.helper";

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
