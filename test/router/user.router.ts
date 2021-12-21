import { deleteUser } from "./user/delete.user";
import { createUserTest } from "./user/create.user";
import { getUserTest } from "./user/getUser.user";
import { updateUser } from "./user/update.user";

export const userRouterTest = () => {
  describe("POST create user test", createUserTest);
  describe("GET update user info", getUserTest);
  describe("PATCH user", updateUser);
  describe("DELETE remove user", deleteUser);
};
