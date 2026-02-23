from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Get API key from .env
openai.api_key = os.getenv("OPENAI_API_KEY")

expenses = []

@app.route("/add", methods=["POST"])
def add_expense():
    data = request.json
    expenses.append(data)
    return jsonify({"message": "Expense added"})

@app.route("/get", methods=["GET"])
def get_expenses():
    return jsonify(expenses)

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


if __name__ == "__main__":
    app.run(debug=True)