const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("branches", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    station: {
      type: DataTypes.INTEGER,
     // allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    //  allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
     // allowNull: false
    },
    localityId: {
      type: DataTypes.INTEGER,
     // allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
     // allowNull: false
    },
    gps: {
      type: DataTypes.STRING,
     // allowNull: false
    }
  });
};