document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("relmun-chatbot");

  if (!container) return;

  container.innerHTML = `
    <button id="chatbot-toggle" aria-label="Open ASK RELMUN">
      ✦ ASK RELMUN
    </button>

    <div id="chatbot-window">

      <div id="chatbot-header">
        <div>
          <strong>ASK RELMUN</strong>
          <span>RELMUN '26 AI ASSISTANT</span>
        </div>

        <button id="chatbot-close">×</button>
      </div>

      <div id="chatbot-messages">

        <div class="bot-message">
          Hey! I'm ASK RELMUN. 👋<br><br>
          Ask me anything about RELMUN '26, the committees, registration, or the conference.
        </div>

      </div>

      <div id="chatbot-input-area">

        <input
          id="chatbot-input"
          type="text"
          placeholder="Ask about RELMUN..."
          autocomplete="off"
        >

        <button id="chatbot-send">
          ↑
        </button>

      </div>

    </div>
  `;

  const toggle = document.getElementById("chatbot-toggle");
  const windowBox = document.getElementById("chatbot-window");
  const close = document.getElementById("chatbot-close");
  const input = document.getElementById("chatbot-input");
  const send = document.getElementById("chatbot-send");
  const messages = document.getElementById("chatbot-messages");

  toggle.addEventListener("click", () => {
    windowBox.classList.add("open");
    input.focus();
  });

  close.addEventListener("click", () => {
    windowBox.classList.remove("open");
  });

  function addMessage(text, type) {

    const message = document.createElement("div");

    message.className =
      type === "user"
        ? "user-message"
        : "bot-message";

    message.innerHTML = text;

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

    return message;
  }

  async function sendMessage() {

    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");

    input.value = "";

    send.disabled = true;

    const loading = addMessage(
      "Thinking...",
      "bot"
    );

    try {

      const response = await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: message
        })

      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      loading.innerHTML = data.reply;

    } catch (error) {

      console.error(error);

      loading.innerHTML =
        "Sorry, I'm having trouble connecting right now. Please try again.";

    } finally {

      send.disabled = false;
      input.focus();

    }
  }

  send.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
      sendMessage();
    }

  });

});
