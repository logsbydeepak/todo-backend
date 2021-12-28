import { dbConnect, dbDrop } from "@config/db";

import {
  createUserTest,
  readUserTest,
  updateUserTest,
  deleteUserTest,
} from "./router/user";

beforeAll(() => {
  dbConnect();
});

describe("USER ROUTER", () => {
  describe("POST create user test", createUserTest);
  describe("GET update user info", readUserTest);
  describe("PUT user", updateUserTest);
  describe("DELETE remove user", deleteUserTest);
});

afterAll(() => {
  dbDrop();
});
