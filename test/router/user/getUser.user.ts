import { checkAccessToken } from "../../middleware/checkAccesstoken.middleware";

export const getUserTest = () => {
  checkAccessToken("get", "/v1/user");
};
