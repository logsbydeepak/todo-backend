import { TodoModel } from "@model";
import { TodoModelType } from "@types";
import { ErrorObject } from "@response";

export const dbReadTodo = async (todoId: string, userId: string) => {
  const dbTodo: TodoModelType | null = await TodoModel.findById(todoId);

  if (!dbTodo) {
    throw ErrorObject("BP", 10);
  }

  if (dbTodo.owner.toString() !== userId) {
    throw ErrorObject("AU", 10);
  }
  return dbTodo;
};
