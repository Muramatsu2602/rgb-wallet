import express from "express";
require("./database/mongoose");
import bodyParser from "body-parser";
import UserController from "./controllers/UsersController";

var cors = require("cors");

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post("/", UserController.login);
server.post("/admin", UserController.createUser);
server.post("/searchUser", UserController.getUser);
server.get("/allUsers", UserController.getUsers);
server.post("/deleteUser", UserController.deleteUser);
server.post("/updateUser", UserController.updateUser);
server.post("/addCred",UserController.addCred);
server.get("/eraseCred",UserController.eraseCred)

// EXTRA FEATURES
server.post("/updateProfilePic",UserController.updateProfilePic);
server.post("/declareExpense", UserController.declareExpense);

// Starting server
server.listen(3003, () => {
  console.log("App listening on 3003");
});
