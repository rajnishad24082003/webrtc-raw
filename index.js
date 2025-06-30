const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const route = require("./routes/route");

//middleware
dotenv.config();
server.use(bodyParser.json());
server.use(express.static("public"));
server.set("view engine", "ejs");
server.set("views", "view");
server.use(route);

server.listen(process.env.PORT, () => {
  console.log(`server is listening on port:${process.env.PORT}`);
});
