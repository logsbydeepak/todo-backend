import { sign } from "jsonwebtoken";
import { userData } from "@tt-helper/data";
import { request } from "@tt-helper/request";
import { TokenModel, UserModel } from "@model";
import { ACCESS_TOKEN_SECRET } from "@config/env";
import { generateEncryption } from "@helper/security";
import { ErrorResponse, ErrorStatusCode } from "@tt-helper/response";

export const emptyCookieToken = async (method: string, path: string) => {
  // @ts-ignore
  const middlewareRequest = await request[method](path);

  expect(middlewareRequest.res.statusCode).toBe(ErrorStatusCode("TP", 14));
  expect(middlewareRequest.body).toStrictEqual(
    ErrorResponse(middlewareRequest, "TP", 14)
  );
};

export const emptyAccessToken = async (method: string, path: string) => {
  // @ts-ignore
  const middlewareRequest = await request[method](path).set("Cookie", [
    "accessToken=",
  ]);

  expect(middlewareRequest.res.statusCode).toBe(ErrorStatusCode("TP", 14));
  expect(middlewareRequest.body).toStrictEqual(
    ErrorResponse(middlewareRequest, "TP", 14)
  );
};

export const wrongAccessToken = async (method: string, path: string) => {
  // @ts-ignore
  const middlewareRequest = await request[method](path).set("Cookie", [
    "accessToken=abc",
  ]);

  expect(middlewareRequest.res.statusCode).toBe(ErrorStatusCode("BP", 11));
  expect(middlewareRequest.body).toStrictEqual(
    ErrorResponse(middlewareRequest, "BP", 11)
  );
};

export const accessTokenDoNotExistDB = async (method: string, path: string) => {
  const accessToken = sign({ id: "NA" }, ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1m",
  });

  const accessTokenEncrypt = generateEncryption(accessToken);

  // @ts-ignore
  const middlewareRequest = await request[method](path).set("Cookie", [
    `accessToken=${accessTokenEncrypt}`,
  ]);

  expect(middlewareRequest.res.statusCode).toBe(ErrorStatusCode("TP", 13));
  expect(middlewareRequest.body).toStrictEqual(
    ErrorResponse(middlewareRequest, "TP", 13)
  );
};

export const accessTokenExpired = async (method: string, path: string) => {
  const newUser = new UserModel(userData);

  const accessToken = sign({ id: "NA" }, ACCESS_TOKEN_SECRET as string, {
    expiresIn: "-1m",
  });

  const accessTokenEncrypt = generateEncryption(accessToken);

  const newToken = new TokenModel({
    owner: newUser._id,
    refreshToken: "abc",
    accessToken: accessTokenEncrypt,
  });

  await newUser.save();
  await newToken.save();

  // @ts-ignore
  const middlewareRequest = await request[method](path).set("Cookie", [
    `accessToken=${accessTokenEncrypt}`,
  ]);

  expect(middlewareRequest.res.statusCode).toBe(ErrorStatusCode("TP", 10));
  expect(middlewareRequest.body).toStrictEqual(
    ErrorResponse(middlewareRequest, "TP", 10)
  );
};

export const wrongAccessTokenPayloadId = async (
  method: string,
  path: string
) => {
  const accessToken = sign({ id: "NA" }, ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1m",
  });

  const accessTokenEncrypt = generateEncryption(accessToken);
  const newToken = new TokenModel({
    _id: "no id",
    tokens: [
      {
        refreshToken: "abc",
        accessToken: [
          {
            token: accessTokenEncrypt,
          },
        ],
      },
    ],
  });

  await newToken.save();

  // @ts-ignore
  const middlewareRequest = await request[method](path).set("Cookie", [
    `accessToken=${accessTokenEncrypt}`,
  ]);

  expect(middlewareRequest.res.statusCode).toBe(ErrorStatusCode("AU", 10));
  expect(middlewareRequest.body).toStrictEqual(
    ErrorResponse(middlewareRequest, "AU", 10)
  );
};
