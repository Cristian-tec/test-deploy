const { Router } = require("express");
const router = Router();
const { createOrder } = require("../controllers/orders_controllers");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    console.log(await createOrder(req.body));
    res.send(req.body);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
