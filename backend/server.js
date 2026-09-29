const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const ML_URL = process.env.ML_URL || 'http://localhost:8000';

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TrustPay AI API' });
});

app.post('/api/analyze', async (req, res) => {
  try {
    const response = await fetch(`${ML_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(503).json({ error: 'Risk engine unavailable. Start the Python service on port 8000.' });
  }
});

app.post('/api/agent-check', async (req, res) => {
  try {
    const response = await fetch(`${ML_URL}/agent-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(503).json({ error: 'Risk engine unavailable.' });
  }
});

app.listen(5000, () => console.log('TrustPay backend running at http://localhost:5000'));
