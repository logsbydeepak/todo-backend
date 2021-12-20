import { Request, Response } from "express";
import errorData from "../../src/response/data/error.data.json";
import successData from "../../src/response/data/success.data.json";

export const SuccessResponse = (
  req: any,
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

  return {
    url: req.protocol + "//" + req.host + req.req.path,
    method: req.method,
    responseType: "SUCCESS",
    responseCode: `SU${messageTypeCode + messageCode}`,
    statusCode: responseMessage.statusCode,
    message: responseMessage.message,
    data: data ?? null,
  };
};
