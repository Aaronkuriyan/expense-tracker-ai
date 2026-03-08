import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Search, Filter, MoreHorizontal, List, LayoutGrid, Calendar, ArrowUpRight } from 'lucide-react';

interface Expense {
  name: string;
  amount: number;
  date: string;
}

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { name: 'Auto', amount: 120, date: 'March 1, 2026' },
    { name: 'Puff + samosa', amount: 40, date: 'March 2, 2026' },
    { name: 'Juice', amount: 39, date: 'March 2, 2026' },
    { name: 'Snacks', amount: 390, date: 'March 4, 2026' },
    { name: 'Diet coke', amount: 37, date: 'March 7, 2026' },
    { name: 'Bus', amount: 50, date: 'March 7, 2026' },
    { name: 'Mandi', amount: 250, date: 'March 7, 2026' },
    { name: 'Lassi', amount: 30, date: 'March 7, 2026' },
    { name: 'Ice cream', amount: 113, date: 'March 7, 2026' },
  ]);

  // Dynamic Sum Calculation
  const totalSum = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-[#191919] text-[#FFFFFF] font-sans p-8 md:p-16 selection:bg-[#2383e2]/30">
      <div className="max-w-5xl mx-auto">
        
        <h1 className="text-4xl font-bold mb-6">Daily Expense Tracker</h1>

        {/* Instructions Collapsible */}
        <details className="group mb-10">
          <summary className="flex items-center gap-2 text-[#9B9B9B] cursor-pointer hover:bg-[#2C2C2C] w-fit p-1 rounded transition-colors list-none font-semibold">
            <ChevronDown size={18} className="group-open:rotate-180 transition-transform" />
            Instructions
          </summary>
          <div className="mt-4 ml-6 space-y-4">
            <div className="bg-[#2C2C2C] px-3 py-1 rounded-sm w-fit flex items-center gap-2 border border-[#313131]">
              <span className="text-[#EBAA40] font-bold text-xs tracking-widest uppercase">Maintain Below 5k</span>
              <span>🏦</span>
            </div>
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJpbmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/LdOyjZ7TC5K3LghXY8/giphy.gif" 
                 alt="Money GIF" className="w-24 rounded border border-[#2F2F2F]" />
          </div>
        </details>

        <h2 className="text-xl font-bold mb-4">2026 Expenses</h2>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-[#2F2F2F] mb-1 text-[#9B9B9B]">
          <div className="flex gap-4 text-sm">
            <button className="flex items-center gap-2 border-b-2 border-white text-white pb-2 px-1 font-medium"><List size={14}/> All</button>
            <button className="flex items-center gap-2 pb-2 px-1 hover:text-white transition-colors"><LayoutGrid size={14}/> Category</button>
            <button className="flex items-center gap-2 pb-2 px-1 hover:text-white transition-colors"><Calendar size={14}/> Calender</button>
          </div>
          <div className="flex gap-3 items-center mb-2">
            <Search size={16} className="cursor-pointer hover:text-white" />
            <button className="bg-[#2383e2] text-white px-3 py-1 rounded text-sm font-semibold flex items-center gap-1 hover:bg-[#1a6cc2]">
              New <ChevronDown size={14}/>
            </button>
          </div>
        </div>

        {/* Expense Grid Table */}
        <div className="w-full text-[14px]">
          {/* Header Row */}
          <div className="grid grid-cols-[2.5fr_1.2fr_1.5fr_1fr_1fr] border-b border-[#2F2F2F] text-[#9B9B9B] font-medium py-1.5">
            <div className="px-2 flex items-center gap-2 uppercase text-[11px] tracking-tight">Aa Detail</div>
            <div className="px-2 border-l border-[#2F2F2F] flex items-center gap-2 uppercase text-[11px] tracking-tight"># Amount</div>
            <div className="px-2 border-l border-[#2F2F2F] flex items-center gap-2 uppercase text-[11px] tracking-tight">📅 Date</div>
            <div className="px-2 border-l border-[#2F2F2F] uppercase text-[11px] tracking-tight">Payment</div>
            <div className="px-2 border-l border-[#2F2F2F] uppercase text-[11px] tracking-tight">Types</div>
          </div>

          {/* Table Data */}
          <div className="divide-y divide-[#252525]">
            {expenses.map((ex, i) => (
              <div key={i} className="grid grid-cols-[2.5fr_1.2fr_1.5fr_1fr_1fr] hover:bg-[#252525] group transition-colors">
                <div className="p-2 font-medium truncate">{ex.name}</div>
                <div className="p-2 border-l border-[#252525] font-mono">₹{ex.amount.toFixed(2)}</div>
                <div className="p-2 border-l border-[#252525] text-[#9B9B9B]">{ex.date}</div>
                <div className="p-2 border-l border-[#252525]"></div>
                <div className="p-2 border-l border-[#252525]"></div>
              </div>
            ))}
          </div>

          {/* Footer Sum Logic */}
          <div className="grid grid-cols-[2.5fr_1.2fr_1.5fr_1fr_1fr] pt-3">
            <div className="text-right pr-4 text-[10px] text-[#9B9B9B] uppercase font-bold tracking-widest pt-1">Sum</div>
            <div className="border-t border-[#2F2F2F] pt-1 font-bold text-[15px]">
              ₹{totalSum.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;