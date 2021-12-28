import { checkAccessToken } from "@tt-router/middleware";
import { getUserInfoSuccessfully } from "@tt-request/router/user";

export const readUserTest = () => {
  checkAccessToken("get", "/v1/user");
  test("get user info successfully", () => getUserInfoSuccessfully());
};
