
import { registerHandlers, sendMessage, join, emitTypingStart, emitTypingStop } from './socket.js';
import { renderMessage, consumeInput, joiningMessage, addTypingUser, removeTypingUser, renderUserList} from './ui.js';

// --- Wire socket events to UI ---
registerHandlers({
    onMessage: (data) => renderMessage(data, 'other'),
    onJoining: (whoJoined) => joiningMessage(whoJoined),
    onTypingStart:  (username) => addTypingUser(username),
    onTypingStop:   (username) => removeTypingUser(username),
    onUserList: (users) => renderUserList(users),
});


// --- Wire UI interactions to socket ---
function handleSend() {
    const text = consumeInput();
    if (!text) return;

    renderMessage(text, 'own');   // show immediately (optimistic)
    sendMessage(text);            // emit to server
}
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const joinButton = document.getElementById('joinButton');



sendButton.addEventListener('click', handleSend);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
joinButton.addEventListener('click', () => {
    const username = document.getElementById('usernameInput').value.trim();
    if (!username) return;

    join(username);  // emits user:join to server

    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('appContainer').style.display = 'flex';
});

// Typing indicator with debounce
let typingTimer = null;
let isTyping = false;

messageInput.addEventListener('input', () => {
    if (!isTyping) {
        emitTypingStart();
        isTyping = true;
    }
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        emitTypingStop();
        isTyping = false;
    }, 1000);
});