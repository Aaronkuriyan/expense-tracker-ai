import React, { useState, useEffect } from 'react';
import './App.css';

interface Expense {
  name: string;
  amount: number;
  category: string;
  date: string;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [form, setForm] = useState({ name: '', amount: '', category: 'General' });

  useEffect(() => {
    fetch('http://localhost:5000/api/expenses')
      .then(res => res.json())
      .then(data => setExpenses(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (response.ok) {
      // Refresh list
      window.location.reload();
    }
  };

  // Logic for your specific request:
  const currentMonth = new Date().getMonth();
  const monthlyExpenses = expenses.filter(ex => new Date(ex.date).getMonth() === currentMonth);
  const totalAmount = monthlyExpenses.reduce((sum, ex) => sum + ex.amount, 0);

  // Finding the highest spending category
  const categoryMap = monthlyExpenses.reduce((acc: any, ex) => {
    acc[ex.category] = (acc[ex.category] || 0) + ex.amount;
    return acc;
  }, {});
  
  const topCategory = Object.keys(categoryMap).reduce((a, b) => categoryMap[a] > categoryMap[b] ? a : b, "N/A");

  return (
    <div className="container">
      <h1>Expense Tracker AI</h1>
      
      <form onSubmit={handleSubmit} className="expense-form">
        <input placeholder="Item Name" onChange={e => setForm({...form, name: e.target.value})} />
        <input type="number" placeholder="Amount" onChange={e => setForm({...form, amount: e.target.value})} />
        <select onChange={e => setForm({...form, category: e.target.value})}>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
        </select>
        <button type="submit">Add Entry</button>
      </form>

      <table>
        <thead>
          <tr><th>Date</th><th>Item</th><th>Category</th><th>Amount</th></tr>
        </thead>
        <tbody>
          {monthlyExpenses.map((ex, i) => (
            <tr key={i}>
              <td>{ex.date}</td>
              <td>{ex.name}</td>
              <td>{ex.category}</td>
              <td>${ex.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}><strong>Total for this Month:</strong></td>
            <td><strong>${totalAmount.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>

      <div className="insights-box">
        <h3>Monthy Summary</h3>
        <p>You spent the most on <strong>{topCategory}</strong> this month.</p>
        <p><em>Pro Tip: Try reducing your {topCategory} expenses to save more!</em></p>
      </div>
    </div>
  );
}

export default App;