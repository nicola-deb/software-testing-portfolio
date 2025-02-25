import sqlite3
from tabulate import tabulate


db_path = '../sqlDB/users.db'

def print_all_users():
    conn=sqlite3.connect(db_path)
    cursor=conn.cursor()

    sql='SELECT * FROM users'

    try:
        cursor.execute(sql)
        users = cursor.fetchall()

        if users:
            headers= ['ID', 'Username', 'Password' , 'Role' ]
            print(tabulate(users, headers=headers, tablefmt='grid'))
        else:
            print("No users found in the datacase.")

    except sqlite3.Error as e:
            print("Error fetching users:", e)
    finally:
        cursor.close()
        conn.close()

print_all_users()

