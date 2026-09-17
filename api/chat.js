export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    // Make sure the API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is missing");

      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured"
      });
    }

    // Read request body safely
    let body = req.body;

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          error: "Invalid JSON"
        });
      }
    }

    const message = body?.message;

    console.log("Incoming body:", body);

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required",
        received: body
      });
    }

    // Send request to OpenAI
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({
          model: "gpt-5-mini",

          instructions: `
You are ASK RELMUN, the official AI assistant for RELMUN '26.

RELMUN stands for Regional Engagement & Leadership Model United Nations.

CONFERENCE
26–27 December 2026
Online conference.

COMMITTEES

1. UNSC — United Nations Security Council
2. UNHRC — United Nations Human Rights Council
3. UNODC — United Nations Office on Drugs and Crime
4. AIPPM — All India Political Parties Meet
5. IPLA — Indian Premier League Auction
6. UNW — UN Women

ORGANISING TEAM

Secretary-General — Akshith Kabilan
Chief Advisor — Aashi Kushwaha
Deputy Secretary-General — S. Shreyaas
Director General — Laasya Vikram
Head of Administration — Abimayur R
USG, Delegate Affairs — Madhav Bhardwaj

REGISTRATION

Delegate registrations are coming soon.

RULES

Answer questions about RELMUN clearly and naturally.

Do not invent RELMUN information.

If something has not been announced, say that it has not been announced yet.

Keep responses concise and helpful.
`,

          input: message
        })
      }
    );

    const data = await openaiResponse.json();

    console.log("OpenAI status:", openaiResponse.status);

    if (!openaiResponse.ok) {
      console.error("OpenAI error:", data);

      return res.status(500).json({
        error: "OpenAI API error",
        details: data
      });
    }

    return res.status(200).json({
      answer:
        data.output_text ||
        "Sorry, I couldn't generate a response."
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}
