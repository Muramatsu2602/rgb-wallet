import express from 'express';
require("./database/mongoose");
import bodyParser from 'body-parser';
import UserController from './controllers/UsersController';
import cors from 'cors';
import auth from './middlewares/auth';

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.post('/login', UserController.login);
server.post('/user', UserController.createUser);
server.get('/test', auth, UserController.testRoute);

server.listen(3003, () => {
  console.log("Server running on 3003!");
})