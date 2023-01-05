const sequelize = require('../config/connection');
const Category = require('../lib/category');
const User = require('../lib/User');
const Transaction = require('../lib/transaction');

const income = [
  'Budget', 'Bonus', 'Paycheck', 'Other', 'Interest', 'Savings', 
];

const expense = [
  'Rent & Mortgage', 'Auto & Transport', 'Gas', 'Electricity', 'Utilities', 
  'Insurance', 'Internet', 'Subscriptions',
  'Gym', 'Water', 'Other'
];

sequelize.sync({force: true}).then(() => {
  income.forEach(item => {
    Category.create({
      type: 'income',
      name: item
    });
  });
  
  expense.forEach(item => {
    Category.create({
      type: 'expense',
      name: item
    });
  });
}).catch(error => {
  console.error('Unable to set up Sequelize', error);
});

