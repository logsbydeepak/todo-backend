import {
  createUserSuccessfully,
  createUserWithDifferentData,
} from "@tt-request/router/user";

import { userData } from "@tt-helper/data";

export const createUserTest = () => {
  const { name, email, password } = userData;
  const extra = "value";
  // body
  test("send array insted of object", () =>
    createUserWithDifferentData([], "BP", 11));

  test("send array with user data", () =>
    createUserWithDifferentData([userData], "BP", 11));

  test("send empty object", () => createUserWithDifferentData({}, "BP", 10));

  test("send object with extra property", () =>
    createUserWithDifferentData({ ...userData, extra }, "BP", 10));

  // name
  test("no name property", () =>
    createUserWithDifferentData({ email, password, extra }, "BP", 11));

  test("name property empty", () =>
    createUserWithDifferentData({ email, password, name: "" }, "BP", 11));

  // email
  test("no email property", () =>
    createUserWithDifferentData({ password, name, extra }, "BP", 11));

  test("empty email property", () =>
    createUserWithDifferentData({ password, name, email: "" }, "BP", 11));

  test("invalid email", () =>
    createUserWithDifferentData(
      { password, name, email: "test.com" },
      "BP",
      10
    ));

  // password
  test("no password property", () =>
    createUserWithDifferentData({ email, name, extra }, "BP", 11));

  test("empty password propery", () =>
    createUserWithDifferentData({ email, password: "", name }, "BP", 11));

  test("invalid password", () =>
    createUserWithDifferentData({ name, email, password: "abc" }, "BP", 10));

  test("successfully create user", () => createUserSuccessfully(userData));

  test("email already exist", () =>
    createUserWithDifferentData(userData, "AU", 11));
};
