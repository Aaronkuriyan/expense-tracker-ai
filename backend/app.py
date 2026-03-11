from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib
import uuid

app = Flask(__name__)
CORS(app)

sessions = {}

def connect_db():
    return sqlite3.connect("expenses.db")

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data["username"]
    password = hash_password(data["password"])

    conn = connect_db()
    cur = conn.cursor()

    try:
        cur.execute("INSERT INTO users (username,password) VALUES (?,?)",
                    (username,password))
        conn.commit()
        return jsonify({"message":"User created"})
    except:
        return jsonify({"error":"User already exists"}),400


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    password = hash_password(data["password"])

    conn = connect_db()
    cur = conn.cursor()

    cur.execute("SELECT id FROM users WHERE username=? AND password=?",
                (username,password))
    user = cur.fetchone()

    if user:
        token = str(uuid.uuid4())
        sessions[token] = user[0]
        return jsonify({"token":token})

    return jsonify({"error":"Invalid credentials"}),401


@app.route("/add", methods=["POST"])
def add_expense():
    token = request.headers.get("Authorization")
    user_id = sessions.get(token)

    if not user_id:
        return jsonify({"error":"Unauthorized"}),401

    data = request.json

    conn = connect_db()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO expenses
        (user_id,detail,amount,date,payment,type,notes)
        VALUES (?,?,?,?,?,?,?)
    """,(
        user_id,
        data["detail"],
        data["amount"],
        data["date"],
        data["payment"],
        data["type"],
        data["notes"]
    ))

    conn.commit()
    return jsonify({"message":"Expense added"})


@app.route("/get", methods=["GET"])
def get_expenses():

    token = request.headers.get("Authorization")
    user_id = sessions.get(token)

    if not user_id:
        return jsonify({"error":"Unauthorized"}),401

    conn = connect_db()
    cur = conn.cursor()

    cur.execute("SELECT detail,amount,date,payment,type,notes FROM expenses WHERE user_id=?",
                (user_id,))
    rows = cur.fetchall()

    expenses = []

    for r in rows:
        expenses.append({
            "detail":r[0],
            "amount":r[1],
            "date":r[2],
            "payment":r[3],
            "type":r[4],
            "notes":r[5]
        })

    return jsonify(expenses)


if __name__ == "__main__":
    app.run(debug=True)