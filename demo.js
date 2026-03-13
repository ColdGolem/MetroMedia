let currentLine = 'blue'; // default selected line
let userId = `user_${Date.now()}_${Math.floor(Math.random()*1000)}`; // unique per visitor
let isPaidUser = false;
let freeTimer = 10 * 60; // 10 min for free users in seconds

const lineSelect = document.getElementById('lineSelect');
const proceedBtn = document.getElementById('proceedBtn');
const accessDiv = document.getElementById('access');
const payBtn = document.getElementById('payBtn');
const adBtn = document.getElementById('adBtn');
const chatScreen = document.getElementById('chatScreen');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.disabled = true; // default disabled

// ---------------------------
// Helper functions
// ---------------------------
function updateChatUI(messages) {
  chatMessages.innerHTML = messages.map(m => `<div>${m.message}</div>`).join('');
}

async function fetchMessages() {
  const res = await fetch(`/api/fetch?line=${currentLine}`);
  const data = await res.json();
  updateChatUI(data.messages);
}

async function sendMessage() {
  const msg = messageInput.value.trim();
  if (!msg) return;

  const res = await fetch('/api/send', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({line: currentLine, message: msg, userId})
  });
  const data = await res.json();
  if (data.error) return alert(data.error);

  messageInput.value = '';
}

// Countdown display for free users
function updateFreeCountdown() {
  if (!isPaidUser && freeTimer > 0) {
    const min = Math.floor(freeTimer/60);
    const sec = freeTimer%60;
    sendBtn.innerText = `Read-only (${min}:${sec.toString().padStart(2,'0')})`;
  }
}

// ---------------------------
// Polling for real-time messages
// ---------------------------
setInterval(fetchMessages, 2000);

setInterval(() => {
  if (!isPaidUser && freeTimer > 0) freeTimer--;
  if (!isPaidUser && freeTimer <= 0) {
    alert('Free read-only session ended. Pay or watch ad to continue.');
    chatScreen.style.display = 'none';
    accessDiv.style.display = 'block';
  }
  updateFreeCountdown();
}, 1000);

// ---------------------------
// Event listeners
// ---------------------------
proceedBtn.addEventListener('click', () => {
  currentLine = lineSelect.value;
  accessDiv.style.display = 'block';
});

adBtn.addEventListener('click', async () => {
  // Free read-only session
  const res = await fetch(`/api/access?userId=${userId}&line=${currentLine}&type=free`);
  const data = await res.json();
  isPaidUser = false;
  freeTimer = data.expiresIn;
  accessDiv.style.display = 'none';
  chatScreen.style