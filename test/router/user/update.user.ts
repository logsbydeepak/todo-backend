import {
  updateUserWithDifferentDataError,
  updateUserWithDifferentDataSuccess,
} from "@tt-request/router/user";

import { resetUserData, userData } from "@tt-helper/data";
import { checkAccessToken, checkPassword } from "@tt-router/middleware";

export const updateUserTest = () => {
  checkAccessToken("put", "/v1/user");
  checkPassword("put", "/v1/user");

  test("send array insted of object", () =>
    updateUserWithDifferentDataError([], "BP", 11));

  test("send empty object", () =>
    updateUserWithDifferentDataError({}, "BP", 11));

  test("send extra data", () =>
    updateUserWithDifferentDataError(
      {
        currentPassword: userData.password,
        toUpdate: "email",
        email: "email@email.com",
        extra: "value",
      },
      "BP",
      10
    ));

  test("toUpdate property not provided", () =>
    updateUserWithDifferentDataError(
      { currentPassword: userData.password, email: "email", extra: "value" },
      "BP",
      11
    ));

  test("toUpdate property is empty", () =>
    updateUserWithDifferentDataError(
      { currentPassword: userData.password, email: "email", toUpdate: "email" },
      "BP",
      10
    ));

  test("invalid toUpdate", () =>
    updateUserWithDifferentDataError(
      { currentPassword: userData.password, email: "email", toUpdate: "other" },
      "BP",
      11
    ));

  test("name property is not provided", () =>
    updateUserWithDifferentDataError(
      { currentPassword: userData.password, toUpdate: "name", extra: "value" },
      "BP",
      11
    ));

  test("name property is empty", () =>
    updateUserWithDifferentDataError(
      { currentPassword: userData.password, name: "", toUpdate: "name" },
      "BP",
      11
    ));

  test("email property is not provided", () =>
    updateUserWithDifferentDataError(
      { currentPassword: userData.password, toUpdate: "email", extra: "value" },
      "BP",
      11
    ));

  test("update name", () =>
    updateUserWithDifferentDataSuccess({
      currentPassword: userData.password,
      toUpdate: "name",
      name: "test2",
    }));

  test("email property is empty", () =>
    updateUserWithDifferentDataError(
      { currentPassword: userData.password, email: "", toUpdate: "email" },
      "BP",
      11
    ));

  test("invalid email", () =>
    updateUserWithDifferentDataError(
      {
        currentPassword: userData.password,
        toUpdate: "email",
        email: "email.com",
      },
      "BP",
      10
    ));

  test("update email", () =>
    updateUserWithDifferentDataSuccess({
      currentPassword: userData.password,
      toUpdate: "email",
      email: "test4@todo.com",
    }));

  test("password property is not provided", () =>
    updateUserWithDifferentDataError(
      {
        currentPassword: userData.password,
        toUpdate: "password",
        extra: "value",
      },
      "BP",
      11
    ));

  test("password property is empty", () =>
    updateUserWithDifferentDataError(
      {
        currentPassword: userData.password,
        password: "",
        toUpdate: "password",
      },
      "BP",
      11
    ));

  test("invalid password", () =>
    updateUserWithDifferentDataError(
      {
        currentPassword: userData.password,
        password: "asdf",
        toUpdate: "password",
      },
      "BP",
      10
    ));

  test("update password", () =>
    updateUserWithDifferentDataSuccess({
      currentPassword: userData.password,
      toUpdate: "password",
      password: "123456789A!a",
    }));

  resetUserData();
};
