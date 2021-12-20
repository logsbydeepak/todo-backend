import { request } from "../../helper/request.helper";
import { SuccessResponse } from "../../helper/response.helper";

export const createUserSuccessfully = async () => {
  const createUser: any = await request.post("/v1/user").send({
    name: "Test User",
    email: "test@test.com",
    password: "123456789Aa!1",
  });

  expect(createUser.body).toStrictEqual(
    SuccessResponse(createUser.request, "AU", 10)
  );
};
