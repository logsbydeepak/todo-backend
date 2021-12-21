import { checkAccessToken } from "../../middleware/checkAccesstoken.middleware";
import { checkPassword } from "../../middleware/checkPassword.middleware";
import { deleteUserSuccessfully } from "../../request/router/userRequest/delete.user.request";

export const deleteUser = () => {
  checkAccessToken("delete", "/v1/user");
  checkPassword("delete", "/v1/user");
  test("delete user success successfully", () => deleteUserSuccessfully());
};
