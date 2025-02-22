const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path= require('path');
const db=require('../sqlDB/db.js');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });
    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (row) {
            return res.status(200).json({ message: 'Login successful!', username: row.username });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});


// Define the /api/users endpoint
app.get('/api/users', (req, res) => {
    const sql = 'SELECT id, username, password FROM users'; // Adjust according to your schema

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error querying database: ' + err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows); // Respond with the rows retrieved from the database
    });
});

// Create user endpoint
app.post('/api/users', (req, res) => {
    const { username, password } = req.body;
    console.log('Received request to create user:', { username });

    // Hash password before storing (consider using bcrypt here)

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';

    db.run(sql, [username, password], function (err) {
        if (err) {
            console.error('Error inserting user:', err.message);
            return res.status(500).json({ error: 'Failed to create user' });
        }
        res.status(201).json({ message: 'User created', id: this.lastID });
    });
});


// Delete user endpoint
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    console.log('Received request to delete user with ID:', userId);

    const sql = 'DELETE FROM users WHERE id = ?';

    db.run(sql, [userId], function (err) {
        if (err) {
            console.error('Error deleting user:', err.message);
            return res.status(500).json({ error: 'Failed to delete user' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


