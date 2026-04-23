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
    // Show standard chat type which says whoJoined the chat
    const el = document.createElement('div');
    el.className = `message system`;
    el.textContent = whoJoined;
    messagesContainer.appendChild(el);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}