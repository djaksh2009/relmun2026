(() => {

  const root =
    document.getElementById("relmun-chatbot");

  if (!root) return;


  /* =========================================================
     CHATBOT HTML
  ========================================================= */

  root.innerHTML = `
    <button
      class="relmun-chat-button"
      id="rexOpen"
      aria-expanded="false"
    >
      ✦ REX
    </button>

    <div
      class="relmun-chat-window"
      id="rexWindow"
      aria-hidden="true"
    >

      <div class="relmun-chat-header">

        <div class="relmun-chat-title">
          <strong>REX</strong>
          <span>RELMUN '26 INFORMATION ASSISTANT</span>
        </div>

        <button
          class="relmun-chat-close"
          id="rexClose"
          aria-label="Close"
        >
          ×
        </button>

      </div>


      <div
        class="relmun-chat-messages"
        id="rexMessages"
      >

        <div class="relmun-message bot">
          <div class="relmun-markdown">
            Hi. I'm <strong>REX</strong>, RELMUN '26's
            information assistant.

            <br><br>

            Ask me about the conference,
            committees, registration,
            the team, or anything
            officially announced.
          </div>
        </div>

      </div>


      <form
        class="relmun-chat-form"
        id="rexForm"
      >

        <input
          id="rexInput"
          autocomplete="off"
          placeholder="Ask REX…"
          aria-label="Message REX"
          maxlength="1000"
        >

        <button
          type="submit"
          aria-label="Send"
        >
          →
        </button>

      </form>

    </div>
  `;


  /* =========================================================
     ELEMENTS
  ========================================================= */

  const open =
    document.getElementById("rexOpen");

  const win =
    document.getElementById("rexWindow");

  const close =
    document.getElementById("rexClose");

  const messages =
    document.getElementById("rexMessages");

  const form =
    document.getElementById("rexForm");

  const input =
    document.getElementById("rexInput");


  /* =========================================================
     ESCAPE HTML
     Prevents Gemini text from injecting HTML.
  ========================================================= */

  function escapeHTML(text) {

    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  /* =========================================================
     REX MARKDOWN FORMATTER
  ========================================================= */

  function formatRexMessage(text) {

    let html =
      escapeHTML(text);


    /* -----------------------------------------
       CODE BLOCKS
    ----------------------------------------- */

    html = html.replace(
      /```([\s\S]*?)```/g,
      '<pre class="rex-code">$1</pre>'
    );


    /* -----------------------------------------
       INLINE CODE
    ----------------------------------------- */

    html = html.replace(
      /`([^`\n]+)`/g,
      "<code>$1</code>"
    );


    /* -----------------------------------------
       BOLD
       **text**
    ----------------------------------------- */

    html = html.replace(
      /\*\*(.+?)\*\*/g,
      "<strong>$1</strong>"
    );


    /* -----------------------------------------
       ITALIC
       *text*
    ----------------------------------------- */

    html = html.replace(
      /(^|[^*])\*([^*\n]+)\*(?!\*)/g,
      "$1<em>$2</em>"
    );


    /* -----------------------------------------
       HEADINGS
    ----------------------------------------- */

    html = html.replace(
      /^###\s+(.+)$/gm,
      '<div class="rex-heading">$1</div>'
    );

    html = html.replace(
      /^##\s+(.+)$/gm,
      '<div class="rex-heading">$1</div>'
    );

    html = html.replace(
      /^#\s+(.+)$/gm,
      '<div class="rex-heading">$1</div>'
    );


    /* -----------------------------------------
       BULLET POINTS
       - item
       * item
       • item
    ----------------------------------------- */

    html = html.replace(
      /^[ \t]*(?:[-*•])\s+(.+)$/gm,
      '<div class="rex-bullet">• $1</div>'
    );


    /* -----------------------------------------
       NUMBERED LISTS
    ----------------------------------------- */

    html = html.replace(
      /^[ \t]*(\d+)\.\s+(.+)$/gm,
      '<div class="rex-numbered"><span>$1.</span> $2</div>'
    );


    /* -----------------------------------------
       MARKDOWN LINKS
    ----------------------------------------- */

    html = html.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );


    /* -----------------------------------------
       BARE URLS
    ----------------------------------------- */

    html = html.replace(
      /(^|[\s>])(https?:\/\/[^\s<]+)/g,
      '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>'
    );


    /* -----------------------------------------
       LINE BREAKS
    ----------------------------------------- */

    html = html.replace(
      /\n/g,
      "<br>"
    );


    return html;

  }


  /* =========================================================
     ADD MESSAGE
  ========================================================= */

  const add = (text, who) => {

    const d =
      document.createElement("div");

    d.className =
      `relmun-message ${who}`;


    const content =
      document.createElement("div");

    content.className =
      "relmun-markdown";


    if (who === "bot") {

      content.innerHTML =
        formatRexMessage(text);

    } else {

      content.textContent =
        text;

    }


    d.appendChild(content);

    messages.appendChild(d);

    messages.scrollTop =
      messages.scrollHeight;

    return d;

  };


  /* =========================================================
     OPEN / CLOSE
  ========================================================= */

  open.onclick = () => {

    const v =
      win.classList.toggle("open");

    open.setAttribute(
      "aria-expanded",
      v
    );

    win.setAttribute(
      "aria-hidden",
      !v
    );

    if (v) {
      input.focus();
    }

  };


  close.onclick = () => {

    win.classList.remove("open");

    open.setAttribute(
      "aria-expanded",
      "false"
    );

    win.setAttribute(
      "aria-hidden",
      "true"
    );

  };


  /* =========================================================
     ESC KEY
  ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        win.classList.contains("open")
      ) {

        close.click();

      }

    }
  );


  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  form.onsubmit =
    async (e) => {

      e.preventDefault();


      const q =
        input.value.trim();


      if (!q) return;


      input.value = "";


      /* User message */

      add(
        q,
        "user"
      );


      /* Typing indicator */

      const typing =
        document.createElement("div");

      typing.className =
        "relmun-message bot";


      const typingContent =
        document.createElement("div");

      typingContent.className =
        "relmun-markdown";

      typingContent.textContent =
        "REX is checking…";


      typing.appendChild(
        typingContent
      );

      messages.appendChild(
        typing
      );

      messages.scrollTop =
        messages.scrollHeight;


      input.disabled = true;


      try {

        const r =
          await fetch(
            "/api/chat",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                message: q
              })
            }
          );


        let data;

        try {

          data =
            await r.json();

        } catch {

          throw new Error(
            "Invalid response from REX."
          );

        }


        if (!r.ok) {

          throw new Error(
            data?.error ||
            "Request failed"
          );

        }


        /* Remove typing */

        typing.remove();


        /* Get answer */

        const answer =
          typeof data?.answer === "string"
            ? data.answer.trim()
            : "";


        if (!answer) {

          add(
            "I don't have an answer for that right now. Please try again.",
            "bot"
          );

        } else {

          add(
            answer,
            "bot"
          );

        }


      } catch (err) {

        console.error(
          "REX error:",
          err
        );


        typing.remove();


        add(
          "I’m having trouble connecting right now. Please try again, or contact @relmun.official / akshithkabilan@gmail.com.",
          "bot"
        );

      } finally {

        input.disabled = false;

        input.focus();

      }

    };

})();
