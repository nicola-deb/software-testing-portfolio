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
            insertUser();
        }
    });
}

// Function to insert a user into the users table
function insertUser() {
    const id = 1;
    const username = 'Administrator';  
    const password = 'AdminPassword'; 
    const role= 'Administrator';

    // First, check if the user already exists
    const checkSql = `SELECT id FROM users WHERE username = ?`;

    db.get(checkSql, [username], (err, row) => {
        if (err) {
            console.error('Error checking user existence: ' + err.message);
            return;
        }

        // If row is null, the user does not exist; proceed with insertion
        if (!row) {
            const sql = `INSERT INTO users (username, password,role) VALUES (?, ?, ?)`;

            db.run(sql, [username, password, role], function (err) {
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

