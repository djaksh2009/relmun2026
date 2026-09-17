export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages are required"
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured on Vercel."
      });
    }

    const response = await fetch(
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

RELMUN '26 stands for Relations, Engagement & Leadership Model United Nations.

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

Organising Team:
Secretary-General: Akshith Kabilan
Deputy Secretary-General: S. Shreyaas
Chief Advisor: Aashi Kushwaha
Director General: Laasya Vikram
Head of Administration: Abimayur R
USG Delegate Affairs: Madhav Bhardwaj

Delegate registrations are currently coming soon.

Be friendly, concise and helpful.
Answer questions about RELMUN, committees, registration, the conference and the organising team.

Do not invent information.
If you don't know something, say that it has not been announced yet.
`,

          input: messages

        })
      }
    );

    const data = await response.json();

    if (!response.ok) {

      console.error("OpenAI API error:", data);

      return res.status(response.status).json({
        error: data?.error?.message || "OpenAI request failed."
      });

    }

    let reply = data.output_text;

    if (!reply && data.output) {

      reply = data.output
        .flatMap(item => item.content || [])
        .filter(item => item.type === "output_text")
        .map(item => item.text)
        .join("");

    }

    if (!reply) {
      reply = "I couldn't generate a response right now.";
    }

    return res.status(200).json({
      reply
    });

  } catch (error) {

    console.error("Server error:", error);

    return res.status(500).json({
      error: "Something went wrong connecting to the AI."
    });

  }

}
