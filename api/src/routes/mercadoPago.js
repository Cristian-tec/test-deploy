const { Router } = require("express");
const router = Router();
const { createPayment } = require("../controllers/payment_Controller");

router.post("/", createPayment);

module.exports = router;
