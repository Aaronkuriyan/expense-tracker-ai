import { useState } from "react"

type Expense = {
  id: number
  detail: string
  amount: number
  date: string
  payment: string
  type: string
  notes: string
}

export default function App() {

  const [expenses,setExpenses] = useState<Expense[]>([
    {
      id:1,
      detail:"Auto",
      amount:120,
      date:"2026-03-01",
      payment:"Cash",
      type:"Transport",
      notes:""
    },
    {
      id:2,
      detail:"Puff + samosa",
      amount:40,
      date:"2026-03-02",
      payment:"Cash",
      type:"Food",
      notes:"Bittu shop"
    }
  ])

  const [detail,setDetail] = useState("")
  const [amount,setAmount] = useState("")
  const [payment,setPayment] = useState("Cash")
  const [type,setType] = useState("Food")
  const [notes,setNotes] = useState("")

const addExpense = () => {

  if(!detail || !amount) return

  const today = new Date().toISOString().split("T")[0]

  const newExpense:Expense = {
    id: Date.now(),
    detail,
    amount: Number(amount),
    date: today,
    payment,
    type,
    notes
  }

  setExpenses([...expenses,newExpense])

  setDetail("")
  setAmount("")
  setNotes("")
}

  const deleteRow = (id:number)=>{
    setExpenses(expenses.filter(e=>e.id!==id))
  }

  const total = expenses.reduce((sum,e)=>sum+e.amount,0)

  return (

    <div className="min-h-screen bg-[#111] text-white p-10">

      <h1 className="text-4xl font-bold mb-4">
        Daily Expense Tracker
      </h1>

      <p className="text-gray-400 mb-8">
        Maintain below ₹5000 🪙
      </p>

      {/* Input Row */}

      <div className="flex gap-3 mb-6 flex-wrap">

        <input
          value={detail}
          onChange={(e)=>setDetail(e.target.value)}
          placeholder="Detail"
          className="bg-[#1b1b1b] border border-gray-700 p-2 rounded"
        />

        <input
          type="number"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
          placeholder="Amount"
          className="bg-[#1b1b1b] border border-gray-700 p-2 rounded"
        />

        <select
          value={payment}
          onChange={(e)=>setPayment(e.target.value)}
          className="bg-[#1b1b1b] border border-gray-700 p-2 rounded"
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
        </select>

        <select
          value={type}
          onChange={(e)=>setType(e.target.value)}
          className="bg-[#1b1b1b] border border-gray-700 p-2 rounded"
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <input
          value={notes}
          onChange={(e)=>setNotes(e.target.value)}
          placeholder="Notes"
          className="bg-[#1b1b1b] border border-gray-700 p-2 rounded"
        />

        <button
          onClick={addExpense}
          className="bg-blue-600 px-4 rounded hover:bg-blue-700"
        >
          Add
        </button>

      </div>


      {/* Table */}

      <div className="bg-[#181818] border border-gray-700 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1f1f1f] text-gray-400">

            <tr>
              <th className="p-3 text-left">Detail</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Notes</th>
              <th className="p-3 text-left"></th>
            </tr>

          </thead>

          <tbody>

{expenses.map(e => (

<tr
  key={e.id}
  className="border-t border-gray-800 hover:bg-[#202020]"
>

<td className="p-3">
<input
value={e.detail}
onChange={(ev)=>{
setExpenses(expenses.map(x =>
x.id===e.id ? {...x, detail:ev.target.value} : x
))
}}
className="bg-transparent"
/>
</td>

<td className="p-3">
<input
type="number"
value={e.amount}
onChange={(ev)=>{
setExpenses(expenses.map(x =>
x.id===e.id ? {...x, amount:Number(ev.target.value)} : x
))
}}
className="bg-transparent w-20"
/>
</td>

<td className="p-3">{e.date}</td>

<td className="p-3">
<select
value={e.payment}
onChange={(ev)=>{
setExpenses(expenses.map(x =>
x.id===e.id ? {...x, payment:ev.target.value} : x
))
}}
className="bg-transparent"
>
<option>Cash</option>
<option>UPI</option>
<option>Card</option>
</select>
</td>

<td className="p-3">
<select
value={e.type}
onChange={(ev)=>{
setExpenses(expenses.map(x =>
x.id===e.id ? {...x, type:ev.target.value} : x
))
}}
className="bg-transparent"
>
<option>Food</option>
<option>Transport</option>
<option>Shopping</option>
<option>Other</option>
</select>
</td>

<td className="p-3">
<input
value={e.notes}
onChange={(ev)=>{
setExpenses(expenses.map(x =>
x.id===e.id ? {...x, notes:ev.target.value} : x
))
}}
className="bg-transparent"
/>
</td>

<td className="p-3">
<button
onClick={()=>deleteRow(e.id)}
className="text-red-400"
>
Delete
</button>
</td>

</tr>

))}

          </tbody>

        </table>

        <div className="p-3 text-gray-400">
          SUM ₹{total}
        </div>

      </div>

    </div>

  )

}