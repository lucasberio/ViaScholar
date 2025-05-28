import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async (req, res) => {
    const { essay } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a helpful assistant that provides feedback on scholarship essays.' },
                { role: 'user', content: `Please provide feedback on: ${essay}` }
            ],
        }),
    });
    const data = await response.json();
    res.json({feedback: data.choices[0].message.content });
});

export default router;