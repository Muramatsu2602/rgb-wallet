import express from "express";
// import routes from './routes';

const server = express();

server.listen(3333, () => {
  console.log("Server started!");
});
