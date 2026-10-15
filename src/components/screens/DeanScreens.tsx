import React, { useState } from 'react';
import { ManpowerRequest, DEPARTMENTS_LIST, DepartmentSummary } from '../../data/mockData';

interface DeanScreensProps {
  currentView: 'dashboard' | 'reviews' | 'staffing' | 'history';
  onNavigate: (view: string) => void;
  requests: ManpowerRequest[];
  onUpdateRequestStatus: (
    reqId: string,
    newStatus: ManpowerRequest['status'],
    note: string,
    nextAssignee: string
  ) => void;
  onShowToast: (msg: string) => void;
  isAssocDean?: boolean;
}

export const DeanScreens: React.FC<DeanScreensProps> = ({
  currentView,
  onNavigate,
  requests,
  onUpdateRequestStatus,
  onShowToast,
  isAssocDean = false
}) => {
  const [selectedReq, setSelectedReq] = useState<ManpowerRequest | null>(null);
  const [actionModal, setActionModal] = useState<{
    req: ManpowerRequest;
    type: 'Approve' | 'Clarification' | 'Return' | 'Reject';
  } | null>(null);
  const [actionNote, setActionNote] = useState('');

  const pendingReviews = requests.filter(
    (r) => r.status === 'Submitted' || r.status === 'Under Academic Review'
  );

  const handleConfirmAction = () => {
    if (!actionModal) return;

    if (
      (actionModal.type === 'Clarification' || actionModal.type === 'Return' || actionModal.type === 'Reject') &&
      !actionNote.trim()
    ) {
      alert('A clear reason or note is required for this action.');
      return;
    }

    const { req, type } = actionModal;
    let nextStatus: ManpowerRequest['status'] = 'HR Vetting';
    let nextAssignee = 'Head HR (Dr. Radhika Sharma)';

    if (type === 'Approve') {
      nextStatus = 'HR Vetting';
      nextAssignee = 'Head HR (Dr. Radhika Sharma)';
      onShowToast(
        `Requisition ${req.reqCode} recommended for approval and forwarded to Head HR for cadre verification.`
      );
    } else if (type === 'Clarification') {
      nextStatus = 'Changes Requested';
      nextAssignee = 'Department Head (HOD)';
      onShowToast(`Clarification requested from HOD for ${req.reqCode}.`);
    } else if (type === 'Return') {
      nextStatus = 'Changes Requested';
      nextAssignee = 'Department Head (HOD)';
      onShowToast(`Requisition ${req.reqCode} returned to HOD for workload correction.`);
    } else if (type === 'Reject') {
      nextStatus = 'Rejected';
      nextAssignee = 'Archived / Rejected';
      onShowToast(`Requisition ${req.reqCode} declined.`);
    }

    onUpdateRequestStatus(req.id, nextStatus, actionNote || 'Endorsed academic necessity.', nextAssignee);
    setActionModal(null);
    setActionNote('');
  };

  return (
    <div className="flex flex-col gap-6 w-full text-[13px] font-body text-[#34251F]">
      {/* View 1: Review Dashboard */}
      {currentView === 'dashboard' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#C8A66A]">
                {isAssocDean ? 'Academic Affairs Review' : 'Executive Deanery Cockpit'}
              </div>
              <h1 className="font-headline font-bold text-2xl text-[#34251F] mt-0.5">
                {isAssocDean ? 'Associate Dean (Academics) Command' : 'School of Engineering & Technology'}
              </h1>
              <p className="text-[13px] text-[#766B64] mt-1">
                {isAssocDean
                  ? 'Verify academic credit allocations, curricula minutes, and teaching load statements.'
                  : 'Authority oversight for 5 departments, AICTE 1:15 student-faculty ratio, and faculty requisitions.'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('reviews')}
              className="px-5 py-2.5 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[13px] hover:bg-[#4c3023] transition-colors shadow-sm flex items-center gap-2 self-start sm:self-auto shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
              <span>Pending Reviews ({pendingReviews.length})</span>
            </button>
          </div>

          {/* 4 Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Pending Deanery Reviews
              </span>
              <div className="font-headline font-bold text-3xl text-[#654638] mt-1">
                {pendingReviews.length}
              </div>
              <div className="text-[12px] text-[#B83A3A] font-semibold mt-2">
                24-Hour SLA Window Active
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Sanctioned Positions
              </span>
              <div className="font-headline font-bold text-3xl text-[#34251F] mt-1">
                148 / 160
              </div>
              <div className="text-[12px] text-[#287A55] font-semibold mt-2">
                92.5% Allocation Ratio
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Active School Vacancies
              </span>
              <div className="font-headline font-bold text-3xl text-[#B83A3A] mt-1">14</div>
              <div className="text-[12px] text-[#766B64] mt-2">Across 5 departments</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Teaching Load Compliance
              </span>
              <div className="font-headline font-bold text-3xl text-[#287A55] mt-1">94.2%</div>
              <div className="text-[12px] text-[#766B64] mt-2">Prof: 16h • Asst Prof: 18h</div>
            </div>
          </div>

          {/* Quick Action: Pending Reviews Preview */}
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D8]">
              <div>
                <h2 className="font-headline font-bold text-lg text-[#34251F]">
                  Requisitions Awaiting Your Review
                </h2>
                <p className="text-[12px] text-[#766B64]">
                  Verify academic justification, student enrollments, and teaching overload
                </p>
              </div>
              <button
                onClick={() => onNavigate('reviews')}
                className="text-[13px] font-bold text-[#654638] hover:underline"
              >
                View Full Review Queue →
              </button>
            </div>

            <div className="space-y-4">
              {pendingReviews.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-base text-[#34251F]">
                        {req.positionTitle}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFFFFF] border border-[#E8E0D8] text-[#654638]">
                        {req.reqCode}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#B83A3A]/10 text-[#B83A3A]">
                        +{req.weeklyOverloadHours}h / wk Deficit
                      </span>
                    </div>
                    <p className="text-[12px] text-[#766B64]">
                      {req.department} • Initiated: {req.dateSubmitted} • Pay Band: <strong>{req.cadreTier}</strong>
                    </p>
                    <p className="text-[12px] text-[#34251F] italic line-clamp-1">
                      “{req.justificationReason}”
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActionModal({ req, type: 'Clarification' })}
                      className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E8E0D8] text-[#34251F] font-semibold text-[12px] hover:bg-[#E8E0D8]"
                    >
                      Request Clarification
                    </button>
                    <button
                      onClick={() => setActionModal({ req, type: 'Approve' })}
                      className="px-4 py-1.5 rounded-lg bg-[#654638] text-[#FFFFFF] font-bold text-[12px] hover:bg-[#4c3023] shadow-xs flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>Recommend & Forward</span>
                    </button>
                  </div>
                </div>
              ))}
              {pendingReviews.length === 0 && (
                <div className="py-8 text-center text-[#766B64]">
                  All submitted academic requisitions have been reviewed.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View 2: Pending Academic Reviews (Detailed) */}
      {currentView === 'reviews' && (
        <div className="space-y-6">
          <div>
            <h1 className="font-headline font-bold text-2xl text-[#34251F]">
              Academic Requisition Review Queue
            </h1>
            <p className="text-[13px] text-[#766B64]">
              Evaluate teaching load matrices and endorse authorized faculty requirements
            </p>
          </div>

          <div className="space-y-4">
            {pendingReviews.map((req) => (
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
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#F8F6F2] text-[#766B64]">
                        {req.requirementType}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#766B64] mt-0.5">
                      Department: <strong>{req.department}</strong> • Academic Year: {req.academicYear}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#766B64] font-bold uppercase">Estimated Budget</span>
                    <div className="font-headline font-bold text-base text-[#654638]">
                      {req.budgetEstimatedAnnual} / yr
                    </div>
                  </div>
                </div>

                {/* Justification Box */}
                <div className="p-4 rounded-xl bg-[#F8F6F2] space-y-2">
                  <span className="text-[11px] font-bold uppercase text-[#766B64]">
                    Teaching Load Evidence & Justification
                  </span>
                  <p className="text-[13px] text-[#34251F] leading-relaxed">
                    {req.justificationReason}
                  </p>
                  <div className="flex items-center gap-4 text-[12px] pt-1">
                    <span className="text-[#B83A3A] font-bold">
                      +{req.weeklyOverloadHours} hours / week surplus load
                    </span>
                    <span>•</span>
                    <span className="text-[#766B64]">
                      Pay Band Tier: <strong className="text-[#34251F]">{req.cadreTier}</strong>
                    </span>
                  </div>
                </div>

                {/* Documents list */}
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-[#766B64]">Attached Documents:</span>
                  {req.documents.map((doc, idx) => (
                    <button
                      key={idx}
                      onClick={() => onShowToast(`Opening ${doc.name}...`)}
                      className="px-2.5 py-1 rounded-lg bg-[#F8F6F2] border border-[#E8E0D8] text-[11px] font-semibold text-[#654638] flex items-center gap-1 hover:bg-[#E8E0D8]"
                    >
                      <span className="material-symbols-outlined text-[14px]">description</span>
                      <span>{doc.name}</span>
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8E0D8]">
                  <span className="text-[12px] text-[#766B64]">
                    Authority: Section 8.4 • College of Engineering & Technology
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActionModal({ req, type: 'Reject' })}
                      className="px-3.5 py-1.5 rounded-xl text-[#B83A3A] hover:bg-[#B83A3A]/10 text-[12px] font-semibold"
                    >
                      Reject with Reason
                    </button>
                    <button
                      onClick={() => setActionModal({ req, type: 'Clarification' })}
                      className="px-3.5 py-1.5 rounded-xl bg-[#F8F6F2] text-[#34251F] hover:bg-[#E8E0D8] text-[12px] font-semibold border border-[#E8E0D8]"
                    >
                      Request Clarification
                    </button>
                    <button
                      onClick={() => setActionModal({ req, type: 'Approve' })}
                      className="px-4 py-1.5 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[12px] hover:bg-[#4c3023] shadow-xs flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>Approve & Forward to HR</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {pendingReviews.length === 0 && (
              <div className="p-8 text-center bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] text-[#766B64]">
                No pending requisitions awaiting Deanery review.
              </div>
            )}
          </div>
        </div>
      )}

      {/* View 3: School Staffing & Load Status */}
      {currentView === 'staffing' && (
        <div className="space-y-6">
          <div>
            <h1 className="font-headline font-bold text-2xl text-[#34251F]">
              School Staffing & Load Status
            </h1>
            <p className="text-[13px] text-[#766B64]">
              Department-wise statutory allocation vs student rolls (AICTE 1:15 norm)
            </p>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-[#F8F6F2] border-b border-[#E8E0D8] text-[#34251F] font-bold text-[12px]">
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-3">HOD</th>
                    <th className="py-3 px-2 text-center">Sanctioned</th>
                    <th className="py-3 px-2 text-center">In Position</th>
                    <th className="py-3 px-2 text-center">Vacancies</th>
                    <th className="py-3 px-3 text-center">Students</th>
                    <th className="py-3 px-3 text-center">SFR (1:15)</th>
                    <th className="py-3 px-3 text-center">Load Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E0D8]">
                  {DEPARTMENTS_LIST.map((dept) => (
                    <tr key={dept.code} className="hover:bg-[#F8F6F2]/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#34251F]">
                        {dept.name} ({dept.code})
                      </td>
                      <td className="py-3.5 px-3 text-[#766B64]">{dept.head}</td>
                      <td className="py-3.5 px-2 text-center font-bold">{dept.sanctioned}</td>
                      <td className="py-3.5 px-2 text-center">{dept.inPosition}</td>
                      <td className="py-3.5 px-2 text-center text-[#B83A3A] font-bold">
                        {dept.vacancies} Open
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono">{dept.studentCount}</td>
                      <td className="py-3.5 px-3 text-center font-mono font-bold text-[#654638]">
                        {dept.sfrRatio}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            dept.weeklyOverloadHours > 0
                              ? 'bg-[#B83A3A]/10 text-[#B83A3A]'
                              : 'bg-[#287A55]/10 text-[#287A55]'
                          }`}
                        >
                          {dept.weeklyOverloadHours > 0
                            ? `+${dept.weeklyOverloadHours}h Overload`
                            : 'Compliant'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Action Dialog (Approve, Clarification, Reject) */}
      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#34251F]/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="font-headline font-bold text-lg text-[#34251F]">
              {actionModal.type === 'Approve'
                ? 'Recommend Requisition for Approval'
                : actionModal.type === 'Clarification'
                ? 'Request Load Clarification'
                : actionModal.type === 'Return'
                ? 'Return Requisition for Correction'
                : 'Reject Manpower Requisition'}
            </h3>

            <p className="text-[13px] text-[#766B64]">
              Requisition: <strong>{actionModal.req.reqCode}</strong> • {actionModal.req.positionTitle}
            </p>

            <div>
              <label className="block text-[12px] font-bold text-[#34251F] mb-1">
                {actionModal.type === 'Approve'
                  ? 'Deanery Endorsement Note (Optional)'
                  : 'Mandatory Reason / Directives *'}
              </label>
              <textarea
                rows={3}
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                placeholder={
                  actionModal.type === 'Approve'
                    ? 'e.g. Approved with high priority for NAAC Criterion 2.4 compliance.'
                    : 'Detail the required changes, questions, or objection...'
                }
                className="w-full p-3 rounded-xl border border-[#E8E0D8] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#654638]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActionModal(null)}
                className="px-4 py-2 rounded-xl text-[#766B64] hover:bg-[#F8F6F2] font-semibold text-[13px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`px-5 py-2 rounded-xl text-[#FFFFFF] font-bold text-[13px] shadow-sm ${
                  actionModal.type === 'Reject'
                    ? 'bg-[#B83A3A] hover:bg-[#8e2929]'
                    : 'bg-[#654638] hover:bg-[#4c3023]'
                }`}
              >
                {actionModal.type === 'Approve' ? 'Confirm Recommendation' : 'Submit Decision'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
