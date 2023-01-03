const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { searchProducts } = require("../controllers/products_controller");

const router = Router();

router.get("/", async (req, res) => {
  // Check for params in the query
  const { name, category, ingredient } = req.query;

  try {
    // Get all the products from the DB
    let products = await searchProducts();

    // Combine filters depending on the queries
    // Check if category exists
    if (category) {
      products = products.filter(
        (product) => product.idCategory == parseInt(category)
      );
    }

    // Check if ingredient exists
    if (ingredient) {
      products = products.filter((product) =>
        product.ingredients.toLowerCase().includes(ingredient.toLowerCase())
      );
    }

    // Check if name exists
    if (name) {
      // If it does, search from the DB, and return them
      products = products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Return all products after the filters
    return res.status(200).json(products);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (!isNaN(id) && !isNaN(parseInt(id))) {
      const products = await searchProducts();

      return res.json(
        products.filter((product) => parseInt(product.id) === parseInt(id))
      );
    }

    res.status(404).send("Not found with that ID");
  } catch (e) {
    res.status(401).send(e.message);
  }
});

module.exports = router;
