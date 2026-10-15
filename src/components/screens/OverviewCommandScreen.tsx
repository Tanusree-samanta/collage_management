import React, { useState } from 'react';
import { Department, RequisitionDocket, DEPARTMENTS_DATA, INITIAL_REQUISITION_DOCKETS, UserRole } from '../../data/mockData';

interface OverviewCommandScreenProps {
  onNavigate: (path: string) => void;
  onRoleChange: (role: UserRole) => void;
  onOpenDossier: (dept: Department) => void;
  onOpenEmergencyModal: () => void;
  onOpenHearingModal: (panel: string) => void;
  onShowToast: (msg: string) => void;
}

export const OverviewCommandScreen: React.FC<OverviewCommandScreenProps> = ({
  onNavigate,
  onRoleChange,
  onOpenDossier,
  onOpenEmergencyModal,
  onOpenHearingModal,
  onShowToast
}) => {
  const [requisitions, setRequisitions] = useState<RequisitionDocket[]>(INITIAL_REQUISITION_DOCKETS);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  const handleApproveRequisition = (reqId: string, title: string) => {
    setRequisitions((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'Approved' } : r))
    );
    onShowToast(`Requisition "${title}" approved and forwarded to Head HR for cadre verification.`);
  };

  const handleClarifyRequisition = (title: string) => {
    onShowToast(`Clarification memo sent to department HOD for "${title}". SLA paused.`);
  };

  const handleRejectRequisition = (title: string) => {
    setRequisitions((prev) =>
      prev.map((r) => (r.id === title ? { ...r, status: 'Rejected' } : r))
    );
    onShowToast(`Requisition "${title}" returned with Deanery audit notes.`);
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Subtle Ambient Glow */}
      <div className="absolute -top-10 -right-8 w-96 h-96 bg-[#e5c183]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-48 left-1/4 w-80 h-80 bg-[#ffdbcc]/25 rounded-full blur-2xl pointer-events-none"></div>

      {/* Operational Header Area */}
      <div className="relative flex flex-col gap-4 mb-6">
        {/* Breadcrumb Bar & Timestamps */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[#82746f]">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-body">
            <span
              onClick={() => onNavigate('overview-command')}
              className="hover:text-[#4c3023] transition-colors cursor-pointer"
            >
              Home
            </span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-[#4c3023] transition-colors cursor-pointer">Dean of School</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#4c3023] font-bold">Overview</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-[#fdd897] text-[#785c28] text-[10px] font-bold tracking-tight">
              AY 2025-26 ODD TERM
            </span>
          </div>

          <div className="flex items-center gap-3 text-[12px] text-[#82746f]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#755a26]"></span>
              Cadre Audit Cycle: Active
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="hidden sm:inline">Last Sync: Today, 11:42 AM IST</span>
          </div>
        </div>

        {/* Title & Primary CTA Canvas */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-1">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#755a26] font-bold uppercase tracking-widest font-body">
                Executive Cockpit
              </span>
              <span className="text-[#82746f] text-xs">/</span>
              <span className="text-[12px] text-[#504440] font-semibold font-body">
                TNU West Bengal Campus
              </span>
            </div>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#4c3023] tracking-tight">
              School Staffing, Manpower & Academic Workload Command
            </h1>
            <p className="text-[14px] text-[#504440] font-body leading-relaxed">
              Authority oversight for <strong className="text-[#4c3023] font-semibold">School of Engineering & Technology</strong>. Enforce AICTE teacher-student ratio, authorize faculty requisitions, and calibrate NAAC Criteria 2.4 cadre metrics.
            </p>
          </div>

          {/* Master Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 relative">
            <div className="relative">
              <button
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
                className="group flex items-center gap-2 px-4 h-10 rounded-xl bg-[#ffffff] text-[#4c3023] shadow-sm hover:bg-[#f4e5dc] border border-[#e8e0d8] transition-all font-semibold text-[13px]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-[#755a26] group-hover:scale-110 transition-transform">
                  ios_share
                </span>
                <span>Export Cadre Report</span>
                <span className="material-symbols-outlined text-[16px] text-[#82746f]">arrow_drop_down</span>
              </button>

              {exportMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#ffffff] shadow-xl border border-[#e8e0d8] py-1.5 z-30 animate-in fade-in">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase text-[#82746f]">Select Report Format</div>
                  <button
                    onClick={() => {
                      setExportMenuOpen(false);
                      onShowToast('Exporting Cadre Summary PDF (AICTE/UGC format)...');
                    }}
                    className="w-full text-left px-3 py-2 text-[13px] text-[#211a15] hover:bg-[#fff1e9] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">picture_as_pdf</span>
                    <span>Executive Cadre Summary (PDF)</span>
                  </button>
                  <button
                    onClick={() => {
                      setExportMenuOpen(false);
                      onShowToast('Exporting Department Load Matrix Spreadsheet (.xlsx)...');
                    }}
                    className="w-full text-left px-3 py-2 text-[13px] text-[#211a15] hover:bg-[#fff1e9] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#287a55]">table_chart</span>
                    <span>Workload Audit Ledger (XLSX)</span>
                  </button>
                  <button
                    onClick={() => {
                      setExportMenuOpen(false);
                      onShowToast('Generating NAAC Criterion 2.4 SSR XML export...');
                    }}
                    className="w-full text-left px-3 py-2 text-[13px] text-[#211a15] hover:bg-[#fff1e9] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#755a26]">data_object</span>
                    <span>NAAC SSR Data Export (JSON)</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onOpenEmergencyModal}
              className="flex items-center gap-2 px-4 h-10 rounded-xl bg-[#4c3023] text-[#ffffff] shadow-md hover:bg-[#654638] active:scale-[0.99] transition-all font-bold text-[13px]"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] text-[#ffdea7]">add_circle</span>
              <span>+ Create Emergency Requisition</span>
            </button>
          </div>
        </div>

        {/* Role Switcher Tab Pill Bar */}
        <div className="flex items-center justify-between p-1.5 rounded-2xl bg-[#ffffff] shadow-sm overflow-x-auto border border-[#e8e0d8]">
          <div className="flex items-center gap-1 min-w-max">
            <div className="px-3 text-[11px] font-bold text-[#82746f] uppercase tracking-wider">
              View Perspective:
            </div>
            <button
              onClick={() => onRoleChange('dean')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#4c3023] text-[#ffffff] text-[12px] font-semibold shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#ffdea7]">shield_person</span>
              <span>Dean of School</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea7] ml-1"></span>
            </button>
            <button
              onClick={() => {
                onRoleChange('head_hr');
                onNavigate('applicant-pipeline');
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[#504440] hover:text-[#211a15] hover:bg-[#faebe2] text-[12px] font-medium transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">corporate_fare</span>
              <span>Head HR</span>
            </button>
            <button
              onClick={() => {
                onRoleChange('hod');
                onNavigate('workforce-requisitions');
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[#504440] hover:text-[#211a15] hover:bg-[#faebe2] text-[12px] font-medium transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">domain</span>
              <span>Department Head (HOD)</span>
            </button>
            <button
              onClick={() => {
                onRoleChange('prochancellor');
                onNavigate('docket-approvals');
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[#504440] hover:text-[#211a15] hover:bg-[#faebe2] text-[12px] font-medium transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">assured_workload</span>
              <span>Pro-Chancellor</span>
            </button>
            <button
              onClick={() => {
                onRoleChange('selection_comm');
                onOpenHearingModal('CSE / Cybersecurity Panel');
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[#504440] hover:text-[#211a15] hover:bg-[#faebe2] text-[12px] font-medium transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">gavel</span>
              <span>Selection Committee</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 pr-3 text-[12px] text-[#82746f]">
            <span className="material-symbols-outlined text-[16px] text-[#755a26]">lock</span>
            <span className="font-mono text-[11px]">Dean Signature Hash: 0x9B4E...A1F</span>
          </div>
        </div>
      </div>

      {/* Dashboard KPI Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] text-[#82746f] uppercase tracking-wider font-bold">
                Sanctioned Positions
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-headline text-3xl font-bold text-[#4c3023]">148</span>
                <span className="text-[13px] text-[#82746f]">/ 160 Cap</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#faebe2] flex items-center justify-center text-[#4c3023]">
              <span className="material-symbols-outlined text-[22px]">badge</span>
            </div>
          </div>
          <div className="mt-4 pt-2 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#504440]">92.5% Allocation Ratio</span>
              <span className="text-[#755a26] font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +3 vs Prev Term
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#faebe2] rounded-full overflow-hidden">
              <div className="h-full bg-[#755a26] rounded-full" style={{ width: '92.5%' }}></div>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] text-[#82746f] uppercase tracking-wider font-bold">
                Active Vacancies
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-headline text-3xl font-bold text-[#ba1a1a]">14</span>
                <span className="text-[13px] text-[#82746f]">Across 5 Depts</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#ffdad6]/70 flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[22px]">person_search</span>
            </div>
          </div>
          <div className="mt-4 pt-2 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-[#ffdad6] text-[#93000a] text-[10px] font-bold uppercase tracking-wider">
              Critical: 4 Asst Prof
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#ffdea7] text-[#271900] text-[10px] font-bold uppercase tracking-wider">
              2 Professors
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] text-[#82746f] uppercase tracking-wider font-bold">
                Pending Requisitions
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-headline text-3xl font-bold text-[#755a26]">
                  {requisitions.filter((r) => r.status.includes('Pending') || r.status.includes('Awaiting')).length}
                </span>
                <span className="text-[13px] text-[#82746f]">Awaiting Dean Seal</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#fdd897] flex items-center justify-center text-[#785c28]">
              <span className="material-symbols-outlined text-[22px]">pending_actions</span>
            </div>
          </div>
          <div className="mt-4 pt-2 flex items-center justify-between text-[12px]">
            <span className="flex items-center gap-1 text-[#504440] font-medium">
              <span className="material-symbols-outlined text-[16px] text-[#755a26]">hourglass_top</span>
              Strict SLA Window
            </span>
            <span className="font-bold text-[#ba1a1a]">24h Remaining</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] text-[#82746f] uppercase tracking-wider font-bold">
                Teaching Load Compliance
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-headline text-3xl font-bold text-[#4c3023]">94.2%</span>
                <span className="text-[13px] text-[#82746f]">AICTE / UGC</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#faebe2] flex items-center justify-center text-[#4c3023]">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
          </div>
          <div className="mt-4 pt-2 flex items-center justify-between text-[12px] text-[#82746f]">
            <span>Prof: 16 hrs/wk</span>
            <span className="text-[#755a26] font-bold">Asst Prof: 18 hrs/wk</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Split-Grid (65% / 35%) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT SECTION (65% / col-span-8) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Table Card: Department Manpower & Load Status */}
          <div className="bg-[#ffffff] rounded-2xl shadow-sm border border-[#e8e0d8] p-5 sm:p-6 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#faebe2] flex items-center justify-center text-[#4c3023]">
                  <span className="material-symbols-outlined text-[20px]">account_tree</span>
                </div>
                <div>
                  <h2 className="font-headline text-lg text-[#4c3023] font-bold">
                    School Department Manpower & Load Status
                  </h2>
                  <p className="text-[12px] text-[#82746f]">Real-time statutory allocation vs sanctioned strength</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#faebe2] text-[#504440] text-[12px] font-semibold">
                  5 Active Departments
                </span>
                <button
                  onClick={() => onShowToast('Configuring department table columns...')}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#82746f] hover:text-[#4c3023] hover:bg-[#faebe2] transition-colors"
                  type="button"
                  title="Configure Table View"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                </button>
              </div>
            </div>

            {/* Table Wrapper */}
            <div className="overflow-x-auto rounded-xl shadow-[0_1px_4px_rgba(101,70,56,0.04)] border border-[#e8e0d8]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f4e5dc]/60 text-[12px] text-[#4c3023] font-bold">
                    <th className="py-3 px-4">Department Name</th>
                    <th className="py-3 px-2 text-center">Sanctioned</th>
                    <th className="py-3 px-2 text-center">In Position</th>
                    <th className="py-3 px-2 text-center">Vacancies</th>
                    <th className="py-3 px-2 text-center">SFR (Norm 1:15)</th>
                    <th className="py-3 px-2 text-center">Load Status</th>
                    <th className="py-3 px-4 text-right">Dossier</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-[#211a15] divide-y divide-[#f4e5dc]">
                  {DEPARTMENTS_DATA.map((dept, idx) => (
                    <tr
                      key={dept.code}
                      className={`hover:bg-[#ffdea7]/20 transition-colors ${
                        idx % 2 === 1 ? 'bg-[#fff1e9]/30' : 'bg-[#ffffff]'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#faebe2] flex items-center justify-center text-[#4c3023] text-xs font-bold font-headline">
                            {dept.shortCode}
                          </div>
                          <div>
                            <div className="font-semibold text-[#4c3023]">{dept.name}</div>
                            <div className="text-[11px] text-[#82746f]">
                              Code: {dept.code} • Head: {dept.head}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-2 text-center font-bold tabular-nums">{dept.sanctioned}</td>
                      <td className="py-3.5 px-2 text-center tabular-nums">{dept.inPosition}</td>
                      <td className="py-3.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          dept.vacancies >= 4
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : dept.vacancies >= 3
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : 'bg-[#faebe2] text-[#211a15]'
                        }`}>
                          {dept.vacancies} Open
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-semibold text-[#211a15]">
                        {dept.sfr}
                      </td>
                      <td className="py-3.5 px-2 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 w-max mx-auto ${
                          dept.statusType === 'overloaded'
                            ? 'bg-[#ffdad6]/80 text-[#ba1a1a]'
                            : dept.statusType === 'threshold'
                            ? 'bg-[#ffdea7] text-[#271900]'
                            : 'bg-[#ffdea7]/40 text-[#755a26]'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            dept.statusType === 'overloaded' ? 'bg-[#ba1a1a]' : 'bg-[#755a26]'
                          }`}></span>
                          {dept.loadStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onOpenDossier(dept)}
                          className="px-2.5 py-1 rounded-lg bg-[#faebe2] hover:bg-[#f4e5dc] text-[#4c3023] text-[12px] font-semibold transition-colors"
                          type="button"
                        >
                          View Dossier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[12px] text-[#82746f] px-1 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#755a26]">info</span>
                AICTE SFR Benchmark: 1:15 (Engineering UG/PG Combined). 1 Department exceeds tolerance threshold.
              </span>
              <button
                onClick={() => onNavigate('accreditation-ledgers')}
                className="font-semibold text-[#4c3023] hover:underline"
              >
                View Historical Cadre Audits →
              </button>
            </div>
          </div>

          {/* Section: Active Requisition Approvals Queue */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#755a26] animate-pulse"></span>
                <h2 className="font-headline text-lg text-[#4c3023] font-bold">
                  Active Requisition Approvals Queue
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#fdd897] text-[#785c28] text-[11px] font-bold">
                  {requisitions.length} Actionable Dockets
                </span>
              </div>
              <span className="text-[12px] text-[#82746f]">Dean Review Stage (Step 2 of 4)</span>
            </div>

            {/* Requisition Cards */}
            {requisitions.map((req) => (
              <div
                key={req.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col gap-4 relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <img
                      className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm border border-[#e8e0d8]"
                      alt={req.title}
                      src={req.photoUrl}
                    />
                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-headline text-base sm:text-lg font-bold text-[#4c3023]">
                          {req.title}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#fdd897] text-[#785c28] text-[10px] font-bold uppercase tracking-wider">
                          {req.refCode}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          req.urgency === 'critical'
                            ? 'bg-[#ffdad6] text-[#93000a]'
                            : 'bg-[#faebe2] text-[#211a15]'
                        }`}>
                          {req.urgencyLabel}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#504440] mt-0.5">
                        Originating Unit: <strong className="text-[#211a15]">{req.department}</strong> • Initiated by: <span className="font-semibold text-[#4c3023]">{req.initiatedBy}</span> • {req.receivedTime}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#faebe2] text-[12px] text-[#4c3023] font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-[#755a26]">
                      {req.slaHoursRemaining <= 12 ? 'hourglass_bottom' : 'schedule'}
                    </span>
                    <span>
                      SLA Expiry: <strong className={req.slaHoursRemaining <= 6 ? 'text-[#ba1a1a]' : 'text-[#755a26]'}>{req.slaHoursRemaining} Hours</strong>
                    </span>
                  </div>
                </div>

                {/* Justification Box */}
                <div className="p-4 rounded-xl bg-[#fff1e9] flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <div className="flex flex-col gap-1 max-w-xl">
                    <span className="text-[11px] text-[#82746f] font-bold uppercase tracking-wider">
                      Teaching Load Evidence & Justification
                    </span>
                    <p className="text-[13px] text-[#211a15]">
                      {req.teachingLoadText}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-[11px] text-[#82746f] font-bold uppercase">Budget Band</div>
                      <div className="text-[14px] font-bold text-[#4c3023] font-headline">{req.payLevel}</div>
                      <div className="text-[10px] text-[#755a26] font-semibold">{req.salaryRange}</div>
                    </div>
                    <button
                      onClick={() => onShowToast(`Generated Teaching Load Matrix PDF for ${req.refCode}`)}
                      className="p-2 rounded-xl bg-[#faebe2] hover:bg-[#f4e5dc] text-[#4c3023] transition-colors"
                      title="Download Teaching Load Matrix PDF"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                    </button>
                  </div>
                </div>

                {/* Decision Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#f4e5dc]">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#ffdea7]/40 text-[#271900] text-[12px] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#755a26]">
                        {req.status === 'Approved' ? 'check_circle' : 'pending'}
                      </span>
                      Status: {req.status}
                    </span>
                    <button
                      onClick={() => onNavigate('workforce-requisitions')}
                      className="text-[12px] text-[#755a26] hover:underline font-bold ml-2"
                    >
                      Inspect Scrutiny Dossier
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {req.status !== 'Approved' ? (
                      <>
                        <button
                          onClick={() => handleRejectRequisition(req.title)}
                          className="px-3.5 h-9 rounded-xl text-[#ba1a1a] hover:bg-[#ffdad6]/40 text-[12px] font-semibold transition-colors"
                          type="button"
                        >
                          Reject with Notes
                        </button>
                        <button
                          onClick={() => handleClarifyRequisition(req.title)}
                          className="px-3.5 h-9 rounded-xl bg-[#faebe2] text-[#4c3023] hover:bg-[#f4e5dc] text-[12px] font-semibold transition-colors"
                          type="button"
                        >
                          Request Load Clarification
                        </button>
                        <button
                          onClick={() => handleApproveRequisition(req.id, req.title)}
                          className="flex items-center gap-1.5 px-4 h-9 rounded-xl bg-[#4c3023] text-[#ffffff] text-[12px] font-bold shadow-sm hover:bg-[#654638] transition-all"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#ffdea7]">verified</span>
                          <span>Approve & Forward to HR</span>
                        </button>
                      </>
                    ) : (
                      <span className="px-4 py-2 rounded-xl bg-[#faebe2] text-[#755a26] text-[12px] font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Forwarded to CHRO Roster Verification
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION (35% / col-span-4) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Module 1: Recruitment Velocity Funnel */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#f4e5dc]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#faebe2] flex items-center justify-center text-[#4c3023]">
                  <span className="material-symbols-outlined text-[18px]">filter_alt</span>
                </div>
                <div>
                  <h3 className="font-headline text-base text-[#4c3023] font-bold">Recruitment Velocity</h3>
                  <span className="text-[11px] text-[#82746f]">Q3 FY25 Faculty Pipeline</span>
                </div>
              </div>
              <span className="text-[12px] text-[#755a26] font-bold">Cycle 12</span>
            </div>

            {/* Funnel Stages */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-[#4c3023]">Initial Screening</span>
                  <span className="font-bold text-[#4c3023]">64 candidates</span>
                </div>
                <div className="w-full h-2.5 bg-[#faebe2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#e5c183] rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-[#4c3023]">Shortlisted (Scrutiny Met)</span>
                  <span className="font-bold text-[#4c3023]">18 candidates (28%)</span>
                </div>
                <div className="w-full h-2.5 bg-[#faebe2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#ffdea7] rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-[#4c3023]">Selection Board Scheduled</span>
                  <span className="font-bold text-[#4c3023]">8 candidates (12%)</span>
                </div>
                <div className="w-full h-2.5 bg-[#faebe2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#755a26] rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-[#4c3023]">Letters of Intent (LOI)</span>
                  <span className="font-bold text-[#4c3023]">3 Issued</span>
                </div>
                <div className="w-full h-2.5 bg-[#faebe2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#654638] rounded-full" style={{ width: '16%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-[#4c3023]">Joined & Induction Done</span>
                  <span className="font-bold text-[#755a26]">2 Joined</span>
                </div>
                <div className="w-full h-2.5 bg-[#faebe2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4c3023] rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[12px] text-[#82746f] border-t border-[#f4e5dc]">
              <span>Average Time-to-Fill: <strong className="text-[#211a15]">38 Days</strong></span>
              <button
                onClick={() => onNavigate('applicant-pipeline')}
                className="text-[#755a26] font-bold hover:underline"
              >
                Pipeline Analytics →
              </button>
            </div>
          </div>

          {/* Module 2: Cadre Quota & NAAC Criteria 2.4 Breakdown */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#f4e5dc]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#faebe2] flex items-center justify-center text-[#4c3023]">
                  <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                </div>
                <div>
                  <h3 className="font-headline text-base text-[#4c3023] font-bold">NAAC Criteria 2.4 Caliber</h3>
                  <span className="text-[11px] text-[#82746f]">Teacher Quality & Cadre Ratio</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-[#ffdea7] text-[#271900] text-[10px] font-bold">
                A++ TARGET
              </span>
            </div>

            {/* Ph.D. Qualified Gauge Section */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#fff1e9]">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#faebe2]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#755a26]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="78, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[12px] font-bold text-[#4c3023] font-headline">78%</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-[13px] font-bold text-[#4c3023]">Ph.D. Qualified Faculty</div>
                <div className="text-[12px] text-[#504440]">Current: 104 / 134 Faculty</div>
                <div className="text-[11px] text-[#755a26] font-semibold mt-0.5">
                  Target: 85% by Annual Audit (+9 needed)
                </div>
              </div>
            </div>

            {/* Cadre Ratio Meter */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-semibold text-[#4c3023]">Cadre Ratio: Prof : Assoc : Asst</span>
                <span className="font-mono font-bold text-[#755a26]">1 : 2.1 : 5.8</span>
              </div>
              <div className="flex h-3 w-full rounded-full overflow-hidden bg-[#faebe2] p-0.5 gap-0.5">
                <div className="bg-[#4c3023] rounded-l-full" style={{ width: '12%' }} title="Professors: 12%"></div>
                <div className="bg-[#755a26]" style={{ width: '24%' }} title="Associate Professors: 24%"></div>
                <div className="bg-[#e5c183] rounded-r-full" style={{ width: '64%' }} title="Assistant Professors: 64%"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#82746f]">
                <span>Current (1:2.1:5.8)</span>
                <span className="text-[#211a15] font-semibold">AICTE Standard: 1 : 2 : 6</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#faebe2] flex items-center gap-2 text-[12px] text-[#4c3023]">
              <span className="material-symbols-outlined text-[18px] text-[#755a26]">check_circle</span>
              <span>
                NAAC SSR Score Projected: <strong className="font-bold">3.88 / 4.00</strong>
              </span>
            </div>
          </div>

          {/* Module 3: Upcoming Selection Board Hearings */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#f4e5dc]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#faebe2] flex items-center justify-center text-[#4c3023]">
                  <span className="material-symbols-outlined text-[18px]">event_seat</span>
                </div>
                <div>
                  <h3 className="font-headline text-base text-[#4c3023] font-bold">Selection Board Hearings</h3>
                  <span className="text-[11px] text-[#82746f]">Deanery Quorum Confirmed</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#82746f] cursor-pointer hover:text-[#4c3023]">
                calendar_month
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Hearing Card 1 */}
              <div className="p-3.5 rounded-xl bg-[#fff1e9] flex flex-col gap-2 hover:bg-[#faebe2] transition-colors border border-[#e8e0d8]/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded-lg bg-[#faebe2] text-[#4c3023] font-mono font-bold text-xs">
                      MAR 14
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#4c3023]">CSE / Cybersecurity Panel</div>
                      <div className="text-[11px] text-[#82746f]">10:30 AM • Senate Room 204</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdea7] text-[#271900] text-[10px] font-bold">
                    4 Candidates
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 text-[12px]">
                  <span className="text-[#504440]">
                    Chair: <strong className="text-[#4c3023] font-semibold">Prof. S. Mukhopadhyay</strong>
                  </span>
                  <button
                    onClick={() => onOpenHearingModal('CSE / Cybersecurity Panel')}
                    className="text-[#755a26] hover:text-[#4c3023] font-bold flex items-center gap-0.5"
                    type="button"
                  >
                    <span>View Confidential Docket</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                  </button>
                </div>
              </div>

              {/* Hearing Card 2 */}
              <div className="p-3.5 rounded-xl bg-[#fff1e9] flex flex-col gap-2 hover:bg-[#faebe2] transition-colors border border-[#e8e0d8]/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded-lg bg-[#faebe2] text-[#4c3023] font-mono font-bold text-xs">
                      MAR 19
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#4c3023]">Robotics & Mechatronics Panel</div>
                      <div className="text-[11px] text-[#82746f]">02:00 PM • Video Conf Room B</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdea7] text-[#271900] text-[10px] font-bold">
                    3 Candidates
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 text-[12px]">
                  <span className="text-[#504440]">
                    Ext. Expert: <strong className="text-[#4c3023] font-semibold">IIT Kharagpur</strong>
                  </span>
                  <button
                    onClick={() => onOpenHearingModal('Robotics & Mechatronics Panel')}
                    className="text-[#755a26] hover:text-[#4c3023] font-bold flex items-center gap-0.5"
                    type="button"
                  >
                    <span>View Confidential Docket</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('applicant-pipeline')}
              className="w-full py-2 rounded-xl bg-[#faebe2] text-[#4c3023] text-[12px] font-semibold hover:bg-[#f4e5dc] transition-colors text-center"
              type="button"
            >
              View All Scheduled Statutory Boards (8)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
