from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# 🔥 CORS FIX (IMPORTANT)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# 🔥 EXTRA HEADERS FIX (for Render + browser preflight)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

# 🔐 API KEY
openai.api_key = os.getenv("OPENAI_API_KEY")

# 📦 In-memory storage
expenses = []

# ➕ Add Expense
@app.route("/add", methods=["POST"])
def add_expense():
    data = request.json
    expenses.append(data)
    return jsonify({"message": "Expense added"})

# 📥 Get Expenses
@app.route("/get", methods=["GET"])
def get_expenses():
    return jsonify(expenses)

# 🤖 AI Insight
@app.route("/ai", methods=["POST"])
def ai_insight():
    data = request.json

    prompt = f"""
    Analyze this expense data and give short financial advice:
    {data}
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )

        return jsonify({
            "insight": response.choices[0].message.content
        })

    except Exception as e:
        return jsonify({"insight": "Error generating insight"})

# 🚀 Run app (Render compatible)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)