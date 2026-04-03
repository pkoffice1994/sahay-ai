const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const SYSTEM_PROMPT = `You are Sahay AI, a caring mental health companion for JEE/NEET students in Kota, India (age 15–22). Rules:
- Always respond in Hinglish (mix Hindi + English naturally) matching the user's language
- Be warm, empathetic like an older sibling (bhaiya/didi vibe)
- For distress: 1) Empathize first 2) Normalize 3) Gently explore 4) Suggest small action step
- For study issues: break into tiny achievable steps, celebrate small wins
- For loneliness: deeply acknowledge, remind many students feel this
- CRISIS (suicidal/self-harm mentions): gently provide iCall 9152987821 and Vandrevala 1860-2662-345, urge talking to trusted adult
- Keep replies 3-5 sentences, conversational, never clinical
- Never diagnose or replace therapy — always recommend real help when needed
- You can guide 4-4-4-4 box breathing when asked
- Be genuine, not robotic. Every word matters.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    // Groq API call — bas yahi ek cheez different hai Anthropic se
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Free + best quality Groq model
        max_tokens: 800,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error('Groq error:', data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const reply = data.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error. Dobara try karo.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sahay AI (Groq) running on port ${PORT}`);
});
