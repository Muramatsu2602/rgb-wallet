import express from "express";
require("./database/mongoose");
import bodyParser from "body-parser";
import UserController from "./controllers/UsersController";
import auth from "./middlewares/auth";

var cors = require("cors");

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post("/", UserController.login);
server.post("/admin", UserController.createUser); // we create an user at /admin

/**
 * Ela é só uma rota que o usuário precisa estar logado pra acessar
 */
server.get("/test", auth, UserController.testRoute); 

server.listen(3003, () => {
  console.log("App listening on 3003");
});
