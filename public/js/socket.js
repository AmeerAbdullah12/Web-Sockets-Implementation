// socket.js — owns the Socket.IO connection and exposes callbacks.
// It never touches the DOM directly; callers pass in handler functions.

const socket = io();

// Call this once from main.js to register what happens on incoming events
export function registerHandlers({ onMessage }) {
    socket.on('server:message', (data) => {
        onMessage(data);
    });
}

// Send a chat message to the server
export function sendMessage(text) {
    socket.emit('own:message', text);
}