const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Category = require("./category");
const User = require("./User");

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    price: {
      type: DataTypes.DOUBLE(10, 2),
      allowsNull: false,
      validate: {
        isDecimal: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'category'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'user'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "transaction",
  }
);

Transaction.belongsTo(Category, {
  foreignKey: 'category_id'
});
Transaction.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = Transaction;
