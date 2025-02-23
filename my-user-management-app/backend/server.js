const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../sqlDB/db.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username });

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
    const sql = 'SELECT id, username, role FROM users ORDER by id';

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error querying database: ' + err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// Get user by ID endpoint
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id; 
    console.log('Received request to get user with ID:', userId);

    const sql = 'SELECT id, username, role FROM users WHERE id = ?'; 
    db.get(sql, [userId], (err, row) => {
        if (err) {
            console.error('Error retrieving user:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found' }); 
        }
        res.json(row); 
    });
});


// Define the /api/users endpoint
app.get('/api/users', (req, res) => {
    const sql = 'SELECT id, username, role FROM users ORDER BY id'

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error querying database: ' + err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows); 
    });
});


// Create user endpoint
app.post('/api/users', (req, res) => {
    const { username, password, role } = req.body;
    console.log('Received request to create user:', { username });

    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.run(sql, [username, password, role], function (err) {
        if (err) {
            console.error('Error inserting user:', err.message);
            return res.status(500).json({ error: 'Failed to create user' });
        }
        res.status(201).json({ message: 'User created', id: this.lastID });
    });
});

// Update user endpoint
app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, password, role } = req.body; 
    console.log('Received request to update user with ID:', userId);

    const sql = 'UPDATE users SET username = ?, password = ? , role = ? WHERE id = ?';

    db.run(sql, [username, password, role, userId], function (err) {
        if (err) {
            console.error('Error updating user:', err.message);
            return res.status(500).json({ error: 'Failed to update user' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' }); // User not found
        }
        res.status(200).json({ message: 'User updated successfully' });
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

// Delete all users endpoint
app.delete('/api/users', (req, res) => {
    console.log('Received request to delete all users');

    const sql = 'DELETE FROM users';

    db.run(sql, function (err) {
        if (err) {
            console.error('Error deleting users:', err.message);
            return res.status(500).json({ error: 'Failed to delete users' });
        }
        res.status(200).json({ message: 'All users deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

