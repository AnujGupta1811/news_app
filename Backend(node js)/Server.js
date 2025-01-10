const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const crypto = require('crypto');
const app = express();

app.use(cors()); 
app.use(express.json());

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "news-website"
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// Registration route
app.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  if (typeof password !== 'string' || password.trim() === '') {
    return res.status(400).json({ error: 'Password must be a valid string' });
  }

  try {
    const [rows] = await con.promise().query('SELECT * FROM registration WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await con.promise().query('INSERT INTO registration (email, password) VALUES (?, ?)', [email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await con.promise().query('SELECT * FROM registration WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = generateRandomToken();

    res.status(200).json({ message: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

function generateRandomToken() {
  const token = crypto.randomBytes(32).toString('hex');
  return token;
}

const port = 3100;
app.listen(port, function () {
  console.log(`Node server is running at http://localhost:${port}/`);
});
