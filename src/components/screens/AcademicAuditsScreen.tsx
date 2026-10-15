import React from 'react';

interface AcademicAuditsScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (path: string) => void;
}

export const AcademicAuditsScreen: React.FC<AcademicAuditsScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  return (
    <div className="flex flex-col w-full gap-6 font-body text-[13px] text-[#211a15]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#82746f] uppercase tracking-wider mb-1">
            <span onClick={() => onNavigate('overview-command')} className="hover:text-[#4c3023] cursor-pointer">Home</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-[#4c3023] font-bold">Academic Audits</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-[#755a26] font-bold">NAAC & NIRF Records</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#4c3023] tracking-tight">
            Accreditation Intelligence & NAAC Criteria 2.4 Ledgers
          </h1>
          <p className="text-[14px] text-[#504440] mt-1">
            Teacher quality, doctoral faculty density, and Student-to-Faculty Ratio (SFR) calibrations for cycle 2 peer evaluation.
          </p>
        </div>

        <button
          onClick={() => onShowToast('Exporting NAAC SSR Self Study Report (Criteria 2)...')}
          className="px-4 py-2 rounded-xl bg-[#4c3023] text-[#ffffff] font-bold text-[12px] shadow-sm hover:bg-[#654638]"
        >
          Download SSR Audit Report
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e8e0d8] shadow-sm">
          <span className="text-[11px] text-[#82746f] uppercase font-bold">Projected NAAC Score</span>
          <div className="font-headline text-3xl font-bold text-[#4c3023] mt-1">3.88 / 4.00</div>
          <div className="text-[12px] text-[#287a55] font-semibold mt-1">A++ Grade Benchmark Met</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e8e0d8] shadow-sm">
          <span className="text-[11px] text-[#82746f] uppercase font-bold">Ph.D. Qualified Density</span>
          <div className="font-headline text-3xl font-bold text-[#755a26] mt-1">78.4%</div>
          <div className="text-[12px] text-[#82746f] mt-1">Target 85% by December audit</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e8e0d8] shadow-sm">
          <span className="text-[11px] text-[#82746f] uppercase font-bold">Institutional SFR Index</span>
          <div className="font-headline text-3xl font-bold text-[#4c3023] mt-1">1:15.4</div>
          <div className="text-[12px] text-[#ba1a1a] font-semibold mt-1">AICTE Ceiling: 1:15.0</div>
        </div>
      </div>

      {/* Criteria Breakdown */}
      <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e8e0d8] shadow-sm space-y-4">
        <h3 className="font-headline text-lg font-bold text-[#4c3023]">
          Criteria 2.4 - Teacher Quality & Profile Statutory Calibration
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#fff1e9] border border-[#e8e0d8] space-y-2">
            <span className="font-bold text-[#4c3023] block text-[13px]">
              2.4.1 Average Percentage of Full-Time Teachers against Sanctioned Posts
            </span>
            <div className="text-2xl font-bold font-headline text-[#755a26]">92.5%</div>
            <p className="text-[12px] text-[#504440]">
              148 in-position teachers against 160 university sanctioned posts. Compliance clearance certified.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#fff1e9] border border-[#e8e0d8] space-y-2">
            <span className="font-bold text-[#4c3023] block text-[13px]">
              2.4.2 Percentage of Full-Time Teachers with Ph.D. / D.Sc. / D.Litt.
            </span>
            <div className="text-2xl font-bold font-headline text-[#755a26]">78.4%</div>
            <p className="text-[12px] text-[#504440]">
              104 of 134 surveyed engineering faculty possess earned doctorates from UGC-recognized or global universities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
