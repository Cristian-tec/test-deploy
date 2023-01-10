const { Router } = require("express");
const router = Router();
const {
  getAllUserFavs,
  addToFavs,
  deleteFromFavs,
} = require("../controllers/favorite_controllers");

router.get("/", (req, res) => {
  res.send("You should provide a user");
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(401).send("There is missing data");
    }

    const favs = await getAllUserFavs(userId);
    res.status(200).send(favs);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      res.status(401).send("There is missing data");
    }
    const newFav = await addToFavs(userId, productId);
    res.status(200).send(newFav);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { userId, productId } = req.query;

    if (!userId || !productId) {
      res.status(401).send("There is missing data");
    }

    const deletedRow = await deleteFromFavs(userId, productId);
    res.sendStatus(200);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
