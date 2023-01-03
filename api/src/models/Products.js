const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.STRING,
      },
      summary: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.STRING,
      },
      idBranch: {
        type: DataTypes.INTEGER,
      },
      idCategory: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
