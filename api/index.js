// 888b     d888                888888b.
// 8888b   d8888                888  "88b
// 88888b.d88888                888  .88P
// 888Y88888P888  .d8888b       8888888K.  888  888 888d888  .d88b.   .d88b.  888d888
// 888 Y888P 888 d88P"          888  "Y88b 888  888 888P"   d88P"88b d8P  Y8b 888P"
// 888  Y8P  888 888            888    888 888  888 888     888  888 88888888 888
// 888   "   888 Y88b.          888   d88P Y88b 888 888     Y88b 888 Y8b.     888
// 888       888  "Y8888P       8888888P"   "Y88888 888      "Y88888  "Y8888  888
//                                                               888
//                                                          Y8b d88P
//                                                           "Y88P"
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { loadProducts } = require("./src/controllers/products_controller");
const { loadCategories } = require("./src/controllers/categories_controller");
const { loadLocalities } = require("./src/controllers/localities_controller");
const { loadBranches } = require("./src/controllers/branches_controller");
const { loadUser} = require('./src/controllers/user_controller')
require ('dotenv').config();
const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    await loadCategories();
    await loadProducts();
    await loadLocalities();
    await loadBranches();
    await loadUser();
    console.log("%s ----> listening at ", PORT); // eslint-disable-line no-console
  });
});
