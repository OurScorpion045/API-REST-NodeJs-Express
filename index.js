import express from "express";
import http from "node:http";

const app = express();

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("Server listening on port 3000");
})