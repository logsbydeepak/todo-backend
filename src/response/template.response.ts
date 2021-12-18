import { Request, Response } from "express";

export const templateResponse = (
  req: Request,
  res: Response,
  responseType: string,
  messageTypeCode: string,
  messageCode: number,
  message: string,
  statusCode: number,
  data?: object
) => {
  const responseCode = `${responseType === "ERROR" ? "ER" : "SU"}${
    messageTypeCode + messageCode
  }`;

  const url = req.protocol + "://" + req.get("host") + req.originalUrl;

  const method = req.method;

  res.status(statusCode);
  res.send({
    url,
    method,
    responseType,
    responseCode,
    statusCode,
    message,
    data: data ?? null,
  });
};
