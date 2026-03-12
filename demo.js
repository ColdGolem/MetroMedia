// ==============================
// MetroPulse Demo Chat Simulator
// ==============================

const demoMessages = [
    "Anyone getting down at Karol Bagh?",
    "Blue line delayed today",
    "Too crowded near the door",
    "Rajiv Chowk insane rush",
    "Next train maybe empty",
    "Someone dropped a bottle here",
    "Train empty after Mandi House",
    "Door side space available",
    "Which station is next?",
    "Coach near gate less crowded"
];

// Add a new random message to the chat box
function randomMessage() {
    const chat = document.getElementById("chatBox");
    if (!chat) return;  // safety check

    const seat = Math.floor(Math.random() * 60) + 1; // seat number 1-60
    const msg = demoMessages[Math.floor(Math.random() * demoMessages.length)];

    const p = document.createElement("p");
    p.textContent = "Seat " + seat + ": " + msg;

    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight; // auto-scroll
}

// Start demo messages every 7 seconds
setInterval(randomMessage, 7000);