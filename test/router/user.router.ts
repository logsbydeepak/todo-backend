import { createUserSuccessfully } from "./user/create.user";

export const userRouterTest = () => {
  describe("create user test", () => {
    test("POST create user successfully", () => createUserSuccessfully());
  });
};
