const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Purchase extends Model {}

Purchase.init(
  {
    price: {
      type: DataTypes.INTEGER,
      allowsNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowsNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Purchase",
  }
);

module.exports = Purchase;
