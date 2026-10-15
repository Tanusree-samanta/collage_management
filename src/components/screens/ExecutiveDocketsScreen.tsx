import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ExecutiveDocket, EXECUTIVE_DOCKETS_DATA } from '../../data/mockData';

interface ExecutiveDocketsScreenProps {
  onNavigate: (path: string) => void;
  onShowToast: (msg: string) => void;
}

export const ExecutiveDocketsScreen: React.FC<ExecutiveDocketsScreenProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [dockets, setDockets] = useState<ExecutiveDocket[]>(EXECUTIVE_DOCKETS_DATA);
  const [selectedDocketId, setSelectedDocketId] = useState<string>('EX-2025-041');
  const [docketTab, setDocketTab] = useState<'pending' | 'archived'>('pending');
  const [searchFilter, setSearchFilter] = useState('');

  // Decision console states
  const [actionReasonMode, setActionReasonMode] = useState<'Approve' | 'Clarification' | 'Reject' | null>(null);
  const [auditNoteText, setAuditNoteText] = useState('');
  const [sealedDockets, setSealedDockets] = useState<Record<string, { status: string; note: string; timestamp: string }>>({});

  const selectedDocket = dockets.find((d) => d.id === selectedDocketId) || dockets[0];
  const isSealed = !!sealedDockets[selectedDocket.id];

  const handleOpenReasonBox = (mode: 'Approve' | 'Clarification' | 'Reject') => {
    setActionReasonMode(mode);
    if (mode === 'Approve') {
      setAuditNoteText(
        `Ratified under Section 14(2) of the University Statutes. The appointment of ${selectedDocket.candidate.name} as ${selectedDocket.title} is formally confirmed at CTC ${selectedDocket.ctcGross}. Human Resources is hereby instructed to generate the formal appointment docket with Registrar's Seal.`
      );
    } else if (mode === 'Clarification') {
      setAuditNoteText(
        `Referred back to CHRO and Dean: Please provide detailed industry sponsorship projections for Year 1 along with confirmation of non-compete cooling period.`
      );
    } else {
      setAuditNoteText(
        `Requisition declined by Pro-Chancellor: Proposed compensation envelope exceeds current department ceiling without commensurate external research grant commitment.`
      );
    }
  };

  const handleCommitResolution = () => {
    if (!auditNoteText.trim()) {
      alert('Mandatory executive audit note required before sealing docket resolution.');
      return;
    }

    const mode = actionReasonMode || 'Approve';
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' IST';

    setSealedDockets((prev) => ({
      ...prev,
      [selectedDocket.id]: {
        status: mode === 'Approve' ? 'SEALED & RATIFIED' : mode === 'Clarification' ? 'CLARIFICATION SOUGHT' : 'DECLINED',
        note: auditNoteText,
        timestamp: now
      }
    }));

    if (mode === 'Approve') {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
      onShowToast(`Executive Resolution Sealed! Docket ${selectedDocket.docketId} ratified.`);
    } else if (mode === 'Clarification') {
      onShowToast(`Clarification directive broadcast to CHRO & Deanery for ${selectedDocket.docketId}.`);
    } else {
      onShowToast(`Docket ${selectedDocket.docketId} formally declined with executive remarks.`);
    }

    setActionReasonMode(null);
  };

  const filteredDockets = dockets.filter((d) => {
    const q = searchFilter.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.docketId.toLowerCase().includes(q) ||
      d.school.toLowerCase().includes(q) ||
      d.department.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col w-full font-body text-[13px] text-[#211a15]">
      {/* Confidential Executive Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#654638] via-[#4c3023] to-[#423425] text-[#ffffff] p-4 sm:p-5 shadow-md mb-6 border border-[#5a4a3a]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ffdea7]/20 text-[#ffdea7] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">policy</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-[#ffdea7] text-[#271900] text-[11px] font-bold uppercase tracking-wider">
                  Confidential Executive Access
                </span>
                <span className="text-[#e0b5a3] text-[12px] font-medium">
                  High-Value Manpower Approvals & Cadre Governance
                </span>
              </div>
              <p className="text-[12px] text-[#e0b5a3] mt-0.5">
                Office of the Pro-Chancellor & Governing Board • Statutory Authority under Section 14(2) TNU Charter
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff]/10 backdrop-blur-sm text-[#ffffff] text-[11px] font-mono">
              <span className="material-symbols-outlined text-[16px] text-[#ffdea7]">verified_user</span>
              <span>Digital Seal Active: RSA-4096</span>
            </div>
            <button
              onClick={() => onShowToast('Accessing University Charter Bylaws Section 14(2)...')}
              className="px-3 py-1.5 rounded-lg bg-[#fdd897] text-[#785c28] hover:bg-[#ffdea7] transition-colors text-[12px] font-semibold flex items-center gap-1.5 shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
              <span>Charter Bylaws</span>
            </button>
          </div>
        </div>

        {/* Guilloche Academic Crest Pattern */}
        <svg
          className="absolute -right-6 -bottom-10 w-56 h-56 text-[#ffffff]/5 pointer-events-none"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" fill="none" r="90" stroke="currentColor" strokeWidth="2"></circle>
          <circle cx="100" cy="100" fill="none" r="75" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1"></circle>
          <path
            d="M100 20 L120 70 L175 75 L135 115 L145 170 L100 140 L55 170 L65 115 L25 75 L80 70 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      {/* Breadcrumbs & Executive Metadata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#82746f] mb-1 uppercase tracking-wide">
            <span
              onClick={() => onNavigate('overview-command')}
              className="hover:text-[#4c3023] transition-colors cursor-pointer"
            >
              Home
            </span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-[#4c3023] transition-colors cursor-pointer">Governance</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#4c3023] font-bold">Executive Dockets</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl text-[#4c3023] tracking-tight font-bold">
            Executive Governance & Manpower Approval Inbox
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-[#82746f]">Session: Spring 2025 Quorum</span>
          <div className="h-4 w-[1px] bg-[#d4c3bd]"></div>
          <button
            onClick={() => onShowToast('Exporting immutable executive minute ledger (Encrypted PDF)...')}
            className="px-3 py-1.5 rounded-lg bg-[#ffffff] text-[#4c3023] shadow-sm hover:bg-[#faebe2] border border-[#e8e0d8] text-[12px] font-semibold flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Executive Ledger Export</span>
          </button>
        </div>
      </div>

      {/* KPI Bento Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#82746f] uppercase tracking-wider font-bold">
              Pending Executive Approvals
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdea7]/40 text-[#755a26] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline text-3xl font-bold text-[#4c3023] leading-none">
              {dockets.length}
            </span>
            <span className="text-[12px] text-[#755a26] font-semibold">Critical Dockets</span>
          </div>
          <p className="text-[12px] text-[#82746f] mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
            Awaiting Pro-Chancellor sign-off
          </p>
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#82746f] uppercase tracking-wider font-bold">
              Urgent Manpower Requisitions
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">priority_high</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline text-3xl font-bold text-[#4c3023] leading-none">2</span>
            <span className="text-[12px] text-[#ba1a1a] font-semibold">Immediate Action</span>
          </div>
          <p className="text-[12px] text-[#82746f] mt-1">Special sanctions flagged for Board vote</p>
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#82746f] uppercase tracking-wider font-bold">
              Total Annual Budget Impact
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#faebe2] text-[#4c3023] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline text-3xl font-bold text-[#4c3023] leading-none">₹1.84</span>
            <span className="text-[12px] text-[#4c3023] font-semibold">Cr / annum</span>
          </div>
          <div className="mt-2 w-full">
            <div className="flex justify-between text-[11px] text-[#82746f] mb-1">
              <span>Within Approved Capex</span>
              <span className="font-bold text-[#4c3023]">94.6%</span>
            </div>
            <div className="w-full h-1.5 bg-[#faebe2] rounded-full overflow-hidden">
              <div className="h-full bg-[#755a26] rounded-full" style={{ width: '94.6%' }}></div>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#82746f] uppercase tracking-wider font-bold">
              Average Executive SLA
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#faebe2] text-[#755a26] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">speed</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline text-3xl font-bold text-[#4c3023] leading-none">1.8</span>
            <span className="text-[12px] text-[#755a26] font-semibold">Days</span>
          </div>
          <p className="text-[12px] text-[#82746f] mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#755a26]">trending_up</span>
            Institutional Benchmark: &lt; 3.0 Days
          </p>
        </div>
      </div>

      {/* Master-Detail Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL (40% width / 5 Cols): Approval Inbox Docket List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-[#ffffff] shadow-sm border border-[#e8e0d8]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#f4e5dc]">
              <div>
                <h2 className="font-headline text-base font-bold text-[#4c3023]">Active Dockets</h2>
                <span className="text-[11px] text-[#82746f]">Priority Queue • 4 items pending</span>
              </div>
              <div className="flex items-center gap-1 bg-[#faebe2] rounded-lg p-1">
                <button
                  onClick={() => setDocketTab('pending')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                    docketTab === 'pending'
                      ? 'bg-[#ffffff] text-[#4c3023] shadow-xs'
                      : 'text-[#82746f] hover:text-[#211a15]'
                  }`}
                >
                  Pending ({dockets.length})
                </button>
                <button
                  onClick={() => setDocketTab('archived')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                    docketTab === 'archived'
                      ? 'bg-[#ffffff] text-[#4c3023] shadow-xs'
                      : 'text-[#82746f] hover:text-[#211a15]'
                  }`}
                >
                  Archived
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="relative mb-3">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#82746f] text-[18px]">
                filter_list
              </span>
              <input
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-xl bg-[#faebe2] text-[13px] text-[#211a15] placeholder-[#82746f] focus:outline-none focus:ring-1 focus:ring-[#4c3023]"
                placeholder="Filter by school, cadre or docket ID..."
                type="text"
              />
            </div>

            {/* Docket List Entries */}
            <div className="flex flex-col gap-2.5">
              {filteredDockets.map((docket) => {
                const isSelected = selectedDocketId === docket.id;
                const docketSeal = sealedDockets[docket.id];

                return (
                  <div
                    key={docket.id}
                    onClick={() => {
                      setSelectedDocketId(docket.id);
                      setActionReasonMode(null);
                    }}
                    className={`group relative p-4 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#faebe2] border-[#4c3023] shadow-sm'
                        : 'bg-[#ffffff] border-[#e8e0d8] hover:bg-[#fff1e9]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#4c3023] rounded-r"></div>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      {docketSeal ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#fdd897] text-[#785c28] text-[11px] font-bold">
                          {docketSeal.status}
                        </span>
                      ) : docket.status === 'urgent' ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
                          {docket.urgencyLabel}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[#ffdea7] text-[#271900] text-[11px] font-bold">
                          {docket.urgencyLabel}
                        </span>
                      )}
                      <span className="font-mono text-[12px] text-[#82746f] font-semibold">
                        {docket.docketId}
                      </span>
                    </div>

                    <h3 className="font-headline text-[14px] font-bold text-[#4c3023] group-hover:text-[#755a26] transition-colors">
                      {docket.title}
                    </h3>
                    <p className="text-[12px] text-[#504440] mt-0.5">
                      {docket.school} • {docket.department}
                    </p>

                    <div className="mt-3 pt-2 flex items-center justify-between text-[12px] border-t border-[#f4e5dc]">
                      <span className="font-semibold text-[#4c3023]">CTC: {docket.ctcGross}</span>
                      <span className="px-2 py-0.5 rounded bg-[#f4e5dc] text-[#755a26] text-[11px] font-medium">
                        {docket.statusBadge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-2 text-center border-t border-[#f4e5dc]">
              <button
                onClick={() => onShowToast('Loading historical Chancellor minutes (2020-2024)...')}
                className="text-[12px] text-[#755a26] hover:text-[#4c3023] transition-colors font-semibold flex items-center justify-center gap-1 mx-auto"
              >
                <span>View All Historical Executive Resolutions</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Quick Guidance Module */}
          <div className="p-4 rounded-xl bg-[#fff1e9] shadow-sm border border-[#e8e0d8]">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#755a26] text-[22px]">info</span>
              <div>
                <h4 className="font-headline text-[14px] font-bold text-[#4c3023]">Statutory Quorum Note</h4>
                <p className="text-[12px] text-[#504440] mt-1 leading-relaxed">
                  Decisions recorded in this executive interface are sealed directly into the Chancellor's Minute Ledger under university digital seal credentials.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (60% width / 7 Cols): Interactive Decision Dossier */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="rounded-xl bg-[#ffffff] shadow-sm border border-[#e8e0d8] p-5 sm:p-6 flex flex-col gap-6 relative">
            {/* Dossier Header & Badge Bar */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#f4e5dc]">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">alarm</span>
                    {selectedDocket.statusBadge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#faebe2] text-[#4c3023] text-[11px] font-semibold">
                    Docket Ref: TNU/PC-{selectedDocket.docketId}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffdea7] text-[#271900] text-[11px] font-bold">
                    {selectedDocket.cadreBand}
                  </span>
                </div>
                <h2 className="font-headline text-2xl font-bold text-[#4c3023] tracking-tight">
                  {selectedDocket.title}
                </h2>
                <p className="text-[14px] text-[#504440] mt-1">
                  {selectedDocket.department} • {selectedDocket.school}
                </p>
              </div>
              <div className="shrink-0 p-3 rounded-xl bg-[#faebe2] flex flex-col items-end border border-[#d4c3bd]/50">
                <span className="text-[10px] text-[#82746f] uppercase tracking-wider font-bold">
                  Sanction Impact
                </span>
                <span className="font-headline text-xl font-bold text-[#4c3023] leading-tight">
                  {selectedDocket.ctcGross}
                </span>
                <span className="text-[11px] text-[#755a26] font-semibold">Gross Annual CTC</span>
              </div>
            </div>

            {/* Candidate Candidate Snapshot */}
            <div className="p-4 rounded-xl bg-[#fff1e9] flex flex-col md:flex-row items-center gap-4 border border-[#e8e0d8]">
              <img
                className="w-20 h-20 rounded-xl object-cover shadow-sm shrink-0 border border-[#e8e0d8]"
                alt={selectedDocket.candidate.name}
                src={selectedDocket.candidate.photoUrl}
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-headline text-lg font-bold text-[#4c3023]">
                    {selectedDocket.candidate.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-[#ffdea7]/60 text-[#755a26] text-[11px] font-bold">
                    {selectedDocket.candidate.qualification}
                  </span>
                </div>
                <p className="text-[12px] text-[#504440] mt-0.5">
                  {selectedDocket.candidate.currentOrg} • {selectedDocket.candidate.experience}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-[12px] text-[#82746f]">
                  <span className="flex items-center gap-1 text-[#4c3023] font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-[#755a26]">star</span>
                    h-index: {selectedDocket.candidate.hIndex}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    {selectedDocket.candidate.sciJournals} SCI Journals
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">pixel_7_pro</span>
                    {selectedDocket.candidate.patents} US Patents Granted
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#755a26]">
                    <span className="material-symbols-outlined text-[16px]">grade</span>
                    Selection Score: {selectedDocket.candidate.selectionScore}/100
                  </span>
                </div>
              </div>
            </div>

            {/* Statutory Recommendation Summaries */}
            <div className="flex flex-col gap-3">
              <h3 className="font-headline text-base font-bold text-[#4c3023] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#755a26] text-[20px]">fact_check</span>
                <span>Statutory Endorsement Summaries</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {selectedDocket.endorsements.map((end, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#faebe2] border border-[#e8e0d8]">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#654638] text-[#ffffff] flex items-center justify-center font-bold text-xs">
                          {end.initials}
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-[#4c3023]">{end.author}</div>
                          <div className="text-[11px] text-[#82746f]">{end.role}</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#ffdea7] text-[#271900] text-[11px] font-semibold">
                        {end.badge}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#211a15] italic leading-relaxed pl-10">
                      {end.quote}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget & Cadre Head Breakdown Data Table */}
            <div className="rounded-xl overflow-hidden bg-[#fff1e9] p-4 border border-[#e8e0d8]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-headline text-[14px] font-bold text-[#4c3023]">
                  Fiscal & Cadre Head Impact Breakdown
                </h4>
                <span className="text-[11px] text-[#755a26] font-semibold">
                  Account Head: 3101-FAC-ENG-CSE
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-[#efe0d7] text-[#4c3023] font-bold text-[12px]">
                      <th className="py-2 px-3">Component</th>
                      <th className="py-2 px-3">Cadre Scale</th>
                      <th className="py-2 px-3">Monthly Rate</th>
                      <th className="py-2 px-3 text-right">Annual Allocation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d4c3bd]/30">
                    {selectedDocket.fiscalBreakdown.map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-3 text-[#211a15] font-medium">{row.component}</td>
                        <td className="py-2 px-3 text-[#82746f]">{row.cadreScale}</td>
                        <td className="py-2 px-3 text-[#211a15]">{row.monthlyRate}</td>
                        <td className="py-2 px-3 text-right font-semibold text-[#4c3023]">
                          {row.annualAllocation}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-[#faebe2] font-bold text-[#4c3023]">
                      <td className="py-2.5 px-3" colSpan={3}>
                        Total Sanctioned Annual Outflow
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-[#4c3023]">
                        {selectedDocket.ctcGross}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Decision Action Console */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#fff1e9] shadow-sm border border-[#e8e0d8]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-headline text-base font-bold text-[#4c3023] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#755a26] text-[22px]">approval</span>
                  <span>Pro-Chancellor Statutory Decision Console</span>
                </h4>
                <span className="text-[11px] text-[#82746f] font-mono">Digital Token: 0x8F21...A9C3</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleOpenReasonBox('Approve')}
                  disabled={isSealed}
                  className={`py-3 px-4 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all ${
                    isSealed
                      ? 'bg-[#faebe2] text-[#82746f] cursor-not-allowed opacity-60'
                      : 'bg-[#4c3023] text-[#ffffff] hover:bg-[#654638] hover:-translate-y-0.5'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Approve & Seal Docket</span>
                </button>

                <button
                  onClick={() => handleOpenReasonBox('Clarification')}
                  disabled={isSealed}
                  className={`py-3 px-4 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm border transition-all ${
                    isSealed
                      ? 'bg-[#ffffff] text-[#82746f] border-[#e8e0d8] cursor-not-allowed opacity-60'
                      : 'bg-[#ffffff] text-[#4c3023] border-[#d4c3bd] hover:bg-[#faebe2]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">help_center</span>
                  <span>Seek Clarification</span>
                </button>

                <button
                  onClick={() => handleOpenReasonBox('Reject')}
                  disabled={isSealed}
                  className={`py-3 px-4 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm border transition-all ${
                    isSealed
                      ? 'bg-[#ffffff] text-[#82746f] border-[#e8e0d8] cursor-not-allowed opacity-60'
                      : 'bg-[#ffffff] text-[#ba1a1a] border-[#ffdad6] hover:bg-[#ffdad6]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">cancel</span>
                  <span>Reject Requisition</span>
                </button>
              </div>

              {/* Collapsible Reason Box */}
              {actionReasonMode && (
                <div className="mt-4 pt-3 border-t border-[#f4e5dc] animate-in fade-in">
                  <label className="block text-[12px] font-bold text-[#4c3023] mb-1">
                    Statutory Executive Remark / Audit Justification (Mandatory for Registry Archival):
                  </label>
                  <textarea
                    value={auditNoteText}
                    onChange={(e) => setAuditNoteText(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded-xl bg-[#ffffff] text-[13px] text-[#211a15] border border-[#d4c3bd] focus:outline-none focus:ring-1 focus:ring-[#4c3023] shadow-xs"
                    placeholder="Enter executive resolution directives or reasons for clarification / objection..."
                  />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2">
                    <span className="text-[11px] text-[#82746f] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">lock</span>
                      This statement will be hashed into the Immutable Governance Ledger
                    </span>
                    <button
                      onClick={handleCommitResolution}
                      className="px-4 py-2 rounded-lg bg-[#4c3023] text-[#ffffff] text-[12px] font-bold hover:bg-[#654638] transition-colors shadow-xs"
                      type="button"
                    >
                      Confirm & Broadcast Resolution
                    </button>
                  </div>
                </div>
              )}

              {/* Success Alert Message */}
              {isSealed && (
                <div className="mt-4 p-4 rounded-xl bg-[#faebe2] border border-[#755a26]/40 text-[#4c3023] flex items-start gap-3 animate-in fade-in">
                  <span className="material-symbols-outlined text-[24px] text-[#755a26] shrink-0 mt-0.5">
                    verified
                  </span>
                  <div>
                    <div className="text-[14px] font-bold text-[#4c3023]">
                      Executive Resolution Sealed Successfully ({sealedDockets[selectedDocket.id]?.status})
                    </div>
                    <div className="text-[12px] text-[#504440] mt-0.5">
                      Docket {selectedDocket.docketId} has been formally recorded. Sealed note: “{sealedDockets[selectedDocket.id]?.note}”
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Immutable Governance Audit Trail */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-headline text-base font-bold text-[#4c3023] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#755a26] text-[20px]">account_tree</span>
                  <span>Immutable Dossier Audit Trail</span>
                </h4>
                <span className="text-[11px] text-[#82746f] font-mono">Ledger Block #882,912</span>
              </div>

              <div className="relative pl-6 space-y-4">
                {/* Timeline vertical connector line */}
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#d4c3bd]"></div>

                {selectedDocket.auditTrail.map((trail, idx) => (
                  <div key={idx} className="relative flex items-start gap-3">
                    <div
                      className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full ring-4 ring-[#ffffff] ${
                        trail.isPending ? (isSealed ? 'bg-[#755a26]' : 'bg-[#ba1a1a] animate-pulse') : 'bg-[#755a26]'
                      }`}
                    ></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#4c3023]">{trail.title}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            trail.isPending
                              ? isSealed
                                ? 'bg-[#fdd897] text-[#785c28]'
                                : 'bg-[#ffdad6] text-[#ba1a1a]'
                              : 'bg-[#faebe2] text-[#82746f]'
                          }`}
                        >
                          {trail.isPending ? (isSealed ? 'SEALED & BROADCAST' : trail.tag) : trail.tag}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#504440]">{trail.desc}</p>
                      <span className="text-[11px] text-[#82746f] font-mono">{trail.timestamp}</span>
                    </div>
                  </div>
                ))}

                {isSealed && (
                  <div className="relative flex items-start gap-3 animate-in fade-in">
                    <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#755a26] ring-4 ring-[#ffffff]"></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#4c3023]">
                          Office of the Pro-Chancellor Statutory Assent Sealed
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-[#ffdea7] text-[#271900] text-[10px] font-bold">
                          BLOCK #882,913 MINED
                        </span>
                      </div>
                      <p className="text-[12px] text-[#504440]">
                        Assented with digital token RSA-4096. Appointment dispatch order transmitted to Registrar.
                      </p>
                      <span className="text-[11px] text-[#755a26] font-mono">
                        {sealedDockets[selectedDocket.id]?.timestamp} • Signed by Pro-Chancellor
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
