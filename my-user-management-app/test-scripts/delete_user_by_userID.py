import sqlite3

db_path = '../sqlDB/users.db'

def delete_user_by_id(user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Check if the users table exists
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
    if cursor.fetchone() is None:
        print("The 'users' table does not exist.")
        return

    sql = "DELETE FROM users WHERE id = ?"

    try:
        cursor.execute(sql, (user_id,))
        conn.commit()
        
        if cursor.rowcount > 0:
            print(f"User with ID {user_id} deleted successfully.")
        else:
            print(f"No user found with ID {user_id}.")
    except sqlite3.Error as e:
        print("Error deleting user:", e)
    finally:
        cursor.close()
        conn.close()

def main():
    user_id = input("Enter the ID of the user you want to delete: ")
    
    # Validate input
    if not user_id.isdigit():
        print("Please enter a valid numeric ID.")
        return

    delete_user_by_id(int(user_id))

if __name__ == "__main__":
    main()

