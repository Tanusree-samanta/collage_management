import React, { useState } from 'react';
import { ManpowerRequest, INITIAL_MANPOWER_REQUESTS } from '../../data/mockData';

interface ManagementApprovalScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (path: string) => void;
}

export const ManagementApprovalScreen: React.FC<ManagementApprovalScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [requests, setRequests] = useState<ManpowerRequest[]>(INITIAL_MANPOWER_REQUESTS);
  const [selectedReq, setSelectedReq] = useState<ManpowerRequest>(INITIAL_MANPOWER_REQUESTS[2]); // Chair post REQ-079
  const [decisionNotes, setDecisionNotes] = useState<string>('');

  const handleDecision = (type: 'Approve' | 'Clarify' | 'Reject') => {
    if (type === 'Approve') {
      onShowToast(`Management Approval Granted for ${selectedReq.reqCode}! Budget sanctioned.`);
    } else if (type === 'Clarify') {
      onShowToast(`Financial clarification requested from Finance & Deanery for ${selectedReq.reqCode}.`);
    } else {
      onShowToast(`Requisition ${selectedReq.reqCode} declined by Management Committee.`);
    }
    setDecisionNotes('');
  };

  return (
    <div className="flex flex-col gap-6 w-full font-body text-[13px] text-[#34251F]">
      {/* Header */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[12px] font-bold uppercase tracking-wider text-[#C8A66A]">
            University Management & Board of Governors
          </div>
          <h1 className="font-headline font-bold text-2xl text-[#34251F] mt-0.5">
            Executive Manpower Allocations & Fiscal Approvals
          </h1>
          <p className="text-[13px] text-[#766B64] mt-1">
            Review high-value academic chairs, unbudgeted departmental expansions, and statutory salary bands.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#287A55]/10 text-[#287A55] font-bold text-[12px]">
            Fiscal Year 2024–2025 Reserve: ₹4.8 Cr Unallocated
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
            Pending Management Approvals
          </span>
          <div className="font-headline font-bold text-3xl text-[#654638] mt-1">3 Dockets</div>
          <div className="text-[12px] text-[#B7791F] font-semibold mt-2">Annual Outlay: ₹74.5 Lakhs</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
            Total University Faculty Strength
          </span>
          <div className="font-headline font-bold text-3xl text-[#34251F] mt-1">214 / 240</div>
          <div className="text-[12px] text-[#287A55] font-semibold mt-2">89.2% Sanction Utilization</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
            Sponsored Research Recovery
          </span>
          <div className="font-headline font-bold text-3xl text-[#287A55] mt-1">₹1.85 Cr</div>
          <div className="text-[12px] text-[#766B64] mt-2">External Grants Offsetting Salaries</div>
        </div>
      </div>

      {/* Main Approval Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <h2 className="font-headline font-bold text-base text-[#34251F]">
            Requisitions Requiring Management Sanction
          </h2>
          <div className="space-y-3">
            {requests.map((r) => {
              const isSelected = selectedReq.id === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedReq(r)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#F8F6F2] border-[#654638] shadow-sm'
                      : 'bg-[#FFFFFF] border-[#E8E0D8] hover:bg-[#F8F6F2]/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#654638] text-[#FFFFFF]">
                      {r.reqCode}
                    </span>
                    <span className="font-bold text-[#654638] text-[12px]">
                      {r.budgetEstimatedAnnual}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-sm text-[#34251F] mt-2">
                    {r.positionTitle}
                  </h3>
                  <p className="text-[12px] text-[#766B64] mt-0.5">{r.department}</p>
                  <div className="mt-2 text-[11px] text-[#766B64] flex justify-between items-center pt-2 border-t border-[#E8E0D8]">
                    <span>Type: {r.requirementType}</span>
                    <span className="font-semibold text-[#34251F]">{r.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E0D8]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8A66A]">
                  Management Dossier Review
                </span>
                <h3 className="font-headline font-bold text-xl text-[#34251F] mt-0.5">
                  {selectedReq.positionTitle}
                </h3>
                <p className="text-[12px] text-[#766B64]">{selectedReq.department}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-[#766B64] uppercase block">Annual CTC Outlay</span>
                <span className="font-headline font-bold text-2xl text-[#654638]">{selectedReq.budgetEstimatedAnnual}</span>
              </div>
            </div>

            {/* Justification & Student Impact */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Strategic Academic Justification
              </span>
              <p className="p-3.5 rounded-xl bg-[#F8F6F2] text-[#34251F] leading-relaxed">
                {selectedReq.justificationReason}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-3 text-center text-[12px]">
              <div className="p-3 rounded-xl bg-[#F8F6F2]">
                <span className="text-[#766B64] block">Pay Band</span>
                <strong className="text-[#34251F]">{selectedReq.cadreTier}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F6F2]">
                <span className="text-[#766B64] block">Weekly Overload</span>
                <strong className="text-[#B83A3A]">+{selectedReq.weeklyOverloadHours} Hours</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F6F2]">
                <span className="text-[#766B64] block">Open Department Posts</span>
                <strong className="text-[#654638]">{selectedReq.existingVacancies} Vacancies</strong>
              </div>
            </div>

            {/* Management Notes */}
            <div className="space-y-1.5">
              <label className="font-semibold text-[#34251F] block text-[13px]">
                Board of Governors Resolution & Audit Note
              </label>
              <textarea
                rows={3}
                value={decisionNotes}
                onChange={(e) => setDecisionNotes(e.target.value)}
                placeholder="Enter executive rationale, financial grant offsets, or terms for approval..."
                className="w-full p-3 rounded-xl border border-[#E8E0D8] bg-[#FFFFFF] text-[13px] text-[#34251F] focus:outline-none focus:ring-1 focus:ring-[#654638]"
              />
            </div>

            {/* Decision Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-[#E8E0D8]">
              <button
                type="button"
                onClick={() => handleDecision('Reject')}
                className="px-4 py-2 rounded-xl border border-[#B83A3A] text-[#B83A3A] hover:bg-[#B83A3A]/10 font-bold text-[12px] transition-colors"
              >
                Decline Allocation
              </button>
              <button
                type="button"
                onClick={() => handleDecision('Clarify')}
                className="px-4 py-2 rounded-xl border border-[#B7791F] text-[#B7791F] hover:bg-[#B7791F]/10 font-bold text-[12px] transition-colors"
              >
                Seek Financial Clarification
              </button>
              <button
                type="button"
                onClick={() => handleDecision('Approve')}
                className="px-6 py-2 rounded-xl bg-[#287A55] text-[#FFFFFF] hover:bg-[#1f6344] font-bold text-[12px] shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Grant Management Approval</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
