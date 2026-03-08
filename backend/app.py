import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dotenv import load_dotenv
import openai

# Load variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database Setup
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'expenses.db')
db = SQLAlchemy(app)

# Secure API Key
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    amount = db.Column(db.Float)
    category = db.Column(db.String(50))
    date = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.order_by(Expense.date.desc()).all()
    return jsonify([{
        "id": e.id,
        "name": e.name,
        "amount": e.amount,
        "category": e.category,
        "date": e.date.strftime("%Y-%m-%d")
    } for e in expenses])

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.json
    new_exp = Expense(
        name=data['name'],
        amount=data['amount'],
        category=data['category']
    )
    db.session.add(new_exp)
    db.session.commit()
    return jsonify({"message": "Success"}), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)