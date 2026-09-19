(() => {
  "use strict";

  const root = document.getElementById("relmun-chatbot");
  if (!root) return;

  /* =========================================================
     REX — RELMUN 2026 INFORMATION ASSISTANT
  ========================================================= */

  root.innerHTML = `
    <button
      type="button"
      id="rexOpen"
      class="rex-launcher"
      aria-label="Open REX"
      aria-expanded="false"
    >
      <span class="rex-launcher-star">✦</span>
      <span>REX</span>
    </button>

    <section
      id="rexWindow"
      class="rex-window"
      aria-hidden="true"
      aria-label="REX information assistant"
    >

      <div class="rex-header">
        <div class="rex-brand">
          <div class="rex-brand-main">
            <span class="rex-dot"></span>
            <strong>REX</strong>
          </div>

          <div class="rex-brand-sub">
            RELMUN 2026 INFORMATION ASSISTANT
          </div>
        </div>

        <button
          type="button"
          id="rexClose"
          class="rex-close"
          aria-label="Close REX"
        >
          ×
        </button>
      </div>

      <div class="rex-intro">
        <div class="rex-intro-number">01 / REX</div>

        <h2>
          Your questions.<br>
          <em>Answered.</em>
        </h2>

        <p>
          Hi. I'm REX, RELMUN 2026's information assistant.
          Ask me about the conference, committees, registration,
          the team, or officially announced information.
        </p>
      </div>

      <div
        id="rexMessages"
        class="rex-messages"
        aria-live="polite"
      >
        <div class="rex-message rex-bot">
          <div class="rex-message-label">REX</div>
          <div class="rex-message-text">
            How can I help you with RELMUN 2026?
          </div>
        </div>
      </div>

      <form id="rexForm" class="rex-form">

        <input
          id="rexInput"
          type="text"
          autocomplete="off"
          maxlength="1000"
          placeholder="Ask about RELMUN..."
          aria-label="Ask REX a question"
        />

        <button
          type="submit"
          class="rex-send"
          aria-label="Send message"
        >
          ↑
        </button>

      </form>

      <div class="rex-footer">
        <span>RELMUN '26</span>
        <span>OFFICIAL INFORMATION ASSISTANT</span>
      </div>

    </section>
  `;

  /* =========================================================
     MARKDOWN FORMATTER
     Converts Gemini Markdown into actual HTML.
  ========================================================= */

  function escapeHTML(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatRexMessage(text) {
    if (!text) return "";

    let output = escapeHTML(String(text));

    /*
      Code blocks
    */
    output = output.replace(
      /```([\s\S]*?)```/g,
      '<pre class="rex-code"><code>$1</code></pre>'
    );

    /*
      Inline code
    */
    output = output.replace(
      /`([^`]+)`/g,
      "<code>$1</code>"
    );

    /*
      Bold
      **text**
    */
    output = output.replace(
      /\*\*(.+?)\*\*/g,
      "<strong>$1</strong>"
    );

    /*
      Italic
      *text*
    */
    output = output.replace(
      /(^|[^*])\*([^*\n]+)\*(?!\*)/g,
      "$1<em>$2</em>"
    );

    /*
      Headings
      ### Heading
      ## Heading
      # Heading
    */
    output = output.replace(
      /^###\s+(.+)$/gm,
      '<div class="rex-heading rex-heading-3">$1</div>'
    );

    output = output.replace(
      /^##\s+(.+)$/gm,
      '<div class="rex-heading rex-heading-2">$1</div>'
    );

    output = output.replace(
      /^#\s+(.+)$/gm,
      '<div class="rex-heading rex-heading-1">$1</div>'
    );

    /*
      Bullet points
      - item
      * item
      • item
    */
    output = output.replace(
      /^[ \t]*(?:[-*•])\s+(.+)$/gm,
      '<div class="rex-bullet"><span>•</span><div>$1</div></div>'
    );

    /*
      Numbered lists
    */
    output = output.replace(
      /^[ \t]*(\d+)\.\s+(.+)$/gm,
      '<div class="rex-numbered"><span>$1.</span><div>$2</div></div>'
    );

    /*
      Links
      Markdown:
      [text](url)
    */
    output = output.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    /*
      Bare URLs
    */
    output = output.replace(
      /(^|[\s>])(https?:\/\/[^\s<]+)/g,
      '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>'
    );

    /*
      Line breaks.
    */
    output = output.replace(/\n/g, "<br>");

    /*
      Remove <br> immediately around block elements.
    */
    output = output
      .replace(/(<div class="rex-(?:bullet|numbered|heading)[^>]*>.*?<\/div>)<br>/g, "$1")
      .replace(/<br>(<div class="rex-(?:bullet|numbered|heading)[^>]*>)/g, "$1")
      .replace(/(<\/pre>)<br>/g, "$1");

    return output;
  }

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const openButton = document.getElementById("rexOpen");
  const closeButton = document.getElementById("rexClose");
  const windowEl = document.getElementById("rexWindow");
  const messages = document.getElementById("rexMessages");
  const form = document.getElementById("rexForm");
  const input = document.getElementById("rexInput");
  const sendButton = form.querySelector(".rex-send");

  /* =========================================================
     OPEN / CLOSE
  ========================================================= */

  function openRex() {
    windowEl.classList.add("open");

    openButton.setAttribute("aria-expanded", "true");
    windowEl.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      input.focus();
    }, 120);
  }

  function closeRex() {
    windowEl.classList.remove("open");

    openButton.setAttribute("aria-expanded", "false");
    windowEl.setAttribute("aria-hidden", "true");
  }

  openButton.addEventListener("click", openRex);
  closeButton.addEventListener("click", closeRex);

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      windowEl.classList.contains("open")
    ) {
      closeRex();
    }
  });

  /* =========================================================
     ADD MESSAGE
  ========================================================= */

  function addMessage(text, type) {

    const message = document.createElement("div");
    message.className = `rex-message rex-${type}`;

    const label = document.createElement("div");
    label.className = "rex-message-label";
    label.textContent = type === "user" ? "YOU" : "REX";

    const body = document.createElement("div");
    body.className = "rex-message-text";

    if (type === "bot") {
      body.innerHTML = formatRexMessage(text);
    } else {
      body.textContent = text;
    }

    message.appendChild(label);
    message.appendChild(body);

    messages.appendChild(message);

    requestAnimationFrame(() => {
      messages.scrollTop = messages.scrollHeight;
    });

    return message;
  }

  /* =========================================================
     TYPING INDICATOR
  ========================================================= */

  function addTyping() {

    const message = document.createElement("div");

    message.className =
      "rex-message rex-bot rex-typing";

    const label = document.createElement("div");

    label.className =
      "rex-message-label";

    label.textContent = "REX";

    const body = document.createElement("div");

    body.className =
      "rex-message-text";

    body.innerHTML = `
      <span class="rex-thinking">
        REX is thinking<span>.</span><span>.</span><span>.</span>
      </span>
    `;

    message.appendChild(label);
    message.appendChild(body);

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

    return message;
  }

  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const question = input.value.trim();

    if (!question) return;

    /*
      Immediately show user's message.
    */

    addMessage(question, "user");

    input.value = "";
    input.disabled = true;
    sendButton.disabled = true;

    const typing = addTyping();

    try {

      const response = await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

        body: JSON.stringify({
          message: question
        })

      });

      let data = null;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "REX returned an invalid response."
        );
      }

      if (!response.ok) {

        throw new Error(
          data?.error ||
          `REX request failed (${response.status}).`
        );

      }

      /*
        Support both:
        { answer: "..." }
        and
        { response: "..." }
      */

      const answer =
        typeof data?.answer === "string"
          ? data.answer
          : typeof data?.response === "string"
            ? data.response
            : "";

      if (!answer.trim()) {
        throw new Error(
          "REX returned an empty answer."
        );
      }

      typing.remove();

      addMessage(
        answer.trim(),
        "bot"
      );

    } catch (error) {

      console.error(
        "REX error:",
        error
      );

      typing.remove();

      addMessage(
        "I'm having trouble connecting right now. Please try again in a moment.",
        "bot"
      );

    } finally {

      input.disabled = false;
      sendButton.disabled = false;

      input.focus();

    }

  });

})();
