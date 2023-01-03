const { Products, Categories } = require("../db");
const { API_Key } = process.env;
const api_products = require("../data/data.json");

const loadCategories = async () => {
  const cat = [];

  for (const [clave, valor] of Object.entries(api_products)) {
    cat.push({ name: clave });
  }
  await Categories.bulkCreate(cat);

  return cat;
};

const getAllCategories = async () => {
  const categories = await Categories.findAll({ attributes: ["id", "name"] });
  return categories;
};

module.exports = { loadCategories, getAllCategories };
