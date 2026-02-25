import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const API = "https://expense-tracker-api.onrender.com";

export default function App() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryData: any = {
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses.forEach((e) => {
    categoryData[e.category] += e.amount;
  });

  // 📥 Load expenses
  const loadExpenses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/get`);
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error("Error loading expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // ➕ Add expense
  const addExpense = async () => {
    if (!desc || !amount) return;

    const newExp = {
      desc,
      amount: Number(amount),
      category,
    };

    try {
      await fetch(`${API}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExp),
      });

      setDesc("");
      setAmount("");
      loadExpenses();
      generateInsight();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  // 🤖 AI Insight
  const generateInsight = async () => {
    try {
      const res = await fetch(`${API}/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      const data = await res.json();
      setInsight(data.insight);
    } catch (err) {
      console.error("AI error:", err);
    }
  };

  // 🗑 Delete (frontend only)
  const deleteExpense = (index: number) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 text-white p-6">

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        💸 Expense Tracker AI
      </motion.h1>

      {/* INPUT */}
      <div className="bg-white/5 p-4 rounded-xl mb-6 flex gap-3 flex-wrap">
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="flex-1 bg-transparent border border-white/10 px-3 py-2 rounded text-white placeholder-gray-400"
        />

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Amount"
          className="w-32 bg-transparent border border-white/10 px-3 py-2 rounded text-white placeholder-gray-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-transparent border border-white/10 px-3 py-2 rounded text-white"
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>

        <button
          onClick={addExpense}
          className="bg-green-500 px-4 py-2 rounded hover:scale-105"
        >
          Add
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* EXPENSES */}
        <div className="bg-white/5 p-4 rounded-xl">
          <h2 className="mb-3 font-semibold">Expenses</h2>

          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-6 bg-white/10 rounded"></div>
              <div className="h-6 bg-white/10 rounded"></div>
              <div className="h-6 bg-white/10 rounded"></div>
            </div>
          ) : (
            expenses.map((e, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white/10 p-2 rounded mb-2"
              >
                <div>
                  <p>{e.category} | {e.desc} - ₹{e.amount}</p>
                </div>

                <button
                  onClick={() => deleteExpense(i)}
                  className="text-red-400"
                >
                  ✕
                </button>
              </div>
            ))
          )}

          <h3 className="mt-4 font-bold">Total: ₹{total}</h3>
        </div>

        {/* CHART */}
        <div className="bg-white/5 p-4 rounded-xl">
          <Pie
            data={{
              labels: Object.keys(categoryData),
              datasets: [
                {
                  data: Object.values(categoryData),
                },
              ],
            }}
          />
        </div>
      </div>

      {/* AI */}
      <div className="mt-6 bg-white/5 p-4 rounded-xl">
        <h2 className="font-semibold mb-2">🤖 AI Insight</h2>
        <p>{insight}</p>
      </div>
    </div>
  );
}