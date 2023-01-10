const { Favorites, Products } = require("../db");

const getAllUserFavs = async (userId) => {
  try {
    const favs = await Favorites.findAll({ where: { userId } });

    let products = [];

    for (const fav of favs) {
      const p = await Products.findOne({ where: { id: fav.productId } });
      products.push(p);
    }
    return products;
  } catch (error) {
    return error.message;
  }
};

const addToFavs = async (userId, productId) => {
  try {
    const favs = await Favorites.findAll({ where: { userId, productId } });
    if (favs.length === 0) {
      const newFav = await Favorites.create({ userId, productId });
      return newFav;
    } else {
      return "already exists";
    }
  } catch (error) {
    return error.message;
  }
};

const deleteFromFavs = async (userId, productId) => {
  try {
    const deletedFav = await Favorites.destroy({
      where: { userId, productId },
    });
    return deletedFav;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getAllUserFavs, addToFavs, deleteFromFavs };
