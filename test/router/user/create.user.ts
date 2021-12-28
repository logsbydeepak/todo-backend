import {
  createUserSuccessfully,
  createUserWithDifferentData,
} from "@tt-request/router/user";

import { userData } from "@tt-helper/data";

export const createUserTest = () => {
  const { name, email, password } = userData;
  const extra = "value";
  // body
  test("send array insted of object", () => createUserWithDifferentData([]));
  test("send empty object", () => createUserWithDifferentData({}));
  test("send object with extra data", () =>
    createUserWithDifferentData({ ...userData, extra }));

  // name
  test("no name property", () =>
    createUserWithDifferentData({ email, password, extra }));
  test("name property empty", () =>
    createUserWithDifferentData({ email, password, name: "" }));

  // email
  test("no email property", () =>
    createUserWithDifferentData({ password, name, extra }));
  test("empty email property", () =>
    createUserWithDifferentData({ password, name, email: "" }));
  test("invalid email", () =>
    createUserWithDifferentData({ password, name, email: "test.com" }));

  // password
  test("no password property", () =>
    createUserWithDifferentData({ email, name, extra }));
  test("empty password propery", () =>
    createUserWithDifferentData({ email, password: "", name }));
  test("invalid password", () =>
    createUserWithDifferentData({ name, email, password: "abc" }));

  test("successfully", () => createUserSuccessfully(userData));
};
