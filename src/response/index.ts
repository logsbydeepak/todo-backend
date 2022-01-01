import { ErrorObjectType } from "@types";
import { Response } from "express";

import errorData from "./data/error.data.json";

export const ErrorObject = (
  messageTypeCode: string,
  messageCode: number
): ErrorObjectType => ({
  ErrorObject: {
    messageTypeCode,
    messageCode,
  },
});

export const ErrorResponse = (
  res: Response,
  messageTypeCode: string,
  messageCode: number
): void => {
  const responseData = errorData.find(
    (data: any) => data.messageTypeCode === messageTypeCode
  )!;

  const responseMessage = responseData.response.find(
    (data) => data.messageCode === messageCode
  )!;
  res.send({
    error: {
      title: responseData.messageType,
      message: responseMessage.message,
      statusCode: responseMessage.statusCode,
    },
  });
};

export const SuccessResponse = (
  res: Response,
  status: number,
  data: object
) => {
  res.statusCode = status;
  res.send({
    data: {
      ...data,
    },
  });
};
