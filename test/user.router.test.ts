import { dbConnect, dbDrop } from "@config/db";
import { userRouterTest } from "@test";

beforeAll(() => {
  dbConnect();
});

describe("USER ROUTER", userRouterTest);

afterAll(() => {
  dbDrop();
});
