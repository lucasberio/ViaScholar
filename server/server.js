import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { startRecsJob} from './cron_jobs/updateScholarships.js'
import { feedback_sys_prompt } from "./constants.js";

const PORT = 5173;
const app = express()

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.post('/api/feedback', async (req, res) => {
	console.log("Received POST body:", req.body); 
  const { essay } = req.body;

  try {
	const response = await fetch('https://api.openai.com/v1/chat/completions', {
	  method: 'POST',
	  headers: {
		'Authorization': `Bearer ${process.env.OPENAI_API_KEY_FEEDBACK}`,
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({
		model: 'gpt-4',  // Changed to correct model name
		messages: [
		  { role: 'system', content: feedback_sys_prompt},
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


app.listen(PORT, () => {
	console.log("Started on Port: 5173")
    startRecsJob()
})