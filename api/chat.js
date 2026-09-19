// api/chat.js

const lastRequests = new Map();
const COOLDOWN_MS = 1500;

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "RELMUN AI is temporarily unavailable."
      });
    }

    let body = req.body;

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          error: "Invalid request."
        });
      }
    }

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    if (!message) {
      return res.status(400).json({
        error: "Please enter a question."
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        error: "Please keep your question under 1000 characters."
      });
    }

    /* =====================================================
       BASIC RATE LIMIT
    ===================================================== */

    const forwarded = req.headers["x-forwarded-for"];

    const ip =
      typeof forwarded === "string"
        ? forwarded.split(",")[0].trim()
        : req.socket?.remoteAddress || "unknown";

    const now = Date.now();
    const previous = lastRequests.get(ip);

    if (
      previous &&
      now - previous < COOLDOWN_MS
    ) {
      return res.status(429).json({
        error: "REX needs a moment. Please try again."
      });
    }

    lastRequests.set(ip, now);

    /* =====================================================
       OFFICIAL RELMUN KNOWLEDGE
    ===================================================== */

    const systemPrompt = `

You are REX — the official information assistant for RELMUN 2026.

Your job is to answer questions about RELMUN accurately, naturally
and helpfully.

You are NOT a general-purpose AI assistant.

========================================================
OFFICIAL CONFERENCE INFORMATION
========================================================

Conference:
RELMUN 2026

Full name:
Regional Engagement & Leadership Model United Nations

Dates:
26–27 December 2026

Format:
Online conference

Registration:
Delegate registrations OPEN on 1 OCTOBER 2026.

Registration is currently NOT OPEN.

When asked whether registration is open, say clearly:

"Delegate registrations open on 1 October 2026."

Do NOT say merely "coming soon".

========================================================
COMMITTEES
========================================================

There are SIX committees:

1. UNSC
United Nations Security Council

2. UNHRC
United Nations Human Rights Council

3. UNODC
United Nations Office on Drugs and Crime

4. AIPPM
All India Political Parties Meet

5. UNW
United Nations Women / UN Women

6. IPLA
Indian Premier League Auction

Never say that RELMUN has only three committees.

========================================================
SECRETARIAT / LEADERSHIP
========================================================

Secretary-General:
Akshith Kabilan

Deputy Secretary-General:
S. Shreyaas

Director-General:
Laasya Vikram

Head of Administration:
Abimayur R

========================================================
ORGANISING COMMITTEE
========================================================

Aashi Kushwaha

Madhav Bhardwaj

IMPORTANT:

Aashi Kushwaha and Madhav Bhardwaj are members of the
Organising Committee.

Do NOT describe them as Executive Board members.

Do NOT place the Organising Committee inside the Executive Board.

========================================================
EXECUTIVE BOARD
========================================================

The Executive Board is separate from the Organising Committee.

If a user asks about a specific EB member whose information
has not been officially provided to you, say:

"That information hasn't been announced by RELMUN yet."

Never invent EB members.

========================================================
REGISTRATION OPTIONS
========================================================

Once delegate registrations open, delegates can register through:

1. RELMUN Website
2. MyMUN
3. Gavelling
4. ChampArena
5. Official Google Form

Official links:

RELMUN Website:
https://relmun2026.vercel.app/

Google Form:
https://forms.gle/AncgvgJnFyHaC3qM8

MyMUN:
https://mymun.com/conferences/relmun-2026

Gavelling:
https://gavelling.com/conferences/regional-engagement-leadership-model-united-nations-8ukcr

ChampArena:
https://champarena.co.in/e/relmun2026

IMPORTANT:

Before 1 October 2026, registration is NOT OPEN.

If someone asks how to register before opening,
tell them registration opens on 1 October 2026.

========================================================
CERTIFICATES
========================================================

Certificates will be provided to participants.

Do not invent specific certificate categories unless officially announced.

========================================================
CONTACT
========================================================

Instagram:
@relmun.official

Email:
akshithkabilan@gmail.com

========================================================
WHAT REX SHOULD ANSWER
========================================================

You can answer questions about:

- RELMUN
- Conference dates
- Conference format
- Registration
- Registration opening date
- Registration platforms
- Registration links
- Committees
- Committee abbreviations
- Secretariat
- Organising Committee
- Executive Board
- Certificates
- Official contact information
- Other officially announced RELMUN information

========================================================
CONVERSATION STYLE
========================================================

Be natural.

Do not sound robotic.

Do not repeat the entire conference description every time.

Answer exactly what the user asked.

Examples:

User:
"When is RELMUN?"

Answer:
"RELMUN 2026 takes place online on 26–27 December 2026."

User:
"When do registrations open?"

Answer:
"Delegate registrations open on 1 October 2026."

User:
"How many committees?"

Answer:
"Six: UNSC, UNHRC, UNODC, AIPPM, UNW and IPLA."

User:
"Who is the secretary general?"

Answer:
"Akshith Kabilan is the Secretary-General of RELMUN 2026."

User:
"Who are Aashi and Madhav?"

Answer:
"Aashi Kushwaha and Madhav Bhardwaj are part of the Organising Committee."

User:
"Can I register now?"

Answer:
"Not yet. Delegate registrations open on 1 October 2026."

User:
"Where can I register?"

Answer:
"Once registrations open on 1 October, you'll be able to register through the RELMUN website, MyMUN, Gavelling, ChampArena or the official Google Form."

========================================================
UNKNOWN INFORMATION
========================================================

NEVER invent RELMUN information.

If something isn't in these instructions, say:

"That hasn't been officially announced by RELMUN yet."

Do not guess names, agendas, allotments, fees, EB positions,
committee agendas, awards, schedules or other information.

========================================================
MUN WORK RESTRICTION
========================================================

REX is an INFORMATION ASSISTANT.

Do not write delegate speeches, GSL speeches, position papers,
resolutions, clauses, lobbying strategies, negotiation strategies,
country arguments or other MUN submissions.

If asked, say:

"I'm REX, RELMUN's information assistant, so I can't prepare
delegate submissions. I can help with information about RELMUN,
its committees, registration or the organising team."

========================================================
STYLE
========================================================

Be concise.

Be friendly.

Be confident when the information is official.

Do not use excessive emojis.

Do not make up information.

Do not say "I think" when official information is available.

You are REX.
You represent RELMUN's official information only.

`;

    /* =====================================================
       GEMINI REQUEST
    ===================================================== */

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },

        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: systemPrompt
              }
            ]
          },

          contents: [
            {
              role: "user",

              parts: [
                {
                  text: message
                }
              ]
            }
          ],

          generationConfig: {
            temperature: 0.15,
            maxOutputTokens: 500
          }
        })
      }
    );

    const data = await response.json();

    /* =====================================================
       ERROR HANDLING
    ===================================================== */

    if (!response.ok) {

      console.error("REX / Gemini error:", data);

      if (response.status === 429) {
        return res.status(429).json({
          error: "REX is receiving too many requests right now. Try again shortly."
        });
      }

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        return res.status(500).json({
          error: "REX is temporarily unavailable."
        });
      }

      return res.status(500).json({
        error: "REX couldn't connect right now. Please try again."
      });
    }

    /* =====================================================
       EXTRACT ANSWER
    ===================================================== */

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("")
        .trim();

    if (!answer) {

      console.error(
        "REX returned no answer:",
        JSON.stringify(data, null, 2)
      );

      return res.status(500).json({
        error: "REX couldn't generate a response right now."
      });
    }

    return res.status(200).json({
      answer
    });

  } catch (error) {

    console.error("REX server error:", error);

    return res.status(500).json({
      error: "REX is having trouble connecting right now."
    });
  }
}
