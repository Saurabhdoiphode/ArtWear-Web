const express = require('express');
const nodemailer = require('nodemailer');
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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'artwear323@gmail.com',
    pass: 'axzu tjnc apsk abul'
  }
});

// Test transporter on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Nodemailer transporter error:', error);
  } else {
    console.log('Nodemailer transporter is ready to send emails');
  }
});

app.post('/subscribe', async (req, res) => {
  const { email, mobile } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  if (!mobile) return res.status(400).json({ error: 'Mobile number required' });
  const mailOptions = {
    from: 'artwear323@gmail.com',
    to: email, // send to the subscriber's email
    subject: 'New Subscription',
    text: `Thank you for subscribing!\nYour details:\nEmail: ${email}\nMobile: ${mobile}`
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Subscription email sent:', info.response);
    res.json({ success: true });
  } catch (err) {
    console.error('Subscription email error:', err);
    res.status(500).json({ error: 'Failed to send subscription email', details: err.message });
  }
});

app.post('/contact', async (req, res) => {
  const { fullName, email, mobile, message } = req.body;
  if (!fullName || !email || !mobile || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const mailOptions = {
    from: 'artwear323@gmail.com',
    to: email, // send to the contact's email
    subject: 'Thank you for contacting ArtWear',
    text: `Dear ${fullName},\n\nThank you for reaching out! We have received your message:\n${message}\n\nWe will get back to you soon.\n\nYour details:\nEmail: ${email}\nMobile: ${mobile}`
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact form email sent:', info.response);
    res.json({ success: true });
  } catch (err) {
    console.error('Contact form email error:', err);
    res.status(500).json({ error: 'Failed to send contact form email', details: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
