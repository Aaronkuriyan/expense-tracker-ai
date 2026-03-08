import { useState } from "react"
import { Pie } from "react-chartjs-2"
import "chart.js/auto"

type Expense = {
  id:number
  detail:string
  amount:number
  date:string
  category:string
}

export default function App(){

const [expenses,setExpenses] = useState<Expense[]>([
{id:1,detail:"Auto",amount:120,date:"2026-03-01",category:"Transport"},
{id:2,detail:"Puff + samosa",amount:40,date:"2026-03-02",category:"Food"},
{id:3,detail:"Juice",amount:39,date:"2026-03-02",category:"Food"},
{id:4,detail:"Snacks",amount:390,date:"2026-03-04",category:"Food"},
])

const [detail,setDetail] = useState("")
const [amount,setAmount] = useState("")
const [date,setDate] = useState("")
const [category,setCategory] = useState("Food")

const budget = 5000

const addExpense = () =>{

if(!detail || !amount || !date) return

const newExpense:Expense = {
id:Date.now(),
detail,
amount:Number(amount),
date,
category
}

setExpenses([...expenses,newExpense])

setDetail("")
setAmount("")
setDate("")
}

const deleteRow = (id:number)=>{
setExpenses(expenses.filter(e=>e.id!==id))
}

const total = expenses.reduce((sum,e)=>sum+e.amount,0)

const categoryTotals:any = {
Food:0,
Transport:0,
Shopping:0,
Other:0
}

expenses.forEach(e=>{
categoryTotals[e.category]+=e.amount
})

const progress = (total/budget)*100

const tagColor=(cat:string)=>{

if(cat==="Food") return "bg-green-600"
if(cat==="Transport") return "bg-blue-600"
if(cat==="Shopping") return "bg-purple-600"

return "bg-gray-600"
}

return(

<div className="min-h-screen bg-[#111] text-white p-10">

<h1 className="text-4xl font-bold mb-4">
Daily Expense Tracker
</h1>

<p className="text-gray-400 mb-6">
Maintain below ₹5000 🪙
</p>

{/* Budget Bar */}

<div className="mb-10">

<div className="flex justify-between mb-1">
<span>Budget Usage</span>
<span>₹{total} / ₹{budget}</span>
</div>

<div className="w-full bg-gray-800 rounded h-3">
<div
style={{width:`${progress}%`}}
className="bg-green-500 h-3 rounded"
/>
</div>

</div>

{/* Input */}

<div className="flex gap-3 mb-8 flex-wrap">

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

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
className="bg-[#1b1b1b] border border-gray-700 p-2 rounded"
/>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="bg-[#1b1b1b] border border-gray-700 p-2 rounded"
>
<option>Food</option>
<option>Transport</option>
<option>Shopping</option>
<option>Other</option>
</select>

<button
onClick={addExpense}
className="bg-blue-600 px-4 rounded hover:bg-blue-700"
>
Add
</button>

</div>

{/* Layout */}

<div className="grid grid-cols-2 gap-10">

{/* Table */}

<div className="bg-[#181818] border border-gray-700 rounded-xl overflow-hidden">

<table className="w-full">

<thead className="bg-[#1f1f1f] text-gray-400">

<tr>
<th className="text-left p-3">Detail</th>
<th className="text-left p-3">Amount</th>
<th className="text-left p-3">Date</th>
<th className="text-left p-3">Category</th>
<th className="text-left p-3"></th>
</tr>

</thead>

<tbody>

{expenses.map(e=>(

<tr
key={e.id}
className="border-t border-gray-800 hover:bg-[#202020]"
>

<td className="p-3">{e.detail}</td>

<td className="p-3">₹{e.amount}</td>

<td className="p-3">{e.date}</td>

<td className="p-3">
<span className={`px-2 py-1 rounded text-xs ${tagColor(e.category)}`}>
{e.category}
</span>
</td>

<td className="p-3">
<button
onClick={()=>deleteRow(e.id)}
className="text-red-400 hover:text-red-500"
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

{/* Chart */}

<div className="bg-[#181818] border border-gray-700 rounded-xl p-6">

<h2 className="text-xl mb-4">
Expense Analytics
</h2>

<Pie
data={{
labels:Object.keys(categoryTotals),
datasets:[
{
data:Object.values(categoryTotals)
}
]
}}
/>

</div>

</div>

{/* AI Insight */}

<div className="mt-10 bg-[#181818] border border-gray-700 rounded-xl p-6">

<h2 className="text-xl mb-3">
AI Financial Insight
</h2>

<p className="text-gray-400">
You are spending most on food. Consider setting a weekly food budget to maintain financial balance.
</p>

</div>

</div>

)

}