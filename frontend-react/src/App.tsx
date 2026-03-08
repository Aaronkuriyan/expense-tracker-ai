import { useState } from "react"

type Expense = {
  detail: string
  amount: number
  date: string
}

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { detail: "Auto", amount: 120, date: "2026-03-01" },
    { detail: "Puff + samosa", amount: 40, date: "2026-03-02" },
    { detail: "Juice", amount: 39, date: "2026-03-02" },
    { detail: "Snacks", amount: 390, date: "2026-03-04" },
    { detail: "Diet coke", amount: 37, date: "2026-03-07" },
    { detail: "Bus", amount: 50, date: "2026-03-07" },
  ])

  const [detail, setDetail] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")

  const addExpense = () => {
    if (!detail || !amount || !date) return

    const newExpense = {
      detail,
      amount: Number(amount),
      date
    }

    setExpenses([...expenses, newExpense])

    setDetail("")
    setAmount("")
    setDate("")
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="min-h-screen bg-[#111] text-white p-10">

      <h1 className="text-4xl font-bold mb-6">
        Daily Expense Tracker
      </h1>

      <p className="mb-10 text-gray-400">
        Maintain below ₹5000 🪙
      </p>

      {/* Add expense */}
      <div className="flex gap-3 mb-6">

        <input
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Detail"
          className="bg-[#1a1a1a] p-2 rounded border border-gray-700"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="bg-[#1a1a1a] p-2 rounded border border-gray-700"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-[#1a1a1a] p-2 rounded border border-gray-700"
        />

        <button
          onClick={addExpense}
          className="bg-blue-500 px-4 rounded hover:bg-blue-600"
        >
          Add
        </button>

      </div>

      {/* Table */}
      <div className="bg-[#181818] rounded-xl overflow-hidden border border-gray-700">

        <table className="w-full">

          <thead className="bg-[#1f1f1f] text-gray-400">
            <tr>
              <th className="text-left p-3">Detail</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Date</th>
            </tr>
          </thead>

          <tbody>

            {expenses.map((e, i) => (
              <tr
                key={i}
                className="border-t border-gray-800 hover:bg-[#202020]"
              >
                <td className="p-3">{e.detail}</td>
                <td className="p-3">₹{e.amount}</td>
                <td className="p-3">{e.date}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-4 text-gray-400">
        SUM ₹{total}
      </div>

    </div>
  )
}