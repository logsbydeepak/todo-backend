import { createUserTest } from "./user/create.user";

export const userRouterTest = () => {
  describe("POST create user test", createUserTest);
};
