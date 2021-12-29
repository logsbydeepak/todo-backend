import supertestRequest, { SuperTest, Test } from "supertest";

import { server } from "@config/server";

export const request: SuperTest<Test> = supertestRequest(server);
