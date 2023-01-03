const { Router } = require("express");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getLocalities } = require("../controllers/localities_controller");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const a = await getLocalities();
    console.log(a);
    res.status(200).json(a);
  } catch (e) {
    return res.status(404).send("error");
  }
});

module.exports = router;
