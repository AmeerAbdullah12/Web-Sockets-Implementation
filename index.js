import http from "http";
import express from "express";
import path from "node:path";
import { Server } from "socket.io";
import { setupSockets } from "./src/socketHandlers.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.resolve("./public")));

const server = http.createServer(app);
const io = new Server();
io.attach(server);

setupSockets(io);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});