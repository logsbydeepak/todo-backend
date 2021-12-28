import { token } from "@tt-helper/data";
import { userData } from "@tt-helper/data";
import { request } from "@tt-helper/request";
import { SuccessResponse, SuccessStatusCode } from "@tt-helper/response";

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
