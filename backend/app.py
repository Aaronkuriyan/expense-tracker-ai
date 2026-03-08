from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Replace with your actual key
openai.api_key = "YOUR_OPENAI_API_KEY"

# Temporary in-memory storage (Use a database like SQLite for production)
expenses = []

@app.route('/api/categorize', methods=['POST'])
def categorize():
    data = request.json
    item_name = data.get('item')
    
    # Prompting OpenAI to return a single category
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": f"Categorize this expense into one word (Food, Transport, Bills, Shopping, or Entertainment): {item_name}"}]
    )
    category = response.choices[0].message.content.strip()
    return jsonify({"category": category})

@app.route('/api/expenses', methods=['GET', 'POST'])
def handle_expenses():
    if request.method == 'POST':
        expenses.append(request.json)
        return jsonify({"status": "success"}), 201
    return jsonify(expenses)

if __name__ == '__main__':
    app.run(debug=True, port=5000)