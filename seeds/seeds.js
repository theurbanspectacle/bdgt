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
  const development = process.env.DEVELOPMENT;
  console.log(process.env.DEVELOPMENT ? 'Seeding database for development' : 'Seeding database for production');

  (development ? User.create({
    first_name: 'Admin',
    last_name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
  }) : Promise.resolve()).then(() => {
    const promises = [];
    income.forEach(item => {
      promises.push(Category.create({
        type: 'income',
        name: item
      }));
    });
    
    expense.forEach(item => {
      promises.push(Category.create({
        type: 'expense',
        name: item
      }));
    });

    return Promise.all(promises).then(() => {
      if (development) {
        const transactionPromises = [
          Transaction.create({price: 123.55, user_id: 1, category_id: 1}),
          Transaction.create({price: 134.34, user_id: 1, category_id: 4}),
          Transaction.create({price: 134.34, user_id: 1, category_id: 6}),
          Transaction.create({price: 4.34, user_id: 1, category_id: 8}),
        ];

        Promise.all(transactionPromises).then(() => {  
          console.log('Seed completed');
        });      
      } else {
        console.log('Seed completed');
      }
    });
  });
}).catch(error => {
  console.error('Unable to set up Sequelize', error);
});

