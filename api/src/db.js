require("dotenv").config();
const { Sequelize } = require("sequelize");

/* const tabla_Products = require('./models/Products')
const tabla_Orders = require('./models/Orders')
const tabla_User = require('./models/User')
const tabla_Localities = require('./models/Localities')
const tabla_Categories = require('./models/Categories')
const tabla_Branches = require('./models/Branches') */

const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { User, Localities, Branches, Products, Categories, Orders, Comment, Favorites } =
  sequelize.models;


Localities.belongsToMany(User, { through: "UserLocalities" });
User.belongsToMany(Localities, { through: "UserLocalities" });

Localities.belongsToMany(Branches, { through: "BranchesLocalities" });
Branches.belongsToMany(Localities, { through: "BranchesLocalities" });

Categories.belongsToMany(Products, { through: "ProductsCategories" });
Products.belongsToMany(Categories, { through: "ProductsCategories" });

User.belongsToMany(Products, { through: "ProductsUser" });
Products.belongsToMany(User, { through: "ProductsUser" });

Branches.belongsToMany(Orders, { through: "OrdersBranches" });
Orders.belongsToMany(Branches, { through: "OrdersBranches" });

Orders.belongsToMany(Products, { through: "OrderProduct" });
Products.belongsToMany(Orders, { through: "OrderProduct" });

Products.hasMany(Branches, { foreignKey: "stationId" });
Branches.belongsToMany(Products, { through: "ProductBranch" });

// Recordar que pide relacionar N:M
//Recipe.belongsToMany(Diet, { through: 'Recipe_Diet'})
//Diet.belongsToMany(Recipe, { through: 'Recipe_Diet'})

Orders.belongsToMany(Products, { through: "Order_Products" });
Products.belongsToMany(Orders, { through: "Order_Products" });

Products.belongsToMany(Branches, { through: "Products_Branch" });
Branches.belongsToMany(Products, { through: "Products_Branch" });

// Relaciones de Reviews
Products.belongsToMany(Comment, { through: "products_comments" });
Comment.belongsToMany(Products, { through: "products_comments" });

User.belongsToMany(Comment, { through: "users_comments" });
Comment.belongsToMany(User, { through: "users_comments" });

//Relaciones de Favoritos
User.belongsToMany(Favorites, { through: "users_favorites" });
Favorites.belongsToMany(User, { through: "users_favorites" });

Products.belongsToMany(Favorites, { through: "products_favorites" });
Favorites.belongsToMany(Products, { through: "products_favorites" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
