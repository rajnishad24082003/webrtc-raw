const express = require("express");
const route = express.Router();
const control = require("../controllers/control");

route.get("/", control.getHome);
route.get("/sign", control.getSign);
route.post("/signin", control.signIn);
route.post("/signup", control.signUp);
route.use(control.get404);

module.exports = route;
