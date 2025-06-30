const express = require("express");
const route = express.Router();
const control = require("../controllers/control");

route.get("/", control.getHome);
route.use(control.get404);

module.exports = route;
