import sqlite3

db_path = '../sqlDB/users.db'

def delete_all_users():
    conn = sqlite3.connect(db_path)
    cursor=conn.cursor()

    sql = "DELETE FROM users"

    try:
        cursor.execute(sql)
        conn.commit()
        print("All users deleted successfully")
    except sqlite3.Error as e:
        print("Error deleting users:",e)
    finally:
        cursor.close()
        conn.close()

delete_all_users()
