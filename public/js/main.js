
import { registerHandlers, sendMessage } from './socket.js';
import { renderMessage, consumeInput } from './ui.js';

// --- Wire socket events to UI ---
registerHandlers({
    onMessage: (data) => renderMessage(data, 'other'),
});

// --- Wire UI interactions to socket ---
function handleSend() {
    const text = consumeInput();
    if (!text) return;

    renderMessage(text, 'own');   // show immediately (optimistic)
    sendMessage(text);            // emit to server
}

document.getElementById('sendButton').addEventListener('click', handleSend);

document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});