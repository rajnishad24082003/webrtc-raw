const express = require("express");
const server = express();
const dotenv = require("dotenv");
const route = require("./routes/route");
const mongoose = require("mongoose");
const cors = require("./middleware//cors");

//security

//middleware
dotenv.config();
server.use(express.json());
server.use(express.static("public"));
server.set("view engine", "ejs");
server.set("views", "view");
server.use(route);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`server is listening on port:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
