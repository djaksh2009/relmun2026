/* =========================================================
   RELMUN '26 — REX CHATBOT
   Complete standalone chatbot
========================================================= */

(() => {
  const root = document.getElementById("relmun-chatbot");
  if (!root) return;

  root.innerHTML = `
    <button class="rex-launcher" id="rexLauncher" aria-label="Open REX">
      <span class="rex-dot"></span>
      REX
    </button>

    <div class="rex-window" id="rexWindow" aria-hidden="true">
      <div class="rex-header">
        <div>
          <span class="rex-label">RELMUN '26</span>
          <strong>REX</strong>
        </div>

        <button class="rex-close" id="rexClose" aria-label="Close chatbot">
          ×
        </button>
      </div>

      <div class="rex-status">
        <span></span>
        REX · RELMUN ASSISTANT
      </div>

      <div class="rex-messages" id="rexMessages"></div>

      <div class="rex-suggestions" id="rexSuggestions">
        <button data-question="Tell me more about RELMUN 2026">ABOUT RELMUN</button>
        <button data-question="What committees are available?">COMMITTEES</button>
        <button data-question="When does registration open?">REGISTRATION</button>
        <button data-question="Who is organising RELMUN?">THE TEAM</button>
      </div>

      <form class="rex-input-area" id="rexForm">
        <input
          id="rexInput"
          type="text"
          placeholder="Ask REX anything..."
          autocomplete="off"
        />
        <button type="submit" aria-label="Send message">↗</button>
      </form>
    </div>
  `;

  const launcher = document.getElementById("rexLauncher");
  const windowEl = document.getElementById("rexWindow");
  const closeBtn = document.getElementById("rexClose");
  const messages = document.getElementById("rexMessages");
  const form = document.getElementById("rexForm");
  const input = document.getElementById("rexInput");
  const suggestions = document.getElementById("rexSuggestions");

  /* =========================================================
     RELMUN INFORMATION
  ========================================================= */

  const RELMUN = {
    name: "RELMUN '26",
    fullName: "Regional Engagement & Leadership Model United Nations",
    dates: "26–27 December 2026",
    mode: "Online",
    registration: "Delegate registrations open on 1 October 2026.",
    fee: "Delegate registration is currently free.",
    email: "relmun.official@gmail.com",
    instagram: "@relmun.official",

    committees: [
      {
        name: "UNSC",
        full: "United Nations Security Council",
        description:
          "International peace and security, diplomacy and high-level decision making."
      },
      {
        name: "UNHRC",
        full: "United Nations Human Rights Council",
        description:
          "Human rights, international cooperation and policy-focused debate."
      },
      {
        name: "UNODC",
        full: "United Nations Office on Drugs and Crime",
        description:
          "International cooperation against organised crime, drugs and related challenges."
      },
      {
        name: "AIPPM",
        full: "All India Political Parties Meet",
        description:
          "Parliamentary debate, political negotiation and national policy deliberation."
      },
      {
        name: "UNW",
        full: "UN Women",
        description:
          "Gender equality, empowerment and international policy discussions."
      },
      {
        name: "IPLA",
        full: "IPL Auction",
        description:
          "Strategic bidding, team management and high-pressure decision making."
      }
    ],

    team: [
      {
        name: "Akshith Kabilan",
        role: "Secretary-General"
      },
      {
        name: "S. Shreyaas",
        role: "Deputy Secretary-General"
      },
      {
        name: "Laasya Vikram",
        role: "Director-General"
      },
      {
        name: "Aashi Kushwaha",
        role: "Chief Advisor"
      },
      {
        name: "Abimayur R",
        role: "Head of Administration & Outreach"
      },
      {
        name: "Madhav Bhardwaj",
        role: "USG · Delegate Affairs"
      }
    ]
  };

  /* =========================================================
     MARKDOWN-LIKE FORMATTER
  ========================================================= */

  function escapeHTML(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function formatResponse(text) {
    let safe = escapeHTML(text);

    /*
      Bold:
      **text**
    */
    safe = safe.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    /*
      Italic:
      *text*
    */
    safe = safe.replace(
      /(^|[^\*])\*([^*\n]+)\*(?!\*)/g,
      "$1<em>$2</em>"
    );

    /*
      Inline code
    */
    safe = safe.replace(
      /`([^`]+)`/g,
      "<code>$1</code>"
    );

    /*
      Markdown links
    */
    safe = safe.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );

    /*
      Headings
    */
    safe = safe.replace(
      /^### (.+)$/gm,
      "<h5>$1</h5>"
    );

    safe = safe.replace(
      /^## (.+)$/gm,
      "<h4>$1</h4>"
    );

    safe = safe.replace(
      /^# (.+)$/gm,
      "<h3>$1</h3>"
    );

    /*
      Bullet points
    */
    safe = safe.replace(
      /^[•\-] (.+)$/gm,
      "<li>$1</li>"
    );

    safe = safe.replace(
      /(<li>.*<\/li>\n?)+/g,
      match => `<ul>${match}</ul>`
    );

    /*
      Numbered lists
    */
    safe = safe.replace(
      /^\d+\.\s+(.+)$/gm,
      "<li>$1</li>"
    );

    /*
      Preserve paragraphs / line breaks
    */
    const blocks = safe
      .split(/\n{2,}/)
      .map(block => {
        if (
          block.startsWith("<ul>") ||
          block.startsWith("<h3>") ||
          block.startsWith("<h4>") ||
          block.startsWith("<h5>")
        ) {
          return block;
        }

        return `<p>${block.replace(/\n/g, "<br>")}</p>`;
      });

    return blocks.join("");
  }

  /* =========================================================
     MESSAGE HANDLING
  ========================================================= */

  function addMessage(text, type = "rex") {
    const message = document.createElement("div");
    message.className = `rex-message ${type}`;

    message.innerHTML = `
      <div class="rex-message-content">
        ${type === "rex" ? formatResponse(text) : escapeHTML(text)}
      </div>
    `;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;

    return message;
  }

  function addTyping() {
    const typing = document.createElement("div");
    typing.className = "rex-message rex typing-message";

    typing.innerHTML = `
      <div class="rex-message-content">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;

    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    return typing;
  }

  /* =========================================================
     KNOWLEDGE ENGINE
  ========================================================= */

  function getResponse(question) {
    const q = question.toLowerCase().trim();

    /* GREETING */

    if (
      /^(hi|hello|hey|yo|sup|hii|heyy|good morning|good evening)\b/.test(q)
    ) {
      return `Hey! 👋

I'm **REX**, the official RELMUN '26 assistant.

I can help you with:
- **RELMUN '26**
- **Committees**
- **Registration**
- **The organising team**
- **Conference details**
- **Executive Board**
- **Contact information**

What would you like to know?`;
    }

    /* ABOUT RELMUN */

    if (
      q.includes("what is relmun") ||
      q.includes("tell me about relmun") ||
      q.includes("about relmun") ||
      q.includes("more info") ||
      q.includes("more information") ||
      q.includes("conference") ||
      q.includes("what is this")
    ) {
      return `## RELMUN '26

**RELMUN '26** stands for **Regional Engagement & Leadership Model United Nations**.

It is a **two-day online Model United Nations conference** built around diplomacy, strategy, engagement and leadership.

### Conference Details

- **Dates:** 26–27 December 2026
- **Format:** Online
- **Committees:** 6
- **Registration:** Opens 1 October 2026
- **Delegate Fee:** Currently free

RELMUN brings delegates together for committee sessions focused on debate, negotiation, collaboration and strategic decision-making.

The six committees are **UNSC, UNHRC, UNODC, AIPPM, UN Women and IPLA**.`;
    }

    /* DATE */

    if (
      q.includes("when") &&
      (
        q.includes("relmun") ||
        q.includes("conference") ||
        q.includes("date") ||
        q.includes("dates")
      )
    ) {
      return `RELMUN '26 will take place on **26–27 December 2026**.

It is a **fully online** conference.`;
    }

    /* ONLINE */

    if (
      q.includes("online") ||
      q.includes("offline") ||
      q.includes("physical") ||
      q.includes("venue") ||
      q.includes("where is relmun")
    ) {
      return `RELMUN '26 is a **fully online conference**.

The conference will take place on **26–27 December 2026**.`;
    }

    /* REGISTRATION */

    if (
      q.includes("registration") ||
      q.includes("register") ||
      q.includes("sign up") ||
      q.includes("signup") ||
      q.includes("application")
    ) {
      return `## Registration

Delegate registrations for **RELMUN '26 open on 1 October 2026**.

The current delegate registration fee is **free**.

Registration platforms and the registration process will be provided through the official RELMUN channels when registrations open.

For official updates:
**Instagram:** @relmun.official`;
    }

    /* FEE */

    if (
      q.includes("fee") ||
      q.includes("fees") ||
      q.includes("cost") ||
      q.includes("price") ||
      q.includes("how much")
    ) {
      return `Delegate registration for RELMUN '26 is currently **free**.

Registrations open on **1 October 2026**.`;
    }

    /* COMMITTEES GENERAL */

    if (
      q.includes("committees") ||
      q.includes("committee") ||
      q.includes("rooms")
    ) {
      return `## RELMUN '26 Committees

There are **six committee experiences** at RELMUN '26:

**01 · UNSC**  
United Nations Security Council — international peace and security, diplomacy and high-level decision making.

**02 · UNHRC**  
United Nations Human Rights Council — human rights, international cooperation and policy-focused debate.

**03 · UNODC**  
United Nations Office on Drugs and Crime — international cooperation against organised crime, drugs and related challenges.

**04 · AIPPM**  
All India Political Parties Meet — parliamentary debate, political negotiation and national policy deliberation.

**05 · UN Women**  
UN Women — gender equality, empowerment and international policy discussions.

**06 · IPLA**  
IPL Auction — strategic bidding, team management and high-pressure decision making.

You can explore the full committee information on the **Committees** page.`;
    }

    /* SPECIFIC COMMITTEES */

    const committee = RELMUN.committees.find(c => {
      return (
        q.includes(c.name.toLowerCase()) ||
        q.includes(c.full.toLowerCase())
      );
    });

    if (committee) {
      return `## ${committee.name}

**${committee.full}**

${committee.description}

You can find the detailed mandate, format and focus of this committee on the RELMUN '26 **Committees** page.`;
    }

    /* TEAM */

    if (
      q.includes("team") ||
      q.includes("organising") ||
      q.includes("organizing") ||
      q.includes("secretariat") ||
      q.includes("secretariat")
    ) {
      return `## RELMUN '26 Organising Team

### Core

- **Akshith Kabilan** — Secretary-General
- **S. Shreyaas** — Deputy Secretary-General
- **Laasya Vikram** — Director-General
- **Aashi Kushwaha** — Chief Advisor

### Secretariat

- **Abimayur R** — Head of Administration & Outreach
- **Madhav Bhardwaj** — USG · Delegate Affairs

The team works behind the scenes to plan, coordinate and execute RELMUN '26.`;
    }

    /* SECRETARY GENERAL */

    if (
      q.includes("secretary general") ||
      q.includes("sec gen") ||
      q.includes("sec-gen")
    ) {
      return `The **Secretary-General of RELMUN '26 is Akshith Kabilan**.

The Secretary-General is part of the **Core** organising team.`;
    }

    /* EXECUTIVE BOARD */

    if (
      q.includes("executive board") ||
      q.includes("eb") ||
      q.includes("chairs") ||
      q.includes("chair")
    ) {
      return `## Executive Board

The **Executive Board** will be responsible for guiding debate and maintaining committee procedure.

The EB lineup for the six committees is currently being finalised.

You can check the official **EB** page for updates and announcements.`;
    }

    /* CONTACT */

    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("mail") ||
      q.includes("reach") ||
      q.includes("instagram") ||
      q.includes("phone")
    ) {
      return `## Contact RELMUN

**Email:**  
relmun.official@gmail.com

**Instagram:**  
@relmun.official

For official conference updates, announcements and registration information, follow **@relmun.official** on Instagram.`;
    }

    /* WEBSITE */

    if (
      q.includes("website") ||
      q.includes("site") ||
      q.includes("link")
    ) {
      return `You can explore RELMUN '26 through the official website you're currently visiting.

You can also use the navigation to explore:

- **About**
- **Committees**
- **Team**
- **EB**
- **FAQ**
- **Registration**`;
    }

    /* THANKS */

    if (
      q.includes("thank you") ||
      q === "thanks" ||
      q === "thank"
    ) {
      return `You're welcome! 😎

If you have anything else about **RELMUN '26**, just ask.`;
    }

    /* BYE */

    if (
      q === "bye" ||
      q === "goodbye" ||
      q.includes("see you")
    ) {
      return `See you at **RELMUN '26**! 👋

**26–27 December 2026 · Online**`;
    }

    /* DEFAULT */

    return `I can help you with **RELMUN '26**.

Try asking me something like:

- **"Tell me more about the conference."**
- **"What committees are there?"**
- **"When does registration open?"**
- **"How much does registration cost?"**
- **"Who is the Secretary-General?"**
- **"Tell me about the organising team."**
- **"What is UNSC?"**
- **"How can I contact RELMUN?"**

Ask away — I'm REX.`;
  }

  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  async function sendMessage(text) {
    const question = text.trim();

    if (!question) return;

    addMessage(question, "user");
    input.value = "";

    const typing = addTyping();

    /*
      Small delay so REX feels natural.
      The response itself is generated locally,
      so there is no daily API quota.
    */

    await new Promise(resolve => {
      setTimeout(resolve, 350);
    });

    typing.remove();

    addMessage(getResponse(question), "rex");

    messages.scrollTop = messages.scrollHeight;
  }

  /* =========================================================
     OPEN / CLOSE
  ========================================================= */

  function openRex() {
    windowEl.classList.add("open");
    windowEl.setAttribute("aria-hidden", "false");
    launcher.classList.add("hidden");

    setTimeout(() => input.focus(), 150);
  }

  function closeRex() {
    windowEl.classList.remove("open");
    windowEl.setAttribute("aria-hidden", "true");
    launcher.classList.remove("hidden");
  }

  launcher.addEventListener("click", openRex);
  closeBtn.addEventListener("click", closeRex);

  /* =========================================================
     FORM
  ========================================================= */

  form.addEventListener("submit", event => {
    event.preventDefault();
    sendMessage(input.value);
  });

  /* =========================================================
     SUGGESTIONS
  ========================================================= */

  suggestions.addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button) return;

    const question = button.dataset.question;

    if (question) {
      sendMessage(question);
    }
  });

  /* =========================================================
     ESC KEY
  ========================================================= */

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeRex();
    }
  });

  /* =========================================================
     INITIAL MESSAGE
  ========================================================= */

  addMessage(
    `Hey! I'm **REX**, the RELMUN '26 assistant. 👋

Ask me anything about the **conference, committees, registration, team or Executive Board**.`
  );
})();
