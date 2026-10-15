import React, { useState } from 'react';
import { CandidateRecord, ManpowerRequest, INITIAL_CANDIDATES } from '../../data/mockData';

interface HRScreensProps {
  currentView:
    | 'dashboard'
    | 'vetting'
    | 'vacancies'
    | 'candidates'
    | 'screening'
    | 'interviews'
    | 'offers'
    | 'joining';
  onNavigate: (view: string) => void;
  requests: ManpowerRequest[];
  onShowToast: (msg: string) => void;
  isHeadHR?: boolean;
}

export const HRScreens: React.FC<HRScreensProps> = ({
  currentView,
  onNavigate,
  requests,
  onShowToast,
  isHeadHR = true
}) => {
  const [candidates, setCandidates] = useState<CandidateRecord[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRecord | null>(null);
  const [searchCand, setSearchCand] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [scheduleModal, setScheduleModal] = useState<CandidateRecord | null>(null);
  const [interviewDate, setInterviewDate] = useState('2025-03-05');
  const [interviewTime, setInterviewTime] = useState('11:00 AM');
  const [panelType, setPanelType] = useState('Technical Panel');

  // Vetting queue for Head HR
  const vettingRequests = requests.filter(
    (r) => r.status === 'HR Vetting' || r.status === 'Submitted'
  );

  const handleVetAndApprove = (req: ManpowerRequest) => {
    onShowToast(`Cadre check verified for ${req.reqCode}. Transmitted to Pro-Chancellor for statutory approval.`);
  };

  const handleUpdateCandidateStage = (
    candId: string,
    newStage: CandidateRecord['stage'],
    note?: string
  ) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, stage: newStage } : c))
    );
    onShowToast(`Candidate status updated to: ${newStage}`);
  };

  const handleScheduleInterviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleModal) return;

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === scheduleModal.id
          ? {
              ...c,
              stage: panelType.includes('Selection') ? 'Selection Board' : 'Technical Interview',
              interviewDate,
              interviewTime,
              panelAssigned: panelType
            }
          : c
      )
    );
    onShowToast(`Interview scheduled for ${scheduleModal.name} on ${interviewDate} at ${interviewTime}!`);
    setScheduleModal(null);
  };

  const filteredCandidates = candidates.filter((c) => {
    if (stageFilter !== 'All' && c.stage !== stageFilter) return false;
    if (searchCand) {
      const q = searchCand.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.appliedRole.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6 w-full text-[13px] font-body text-[#34251F]">
      {/* View 1: HR Dashboard */}
      {currentView === 'dashboard' && (
        <div className="space-y-6">
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#C8A66A]">
                {isHeadHR ? 'HR Leadership & Manpower Command' : 'Talent Acquisition Cell'}
              </div>
              <h1 className="font-headline font-bold text-2xl text-[#34251F] mt-0.5">
                Central Recruitment & Onboarding Centre
              </h1>
              <p className="text-[13px] text-[#766B64] mt-1">
                Overseeing sanctioned cadre limits, reservation roster, job advertisements, and faculty induction.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('candidates')}
                className="px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#E8E0D8] text-[#34251F] font-bold text-[13px] hover:bg-[#F8F6F2]"
              >
                Candidate Database
              </button>
              <button
                onClick={() => onNavigate('vetting')}
                className="px-5 py-2.5 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[13px] hover:bg-[#4c3023] transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Vetting Queue ({vettingRequests.length})</span>
              </button>
            </div>
          </div>

          {/* 4 Key HR Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Awaiting Cadre Vetting
              </span>
              <div className="font-headline font-bold text-3xl text-[#654638] mt-1">
                {vettingRequests.length}
              </div>
              <div className="text-[12px] text-[#B7791F] font-semibold mt-2">
                Roster Allocation Pending
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Active Candidate Pipeline
              </span>
              <div className="font-headline font-bold text-3xl text-[#34251F] mt-1">
                {candidates.length}
              </div>
              <div className="text-[12px] text-[#287A55] font-semibold mt-2">
                Across 4 Schools
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Interviews Scheduled
              </span>
              <div className="font-headline font-bold text-3xl text-[#34251F] mt-1">
                {candidates.filter((c) => c.stage.includes('Interview') || c.stage.includes('Board')).length}
              </div>
              <div className="text-[12px] text-[#766B64] mt-2">Hearings this month</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Offers & Yet-to-Join
              </span>
              <div className="font-headline font-bold text-3xl text-[#287A55] mt-1">
                {candidates.filter((c) => c.stage === 'Offer Issued' || c.stage === 'Joined').length}
              </div>
              <div className="text-[12px] text-[#766B64] mt-2">Induction queued</div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('candidates')}
              className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] text-left hover:border-[#654638] transition-colors"
            >
              <span className="material-symbols-outlined text-[24px] text-[#654638]">badge</span>
              <h3 className="font-headline font-bold text-base text-[#34251F] mt-2">
                Candidate Screening
              </h3>
              <p className="text-[12px] text-[#766B64] mt-1">
                Review UGC 2018 API merit scores and advance candidates.
              </p>
            </button>

            <button
              onClick={() => onNavigate('interviews')}
              className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] text-left hover:border-[#654638] transition-colors"
            >
              <span className="material-symbols-outlined text-[24px] text-[#755a26]">event_available</span>
              <h3 className="font-headline font-bold text-base text-[#34251F] mt-2">
                Interview Scheduling
              </h3>
              <p className="text-[12px] text-[#766B64] mt-1">
                Coordinate dates with Technical Panels & Selection Boards.
              </p>
            </button>

            <button
              onClick={() => onNavigate('offers')}
              className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] text-left hover:border-[#654638] transition-colors"
            >
              <span className="material-symbols-outlined text-[24px] text-[#287A55]">drafts</span>
              <h3 className="font-headline font-bold text-base text-[#34251F] mt-2">
                Offers & LOI Tracker
              </h3>
              <p className="text-[12px] text-[#766B64] mt-1">
                Issue salary offer packages and track document verification.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* View 2: Requisition Vetting */}
      {currentView === 'vetting' && (
        <div className="space-y-6">
          <div>
            <h1 className="font-headline font-bold text-2xl text-[#34251F]">
              Requisition Cadre Vetting
            </h1>
            <p className="text-[13px] text-[#766B64]">
              Verify posts against sanctioned university cadre limits and reservation roster before executive sign-off
            </p>
          </div>

          <div className="space-y-4">
            {vettingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-3 border-b border-[#E8E0D8]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-headline font-bold text-lg text-[#34251F]">
                        {req.positionTitle}
                      </h2>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#F8F6F2] border border-[#E8E0D8] text-[#654638]">
                        {req.reqCode}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#766B64] mt-0.5">
                      {req.department} • Tier: <strong>{req.cadreTier}</strong>
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#F8F6F2] border border-[#C8A66A] text-[#654638] font-bold text-[11px]">
                    Endorsed by Dean Mukhopadhyay
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-[#F8F6F2] text-[12px]">
                  <div>
                    <span className="text-[#766B64] block font-semibold">Sanctioned Cadre Balance:</span>
                    <strong className="text-[#34251F]">6 Available Vacancies</strong>
                  </div>
                  <div>
                    <span className="text-[#766B64] block font-semibold">Roster Category:</span>
                    <strong className="text-[#34251F]">Unreserved / Open Merit</strong>
                  </div>
                  <div>
                    <span className="text-[#766B64] block font-semibold">Pay Band Validation:</span>
                    <strong className="text-[#287A55]">UGC 7th CPC Approved</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[12px] text-[#766B64]">
                    Next Step: Forward to Pro-Chancellor Governing Board
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onShowToast(`Clarification memo sent to Deanery for ${req.reqCode}.`)}
                      className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E8E0D8] text-[#34251F] font-semibold text-[12px] hover:bg-[#F8F6F2]"
                    >
                      Request Clarification
                    </button>
                    <button
                      onClick={() => handleVetAndApprove(req)}
                      className="px-4 py-1.5 rounded-lg bg-[#654638] text-[#FFFFFF] font-bold text-[12px] hover:bg-[#4c3023] shadow-xs flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>Approve Cadre & Forward to Executive</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {vettingRequests.length === 0 && (
              <div className="p-8 text-center bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] text-[#766B64]">
                All requisitions are fully vetted. No pending items.
              </div>
            )}
          </div>
        </div>
      )}

      {/* View 3: Candidate Database & Screening */}
      {(currentView === 'candidates' || currentView === 'screening') && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline font-bold text-2xl text-[#34251F]">
                Candidate Database & Screening
              </h1>
              <p className="text-[13px] text-[#766B64]">
                Search applicant pool, inspect credentials, and advance through evaluation stages
              </p>
            </div>
            <button
              onClick={() => onShowToast('Exporting candidate shortlist report as CSV...')}
              className="px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#E8E0D8] text-[#34251F] font-bold text-[12px] hover:bg-[#F8F6F2]"
            >
              Export Candidate List
            </button>
          </div>

          {/* Filters */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#766B64] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchCand}
                onChange={(e) => setSearchCand(e.target.value)}
                placeholder="Search candidates by name, role..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#F8F6F2] text-[13px] border border-[#E8E0D8] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-[12px] text-[#766B64]">Stage:</span>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="h-9 px-3 rounded-lg bg-[#F8F6F2] text-[12px] border border-[#E8E0D8] focus:outline-none"
              >
                <option value="All">All Stages</option>
                <option value="Screening">Screening</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Technical Interview">Technical Interview</option>
                <option value="Selection Board">Selection Board</option>
                <option value="Offer Issued">Offer Issued</option>
                <option value="Joined">Joined</option>
              </select>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-[#F8F6F2] border-b border-[#E8E0D8] text-[#34251F] font-bold text-[12px]">
                    <th className="py-3 px-4">Candidate Name</th>
                    <th className="py-3 px-3">Applied Position</th>
                    <th className="py-3 px-3">Doctoral / Master Degree</th>
                    <th className="py-3 px-2 text-center">Exp (Yrs)</th>
                    <th className="py-3 px-2 text-center">RCS Score</th>
                    <th className="py-3 px-3">Stage</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E0D8]">
                  {filteredCandidates.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F8F6F2]/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#34251F]">{c.name}</div>
                        <div className="text-[11px] text-[#766B64]">{c.email}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-[#34251F]">{c.appliedRole}</div>
                        <div className="text-[11px] text-[#766B64]">{c.department}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="text-[#34251F]">{c.highestDegree}</div>
                        <div className="text-[11px] text-[#766B64]">{c.university}</div>
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold text-[#34251F]">
                        {c.experienceYears}y
                      </td>
                      <td className="py-3.5 px-2 text-center">
                        <span className="font-headline font-bold text-[#654638]">
                          {c.rcsScore}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F8F6F2] border border-[#C8A66A] text-[#654638]">
                          {c.stage}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => setScheduleModal(c)}
                          className="px-2.5 py-1 rounded-lg bg-[#F8F6F2] border border-[#E8E0D8] text-[11px] font-semibold text-[#34251F] hover:bg-[#E8E0D8]"
                        >
                          Schedule
                        </button>
                        <button
                          onClick={() => setSelectedCandidate(c)}
                          className="px-3 py-1 rounded-lg bg-[#654638] text-[#FFFFFF] text-[11px] font-bold hover:bg-[#4c3023]"
                        >
                          Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* View 4: Interview Scheduling Overview */}
      {currentView === 'interviews' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline font-bold text-2xl text-[#34251F]">
                Interview Coordination & Statutory Boards
              </h1>
              <p className="text-[13px] text-[#766B64]">
                Schedule Technical Panels and Statutory Selection Committee Hearings
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E0D8]">
                <span className="font-headline font-bold text-[14px] text-[#34251F]">
                  Upcoming Selection Committee Hearings
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#F8F6F2] text-[11px] text-[#654638] font-bold">
                  Deanery Quorum Confirmed
                </span>
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#F8F6F2] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#34251F]">Dr. Aravind Swaminathan</div>
                    <div className="text-[11px] text-[#766B64]">
                      Professor & Chair of Cyber Security • Feb 28, 2025 (10:30 AM)
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#287A55]">Panel Ready</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E0D8]">
                <span className="font-headline font-bold text-[14px] text-[#34251F]">
                  Technical Presentations & Demos
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#F8F6F2] text-[11px] text-[#755a26] font-bold">
                  Department Evaluators
                </span>
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#F8F6F2] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#34251F]">Dr. Suniti Mukherjee</div>
                    <div className="text-[11px] text-[#766B64]">
                      Associate Professor — AI/ML • Feb 20, 2025 (02:30 PM)
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#B7791F]">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 5: Offers & LOI Tracker */}
      {(currentView === 'offers' || currentView === 'joining') && (
        <div className="space-y-6">
          <div>
            <h1 className="font-headline font-bold text-2xl text-[#34251F]">
              Offers, Letter of Intent (LOI) & Joining Tracker
            </h1>
            <p className="text-[13px] text-[#766B64]">
              Monitor digital offer acceptance, credential checks, and joining induction
            </p>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] shadow-sm p-6 space-y-4">
            <h2 className="font-headline font-bold text-lg text-[#34251F]">
              Active Offers & Document Verification Queue
            </h2>
            <div className="divide-y divide-[#E8E0D8]">
              {candidates
                .filter((c) => c.stage === 'Offer Issued' || c.stage === 'Joined' || c.salaryOfferedAnnual)
                .map((cand) => (
                  <div key={cand.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-[#34251F]">{cand.name}</span>
                        <span className="px-2 py-0.5 rounded bg-[#F8F6F2] text-[11px] font-bold text-[#654638]">
                          {cand.stage}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#766B64] mt-0.5">
                        {cand.appliedRole} • Offered Annual CTC: <strong>{cand.salaryOfferedAnnual || '₹14,50,000'}</strong>
                      </p>
                      <p className="text-[11px] text-[#766B64]">
                        Expected Joining Date: <strong>{cand.expectedJoiningDate || 'Nov 15, 2024'}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onShowToast(`Generated digital appointment letter for ${cand.name}`)}
                        className="px-3 py-1.5 rounded-lg bg-[#F8F6F2] border border-[#E8E0D8] text-[12px] font-semibold text-[#34251F]"
                      >
                        Download LOI
                      </button>
                      {cand.stage !== 'Joined' && (
                        <button
                          onClick={() => handleUpdateCandidateStage(cand.id, 'Joined')}
                          className="px-4 py-1.5 rounded-lg bg-[#287A55] text-[#FFFFFF] font-bold text-[12px] hover:bg-[#1f5f42]"
                        >
                          Mark as Joined & Active
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Candidate Profile Drawer */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#34251F]/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] shadow-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#E8E0D8]">
              <div>
                <h3 className="font-headline font-bold text-xl text-[#34251F]">
                  {selectedCandidate.name}
                </h3>
                <p className="text-[12px] text-[#766B64]">
                  {selectedCandidate.appliedRole} • {selectedCandidate.department}
                </p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#766B64] hover:bg-[#E8E0D8]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-[13px]">
              <div className="p-3 rounded-xl bg-[#F8F6F2] grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-[#766B64] block font-bold">Highest Degree:</span>
                  <span className="font-semibold text-[#34251F]">{selectedCandidate.highestDegree}</span>
                  <span className="text-[11px] text-[#766B64] block">{selectedCandidate.university}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#766B64] block font-bold">Experience & Score:</span>
                  <span className="font-semibold text-[#34251F]">{selectedCandidate.experienceYears} Years Post-PhD</span>
                  <span className="text-[11px] font-bold text-[#654638] block">RCS Score: {selectedCandidate.rcsScore}/100</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-[#766B64] block font-bold uppercase">Current Organization</span>
                <span className="font-semibold text-[#34251F]">{selectedCandidate.currentCompany}</span>
              </div>

              {selectedCandidate.evaluation && (
                <div className="p-3 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] space-y-1">
                  <span className="text-[11px] font-bold text-[#654638] uppercase">Panel Evaluation Summary</span>
                  <p className="text-[12px] text-[#34251F] italic">“{selectedCandidate.evaluation.comments}”</p>
                  <div className="text-[11px] text-[#766B64]">
                    Evaluator: <strong>{selectedCandidate.evaluation.evaluator}</strong> • Recommendation:{' '}
                    <strong className="text-[#287A55]">{selectedCandidate.evaluation.recommendation}</strong>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E8E0D8]">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    handleUpdateCandidateStage(selectedCandidate.id, 'Shortlisted');
                    setSelectedCandidate(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#F8F6F2] border border-[#E8E0D8] text-[12px] font-semibold text-[#34251F]"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => {
                    handleUpdateCandidateStage(selectedCandidate.id, 'Offer Issued');
                    setSelectedCandidate(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#654638] text-[#FFFFFF] text-[12px] font-bold"
                >
                  Issue Offer
                </button>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-1.5 rounded-lg bg-[#F8F6F2] text-[#34251F] font-semibold text-[12px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#34251F]/40 backdrop-blur-xs animate-in fade-in">
          <form
            onSubmit={handleScheduleInterviewSubmit}
            className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] shadow-2xl max-w-md w-full p-6 space-y-4"
          >
            <h3 className="font-headline font-bold text-lg text-[#34251F]">
              Schedule Candidate Interview
            </h3>
            <p className="text-[12px] text-[#766B64]">
              Candidate: <strong>{scheduleModal.name}</strong> • {scheduleModal.appliedRole}
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-bold text-[#34251F] mb-1">Interview Panel</label>
                <select
                  value={panelType}
                  onChange={(e) => setPanelType(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-[#E8E0D8] text-[13px]"
                >
                  <option>Technical Evaluation Panel (Domain Experts)</option>
                  <option>Statutory Selection Committee (Dean & Visitor Nominee)</option>
                  <option>Deanery Discussion Round</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#34251F] mb-1">Date</label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-[#E8E0D8] text-[13px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#34251F] mb-1">Time</label>
                  <input
                    type="text"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    placeholder="e.g. 10:30 AM"
                    className="w-full h-9 px-3 rounded-xl border border-[#E8E0D8] text-[13px]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setScheduleModal(null)}
                className="px-4 py-2 rounded-xl text-[#766B64] hover:bg-[#F8F6F2] font-semibold text-[13px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[13px] hover:bg-[#4c3023]"
              >
                Confirm Schedule
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
