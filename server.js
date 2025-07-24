require('dotenv').config();
const express = require('express');

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is not set.');
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(express.static('.'));

app.post('/api/chat', async (req, res) => {
  try {
    const payload = {
      model: 'gpt-4o',
      messages: req.body.messages,
    };
    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ error: 'API request failed' });
    }
    const data = await apiResponse.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
