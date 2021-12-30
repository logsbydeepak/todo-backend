import { checkAccessToken } from "@tt-router/middleware";
import {
  deleteTodoSuccessfully,
  deleteTodoWithDifferentData,
} from "@tt-request/router/todo";

export const deleteTodoTest = () => {
  checkAccessToken("delete", "/v1/todo");

  test("id query is not provided", () =>
    deleteTodoWithDifferentData("", "QP", 11));

  test("id query is empty", () =>
    deleteTodoWithDifferentData("?id=", "QP", 11));

  test("wrong id query", () =>
    deleteTodoWithDifferentData("?id=abc", "IS", 10));

  test("delte todo successfully", () => deleteTodoSuccessfully());
};
