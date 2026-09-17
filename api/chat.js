export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({
          model: "gpt-4.1-mini",

          instructions: `
You are ASK RELMUN, the official AI assistant for RELMUN '26.

RELMUN stands for Relations, Engagement & Leadership Model United Nations.

Conference:
26–27 December 2026
Online conference

Committees:
1. UNSC — United Nations Security Council
2. UNHRC — United Nations Human Rights Council
3. UNODC — United Nations Office on Drugs and Crime
4. AIPPM — All India Political Parties Meet
5. IPLA — Indian Premier League Auction
6. UNW — UN Women

Answer questions about RELMUN clearly, naturally and concisely.

If information is not available, say that it has not been announced yet.
Do not invent registration dates, agendas, committee leadership or other official information.

The user may ask things like:
- How do I register?
- What committees are there?
- When is RELMUN?
- Is RELMUN online?
- What is UNW?
- What is IPLA?
- Who can participate?
`,

          input: message
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);

      return res.status(response.status).json({
        error: "OpenAI request failed"
      });
    }

    return res.status(200).json({
      reply: data.output_text || "Sorry, I couldn't generate a response."
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Server error"
    });
  }
}
