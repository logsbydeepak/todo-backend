import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../../../src/config/env.config";
import { generateEncryption } from "../../../src/helper/security.helper";
import { TokenModel, UserModel } from "../../../src/model";
import { userData } from "../../helper/data.helper";
import { request } from "../../helper/request.helper";
import { ErrorResponse, ErrorStatusCode } from "../../helper/response.helper";

export const emptyCookieToken = async (method: string, path: string) => {
  // @ts-ignore
  const middlewareRequest = await request[method](path);

  expect(middlewareRequest.res.statusCode).toBe(ErrorStatusCode("BP", 11));
  expect(middlewareRequest.body).toStrictEqual(
    ErrorResponse(middlewareRequest, "BP", 11)
  );
};

export const emptyAccessToken = async (method: string, path: string) => {
  // @ts-ignore
  const middlewareRequest = await request[method](path).set("Cookie", [
    "accessToken=",
  ]);

  expect(middlewareRequest.res.statusCode).toBe(ErrorStatusCode("BP", 11));
  expect(middlewareRequest.body).toStrictEqual(
    ErrorResponse(middlewareRequest, "BP", 11)
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

  expect(middlewareRequest.res.statusCode).toBe(ErrorStatusCode("BP", 11));
  expect(middlewareRequest.body).toStrictEqual(
    ErrorResponse(middlewareRequest, "BP", 11)
  );
};

export const accessTokenExpired = async (method: string, path: string) => {
  const newUser = new UserModel(userData);

  const accessToken = sign({ id: "NA" }, ACCESS_TOKEN_SECRET as string, {
    expiresIn: "-1m",
  });

  const accessTokenEncrypt = generateEncryption(accessToken);

  const newToken = new TokenModel({
    _id: newUser._id,
    tokens: [
      {
        refreshToken: "abc",
        accessToken: accessTokenEncrypt,
      },
    ],
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
