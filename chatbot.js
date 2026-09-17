document.addEventListener("DOMContentLoaded", () => {

  const chatbot = document.getElementById("relmun-chatbot");

  if (!chatbot) return;

  chatbot.innerHTML = `
    <button class="relmun-chat-button" id="relmunChatButton">
      ✦ ASK RELMUN
    </button>

    <div class="relmun-chat-window" id="relmunChatWindow">

      <div class="relmun-chat-header">
        <div>
          <strong>RELMUN AI</strong>
          <span>YOUR CONFERENCE ASSISTANT</span>
        </div>

        <button id="relmunChatClose">×</button>
      </div>

      <div class="relmun-chat-messages" id="relmunChatMessages">

        <div class="relmun-message bot">
          Hey! I'm RELMUN AI. 👋<br><br>
          Ask me anything about RELMUN '26, committees,
          the conference, registration, or the organising team.
        </div>

      </div>

      <form class="relmun-chat-input" id="relmunChatForm">

        <input
          type="text"
          id="relmunChatInput"
          placeholder="Ask RELMUN..."
          autocomplete="off"
          required
        >

        <button type="submit">
          ↑
        </button>

      </form>

    </div>
  `;


  const openButton =
    document.getElementById("relmunChatButton");

  const closeButton =
    document.getElementById("relmunChatClose");

  const windowBox =
    document.getElementById("relmunChatWindow");

  const form =
    document.getElementById("relmunChatForm");

  const input =
    document.getElementById("relmunChatInput");

  const messages =
    document.getElementById("relmunChatMessages");


  openButton.addEventListener("click", () => {

    windowBox.classList.add("open");

    input.focus();

  });


  closeButton.addEventListener("click", () => {

    windowBox.classList.remove("open");

  });


  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const message = input.value.trim();

    if (!message) return;


    addMessage(message, "user");

    input.value = "";

    const typing =
      addMessage("Thinking...", "bot typing");


    try {

      const response =
        await fetch("/api/chat", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            message: message
          })

        });


      const data =
        await response.json();


      typing.remove();


      if (!response.ok) {

        throw new Error(
          data.error || "Something went wrong."
        );

      }


      addMessage(
        data.reply,
        "bot"
      );


    } catch (error) {

      console.error(error);

      typing.remove();

      addMessage(
        "Sorry, I'm having trouble connecting right now. Please try again.",
        "bot"
      );

    }

  });


  function addMessage(text, type) {

    const messageElement =
      document.createElement("div");

    messageElement.className =
      `relmun-message ${type}`;

    messageElement.textContent = text;

    messages.appendChild(messageElement);

    messages.scrollTop =
      messages.scrollHeight;

    return messageElement;

  }

});
