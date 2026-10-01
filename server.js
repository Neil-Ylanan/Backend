const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Happy200421',
  database: 'my_database'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

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

  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      message: `Thank you ${name}, we received your message!`,
      insertedId: result.insertId
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});