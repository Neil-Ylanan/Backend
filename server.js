const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to My Backend Server!');
});

app.get('/api/user', (req, res) => {
  res.json({ name: "Neil YLanan", email: "john@example.com" });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!email.includes('@')) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  res.json({
    message: `Thank you ${name}, we received your message!`,
    data: { name, email, message }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});