const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Set the path to the database file
const dbPath = path.join(__dirname, 'users.db');
console.log('Database file path:', dbPath);
// Create a new database instance
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
    } else {
        console.log('Connected to the users database.');
        createTable();
    }
});

// Function to create a users table if it doesn't exist
function createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
	role TEXT
    )`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating table: ' + err.message);
        } else {
            console.log('Users table created or already exists.');
            insertUser(1, 'Administrator', 'TestPassw0rd', 'Administrator');
            insertUser(2, 'User2', 'TestPassw0rd', 'Customer Support');
	}
    });
}

// Function to insert a user into the users table
function insertUser(id, username, password, role) {
    // First, check if the user already exists
    const checkSql = `SELECT id FROM users WHERE username = ?`;

    db.get(checkSql, [username], (err, row) => {
        if (err) {
            console.error('Error checking user existence: ' + err.message);
            return;
        }

        // If the user does not exist, proceed with insertion
        if (!row) {
            const sql = `INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)`;

            db.run(sql, [id, username, password, role], function (err) {
                if (err) {
                    console.error('Error inserting user: ' + err.message);
                } else {
                    console.log(`User added with ID: ${this.lastID}`);
                }
            });
        } else {
            console.log('User already exists with ID:', row.id);
        }
    });
}

// Close the database connection when done (optional)
// db.close();

module.exports = db;

