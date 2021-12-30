import { todoData } from "@tt-helper/data";
import { checkAccessToken } from "@tt-router/middleware";
import {
  createTodoSuccessfully,
  createTodoWithDifferentData,
} from "@tt-request/router/todo";

export const createTodoTest = () => {
  const { task, status } = todoData;
  const extra = "value";
  checkAccessToken("post", "/v1/todo");

  // body
  test("send arrary insted of object", () =>
    createTodoWithDifferentData([], "BP", 11));

  test("send data inside arrary", () =>
    createTodoWithDifferentData([todoData], "BP", 11));

  test("send empty object", () => createTodoWithDifferentData({}, "BP", 10));

  // task
  test("task property missing", () =>
    createTodoWithDifferentData({ task, extra }, "BP", 11));

  test("task propery is empty", () =>
    createTodoWithDifferentData({ task: "", status }, "BP", 11));

  // status
  test("status property missing", () =>
    createTodoWithDifferentData({ status, extra }, "BP", 11));

  test("status propery is empty", () =>
    createTodoWithDifferentData({ status: "", task }, "BP", 11));

  test("status propery with wrong data", () =>
    createTodoWithDifferentData({ status: "abc", task }, "BP", 11));

  // successfully
  test("create todo successfully", () => createTodoSuccessfully(todoData));
};
