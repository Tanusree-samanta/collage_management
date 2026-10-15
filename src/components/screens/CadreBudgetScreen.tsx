import React, { useState } from 'react';

interface CadreBudgetScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (path: string) => void;
}

export const CadreBudgetScreen: React.FC<CadreBudgetScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [selectedFiscalYear, setSelectedFiscalYear] = useState('AY 2025-26');

  const budgetBands = [
    { band: 'Pay Level 14 / 14A', title: 'Professors & Chairs', posts: 14, occupied: 12, monthlyOutflow: '₹24,80,000', annualCapex: '₹2,97,60,000', delta: '+3.2%' },
    { band: 'Pay Level 13A1 / 13A2', title: 'Associate Professors', posts: 37, occupied: 34, monthlyOutflow: '₹48,20,000', annualCapex: '₹5,78,40,000', delta: '+4.8%' },
    { band: 'Pay Level 10 / 11 / 12', title: 'Assistant Professors', posts: 89, occupied: 82, monthlyOutflow: '₹72,40,000', annualCapex: '₹8,68,80,000', delta: '+6.1%' },
    { band: 'Level 15 Apex', title: 'Deanery & University Leadership', posts: 8, occupied: 7, monthlyOutflow: '₹18,50,000', annualCapex: '₹2,22,00,000', delta: '0.0%' }
  ];

  return (
    <div className="flex flex-col w-full gap-6 font-body text-[13px] text-[#211a15]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#82746f] uppercase tracking-wider mb-1">
            <span onClick={() => onNavigate('overview-command')} className="hover:text-[#4c3023] cursor-pointer">Home</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-[#4c3023] font-bold">Manpower Planning</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-[#755a26] font-bold">Cadre & Budgeting</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#4c3023] tracking-tight">
            Institutional Cadre Strength & Financial Outlay
          </h1>
          <p className="text-[14px] text-[#504440] mt-1">
            Fiscal Year 2025–26 salary reserve allocation, pay band ceilings, and UGC 7th CPC compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedFiscalYear}
            onChange={(e) => setSelectedFiscalYear(e.target.value)}
            className="h-10 px-3 rounded-xl bg-[#ffffff] border border-[#d4c3bd] text-[12px] font-semibold"
          >
            <option>AY 2025-26</option>
            <option>AY 2024-25</option>
            <option>AY 2023-24</option>
          </select>
          <button
            onClick={() => onShowToast('Exporting Budget Ledger CSV...')}
            className="px-4 py-2 rounded-xl bg-[#4c3023] text-[#ffffff] font-bold text-[12px] shadow-sm hover:bg-[#654638]"
          >
            Export Fiscal Ledger
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e8e0d8] shadow-sm">
          <span className="text-[11px] text-[#82746f] uppercase font-bold">Total Annual Salary Outflow</span>
          <div className="font-headline text-3xl font-bold text-[#4c3023] mt-1">₹19.66 Cr</div>
          <div className="text-[12px] text-[#755a26] font-semibold mt-1">94.6% of Approved Capex Reserve</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e8e0d8] shadow-sm">
          <span className="text-[11px] text-[#82746f] uppercase font-bold">Sanctioned Cadre Posts</span>
          <div className="font-headline text-3xl font-bold text-[#755a26] mt-1">148 / 160</div>
          <div className="text-[12px] text-[#287a55] font-semibold mt-1">12 Posts Buffer in Reserve</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e8e0d8] shadow-sm">
          <span className="text-[11px] text-[#82746f] uppercase font-bold">Current Vacancy Cost Savings</span>
          <div className="font-headline text-3xl font-bold text-[#ba1a1a] mt-1">₹1.42 Cr</div>
          <div className="text-[12px] text-[#504440] mt-1">Reallocated to Research Grants</div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-[#ffffff] rounded-2xl border border-[#e8e0d8] shadow-sm overflow-hidden p-5">
        <h2 className="font-headline text-lg font-bold text-[#4c3023] mb-4">
          Pay Scale Tier Distribution & Annual Allocation
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#f4e5dc] text-[#4c3023] font-bold text-[12px]">
                <th className="py-3 px-4">Pay Band Tier</th>
                <th className="py-3 px-4">Cadre Designation</th>
                <th className="py-3 px-3 text-center">Sanctioned</th>
                <th className="py-3 px-3 text-center">Occupied</th>
                <th className="py-3 px-4">Monthly Outflow</th>
                <th className="py-3 px-4 text-right">Annual Allocation</th>
                <th className="py-3 px-3 text-center">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4e5dc]">
              {budgetBands.map((b, idx) => (
                <tr key={idx} className="hover:bg-[#fff1e9] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#4c3023]">{b.band}</td>
                  <td className="py-3 px-4 font-semibold text-[#211a15]">{b.title}</td>
                  <td className="py-3 px-3 text-center font-bold">{b.posts}</td>
                  <td className="py-3 px-3 text-center">{b.occupied}</td>
                  <td className="py-3 px-4 text-[#504440]">{b.monthlyOutflow}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#4c3023]">{b.annualCapex}</td>
                  <td className="py-3 px-3 text-center text-[#755a26] font-semibold">{b.delta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
