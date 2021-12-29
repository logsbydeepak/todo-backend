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
