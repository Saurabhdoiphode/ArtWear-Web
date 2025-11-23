const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'artwear323@gmail.com',
    pass: 'eydiusvxtyatfolh'
  }
});

app.post('/subscribe', async (req, res) => {
  const { email, mobile } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  if (!mobile) return res.status(400).json({ error: 'Mobile number required' });
  const mailOptions = {
    from: 'artwear323@gmail.com',
    to: 'artwear323@gmail.com',
    subject: 'New Subscription',
    text: `New subscriber:\nEmail: ${email}\nMobile: ${mobile}`
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

app.post('/contact', async (req, res) => {
  const { fullName, email, mobile, message } = req.body;
  if (!fullName || !email || !mobile || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const mailOptions = {
    from: 'artwear323@gmail.com',
    to: 'artwear323@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Contact Form Submission:\nName: ${fullName}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
