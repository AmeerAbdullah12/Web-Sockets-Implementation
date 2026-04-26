export function setupSockets(io) {
  const users = new Map();
  io.on("connection", (socket) => {
    console.log("A new socket connected:", socket.id);
    socket.on("user:join", (username) => {
      users.set(socket.id, username);
      io.emit("user:list", [...users.values()]);
      socket.broadcast.emit("chat:system", `${username} joined the chat`);
    });
    socket.on("own:message", (data) => {
      const username = users.get(socket.id) ?? "Anonymous";
      socket.broadcast.emit("server:message", data);
    });
    socket.on("typing:start", () => {
      const username = users.get(socket.id);
      socket.broadcast.emit("typing:start", username);
    });

    socket.on("typing:stop", () => {
      const username = users.get(socket.id);
      socket.broadcast.emit("typing:stop", username);
    });
    socket.on("disconnect", () => {
      socket.broadcast.emit(
        "chat:system",
        `${users.get(socket.id)} left the chat`,
      );
      console.log("Socket disconnected:", socket.id);
    });
  });
}
