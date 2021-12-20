import { dbConnect, dbDrop } from "../src/config/db.config";
import { userRouterTest } from "./router/user.router";

beforeAll(() => {
  dbConnect();
});

describe("USER ROUTER", userRouterTest);

afterAll(() => {
  dbDrop();
});
