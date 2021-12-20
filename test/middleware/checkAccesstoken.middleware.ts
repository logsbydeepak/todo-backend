import {
  emptyAccessToken,
  emptyCookieToken,
  accessTokenDoNotExistDB,
  wrongAccessToken,
  accessTokenExpired,
  wrongAccessTokenPayloadId,
} from "../request/middleware/accessToken.request";

export const checkAccessToken = (method: string, path: string) => {
  test("empty token", () => emptyCookieToken(method, path));
  test("empty access token", () => emptyAccessToken(method, path));
  test("wrong access token", () => wrongAccessToken(method, path));
  test("access token do not exist in db", () =>
    accessTokenDoNotExistDB(method, path));
  test("access token expired", () => accessTokenExpired(method, path));
  test("wrong access token payload id", () => wrongAccessToken(method, path));
};
