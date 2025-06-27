const express = require('express');

const router = express.Router();

// Hardcoded users for demonstration
const users = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' }
];

// POST /login
router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.status(200).json({ message: 'Login successful!' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
});
