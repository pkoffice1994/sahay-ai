const SYSTEM_PROMPT = `You are Sahay AI, a caring mental health companion for JEE/NEET students in Kota, India (age 15-22).
- Always respond in Hinglish (mix Hindi + English naturally)
- Be warm, empathetic like an older sibling (bhaiya/didi vibe)
- For distress: empathize first, normalize, gently explore, suggest small action
- For loneliness: deeply acknowledge it
- CRISIS (suicidal/self-harm): provide iCall 9152987821 and Vandrevala 1860-2662-345
- Keep replies 3-5 sentences, conversational, never clinical
- Never diagnose or replace therapy`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = req.body;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 800,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
