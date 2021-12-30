import { dbConnect, dbDrop } from "@config/db";

import {
  createUserTest,
  readUserTest,
  updateUserTest,
  deleteUserTest,
} from "@tt-router/user";

import { createTodoTest, deleteTodoTest } from "@tt-router/todo";

beforeAll(() => {
  dbConnect();
});

describe("USER ROUTER", () => {
  describe("POST create user test", createUserTest);
  describe("GET update user info", readUserTest);
  describe("PUT user", updateUserTest);
  describe("DELETE remove user", deleteUserTest);
});

describe("TODO ROUTER", () => {
  describe("POST create todo test", createTodoTest);
  describe("DELETE todo test", deleteTodoTest);
});

afterAll(() => {
  dbDrop();
});