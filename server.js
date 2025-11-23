const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/subscribe', async (req, res) => {
  const { email, mobile } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  if (!mobile) return res.status(400).json({ error: 'Mobile number required' });
  // Email feature discarded
  res.json({ success: true, message: 'Subscription received. Email feature is disabled.' });
});

app.post('/contact', async (req, res) => {
  const { fullName, email, mobile, message } = req.body;
  if (!fullName || !email || !mobile || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }
  // Email feature discarded
  res.json({ success: true, message: 'Contact received. Email feature is disabled.' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
