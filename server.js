import express from 'express';
import cors from 'cors';
import 'dotenv/config';


const app = express();

// app.use(cors());
app.use(cors({ origin: "*" }));

app.use(express.json());

app.post('/api/feedback', async (req, res) => {
    console.log("Received POST body:", req.body); 
  const { essay } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',  // Changed to correct model name
        messages: [
          { role: 'system', content: 'You are an AI essay advisor helping students improve scholarship application essays, talk directy to them. Do not rewrite the essay—just provide thoughtful feedback. Structure your response in the following format: Overview: Briefly summarize what the essay conveys and how effectively it does so. Strengths: Highlight what works well in terms of content and impact. Weaknesses: Point out areas that lack clarity, depth, or focus. Grammar & Style Notes: Mention any noticeable issues with language, tone, or flow. This should be structured as inconsistent x, missing x after y, x is y, etc. ' },
          { role: 'user', content: `Give feedback on this essay:\n\n${essay}` }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Unexpected response structure from OpenAI');
    }

    res.json({ feedback: data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to get feedback' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
