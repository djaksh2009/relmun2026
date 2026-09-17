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
        error: "GEMINI_API_KEY is missing"
      });
    }

    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const message = body?.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is missing"
      });
    }


    const systemPrompt = `
You are ASK RELMUN, the official AI assistant for RELMUN '26.

RELMUN stands for Regional Engagement & Leadership Model United Nations.

CONFERENCE:
26–27 December 2026
Online conference.

COMMITTEES:

1. UNSC — United Nations Security Council
2. UNHRC — United Nations Human Rights Council
3. UNODC — United Nations Office on Drugs and Crime
4. AIPPM — All India Political Parties Meet
5. IPLA — Indian Premier League Auction
6. UNW — UN Women

ORGANISING TEAM:

Secretary-General — Akshith Kabilan
Deputy Secretary-General — S. Shreyaas
Chief Advisor — Aashi Kushwaha
Director General — Laasya Vikram
Head of Administration — Abimayur R
USG Delegate Affairs — Madhav Bhardwaj

REGISTRATION:

Delegate registrations are coming soon.

INSTRUCTIONS:

Answer questions about RELMUN clearly,
naturally and helpfully.

Do not invent information about RELMUN.

If something has not been announced,
say that it has not been announced yet.

Keep answers concise unless the user asks for more detail.
`;


    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
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
          ]

        })
      }
    );


    const data = await response.json();


    if (!response.ok) {

      console.error("Gemini error:", data);

      return res.status(500).json({
        error: "Gemini API error",
        details: data?.error?.message || "Unknown Gemini error"
      });

    }


    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;


    if (!answer) {

      return res.status(500).json({
        error: "Gemini returned no response"
      });

    }


    return res.status(200).json({
      answer: answer
    });


  } catch (error) {

    console.error("Server error:", error);

    return res.status(500).json({
      error: "Server error",
      details: error.message
    });

  }

}
