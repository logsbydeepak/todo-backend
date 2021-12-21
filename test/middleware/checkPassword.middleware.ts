import { checkPasswordWithDifferentValue } from "../request/middleware/password.request";

export const checkPassword = (method: string, path: string) => {
  test("current password not provided", () =>
    checkPasswordWithDifferentValue(method, path, {}, "BP", 10));

  test("current password field is empty", () =>
    checkPasswordWithDifferentValue(
      method,
      path,
      { currentPassword: "" },
      "BP",
      10
    ));

  test("weak current password", () =>
    checkPasswordWithDifferentValue(
      method,
      path,
      { currentPassword: "1234asdf" },
      "BP",
      10
    ));

  test("wrong current password", () =>
    checkPasswordWithDifferentValue(
      method,
      path,
      { currentPassword: "123456789@Abc" },
      "BP",
      10
    ));
};
