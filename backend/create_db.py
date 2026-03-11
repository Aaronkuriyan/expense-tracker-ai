import sqlite3

# create database file
conn = sqlite3.connect("expenses.db")

cur = conn.cursor()

# USERS TABLE
cur.execute("""
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)
""")

# EXPENSES TABLE
cur.execute("""
CREATE TABLE IF NOT EXISTS expenses(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    detail TEXT,
    amount REAL,
    date TEXT,
    payment TEXT,
    type TEXT,
    notes TEXT
)
""")

conn.commit()
conn.close()

print("Database created successfully!")