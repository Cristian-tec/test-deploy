const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const categories = require("./routes/categories");
const products = require("./routes/products");
const branches = require("./routes/branches");
const localities = require("./routes/localities");
const mercadoPago = require("./routes/mercadoPago");
const orders = require("./routes/orders");
const user = require("./routes/user");

require("./db.js");

const server = express();
dotenv.config();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/categories", categories);
server.use("/products", products);
server.use("/branches", branches);
server.use("/localities", localities);
server.use("/payment", mercadoPago);
server.use("/orders", orders);
server.use("/user", user);

//server.use('/buyProduct', mercadoPago);
//server.use('/orders', orders);
// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
