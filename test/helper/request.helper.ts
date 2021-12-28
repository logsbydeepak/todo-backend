import supertestRequest from "supertest";

import { server } from "@config/server";

export const request = supertestRequest(server);
