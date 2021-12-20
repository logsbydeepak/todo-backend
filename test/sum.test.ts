const sum = (a: number, b: number) => {
  return a + b;
};

test("adds 1 + 2 to equal 3", () => {
  const result = sum(1, 3);
  expect(result).toBe(4);
});
