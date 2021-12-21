import { deleteUser } from "./user/delete.user";
import { createUserTest } from "./user/create.user";
import { getUserTest } from "./user/getUser.user";

export const userRouterTest = () => {
  describe("POST create user test", createUserTest);
  describe("GET create user info", getUserTest);
  describe("DELETE remove user", () => deleteUser());
};
