import { checkAccessToken } from "../../middleware/checkAccesstoken.middleware";
import { checkPassword } from "../../middleware/checkPassword.middleware";

export const deleteUser = () => {
  checkAccessToken("delete", "/v1/user");
  checkPassword("delete", "/v1/user");
};
