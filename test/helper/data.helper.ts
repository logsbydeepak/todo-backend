export const token: any = {
  tokenValue: {},

  get getValue() {
    return this.tokenValue;
  },

  set setValue(token: any) {
    this.tokenValue = token;
  },
};

export const userData = {
  name: "Test User",
  email: "test@todo.com",
  password: "123456A1!a",
};

export const resetUserData = () => {
  userData.name = "Test User";
  userData.email = "test@todo.com";
  userData.password = "123456A1!a";
};

export const todoData = {
  task: "task 1",
  status: true,
};
