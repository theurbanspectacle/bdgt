const User = require("../lib/User");

test("Can create a new User instance", () => {
  const a = new User();
  expect(typeof a).toBe("object");
});
