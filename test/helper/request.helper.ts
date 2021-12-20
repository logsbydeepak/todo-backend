import supertestRequest from "supertest";
import { server } from "../../src/config/server.config";

export const request = supertestRequest(server);
