import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import Particles from "react-tsparticles";
import "chart.js/auto";

export default function App() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryColors: any = {
    Food: "bg-green-500",
    Travel: "bg-blue-500",
    Shopping: "bg-pink-500",
    Bills: "bg-yellow-500",
    Other: "bg-gray-500",
  };

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

  // 🔥 Add Expense
  const addExpense = async () => {
    if (!desc || !amount) return;

    const newExp = {
      desc,
      amount: Number(amount),
      category,
    };

    await fetch("http://localhost:5000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExp),
    });

    setExpenses([...expenses, newExp]);
    setDesc("");
    setAmount("");

    generateInsight();
  };

  // 🗑 Delete
  const deleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // 📥 Load data
  const loadExpenses = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/get");
    const data = await res.json();
    setExpenses(data);
    setLoading(false);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // 🤖 AI
  const generateInsight = async () => {
    const res = await fetch("http://localhost:5000/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData),
    });

    const data = await res.json();
    setInsight(data.insight);
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 text-white">

      {/* 🌌 PARTICLES BACKGROUND */}
      <Particles
        options={{
          background: { color: "#000" },
          particles: {
            number: { value: 60 },
            size: { value: 2 },
            move: { enable: true, speed: 0.5 },
            opacity: { value: 0.3 },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* SIDEBAR */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-black/40 backdrop-blur-xl p-6 border-r border-white/10"
      >
        <h2 className="text-2xl font-bold mb-6">💸 FinTrack</h2>
        <ul className="space-y-4 text-gray-300">
          {["Dashboard", "Analytics", "AI Insights"].map((item, i) => (
            <motion.li key={i} whileHover={{ scale: 1.1, x: 10 }}>
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
        >
          Dashboard
        </motion.h1>

        {/* INPUT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 p-4 rounded-xl mb-6 flex gap-3"
        >
          <input value={desc} onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            className="flex-1 bg-transparent border border-white/10 px-3 py-2 rounded"/>

          <input value={amount} onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Amount"
            className="w-32 bg-transparent border border-white/10 px-3 py-2 rounded"/>

          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="bg-transparent border border-white/10 px-3 py-2 rounded">
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Other</option>
          </select>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={addExpense}
            className="bg-green-500 px-4 rounded"
          >
            Add
          </motion.button>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* EXPENSES */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-4 rounded-xl"
          >
            <h2 className="mb-3 font-semibold">Expenses</h2>

            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-6 bg-white/10 rounded"></div>
                <div className="h-6 bg-white/10 rounded"></div>
                <div className="h-6 bg-white/10 rounded"></div>
              </div>
            ) : (
              expenses.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  className="flex justify-between items-center bg-white/10 p-2 rounded mb-2"
                >
                  <div>
                    <span className={`px-2 py-1 rounded text-xs ${categoryColors[e.category]}`}>
                      {e.category}
                    </span>
                    <p>{e.desc} - ₹{e.amount}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.3 }}
                    onClick={() => deleteExpense(i)}
                    className="text-red-400"
                  >
                    ✕
                  </motion.button>
                </motion.div>
              ))
            )}

            <h3 className="mt-4 font-bold">Total: ₹{total}</h3>
          </motion.div>

          {/* CHART */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-4 rounded-xl"
          >
            <Pie data={{
              labels: Object.keys(categoryData),
              datasets: [{ data: Object.values(categoryData) }]
            }} />
          </motion.div>

        </div>

        {/* AI */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white/5 p-4 rounded-xl"
        >
          <h2 className="font-semibold mb-2">🤖 AI Insight</h2>
          <p>{insight}</p>
        </motion.div>

      </div>
    </div>
  );
}