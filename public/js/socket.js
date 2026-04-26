// socket.js — owns the Socket.IO connection and exposes callbacks.
// It never touches the DOM directly; callers pass in handler functions.

const socket = io();

// Call this once from main.js to register what happens on incoming events
export function registerHandlers({ onMessage, onJoining, onTypingStart, onTypingStop, onUserList }) {
    socket.on('server:message', (data) => {
        onMessage(data);
    });

    socket.on('chat:system', (whoJoined)=>{
        onJoining(whoJoined);

    })
    socket.on('typing:start', (username) => onTypingStart(username));
    socket.on('typing:stop', (username) => onTypingStop(username));
    socket.on('user:list', (users) => {
        onUserList(users);
    });
}

// Send a chat message to the server
export function sendMessage(text) {
    socket.emit('own:message', text);
}

export function join(username) {
    socket.emit('user:join', username);
}
export function emitTypingStart() {
    socket.emit('typing:start');
}

export function emitTypingStop() {
    socket.emit('typing:stop');
}