export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is missing"
      });
    }

    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const message = body?.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is missing",
        receivedBody: body
      });
    }

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },

        body: JSON.stringify({
          model: "gpt-5-mini",

          instructions: `
You are ASK RELMUN, the official AI assistant for RELMUN '26.

RELMUN '26 is an online Model United Nations conference taking place on 26–27 December 2026.

Committees:
UNSC — United Nations Security Council
UNHRC — United Nations Human Rights Council
UNODC — United Nations Office on Drugs and Crime
AIPPM — All India Political Parties Meet
IPLA — Indian Premier League Auction
UNW — UN Women

Organising Team:
Secretary-General — Akshith Kabilan
Deputy Secretary-General — S. Shreyaas
Chief Advisor — Aashi Kushwaha
Director General — Laasya Vikram
Head of Administration — Abimayur R
USG Delegate Affairs — Madhav Bhardwaj

Delegate registrations are coming soon.

Answer questions about RELMUN naturally and accurately.
Never invent information that has not been announced.
`,

          input: message
        })
      }
    );

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {

      return res.status(500).json({
        error: "OpenAI rejected the request",
        openaiStatus: openaiResponse.status,
        openaiError: data?.error?.message || "Unknown OpenAI error",
        openaiType: data?.error?.type || null,
        openaiCode: data?.error?.code || null
      });

    }

    return res.status(200).json({
      answer:
        data.output_text ||
        "I couldn't generate a response."
    });

  } catch (error) {

    return res.status(500).json({
      error: "Backend error",
      details: error.message
    });

  }
}
