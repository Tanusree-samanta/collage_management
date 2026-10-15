import React, { useState } from 'react';
import { JobRequisition, JOB_REQUISITIONS_DATA } from '../../data/mockData';

interface ApplicantPipelineScreenProps {
  onNavigate: (path: string) => void;
  onShowToast: (msg: string) => void;
}

export const ApplicantPipelineScreen: React.FC<ApplicantPipelineScreenProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [stageTab, setStageTab] = useState<'all' | 'shortlist' | 'selection' | 'offer' | 'onboard'>('all');
  const [schoolFilter, setSchoolFilter] = useState('All Faculties & Schools');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidateJr, setSelectedCandidateJr] = useState<JobRequisition | null>(null);
  const [showRcsModal, setShowRcsModal] = useState(false);
  const [showLoiModal, setShowLoiModal] = useState(false);
  const [showCommModal, setShowCommModal] = useState(false);

  // Dynamic filter
  const filteredJrs = JOB_REQUISITIONS_DATA.filter((jr) => {
    if (stageTab !== 'all' && jr.stageKey !== stageTab) return false;
    if (schoolFilter !== 'All Faculties & Schools') {
      if (!jr.school.toLowerCase().includes(schoolFilter.toLowerCase().replace('school of ', ''))) {
        return false;
      }
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        jr.jrCode.toLowerCase().includes(q) ||
        jr.role.toLowerCase().includes(q) ||
        jr.specialization.toLowerCase().includes(q) ||
        jr.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-6 font-body text-[13px] text-[#211a15]">
      {/* Breadcrumbs & Tactical Command Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[11px] text-[#82746f] uppercase tracking-wider">
            <span
              onClick={() => onNavigate('overview-command')}
              className="hover:text-[#4c3023] transition-colors cursor-pointer"
            >
              Home
            </span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="hover:text-[#4c3023] transition-colors cursor-pointer">Head HR</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-[#4c3023] font-bold">Command Centre</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2 mt-1">
            <h1 className="font-headline text-2xl sm:text-3xl text-[#211a15] font-bold tracking-tight">
              Recruitment Command Centre & Job Requisition Tracker
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-[#fdd897] text-[#785c28] text-[11px] font-semibold tracking-wide">
              AY 2025-26 Cycle
            </span>
          </div>
          <p className="text-[14px] text-[#504440] max-w-3xl leading-relaxed">
            Overseeing Central Talent Acquisition, UGC/AICTE Cadre Compliances, and Faculty Selection Dockets. Officer in Charge: <span className="font-semibold text-[#4c3023]">Dr. Radhika Sharma (Head HR & Workforce Planning)</span>.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => onShowToast('Exporting Sourcing-to-Hire SLA Analytics Report (PDF)...')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#f4e5dc] hover:bg-[#efe0d7] text-[#4c3023] text-[12px] font-semibold shadow-sm transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#755a26]">file_download</span>
            <span>Export SLA Analytics</span>
          </button>
          <button
            onClick={() => onShowToast('Broadcasting 38 active positions to Naukri, LinkedIn Academic, and UGC Portal...')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ffdea7] text-[#271900] hover:bg-[#e5c183] text-[12px] font-bold shadow-sm transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">cell_tower</span>
            <span>Bulk Publish Portals</span>
          </button>
          <button
            onClick={() => {
              onShowToast('Opening New Job Requisition Initiation Studio...');
              onNavigate('workforce-requisitions');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4c3023] text-[#ffffff] hover:bg-[#654638] text-[12px] font-bold shadow-md transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffdea7]">add_circle</span>
            <span>Initiate New JR</span>
          </button>
        </div>
      </div>

      {/* KPI Pulse Overview (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1 */}
        <div className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-bold text-[#82746f] uppercase tracking-wider">
              Total Open Positions
            </span>
            <span className="p-1.5 rounded-lg bg-[#faebe2] text-[#4c3023]">
              <span className="material-symbols-outlined text-[18px]">work</span>
            </span>
          </div>
          <div className="mt-4 z-10">
            <div className="font-headline text-3xl font-bold text-[#4c3023] leading-none">38</div>
            <div className="text-[12px] text-[#504440] mt-1.5">
              <span className="font-semibold text-[#211a15]">26</span> Faculty • <span className="font-semibold text-[#211a15]">12</span> Non-Teaching
            </div>
          </div>
          <div className="mt-2 pt-1 text-[#755a26] text-[11px] font-semibold flex items-center gap-1 border-t border-[#f4e5dc]">
            <span className="material-symbols-outlined text-[14px]">domain</span> Across 4 Constituent Schools
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-bold text-[#82746f] uppercase tracking-wider">
              Awaiting Cadre Vetting
            </span>
            <span className="p-1.5 rounded-lg bg-[#f4e5dc] text-[#755a26]">
              <span className="material-symbols-outlined text-[18px]">pending_actions</span>
            </span>
          </div>
          <div className="mt-4 z-10">
            <div className="font-headline text-3xl font-bold text-[#755a26] leading-none">07</div>
            <div className="text-[12px] text-[#504440] mt-1.5">
              Departments awaiting quota check
            </div>
          </div>
          <div className="mt-2 pt-1 text-[#82746f] text-[11px] flex items-center gap-1 border-t border-[#f4e5dc]">
            <span className="material-symbols-outlined text-[14px]">verified_user</span> Roster verification pending
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-bold text-[#82746f] uppercase tracking-wider">
              Candidate Pipeline
            </span>
            <span className="p-1.5 rounded-lg bg-[#ffdbcc] text-[#4c3023]">
              <span className="material-symbols-outlined text-[18px]">diversity_3</span>
            </span>
          </div>
          <div className="mt-4 z-10">
            <div className="font-headline text-3xl font-bold text-[#4c3023] leading-none">412</div>
            <div className="text-[12px] text-[#504440] mt-1.5">
              <span className="font-semibold text-[#4c3023]">94</span> Stage 1 • <span className="font-semibold text-[#4c3023]">48</span> Shortlisted
            </div>
          </div>
          <div className="mt-2 pt-1 text-[#4c3023] text-[11px] font-semibold flex items-center gap-1 border-t border-[#f4e5dc]">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +34 resumes today
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e8e0d8] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-bold text-[#82746f] uppercase tracking-wider">
              Hearings This Week
            </span>
            <span className="p-1.5 rounded-lg bg-[#ffdea7] text-[#755a26]">
              <span className="material-symbols-outlined text-[18px]">event_seat</span>
            </span>
          </div>
          <div className="mt-4 z-10">
            <div className="font-headline text-3xl font-bold text-[#211a15] leading-none">16</div>
            <div className="text-[12px] text-[#504440] mt-1.5">
              <span className="font-semibold text-[#211a15]">8</span> Tech • <span className="font-semibold text-[#211a15]">5</span> Sel. Comm • <span className="font-semibold text-[#211a15]">3</span> VC
            </div>
          </div>
          <div className="mt-2 pt-1 text-[#755a26] text-[11px] font-semibold flex items-center gap-1 border-t border-[#f4e5dc]">
            <span className="material-symbols-outlined text-[14px]">schedule</span> 4 hearings slated today
          </div>
        </div>

        {/* KPI 5: Red Warning Tone */}
        <div className="bg-[#ffdad6] text-[#93000a] p-4 rounded-xl shadow-sm border border-[#ffdad6] flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#ba1a1a]">
              Overdue SLAs
            </span>
            <span className="p-1.5 rounded-lg bg-[#ba1a1a] text-[#ffffff]">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </span>
          </div>
          <div className="mt-4 z-10">
            <div className="font-headline text-3xl font-bold text-[#ba1a1a] leading-none">02</div>
            <div className="text-[12px] text-[#93000a] mt-1.5 font-medium">
              Critical bottlenecks flagged
            </div>
          </div>
          <div className="mt-2 pt-1 text-[11px] font-bold text-[#ba1a1a] flex items-center gap-1 border-t border-[#ba1a1a]/20">
            <span className="material-symbols-outlined text-[14px]">emergency_home</span> CSE AI Prof: +6 days overdue
          </div>
        </div>
      </div>

      {/* Operational Workspace: Main Content Split Grid (8 Cols Left / 4 Cols Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Stage Matrix & High Density Tracker Table (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          {/* Interactive Stage Tabs */}
          <div className="bg-[#ffffff] p-2 rounded-2xl shadow-sm border border-[#e8e0d8] flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setStageTab('all')}
              className={`px-4 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                stageTab === 'all'
                  ? 'bg-[#4c3023] text-[#ffffff] shadow-sm'
                  : 'text-[#504440] hover:bg-[#f4e5dc]'
              }`}
              type="button"
            >
              <span>All Open JRs</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                stageTab === 'all' ? 'bg-[#ffdbcc] text-[#2d160a]' : 'bg-[#faebe2] text-[#504440]'
              }`}>
                38
              </span>
            </button>

            <button
              onClick={() => setStageTab('shortlist')}
              className={`px-4 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                stageTab === 'shortlist'
                  ? 'bg-[#4c3023] text-[#ffffff] shadow-sm'
                  : 'text-[#504440] hover:bg-[#f4e5dc]'
              }`}
              type="button"
            >
              <span>Shortlisting Queue</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                stageTab === 'shortlist' ? 'bg-[#ffdbcc] text-[#2d160a]' : 'bg-[#faebe2] text-[#504440]'
              }`}>
                24
              </span>
            </button>

            <button
              onClick={() => setStageTab('selection')}
              className={`px-4 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                stageTab === 'selection'
                  ? 'bg-[#4c3023] text-[#ffffff] shadow-sm'
                  : 'text-[#504440] hover:bg-[#f4e5dc]'
              }`}
              type="button"
            >
              <span>Selection Dockets</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                stageTab === 'selection' ? 'bg-[#ffdbcc] text-[#2d160a]' : 'bg-[#faebe2] text-[#504440]'
              }`}>
                12
              </span>
            </button>

            <button
              onClick={() => setStageTab('offer')}
              className={`px-4 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                stageTab === 'offer'
                  ? 'bg-[#4c3023] text-[#ffffff] shadow-sm'
                  : 'text-[#504440] hover:bg-[#f4e5dc]'
              }`}
              type="button"
            >
              <span>Offers & LOI</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                stageTab === 'offer' ? 'bg-[#ffdbcc] text-[#2d160a]' : 'bg-[#faebe2] text-[#504440]'
              }`}>
                9
              </span>
            </button>

            <button
              onClick={() => setStageTab('onboard')}
              className={`px-4 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                stageTab === 'onboard'
                  ? 'bg-[#4c3023] text-[#ffffff] shadow-sm'
                  : 'text-[#504440] hover:bg-[#f4e5dc]'
              }`}
              type="button"
            >
              <span>Yet-to-Join Tracker</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                stageTab === 'onboard' ? 'bg-[#ffdbcc] text-[#2d160a]' : 'bg-[#faebe2] text-[#504440]'
              }`}>
                14
              </span>
            </button>
          </div>

          {/* Filter Strip & Quick Sorter */}
          <div className="bg-[#ffffff] p-4 rounded-2xl shadow-sm border border-[#e8e0d8] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#82746f] text-[18px]">
                  search
                </span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#faebe2] text-[13px] text-[#211a15] placeholder-[#82746f] focus:outline-none focus:ring-1 focus:ring-[#4c3023]"
                  placeholder="Filter JR code, post, dept..."
                  type="text"
                />
              </div>

              <select
                value={schoolFilter}
                onChange={(e) => setSchoolFilter(e.target.value)}
                className="h-9 px-3 rounded-lg bg-[#faebe2] text-[12px] text-[#211a15] focus:outline-none cursor-pointer border border-[#d4c3bd]"
              >
                <option value="All Faculties & Schools">All Faculties & Schools</option>
                <option value="School of Engineering">School of Engineering</option>
                <option value="School of Life Sciences">School of Life Sciences</option>
                <option value="School of Maritime">School of Maritime</option>
                <option value="Central Administrative Cadre">Central Administrative Cadre</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-[12px] text-[#82746f]">
              <span>Sort By:</span>
              <button
                onClick={() => onShowToast('Sorting table by SLA Criticality')}
                className="px-2.5 py-1 rounded-lg bg-[#f4e5dc] text-[#4c3023] font-semibold flex items-center gap-1"
                type="button"
              >
                <span>SLA Criticality</span>
                <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
              </button>
              <button
                onClick={() => onShowToast('Toggle view column filters')}
                className="p-1 rounded-lg text-[#504440] hover:bg-[#f4e5dc]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>
          </div>

          {/* Comprehensive Data Table Container */}
          <div className="bg-[#ffffff] rounded-2xl shadow-sm border border-[#e8e0d8] overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#f4e5dc]/70 text-[#211a15] font-bold text-[12px]">
                    <th className="py-3 px-4 whitespace-nowrap">JR Code & Role</th>
                    <th className="py-3 px-2 whitespace-nowrap">Faculty / School</th>
                    <th className="py-3 px-2 whitespace-nowrap">Cadre (Sanc/Cur)</th>
                    <th className="py-3 px-2 whitespace-nowrap text-center">RCS Cutoff</th>
                    <th className="py-3 px-2 whitespace-nowrap text-center">Applicants</th>
                    <th className="py-3 px-2 whitespace-nowrap">Current Workflow Stage</th>
                    <th className="py-3 px-2 whitespace-nowrap">SLA Status</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f4e5dc]">
                  {filteredJrs.map((jr, idx) => (
                    <tr
                      key={jr.id}
                      className={`hover:bg-[#f4e5dc]/40 transition-colors ${
                        idx % 2 === 1 ? 'bg-[#fff1e9]/30' : 'bg-[#ffffff]'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#4c3023]">{jr.jrCode}</span>
                            {jr.slaState === 'overdue' && (
                              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
                            )}
                          </div>
                          <span className="text-[#211a15] font-semibold text-[13px]">{jr.role}</span>
                          <span className="text-[11px] text-[#82746f]">{jr.specialization}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex flex-col">
                          <span className="font-medium text-[#211a15]">{jr.school}</span>
                          <span className="text-[11px] text-[#82746f]">{jr.department}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap">
                        <span className="font-mono text-[12px] bg-[#faebe2] px-2 py-0.5 rounded text-[#211a15]">
                          0{jr.sanctioned} Sanc / 0{jr.occupied} Occ
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            jr.rcsCutoff === 'Exempt'
                              ? 'bg-[#faebe2] text-[#82746f]'
                              : 'bg-[#ffdea7] text-[#271900]'
                          }`}
                        >
                          {jr.rcsCutoff}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center gap-1 font-bold text-[#4c3023]">
                          <span className="material-symbols-outlined text-[15px]">folder_shared</span>
                          {jr.applicantsCount}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f4e5dc] text-[#4c3023] text-[11px] font-bold">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              jr.slaState === 'overdue' ? 'bg-[#ba1a1a]' : 'bg-[#755a26]'
                            }`}
                          ></span>
                          {jr.workflowStage}
                        </span>
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            jr.slaState === 'overdue'
                              ? 'bg-[#ffdad6] text-[#ba1a1a] font-bold'
                              : jr.slaState === 'warning'
                              ? 'bg-[#f4e5dc] text-[#211a15]'
                              : 'bg-[#fff1e9] text-[#755a26]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            {jr.slaState === 'overdue'
                              ? 'warning'
                              : jr.slaState === 'warning'
                              ? 'timer'
                              : 'check_circle'}
                          </span>
                          {jr.slaStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedCandidateJr(jr);
                            onShowToast(`Viewing candidates for ${jr.jrCode}`);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all shadow-sm ${
                            jr.slaState === 'overdue'
                              ? 'bg-[#ba1a1a] text-[#ffffff] hover:bg-[#93000a]'
                              : 'bg-[#faebe2] hover:bg-[#4c3023] hover:text-[#ffffff] text-[#4c3023]'
                          }`}
                          type="button"
                        >
                          {jr.slaState === 'overdue' ? 'Expedite Panel' : 'View Candidates'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination & Stats */}
            <div className="p-4 bg-[#faebe2]/40 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#f4e5dc]">
              <span className="text-[12px] text-[#504440]">
                Showing <strong className="text-[#4c3023] font-semibold">1-{filteredJrs.length}</strong> of{' '}
                <strong className="text-[#4c3023] font-semibold">38</strong> Active Requisitions
              </span>
              <div className="flex items-center gap-1">
                <button
                  className="w-8 h-8 rounded-lg bg-[#ffffff] text-[#504440] hover:bg-[#f4e5dc] flex items-center justify-center transition-colors border border-[#e8e0d8]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#4c3023] text-[#ffffff] text-[12px] font-bold flex items-center justify-center">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#ffffff] text-[#504440] hover:bg-[#f4e5dc] text-[12px] font-semibold flex items-center justify-center transition-colors border border-[#e8e0d8]">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#ffffff] text-[#504440] hover:bg-[#f4e5dc] text-[12px] font-semibold flex items-center justify-center transition-colors border border-[#e8e0d8]">
                  3
                </button>
                <span className="px-1 text-[#82746f]">...</span>
                <button className="w-8 h-8 rounded-lg bg-[#ffffff] text-[#504440] hover:bg-[#f4e5dc] text-[12px] font-semibold flex items-center justify-center transition-colors border border-[#e8e0d8]">
                  8
                </button>
                <button
                  className="w-8 h-8 rounded-lg bg-[#ffffff] text-[#504440] hover:bg-[#f4e5dc] flex items-center justify-center transition-colors border border-[#e8e0d8]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Alert Callout Banner for Deanery Alignment */}
          <div className="bg-[#faebe2] p-4 sm:p-5 rounded-2xl flex items-start gap-4 shadow-sm border border-[#e8e0d8]">
            <div className="w-10 h-10 rounded-xl bg-[#ffdea7] flex items-center justify-center text-[#755a26] shrink-0">
              <span className="material-symbols-outlined text-[24px]">gavel</span>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-headline text-[14px] font-bold text-[#4c3023]">
                  Upcoming Selection Committee Sitting: 28th Feb 2025
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#755a26] text-[#ffffff] text-[10px] font-bold">
                  MANDATORY QUORUM
                </span>
              </div>
              <p className="text-[12px] text-[#504440] leading-relaxed">
                The Vice-Chancellor and Visitor Nominee will chair the statutory panel for Professorial cadres in Marine Propulsion & Cyber Physical Systems. Scrutiny dockets must be locked by 26th Feb, 17:00 IST.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Funnel Analytics, RCS Scoring Engine, Quick Actions Drawer (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Module 1: Conversion Funnel Analytics */}
          <div className="bg-[#ffffff] p-5 sm:p-6 rounded-2xl shadow-sm border border-[#e8e0d8] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#f4e5dc]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#755a26] text-[22px]">filter_alt</span>
                <h2 className="font-headline text-base font-bold text-[#4c3023]">Recruitment Funnel</h2>
              </div>
              <span className="text-[11px] text-[#82746f]">AY 25-26 Aggregate</span>
            </div>
            <p className="text-[12px] text-[#504440]">
              End-to-end talent lifecycle drop-off rate across screened faculty requisitions.
            </p>

            {/* Funnel Progression Stack */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#211a15] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#82746f]"></span> Resumes Screened
                  </span>
                  <span className="font-bold font-mono text-[#4c3023]">
                    412 <span className="text-[#82746f] font-normal text-[11px]">(100%)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#faebe2] overflow-hidden">
                  <div className="h-full bg-[#4c3023] rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#211a15] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#755a26]"></span> RCS Criteria Qualified
                  </span>
                  <span className="font-bold font-mono text-[#4c3023]">
                    142 <span className="text-[#82746f] font-normal text-[11px]">(34.4%)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#faebe2] overflow-hidden">
                  <div className="h-full bg-[#755a26] rounded-full" style={{ width: '34.4%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#211a15] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#e5c183]"></span> Technical Interviewed
                  </span>
                  <span className="font-bold font-mono text-[#4c3023]">
                    58 <span className="text-[#82746f] font-normal text-[11px]">(14.0%)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#faebe2] overflow-hidden">
                  <div className="h-full bg-[#e5c183] rounded-full" style={{ width: '14%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#211a15] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#654638]"></span> Selection Board Rec.
                  </span>
                  <span className="font-bold font-mono text-[#4c3023]">
                    19 <span className="text-[#82746f] font-normal text-[11px]">(4.6%)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#faebe2] overflow-hidden">
                  <div className="h-full bg-[#654638] rounded-full" style={{ width: '4.6%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#211a15] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ffdea7]"></span> Offers / LOI Issued
                  </span>
                  <span className="font-bold font-mono text-[#4c3023]">
                    12 <span className="text-[#82746f] font-normal text-[11px]">(2.9%)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#faebe2] overflow-hidden">
                  <div className="h-full bg-[#ffdea7] rounded-full" style={{ width: '2.9%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#211a15] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4c3023]"></span> Final Onboarded
                  </span>
                  <span className="font-bold font-mono text-[#755a26]">
                    8 <span className="text-[#82746f] font-normal text-[11px]">(1.9%)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#faebe2] overflow-hidden">
                  <div className="h-full bg-[#4c3023] rounded-full" style={{ width: '1.9%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#faebe2] rounded-xl flex items-center justify-between text-[12px] text-[#211a15]">
              <span>Overall Sourcing-to-Hire SLA</span>
              <span className="font-bold text-[#4c3023] font-mono">42 Days Avg</span>
            </div>
          </div>

          {/* Module 2: Explainable RCS Weighting Engine */}
          <div className="bg-[#ffffff] p-5 sm:p-6 rounded-2xl shadow-sm border border-[#e8e0d8] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#f4e5dc]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4c3023] text-[22px]">neurology</span>
                <h2 className="font-headline text-base font-bold text-[#4c3023]">Explainable RCS Weighting</h2>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#faebe2] text-[#211a15] text-[10px] font-bold">
                UGC 2018
              </span>
            </div>
            <p className="text-[12px] text-[#504440]">
              Automated scoring distribution model for instant academic merit indexing:
            </p>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="p-3 rounded-xl bg-[#faebe2] flex flex-col">
                <span className="text-[20px] font-bold text-[#4c3023] font-mono leading-none">40%</span>
                <span className="text-[12px] text-[#211a15] font-semibold mt-1">Academic API</span>
                <span className="text-[11px] text-[#82746f]">Degrees, UGC-NET & CGPA</span>
              </div>
              <div className="p-3 rounded-xl bg-[#faebe2] flex flex-col">
                <span className="text-[20px] font-bold text-[#755a26] font-mono leading-none">30%</span>
                <span className="text-[12px] text-[#211a15] font-semibold mt-1">Research & Scopus</span>
                <span className="text-[11px] text-[#82746f]">Q1/Q2 Papers, Citations, H-Index</span>
              </div>
              <div className="p-3 rounded-xl bg-[#faebe2] flex flex-col">
                <span className="text-[20px] font-bold text-[#654638] font-mono leading-none">20%</span>
                <span className="text-[12px] text-[#211a15] font-semibold mt-1">Teaching Pedagogy</span>
                <span className="text-[11px] text-[#82746f]">Classroom demo & LMS mastery</span>
              </div>
              <div className="p-3 rounded-xl bg-[#faebe2] flex flex-col">
                <span className="text-[20px] font-bold text-[#82746f] font-mono leading-none">10%</span>
                <span className="text-[12px] text-[#211a15] font-semibold mt-1">Patents & Industry</span>
                <span className="text-[11px] text-[#82746f]">Funded Grants & Tech Transfer</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-[12px] text-[#4c3023]">
              <button
                onClick={() => setShowRcsModal(true)}
                className="hover:underline flex items-center gap-1 font-semibold text-[#755a26]"
                type="button"
              >
                <span>Adjust AICTE/UGC Cutoff Rule</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </button>
              <span className="material-symbols-outlined text-[#755a26] text-[18px]">verified</span>
            </div>
          </div>

          {/* Module 3: Executive Action Drawer Triggers */}
          <div className="bg-[#f4e5dc]/60 p-5 sm:p-6 rounded-2xl shadow-sm border border-[#e8e0d8] flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4c3023] text-[20px]">bolt</span>
              <h2 className="font-headline text-base font-bold text-[#4c3023]">Expedited Executive Actions</h2>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowLoiModal(true)}
                className="w-full text-left p-3 bg-[#ffffff] hover:bg-[#fff8f5] rounded-xl shadow-xs border border-[#e8e0d8] flex items-center justify-between transition-all group"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#faebe2] text-[#4c3023] flex items-center justify-center group-hover:bg-[#4c3023] group-hover:text-[#ffffff] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">contact_mail</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] text-[#211a15] font-bold">Issue Provisional LOI</span>
                    <span className="text-[11px] text-[#82746f]">Trigger digital salary offer letter</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#82746f] group-hover:text-[#4c3023] transition-colors text-[18px]">
                  chevron_right
                </span>
              </button>

              <button
                onClick={() => setShowCommModal(true)}
                className="w-full text-left p-3 bg-[#ffffff] hover:bg-[#fff8f5] rounded-xl shadow-xs border border-[#e8e0d8] flex items-center justify-between transition-all group"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#faebe2] text-[#755a26] flex items-center justify-center group-hover:bg-[#755a26] group-hover:text-[#ffffff] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">group_add</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] text-[#211a15] font-bold">Form Selection Committee</span>
                    <span className="text-[11px] text-[#82746f]">Nominate Deans, External Vetting</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#82746f] group-hover:text-[#4c3023] transition-colors text-[18px]">
                  chevron_right
                </span>
              </button>

              <button
                onClick={() => onShowToast('Automated referee verification dispatches sent to 8 shortlisted candidate referees via university digital portal.')}
                className="w-full text-left p-3 bg-[#ffffff] hover:bg-[#fff8f5] rounded-xl shadow-xs border border-[#e8e0d8] flex items-center justify-between transition-all group"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#faebe2] text-[#4c3023] flex items-center justify-center group-hover:bg-[#4c3023] group-hover:text-[#ffffff] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">security_update_good</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] text-[#211a15] font-bold">Trigger Reference Verification</span>
                    <span className="text-[11px] text-[#82746f]">Automated referee check dispatch</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#82746f] group-hover:text-[#4c3023] transition-colors text-[18px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Roster Modal */}
      {selectedCandidateJr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211a15]/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#ffffff] shadow-2xl overflow-hidden border border-[#e8e0d8] flex flex-col">
            <div className="p-5 bg-[#fff1e9] border-b border-[#e8e0d8] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline text-lg font-bold text-[#4c3023]">
                    Candidates for {selectedCandidateJr.jrCode}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#fdd897] text-[#785c28] text-[10px] font-bold">
                    {selectedCandidateJr.applicantsCount} Applicants
                  </span>
                </div>
                <p className="text-[12px] text-[#504440]">
                  {selectedCandidateJr.role} • {selectedCandidateJr.school}
                </p>
              </div>
              <button
                onClick={() => setSelectedCandidateJr(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#82746f] hover:bg-[#faebe2]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-5 space-y-3 max-h-96 overflow-y-auto">
              <div className="p-3.5 rounded-xl border border-[#e8e0d8] bg-[#ffffff] hover:bg-[#fff8f5] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#211a15]">Dr. Aravind Swaminathan</div>
                  <div className="text-[11px] text-[#82746f]">PhD (IISc) • 19 Years Exp • RCS Score: 96.5/100</div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#faebe2] text-[#755a26] text-[10px] font-bold">
                    Scrutiny Verified (Rank #1)
                  </span>
                </div>
                <button
                  onClick={() => onShowToast('Forwarding Dr. Swaminathan to Executive Chamber...')}
                  className="px-3 py-1.5 rounded-lg bg-[#4c3023] text-[#ffffff] text-[11px] font-bold hover:bg-[#654638]"
                >
                  Forward to Board
                </button>
              </div>

              <div className="p-3.5 rounded-xl border border-[#e8e0d8] bg-[#ffffff] hover:bg-[#fff8f5] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#211a15]">Dr. Debashis Chowdhury</div>
                  <div className="text-[11px] text-[#82746f]">PhD (IIT Kharagpur) • 12 Years Exp • RCS Score: 88.0/100</div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#faebe2] text-[#504440] text-[10px] font-bold">
                    Technical Interview Cleared
                  </span>
                </div>
                <button
                  onClick={() => onShowToast('Scheduled interview panel round for Dr. Chowdhury.')}
                  className="px-3 py-1.5 rounded-lg bg-[#faebe2] text-[#4c3023] text-[11px] font-bold hover:bg-[#f4e5dc]"
                >
                  Schedule Final
                </button>
              </div>

              <div className="p-3.5 rounded-xl border border-[#e8e0d8] bg-[#ffffff] hover:bg-[#fff8f5] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#211a15]">Dr. Priya Sundaram</div>
                  <div className="text-[11px] text-[#82746f]">PhD (IIEST Shibpur) • 8 Years Exp • RCS Score: 84.5/100</div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#faebe2] text-[#504440] text-[10px] font-bold">
                    Stage 1 Cleared
                  </span>
                </div>
                <button
                  onClick={() => onShowToast('Calling for Technical Presentation round.')}
                  className="px-3 py-1.5 rounded-lg bg-[#faebe2] text-[#4c3023] text-[11px] font-bold hover:bg-[#f4e5dc]"
                >
                  Invite Tech Demo
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#fff1e9] border-t border-[#e8e0d8] flex justify-end">
              <button
                onClick={() => setSelectedCandidateJr(null)}
                className="px-4 py-1.5 rounded-xl bg-[#4c3023] text-[#ffffff] font-bold text-[12px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Adjust RCS Modal */}
      {showRcsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211a15]/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#ffffff] shadow-2xl overflow-hidden border border-[#e8e0d8] p-6">
            <h3 className="font-headline text-lg font-bold text-[#4c3023] mb-2">
              Calibrate UGC 2018 Criteria & Cutoff Weights
            </h3>
            <p className="text-[12px] text-[#504440] mb-4">
              Customize the automated weights according to institutional Academic Council norms:
            </p>
            <div className="space-y-3 text-[13px]">
              <div>
                <div className="flex justify-between font-semibold">
                  <span>Academic Qualifications & API:</span>
                  <span className="font-mono text-[#4c3023]">40%</span>
                </div>
                <input type="range" defaultValue={40} className="w-full accent-[#4c3023]" />
              </div>
              <div>
                <div className="flex justify-between font-semibold">
                  <span>Research & Indexed Publications:</span>
                  <span className="font-mono text-[#755a26]">30%</span>
                </div>
                <input type="range" defaultValue={30} className="w-full accent-[#755a26]" />
              </div>
              <div>
                <div className="flex justify-between font-semibold">
                  <span>Teaching Pedagogy Demo:</span>
                  <span className="font-mono text-[#654638]">20%</span>
                </div>
                <input type="range" defaultValue={20} className="w-full accent-[#654638]" />
              </div>
              <div>
                <div className="flex justify-between font-semibold">
                  <span>Patents & Industry Projects:</span>
                  <span className="font-mono text-[#82746f]">10%</span>
                </div>
                <input type="range" defaultValue={10} className="w-full accent-[#82746f]" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowRcsModal(false)}
                className="px-4 py-2 rounded-xl text-[#504440] hover:bg-[#faebe2]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRcsModal(false);
                  onShowToast('UGC 2018 RCS Weighting profile updated and broadcast to screening panels.');
                }}
                className="px-4 py-2 rounded-xl bg-[#4c3023] text-[#ffffff] font-bold"
              >
                Save Weights
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue LOI Modal */}
      {showLoiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211a15]/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#ffffff] shadow-2xl overflow-hidden border border-[#e8e0d8] p-6">
            <h3 className="font-headline text-lg font-bold text-[#4c3023] mb-2">
              Issue Provisional Letter of Intent (LOI)
            </h3>
            <p className="text-[12px] text-[#504440] mb-4">
              Generate and digitally dispatch an offer letter package:
            </p>
            <div className="space-y-3 text-[13px]">
              <div>
                <label className="block font-semibold mb-1">Candidate Name</label>
                <input
                  type="text"
                  defaultValue="Dr. Aravind Swaminathan"
                  className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Position & Pay Band</label>
                <input
                  type="text"
                  defaultValue="Professor & Chair of Cyber Security (Level 14A)"
                  className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Agreed Gross CTC</label>
                <input
                  type="text"
                  defaultValue="₹28,50,000 per annum"
                  className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowLoiModal(false)}
                className="px-4 py-2 rounded-xl text-[#504440] hover:bg-[#faebe2]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLoiModal(false);
                  onShowToast('Provisional LOI dispatched with Registrar digital seal.');
                }}
                className="px-4 py-2 rounded-xl bg-[#4c3023] text-[#ffffff] font-bold"
              >
                Dispatch LOI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Committee Modal */}
      {showCommModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211a15]/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#ffffff] shadow-2xl overflow-hidden border border-[#e8e0d8] p-6">
            <h3 className="font-headline text-lg font-bold text-[#4c3023] mb-2">
              Form Statutory Selection Board Committee
            </h3>
            <p className="text-[12px] text-[#504440] mb-4">
              Nominate academic leadership and external visitor nominees:
            </p>
            <div className="space-y-3 text-[13px]">
              <div>
                <label className="block font-semibold mb-1">Board Chairperson</label>
                <input
                  type="text"
                  defaultValue="Prof. S. Mukhopadhyay (Dean - Eng & Tech)"
                  className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">External Nominee 1</label>
                <input
                  type="text"
                  defaultValue="Prof. K. N. Rao (IIT Kharagpur)"
                  className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">External Nominee 2</label>
                <input
                  type="text"
                  defaultValue="Prof. A. Sengupta (Jadavpur University)"
                  className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowCommModal(false)}
                className="px-4 py-2 rounded-xl text-[#504440] hover:bg-[#faebe2]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCommModal(false);
                  onShowToast('Statutory Selection Committee constituted and invites transmitted.');
                }}
                className="px-4 py-2 rounded-xl bg-[#4c3023] text-[#ffffff] font-bold"
              >
                Constitute Board
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
