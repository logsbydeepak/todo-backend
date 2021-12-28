import { deleteUserSuccessfully } from "@tt-request/router/user";
import { checkAccessToken, checkPassword } from "@tt-router/middleware";

export const deleteUserTest = () => {
  checkAccessToken("delete", "/v1/user");
  checkPassword("delete", "/v1/user");
  test("delete user successfully", () => deleteUserSuccessfully());
};
