import { Request, Response } from "express";

import errorData from "./data/error.data.json";
import successData from "./data/success.data.json";
import { templateResponse } from "./template.response";

export const ThrowError = (
  messageTypeCode: string,
  messageCode: number,
  data?: object
) => ({
  ThrowError: {
    messageTypeCode,
    messageCode,
    data,
  },
});

export const ErrorResponse = (
  req: Request,
  res: Response,
  messageTypeCode: string,
  messageCode: number,
  data?: object
): void => {
  const responseData = errorData.find(
    (data: any) => data.messageTypeCode === messageTypeCode
  )!;

  const responseMessage = responseData.response.find(
    (data) => data.messageCode === messageCode
  )!;

  templateResponse(
    req,
    res,
    "ERROR",
    responseData.messageTypeCode,
    responseMessage.messageCode,
    responseMessage.message,
    responseMessage.statusCode,
    data
  );
};

export const SuccessResponse = (
  req: Request,
  res: Response,
  messageTypeCode: string,
  messageCode: number,
  data?: object
) => {
  const responseData = successData.find(
    (data: any) => data.messageTypeCode === messageTypeCode
  )!;

  const responseMessage = responseData.response.find(
    (data) => data.messageCode === messageCode
  )!;

  templateResponse(
    req,
    res,
    "SUCCESS",
    responseData.messageTypeCode,
    responseMessage.messageCode,
    responseMessage.message,
    responseMessage.statusCode,
    data
  );
};
