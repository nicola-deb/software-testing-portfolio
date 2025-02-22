import sqlite3
import os

# Set the path to the database file
db_path = '../sqlDB/users.db'  # Specify the absolute path

# Connect to the database
conn = None
try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    print('Connected to the database.')

    # Function to create the users table if it doesn't exist
    def create_table():
        sql = '''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL
                )'''
        cursor.execute(sql)
        conn.commit()
        print("Users table created or already exists.")

    # Create the users table
    create_table()

    # Function to find the next available user index
    def get_next_user_index():
        cursor.execute("SELECT COUNT(*) FROM users")
        count = cursor.fetchone()[0]
        return count + 1  # Start from the next number

    # Function to create a new user
    def create_user():
        user_index = get_next_user_index()
        username = f'User{user_index}'
        password = f'Pass{user_index}'

        sql = 'INSERT INTO users (username, password) VALUES (?, ?)'
        try:
            cursor.execute(sql, (username, password))
            conn.commit()
            print(f'User created: {username}, Password: {password}')
        except sqlite3.Error as e:
            print('Error inserting user:', e)

    # Ask for the number of users to create
    try:
        num_users_to_create = int(input("How many users do you want to create? "))
        for _ in range(num_users_to_create):
            create_user()  # Move this inside the input handling block
    except ValueError:
        print("Please enter a valid number.")
        exit()

except sqlite3.Error as e:
    print('Error connecting to database:', e)
finally:
    # Close the database connection
    if conn:
        conn.close()
        print('Database connection closed.')

