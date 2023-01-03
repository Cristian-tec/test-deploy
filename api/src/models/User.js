const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
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
        // allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        //unique: true,
        //allowNull: false,
      },
      picture: {
        type: DataTypes.TEXT,
      },
      password: {
        type: DataTypes.TEXT,
        //allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      localityId: {
        type: DataTypes.INTEGER,
      },
      address: {
        type: DataTypes.STRING,
      },
      userType: {
        type: DataTypes.STRING,
      },
      wallet: {
        type: DataTypes.INTEGER,
      },
      state: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
