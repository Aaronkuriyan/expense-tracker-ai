import React, { useState, useEffect } from 'react';

interface Expense {
  name: string;
  amount: number;
  category: string;
  date: string;
}

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  // 1. Auto-Categorize when user finishes typing the name
  const handleAutoCategorize = async () => {
    if (!name) return;
    const res = await fetch('http://localhost:5000/api/categorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: name }),
    });
    const data = await res.json();
    setCategory(data.category);
  };

  const addExpense = async () => {
    const newExpense = { name, amount: parseFloat(amount), category, date: new Date().toISOString() };
    await fetch('http://localhost:5000/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense),
    });
    setExpenses([...expenses, newExpense]);
    setName(''); setAmount(''); setCategory('');
  };

  // 2. Calculate Monthly Total
  const currentMonthTotal = expenses.reduce((sum, item) => sum + item.amount, 0);

  // 3. Find Top Category
  const categoryTotals = expenses.reduce((acc: any, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});
  const topCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b, 'None');

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Expense Tracker AI 🚀</h1>
      
      <div className="input-group">
        <input placeholder="What did you buy?" value={name} onChange={(e) => setName(e.target.value)} onBlur={handleAutoCategorize} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
        </select>
        <button onClick={addExpense}>Add Entry</button>
      </div>

      <table border={1} style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr><th>Date</th><th>Item</th><th>Category</th><th>Amount</th></tr>
        </thead>
        <tbody>
          {expenses.map((exp, i) => (
            <tr key={i}>
              <td>{new Date(exp.date).toLocaleDateString()}</td>
              <td>{exp.name}</td>
              <td>{exp.category}</td>
              <td>${exp.amount.toFixed(2)}</td>
            </tr>
          ))}
          <tr style={{ fontWeight: 'bold', background: '#f0f0f0' }}>
            <td colSpan={3}>Monthly Total</td>
            <td>${currentMonthTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
        <h3>Monthly Insights</h3>
        <p>You spent the most on <strong>{topCategory}</strong> this month.</p>
      </div>
    </div>
  );
};

export default App;