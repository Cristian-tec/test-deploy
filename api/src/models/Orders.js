const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("orders", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      default: DataTypes.NOW,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
