const { Module } = require("module");

class User {
  constructor(id, name, email, income) {
    this.name = name;
    this.email = email;
    this.income = income;
    this.id = id;
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getIncome() {
    return this.income;
  }
  getId() {
    return this.id;
  }
}

module.exports = User;
