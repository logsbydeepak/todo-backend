import { raw, Request, Response } from "express";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import { ErrorResponse } from "../response";

export const validateBody = (
  req: Request,
  res: Response,
  bodyData: any,
  bodyDataCount: number
) => {
  if (bodyData.length === 0) {
    return ErrorResponse(req, res, "BP", 10);
  }

  const bodyDatalength = Object.keys(bodyData).length;

  if (bodyDatalength !== bodyDataCount) {
    return ErrorResponse(req, res, "BP", 10);
  }

  return bodyData;
};

export const validateGeneral = (
  req: Request,
  res: Response,
  rawData: string
) => {
  if (!rawData) {
    return ErrorResponse(req, res, "BP", 10);
  }

  rawData = rawData.trim();

  return rawData;
};

export const validateEmail = (req: Request, res: Response, email: string) => {
  if (!email) {
    return ErrorResponse(req, res, "BP", 10);
  }

  email = email.trim().toLowerCase();

  if (!isEmail(email)) {
    return ErrorResponse(req, res, "BP", 10);
  }

  return email;
};

export const validatePassword = (
  req: Request,
  res: Response,
  password: string
) => {
  if (!password) {
    return ErrorResponse(req, res, "BP", 10);
  }

  password = password.trim();

  if (!isStrongPassword(password)) {
    return ErrorResponse(req, res, "BP", 10);
  }

  return password;
};

export const validateTask = (req: Request, res: Response, rawData: boolean) => {
  if (rawData === true || rawData === false) {
    return rawData;
  }

  return ErrorResponse(req, res, "BP", 10);
};
