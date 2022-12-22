const { exportAllDeclaration } = require("@babel/types");
const User = require("../lib/login");
const login = require("../lib/login");

test("Can create a new User instance", () => {
  const a = new User();
  expect(typeof a).toBe("object");
});
