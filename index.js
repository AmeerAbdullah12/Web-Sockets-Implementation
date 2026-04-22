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

  io.on("connection", (socket)=>{
    console.log("A new socket has connected", socket.id);
    socket.on('own:message', (data)=>{
        console.log("Message from Socket :", data);
        socket.broadcast.emit('server:message', data);
    })
  })

  server.listen(PORT, () => {
    console.log("Server is listening on port ", PORT);
  });
}

main();
