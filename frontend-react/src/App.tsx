import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, ShoppingBag, Plus, Calendar, ArrowUpRight } from 'lucide-react';

interface Expense {
  name: string;
  amount: number;
  category: string;
  date: string;
}

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [form, setForm] = useState({ name: '', amount: '', category: 'Food' });

  useEffect(() => {
    fetch('http://localhost:5000/api/expenses')
      .then(res => res.json())
      .then(data => setExpenses(data));
  }, []);

  const totalSpent = expenses.reduce((sum, ex) => sum + ex.amount, 0);
  const topCategory = expenses.length > 0 ? 
    Object.entries(expenses.reduce((acc: any, ex) => {
      acc[ex.category] = (acc[ex.category] || 0) + ex.amount;
      return acc;
    }, {})).sort((a: any, b: any) => b[1] - a[1])[0][0] : "N/A";

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              ExpenseTracker AI
            </h1>
            <p className="text-slate-400 text-sm">Smart financial insights for your daily life.</p>
          </div>
          <div className="bg-slate-800/50 p-2 rounded-full border border-slate-700">
             <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">AK</div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl backdrop-blur-md">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400"><Wallet size={24} /></div>
              <span className="text-xs text-emerald-400 flex items-center bg-emerald-400/10 px-2 py-1 rounded-full"><ArrowUpRight size={12}/> +2.4%</span>
            </div>
            <p className="text-slate-400 text-sm uppercase tracking-wider">Total Spent (Month)</p>
            <h2 className="text-4xl font-bold mt-1">${totalSpent.toFixed(2)}</h2>
          </div>

          <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl backdrop-blur-md">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400"><TrendingUp size={24} /></div>
            </div>
            <p className="text-slate-400 text-sm uppercase tracking-wider">Top Category</p>
            <h2 className="text-4xl font-bold mt-1">{topCategory}</h2>
          </div>

          <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl backdrop-blur-md">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-400"><ShoppingBag size={24} /></div>
            </div>
            <p className="text-slate-400 text-sm uppercase tracking-wider">Transactions</p>
            <h2 className="text-4xl font-bold mt-1">{expenses.length}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1 bg-slate-800/60 p-6 rounded-2xl border border-slate-700 h-fit">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2"><Plus size={20}/> New Entry</h3>
            <div className="space-y-4">
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Item Name (e.g. Netflix)"
                onChange={e => setForm({...form, name: e.target.value})}
              />
              <input 
                type="number"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Amount ($)"
                onChange={e => setForm({...form, amount: e.target.value})}
              />
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                onChange={e => setForm({...form, category: e.target.value})}
              >
                <option value="Food">Food & Dining</option>
                <option value="Travel">Transport</option>
                <option value="Bills">Utilities & Bills</option>
                <option value="Shopping">Shopping</option>
              </select>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20">
                Add Expense
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2 bg-slate-800/30 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Recent Transactions</h3>
              <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 text-sm uppercase tracking-tighter">
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {expenses.map((ex, i) => (
                    <tr key={i} className="hover:bg-slate-700/20 transition-colors group">
                      <td className="px-6 py-4 font-medium text-slate-200">{ex.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300">
                          {ex.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{ex.date}</td>
                      <td className="px-6 py-4 text-right font-bold text-white">${ex.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;