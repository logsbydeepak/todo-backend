import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import { ErrorObject } from "../response";
import { BodyDataType } from "../types/validator.types";

export const validateBody = (
  bodyData: BodyDataType,
  bodyDataCount: number
): BodyDataType => {
  if (bodyData.length === 0) {
    throw ErrorObject("BP", 10);
  }

  const bodyDatalength: number = Object.keys(bodyData).length;

  if (bodyDatalength !== bodyDataCount) {
    throw ErrorObject("BP", 10);
  }

  return bodyData;
};

export const validateGeneral = (rawData: string): string => {
  if (!rawData) {
    throw ErrorObject("BP", 10);
  }

  rawData = rawData.trim();

  return rawData;
};

export const validateEmail = (email: string): string => {
  if (!email) {
    throw ErrorObject("BP", 10);
  }

  email = email.trim().toLowerCase();

  if (!isEmail(email)) {
    throw ErrorObject("BP", 10);
  }

  return email;
};

export const validatePassword = (password: string): string => {
  if (!password) {
    throw ErrorObject("BP", 10);
  }

  password = password.trim();

  if (!isStrongPassword(password)) {
    throw ErrorObject("BP", 10);
  }

  return password;
};

export const validateTask = (rawData: boolean): boolean => {
  if (rawData === true || rawData === false) {
    return rawData;
  }

  throw ErrorObject("BP", 10);
};
