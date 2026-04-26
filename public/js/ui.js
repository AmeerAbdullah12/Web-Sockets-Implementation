const messagesContainer = document.getElementById('messagesContainer');

// Renders a chat bubble. type is 'own' | 'other' | 'system'
export function renderMessage(text, type) {
    const el = document.createElement('div');
    el.className = `message ${type}`;
    el.textContent = text;
    messagesContainer.appendChild(el);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Reads and clears the input, returns the trimmed value (or null if empty)
export function consumeInput() {
    const messageInput = document.getElementById('messageInput');
    const value = messageInput.value.trim();
    if (!value) return null;
    messageInput.value = '';
    messageInput.focus();
    return value;
}

export function joiningMessage(whoJoined){
    console.log(whoJoined);
    
    // Show standard chat type which says whoJoined the chat
    const el = document.createElement('div');
    el.className = `message system`;
    el.textContent = whoJoined;
    messagesContainer.appendChild(el);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
// Tracks who is currently typing: Set<username>
const typingUsers = new Set();
let typingEl = null;

function getTypingEl() {
    if (!typingEl) {
        typingEl = document.createElement('div');
        typingEl.className = 'typing-indicator';
        messagesContainer.appendChild(typingEl);
    }
    return typingEl;
}

export function addTypingUser(username) {
    typingUsers.add(username);
    renderTyping();
}

export function removeTypingUser(username) {
    typingUsers.delete(username);
    renderTyping();
}

function renderTyping() {
    const el = getTypingEl();
    if (typingUsers.size === 0) {
        el.textContent = '';
        return;
    }
    const names = [...typingUsers].join(', ');
    el.textContent = typingUsers.size === 1
        ? `${names} is typing...`
        : `${names} are typing...`;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}