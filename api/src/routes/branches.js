const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getBranches } = require("../controllers/branches_controller");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const a = await getBranches();
    console.log(a);
    res.status(200).json(a);
  } catch (e) {
    return res.status(404).send("error");
  }
});

module.exports = router;
