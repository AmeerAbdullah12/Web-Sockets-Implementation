

export function setupSockets(io) {
    io.on("connection", (socket) => {
        console.log("A new socket connected:", socket.id);

        socket.on("own:message", (data) => {
            console.log(`Message from ${socket.id}:`, data);
            socket.broadcast.emit("server:message", data);
        });
 
        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
}