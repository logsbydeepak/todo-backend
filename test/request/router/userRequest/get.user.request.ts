import { request } from "../../../helper/request.helper";
import { token } from "../../../helper/data.helper";
import {
  SuccessResponse,
  SuccessStatusCode,
} from "../../../helper/response.helper";
import { userData } from "../../../helper/data.helper";

export const getUserInfoSuccessfully = async () => {
  const accessToken = token.getValue.tokenValue.accessToken.value;
  const user: any = await request
    .get("/v1/user")
    .set("Cookie", [`accessToken=${accessToken}`]);

  const { name, email } = userData;

  expect(user.res.statusCode).toBe(SuccessStatusCode("AU", 11));
  expect(user.body).toStrictEqual(
    SuccessResponse(user, "AU", 11, { name, email })
  );
};
