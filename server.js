const express = require('express');
const sgMail = require('@sendgrid/mail');
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

// Set your SendGrid API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/subscribe', async (req, res) => {
  const { email, mobile } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  if (!mobile) return res.status(400).json({ error: 'Mobile number required' });
  const msg = {
    to: email,
    from: 'artwear323@gmail.com', // Use a verified sender email in SendGrid
    subject: 'New Subscription',
    text: `Thank you for subscribing!\nYour details:\nEmail: ${email}\nMobile: ${mobile}`,
  };
  try {
    await sgMail.send(msg);
    console.log('Subscription email sent via SendGrid');
    res.json({ success: true });
  } catch (err) {
    console.error('SendGrid error:', err);
    res.status(500).json({ error: 'Failed to send subscription email', details: err.message });
  }
});

app.post('/contact', async (req, res) => {
  const { fullName, email, mobile, message } = req.body;
  if (!fullName || !email || !mobile || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const msg = {
    to: email,
    from: 'artwear323@gmail.com', // Use a verified sender email in SendGrid
    subject: 'Thank you for contacting ArtWear',
    text: `Dear ${fullName},\n\nThank you for reaching out! We have received your message:\n${message}\n\nWe will get back to you soon.\n\nYour details:\nEmail: ${email}\nMobile: ${mobile}`,
  };
  try {
    await sgMail.send(msg);
    console.log('Contact form email sent via SendGrid');
    res.json({ success: true });
  } catch (err) {
    console.error('SendGrid error:', err);
    res.status(500).json({ error: 'Failed to send contact form email', details: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
