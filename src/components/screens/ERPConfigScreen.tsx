import React, { useState } from 'react';

interface ERPConfigScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (path: string) => void;
}

export const ERPConfigScreen: React.FC<ERPConfigScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [sfrNorm, setSfrNorm] = useState('1:15');
  const [maxProfHours, setMaxProfHours] = useState(16);
  const [maxAsstHours, setMaxAsstHours] = useState(18);
  const [slaHours, setSlaHours] = useState(24);
  const [quorumThreshold, setQuorumThreshold] = useState(5);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Statutory ERP configuration saved & synchronized with university charter.');
  };

  return (
    <div className="flex flex-col w-full gap-6 font-body text-[13px] text-[#211a15]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#82746f] uppercase tracking-wider mb-1">
            <span onClick={() => onNavigate('overview-command')} className="hover:text-[#4c3023] cursor-pointer">Home</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-[#4c3023] font-bold">System & Settings</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-[#755a26] font-bold">ERP Configuration</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#4c3023] tracking-tight">
            System & Regulatory Parameters Setup
          </h1>
          <p className="text-[14px] text-[#504440] mt-1">
            Configure institutional AICTE/UGC workload limits, SLA window thresholds, and digital seal authorities.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-[#ffffff] p-6 rounded-2xl border border-[#e8e0d8] shadow-sm space-y-6 max-w-3xl">
        <h3 className="font-headline text-lg font-bold text-[#4c3023] pb-2 border-b border-[#f4e5dc]">
          Statutory Workload & Cadre Benchmarks
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Student-Faculty Ratio (SFR) Target</label>
            <input
              type="text"
              value={sfrNorm}
              onChange={(e) => setSfrNorm(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
            />
            <span className="text-[11px] text-[#82746f] mt-1 block">AICTE mandated ratio is 1:15</span>
          </div>

          <div>
            <label className="block font-semibold mb-1">Emergency Requisition SLA (Hours)</label>
            <input
              type="number"
              value={slaHours}
              onChange={(e) => setSlaHours(Number(e.target.value))}
              className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
            />
            <span className="text-[11px] text-[#82746f] mt-1 block">Dean review action window</span>
          </div>

          <div>
            <label className="block font-semibold mb-1">Professor Direct Instruction Max (Hrs/Wk)</label>
            <input
              type="number"
              value={maxProfHours}
              onChange={(e) => setMaxProfHours(Number(e.target.value))}
              className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Assistant Professor Direct Instruction Max (Hrs/Wk)</label>
            <input
              type="number"
              value={maxAsstHours}
              onChange={(e) => setMaxAsstHours(Number(e.target.value))}
              className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Selection Board Quorum Quota</label>
            <input
              type="number"
              value={quorumThreshold}
              onChange={(e) => setQuorumThreshold(Number(e.target.value))}
              className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
            />
            <span className="text-[11px] text-[#82746f] mt-1 block">Min committee members for statutory sitting</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#faebe2] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#755a26] text-[22px]">security</span>
          <div>
            <div className="font-bold text-[#4c3023]">Cryptographic Seal Ledger Status: Online</div>
            <div className="text-[12px] text-[#504440]">Digital Signature Key RSA-4096 is active for Pro-Chancellor and Deanery chambers.</div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#4c3023] text-[#ffffff] font-bold text-[13px] hover:bg-[#654638] shadow-sm"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
