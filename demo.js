// ==== Variables ====
const cities = {
  delhi: ["Blue", "Yellow", "Red", "Violet", "Pink"],
  bangalore: ["Purple", "Green", "Yellow"],
  mumbai: ["Red", "Blue", "Green"],
  kolkata: ["Blue", "Green", "Red"],
  pune: ["Purple", "Orange"]
};

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const citySelect = document.getElementById("citySelect");
const lineSelect = document.getElementById("lineSelect");
const statusInput = document.getElementById("statusInput");
const proceedBtn = document.getElementById("proceedBtn");

const chatContainer = document.getElementById("chatContainer");
const messagesDiv = document.getElementById("messages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

const accessOverlay = document.getElementById("accessOverlay");
const payBtn = document.getElementById("payBtn");
const watchAdBtn = document.getElementById("watchAdBtn");

const shareBtn = document.getElementById("shareBtn");

let currentUser = { paid: false, freeTimer: 0 };
let timerInterval;
let selectedCity, selectedLine;

// ==== Populate lines based on city ====
function updateLines() {
  const lines = cities[citySelect.value] || [];
  lineSelect.innerHTML = "";
  lines.forEach(line => {
    const option = document.createElement("option");
    option.value = line.toLowerCase();
    option.textContent = line;
    lineSelect.appendChild(option);
  });
}

// ==== Page 1 → Page 2 flow ====
proceedBtn.addEventListener("click", () => {
  selectedCity = citySelect.value;
  selectedLine = lineSelect.value;
  if (!selectedLine) return alert("Select a line!");
  page1.classList.remove("active");
  page2.classList.add("active");

  // Initially show overlay
  showOverlay();
});

// ==== Overlay Logic ====
function showOverlay() {
  chatContainer.classList.add("blurred");
  accessOverlay.style.display = "flex";
  sendBtn.disabled = true;
}

// Paid user click
payBtn.addEventListener("click", () => {
  currentUser.paid = true;
  clearInterval(timerInterval);
  accessOverlay.style.display = "none";
  chatContainer.classList.remove("blurred");
  sendBtn.disabled = false;
});

// Free user click → simulate interstitial ad
watchAdBtn.addEventListener("click", () => {
  // Show fake interstitial ad
  alert("Watch ad here (simulate interstitial)"); // replace with real ad logic
  startFreeTimer(10); // 10-min read-only
});

// ==== Free timer ====
function startFreeTimer(minutes) {
  currentUser.freeTimer = minutes * 60;
  accessOverlay.style.display = "none";
  chatContainer.classList.remove("blurred");
  sendBtn.disabled = true;

  timerInterval = setInterval(() => {
    currentUser.freeTimer--;
    if (currentUser.freeTimer <= 0) {
      clearInterval(timerInterval);
      showOverlay();
    }
  }, 1000);
}

// ==== Chat send ====
sendBtn.addEventListener("click", () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  appendMessage("You", msg);
  chatInput.value = "";
  // TODO: send to backend / Telegram for live chat
});

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<b>${sender}:</b> ${text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ==== Share functions ====
const appLink = "https://your-pwa-url.vercel.app";

function shareX() {
  const text = encodeURIComponent("Check out MetroMedia chat PWA! 🚇 " + appLink);
  window.open(`https://x.com/intent/tweet?text=${text}`, "_blank");
}

function shareWA() {
  const text = encodeURIComponent("Check out MetroMedia chat PWA! 🚇 " + appLink);
  window.open(`https://wa.me/?text=${text}`, "_blank");
}

function copyLink() {
  navigator.clipboard.writeText(appLink)
    .then(() => alert("Link copied! Share it with friends 🚀"))
    .catch(() => alert("Copy failed. Try manually!"));
}

// ==== Initialize ====
updateLines();
citySelect.addEventListener("change", updateLines);