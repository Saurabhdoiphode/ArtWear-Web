const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Use a free SMTP service like Gmail (for demo purposes)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'artwear323@gmail.com', // Your Gmail address
    pass: 'YOUR_APP_PASSWORD'      // Gmail App Password (not your regular password)
  }
});

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const mailOptions = {
    from: 'artwear323@gmail.com',
    to: 'artwear323@gmail.com',
    subject: 'New Subscription',
    text: `New subscriber: ${email}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
