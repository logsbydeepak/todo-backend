import errorData from "../../src/response/data/error.data.json";
import successData from "../../src/response/data/success.data.json";

export const SuccessResponse = (
  request: any,
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

  const { request: req } = request;

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

export const ErrorResponse = (
  request: any,
  messageTypeCode: string,
  messageCode: number,
  data?: object
) => {
  const responseData = errorData.find(
    (data: any) => data.messageTypeCode === messageTypeCode
  )!;

  const responseMessage = responseData.response.find(
    (data) => data.messageCode === messageCode
  )!;

  const { request: req } = request;

  return {
    url: req.protocol + "//" + req.host + req.req.path,
    method: req.method,
    responseType: "ERROR",
    responseCode: `ER${messageTypeCode + messageCode}`,
    statusCode: responseMessage.statusCode,
    message: responseMessage.message,
    data: data ?? null,
  };
};

export const ErrorStatusCode = (
  messageTypeCode: string,
  messageCode: number
) => {
  const responseData = errorData.find(
    (data: any) => data.messageTypeCode === messageTypeCode
  )!;

  const responseMessage = responseData.response.find(
    (data) => data.messageCode === messageCode
  )!;
  return responseMessage.statusCode;
};

export const SuccessStatusCode = (
  messageTypeCode: string,
  messageCode: number
) => {
  const responseData = successData.find(
    (data: any) => data.messageTypeCode === messageTypeCode
  )!;

  const responseMessage = responseData.response.find(
    (data) => data.messageCode === messageCode
  )!;
  return responseMessage.statusCode;
};
