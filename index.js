import http from "http";
import { Server } from "socket.io";
import path from "node:path";
import express from "express";
async function main() {
  const PORT = process.env.PORT ?? 3000;
  const app = express();
  app.use(express.static(path.resolve("./public")));


  const server = http.createServer(app);
  const io = new Server();

  io.attach(server);

  server.listen(PORT, () => {
    console.log("Server is listening on port ", PORT);
  });
}

main();
