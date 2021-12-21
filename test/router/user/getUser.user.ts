import { checkAccessToken } from "../../middleware/checkAccesstoken.middleware";
import { getUserInfoSuccessfully } from "../../request/router/userRequest/get.user.request";

export const getUserTest = () => {
  checkAccessToken("get", "/v1/user");
  test("get user info successfully", () => getUserInfoSuccessfully());
};
