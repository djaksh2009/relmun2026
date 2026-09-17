document.addEventListener("DOMContentLoaded", () => {

  const root = document.getElementById("relmun-chatbot");

  if (!root) return;

  root.innerHTML = `

    <button class="relmun-chat-button" id="relmunChatButton">
      <span>✦</span>
      ASK RELMUN
    </button>

    <div class="relmun-chat-window" id="relmunChatWindow">

      <div class="relmun-chat-header">

        <div>
          <strong>ASK RELMUN</strong>
          <span>RELMUN '26 AI ASSISTANT</span>
        </div>

        <button id="relmunChatClose">×</button>

      </div>

      <div class="relmun-chat-messages" id="relmunChatMessages">

        <div class="relmun-message bot">
          Hey! I’m ASK RELMUN. 👋<br><br>
          Ask me anything about RELMUN '26, the committees,
          registration, or the conference.
        </div>

      </div>

      <form class="relmun-chat-input" id="relmunChatForm">

        <input
          id="relmunChatInput"
          type="text"
          placeholder="Ask about RELMUN..."
          autocomplete="off"
        >

        <button type="submit">
          ↑
        </button>

      </form>

    </div>

  `;


  const button =
    document.getElementById("relmunChatButton");

  const windowBox =
    document.getElementById("relmunChatWindow");

  const close =
    document.getElementById("relmunChatClose");

  const form =
    document.getElementById("relmunChatForm");

  const input =
    document.getElementById("relmunChatInput");

  const messagesBox =
    document.getElementById("relmunChatMessages");


  let conversation = [];


  button.addEventListener("click", () => {

    windowBox.classList.add("open");

    input.focus();

  });


  close.addEventListener("click", () => {

    windowBox.classList.remove("open");

  });


  function addMessage(text, type) {

    const message =
      document.createElement("div");

    message.className =
      `relmun-message ${type}`;

    message.textContent = text;

    messagesBox.appendChild(message);

    messagesBox.scrollTop =
      messagesBox.scrollHeight;

  }


  function addTyping() {

    const typing =
      document.createElement("div");

    typing.className =
      "relmun-message bot typing";

    typing.id =
      "relmunTyping";

    typing.textContent =
      "Thinking...";

    messagesBox.appendChild(typing);

    messagesBox.scrollTop =
      messagesBox.scrollHeight;

  }


  function removeTyping() {

    const typing =
      document.getElementById("relmunTyping");

    if (typing) typing.remove();

  }


  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const text =
      input.value.trim();

    if (!text) return;


    addMessage(text, "user");

    input.value = "";

    conversation.push({
      role: "user",
      content: text
    });


    addTyping();


    try {

      const response =
        await fetch("/api/chat", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            messages: conversation
          })

        });


      const data =
        await response.json();


      removeTyping();


      if (!response.ok) {

        console.error("Chatbot error:", data);

        throw new Error(
          data.error || "Request failed"
        );

      }


      const reply =
        data.reply || "I couldn't answer that.";


      addMessage(reply, "bot");


      conversation.push({
        role: "assistant",
        content: reply
      });


    } catch (error) {

      removeTyping();

      console.error(error);

      addMessage(
        "Sorry, I'm having trouble connecting right now. Please try again.",
        "bot"
      );

    }

  });

});
