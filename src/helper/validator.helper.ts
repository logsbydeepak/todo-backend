import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import { ErrorObject } from "@response";
import { BodyDataType } from "@types";

export const validateBody = (
  bodyData: BodyDataType,
  bodyDataCount: number
): BodyDataType => {
  if (bodyData.length >= 0) {
    throw ErrorObject("BP", 10);
  }

  const bodyDataLength: number = Object.keys(bodyData).length;
  if (bodyDataLength !== bodyDataCount) {
    throw ErrorObject("BP", 11);
  }

  return bodyData;
};

export const validateEmpty = (
  rawData: string,
  messageTypeCode: string,
  messageCode: number
): string => {
  if (!rawData) {
    throw ErrorObject(messageTypeCode, messageCode);
  }
  return rawData.trim();
};

export const validateEmail = (email: string): string => {
  if (!email) {
    throw ErrorObject("BP", 14);
  }

  email = email.trim().toLowerCase();
  if (!isEmail(email)) {
    throw ErrorObject("BP", 15);
  }

  return email;
};

export const validatePassword = (password: string): string => {
  if (!password) {
    throw ErrorObject("BP", 16);
  }

  password = password.trim();
  if (!isStrongPassword(password)) {
    throw ErrorObject("BP", 17);
  }

  return password;
};

export const validateTask = (rawData: boolean): boolean => {
  if (typeof rawData === "boolean") {
    return rawData;
  }

  if (!rawData) {
    throw ErrorObject("BP", 23);
  }

  throw ErrorObject("BP", 24);
};
