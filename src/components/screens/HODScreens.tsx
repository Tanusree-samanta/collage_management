import React, { useState } from 'react';
import { ManpowerRequest } from '../../data/mockData';

interface HODScreensProps {
  currentView: 'dashboard' | 'requisitions' | 'create' | 'workload';
  onNavigate: (view: string) => void;
  requests: ManpowerRequest[];
  onCreateRequest: (req: ManpowerRequest) => void;
  onShowToast: (msg: string) => void;
}

export const HODScreens: React.FC<HODScreensProps> = ({
  currentView,
  onNavigate,
  requests,
  onCreateRequest,
  onShowToast
}) => {
  const [selectedReq, setSelectedReq] = useState<ManpowerRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Multi-step form state
  const [step, setStep] = useState(1);
  const [formDepartment] = useState('Computer Science & Engineering');
  const [formAcademicYear] = useState('2024-2025 (Odd Semester)');
  const [formPosition, setFormPosition] = useState('Assistant Professor');
  const [formSpecialization, setFormSpecialization] = useState('Distributed Systems & Cloud Computing');
  const [formCadreTier, setFormCadreTier] = useState('Pay Level 10 (₹57,700 - ₹98,200)');
  const [formCount, setFormCount] = useState(1);
  const [formType, setFormType] = useState<'New Post (Expansion)' | 'Replacement for Resignation'>('New Post (Expansion)');
  const [formJustification, setFormJustification] = useState(
    'Additional elective section required for 4th year B.Tech cohort. Current faculty absorb surplus hours.'
  );
  const [formOverloadHours, setFormOverloadHours] = useState(18);
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string; type: string }[]>([
    { name: 'BoS_Curriculum_Expansion_Minutes.pdf', size: '1.2 MB', type: 'PDF' }
  ]);

  const handleAddFile = () => {
    const newDoc = {
      name: `Teaching_Load_Statement_Sem_${Date.now().toString().slice(-4)}.pdf`,
      size: '1.4 MB',
      type: 'PDF'
    };
    setAttachedFiles([...attachedFiles, newDoc]);
    onShowToast('Document attached to draft request.');
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
    onShowToast('Attached document removed.');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: ManpowerRequest = {
      id: `req-${Date.now()}`,
      reqCode: `REQ-2025-${Math.floor(100 + Math.random() * 900)}`,
      academicYear: formAcademicYear,
      department: formDepartment,
      positionTitle: `${formPosition} — ${formSpecialization}`,
      cadreTier: formCadreTier,
      count: formCount,
      existingStaffing: 28,
      existingVacancies: 6,
      requirementType: formType,
      justificationReason: formJustification,
      specialization: formSpecialization,
      weeklyOverloadHours: formOverloadHours,
      dateSubmitted: 'Today',
      status: 'Submitted',
      currentAssignee: 'Dean of School (Prof. S. Mukhopadhyay)',
      documents: attachedFiles,
      budgetEstimatedAnnual: formCadreTier.includes('13') ? '₹22,40,000' : '₹12,80,000',
      history: [
        {
          stage: 'Request Creation',
          actor: 'Dr. Amitabh Banerjee',
          role: 'Department Head (HOD)',
          status: 'Completed',
          date: 'Today',
          notes: 'Submitted for academic deanery review.'
        },
        {
          stage: 'Academic Review',
          actor: 'Prof. S. Mukhopadhyay',
          role: 'Dean of School',
          status: 'In Progress',
          notes: 'Queued for workload verification.'
        }
      ]
    };

    onCreateRequest(newReq);
    onShowToast(`Request ${newReq.reqCode} submitted successfully to the Dean!`);
    onNavigate('requisitions');
    setStep(1);
  };

  const myDeptRequests = requests.filter((r) => r.department.includes('Computer Science'));

  const filteredRequests = myDeptRequests.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.reqCode.toLowerCase().includes(q) ||
        r.positionTitle.toLowerCase().includes(q) ||
        r.specialization.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* View 1: HOD Dashboard */}
      {currentView === 'dashboard' && (
        <div className="space-y-6">
          {/* Welcome & Primary CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#C8A66A]">
                Department Head Workspace
              </div>
              <h1 className="font-headline font-bold text-2xl text-[#34251F] mt-0.5">
                Dept. of Computer Science & Engineering
              </h1>
              <p className="text-[13px] text-[#766B64] mt-1">
                Academic Year 2024–2025 • HOD: <strong>Dr. Amitabh Banerjee</strong>
              </p>
            </div>
            <button
              onClick={() => onNavigate('create')}
              className="px-5 py-2.5 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[13px] hover:bg-[#4c3023] transition-colors shadow-sm flex items-center gap-2 self-start sm:self-auto shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Create Manpower Request</span>
            </button>
          </div>

          {/* 3 Simple Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Current Staffing
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline font-bold text-3xl text-[#34251F]">28</span>
                <span className="text-[12px] text-[#766B64]">/ 34 Sanctioned</span>
              </div>
              <div className="mt-2 text-[12px] text-[#287A55] font-semibold">
                6 Open Vacancies
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Student-Faculty Ratio (SFR)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline font-bold text-3xl text-[#B7791F]">1:16.8</span>
                <span className="text-[12px] text-[#766B64]">580 Students</span>
              </div>
              <div className="mt-2 text-[12px] text-[#B7791F] font-semibold">
                Target: 1:15 (Surplus Deficit)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766B64]">
                Teaching Load Overload
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline font-bold text-3xl text-[#B83A3A]">56 hrs</span>
                <span className="text-[12px] text-[#766B64]">/ week</span>
              </div>
              <div className="mt-2 text-[12px] text-[#766B64]">
                Absorbed by ad-hoc & visiting scholars
              </div>
            </div>
          </div>

          {/* Recent Department Requests */}
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D8]">
              <div>
                <h2 className="font-headline font-bold text-lg text-[#34251F]">
                  Department Requisitions
                </h2>
                <p className="text-[12px] text-[#766B64]">
                  Track progress of your submitted manpower requirements
                </p>
              </div>
              <button
                onClick={() => onNavigate('requisitions')}
                className="text-[13px] font-bold text-[#654638] hover:underline"
              >
                View All Requisitions →
              </button>
            </div>

            <div className="divide-y divide-[#E8E0D8]">
              {myDeptRequests.map((req) => (
                <div key={req.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-[14px] text-[#34251F]">
                        {req.positionTitle}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F8F6F2] border border-[#E8E0D8] text-[#654638]">
                        {req.reqCode}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#766B64] mt-0.5">
                      Submitted on {req.dateSubmitted} • Currently with: <strong>{req.currentAssignee}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F8F6F2] border border-[#C8A66A] text-[#654638]">
                      {req.status}
                    </span>
                    <button
                      onClick={() => setSelectedReq(req)}
                      className="px-3 py-1.5 rounded-lg bg-[#F8F6F2] hover:bg-[#E8E0D8] text-[#34251F] text-[12px] font-semibold transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View 2: My Requisitions Table */}
      {currentView === 'requisitions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline font-bold text-2xl text-[#34251F]">
                My Department Requisitions
              </h1>
              <p className="text-[13px] text-[#766B64]">
                All manpower requirements initiated for Computer Science & Engineering
              </p>
            </div>
            <button
              onClick={() => onNavigate('create')}
              className="px-4 py-2 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[13px] hover:bg-[#4c3023] transition-colors shadow-sm flex items-center gap-2 self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Create Request</span>
            </button>
          </div>

          {/* Search & Filter Strip */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E8E0D8] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#766B64] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by code or position..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#F8F6F2] text-[13px] border border-[#E8E0D8] focus:outline-none focus:ring-1 focus:ring-[#654638]"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-[12px] text-[#766B64]">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 px-3 rounded-lg bg-[#F8F6F2] text-[12px] border border-[#E8E0D8] focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Under Academic Review">Under Academic Review</option>
                <option value="HR Vetting">HR Vetting</option>
                <option value="Awaiting Executive Approval">Awaiting Executive Approval</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
          </div>

          {/* Simple Table */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-[#F8F6F2] border-b border-[#E8E0D8] text-[#34251F] font-bold text-[12px]">
                    <th className="py-3 px-4">Request Code</th>
                    <th className="py-3 px-4">Position Title</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Date Submitted</th>
                    <th className="py-3 px-4">Current Stage</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E0D8]">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-[#F8F6F2]/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#654638]">{req.reqCode}</td>
                      <td className="py-3 px-4 font-semibold text-[#34251F]">{req.positionTitle}</td>
                      <td className="py-3 px-3 text-[#766B64]">{req.requirementType}</td>
                      <td className="py-3 px-3 text-[#766B64]">{req.dateSubmitted}</td>
                      <td className="py-3 px-4 text-[#34251F] font-medium">{req.currentAssignee}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F8F6F2] border border-[#C8A66A] text-[#654638]">
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedReq(req)}
                          className="px-3 py-1.5 rounded-lg bg-[#654638] text-[#FFFFFF] text-[12px] font-semibold hover:bg-[#4c3023] transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[#766B64]">
                        No requisitions found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* View 3: Create Manpower Request (5 Simple Steps) */}
      {currentView === 'create' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div>
            <h1 className="font-headline font-bold text-2xl text-[#34251F]">
              Create Manpower Request
            </h1>
            <p className="text-[13px] text-[#766B64]">
              Step-by-step academic staffing justification compliant with TNU Statute 8.4
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="grid grid-cols-5 gap-2 bg-[#FFFFFF] p-3 rounded-2xl border border-[#E8E0D8]">
            {[
              { num: 1, title: 'Position Details' },
              { num: 2, title: 'Staffing Info' },
              { num: 3, title: 'Justification' },
              { num: 4, title: 'Documents' },
              { num: 5, title: 'Review & Submit' }
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`py-2 px-2 rounded-xl text-center transition-all ${
                  step === s.num
                    ? 'bg-[#654638] text-[#FFFFFF] font-bold shadow-xs'
                    : step > s.num
                    ? 'bg-[#F8F6F2] text-[#287A55] font-semibold'
                    : 'text-[#766B64] hover:bg-[#F8F6F2]'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider">Step {s.num}</div>
                <div className="text-[12px] truncate">{s.title}</div>
              </button>
            ))}
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmitForm} className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-6">
            {/* Step 1: Position Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-headline font-bold text-lg text-[#34251F] pb-2 border-b border-[#E8E0D8]">
                  1. Position & Academic Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#34251F] mb-1">Department</label>
                    <input
                      type="text"
                      disabled
                      value={formDepartment}
                      className="w-full h-9 px-3 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] text-[#766B64]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#34251F] mb-1">Academic Year</label>
                    <input
                      type="text"
                      disabled
                      value={formAcademicYear}
                      className="w-full h-9 px-3 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] text-[#766B64]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#34251F] mb-1">Cadre Designation *</label>
                    <select
                      value={formPosition}
                      onChange={(e) => setFormPosition(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-[#E8E0D8] focus:outline-none focus:ring-1 focus:ring-[#654638]"
                    >
                      <option>Assistant Professor</option>
                      <option>Associate Professor</option>
                      <option>Professor</option>
                      <option>Professor of Practice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#34251F] mb-1">Pay Band Tier *</label>
                    <select
                      value={formCadreTier}
                      onChange={(e) => setFormCadreTier(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-[#E8E0D8] focus:outline-none focus:ring-1 focus:ring-[#654638]"
                    >
                      <option>Pay Level 10 (₹57,700 - ₹98,200)</option>
                      <option>Pay Level 11 (₹68,900 - ₹1,17,200)</option>
                      <option>Pay Level 13A2 (₹1,39,600 - ₹2,11,300)</option>
                      <option>Pay Level 14 (₹1,44,200 - ₹2,18,200)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#34251F] mb-1">
                      Sub-Specialization / Domain Track *
                    </label>
                    <input
                      type="text"
                      value={formSpecialization}
                      onChange={(e) => setFormSpecialization(e.target.value)}
                      placeholder="e.g. Distributed Systems & Cloud Computing"
                      className="w-full h-9 px-3 rounded-xl border border-[#E8E0D8] focus:outline-none focus:ring-1 focus:ring-[#654638]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#34251F] mb-1">Number of Posts Required *</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={formCount}
                      onChange={(e) => setFormCount(Number(e.target.value))}
                      className="w-full h-9 px-3 rounded-xl border border-[#E8E0D8] focus:outline-none focus:ring-1 focus:ring-[#654638]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Staffing Info */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-headline font-bold text-lg text-[#34251F] pb-2 border-b border-[#E8E0D8]">
                  2. Staffing Baseline & Requirement Type
                </h3>

                <div className="p-4 rounded-xl bg-[#F8F6F2] grid grid-cols-3 gap-3 text-center">
                  <div>
                    <span className="text-[11px] text-[#766B64] font-bold uppercase">Sanctioned</span>
                    <div className="font-headline text-2xl font-bold text-[#34251F] mt-1">34</div>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#766B64] font-bold uppercase">In Position</span>
                    <div className="font-headline text-2xl font-bold text-[#34251F] mt-1">28</div>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#766B64] font-bold uppercase">Current Vacancies</span>
                    <div className="font-headline text-2xl font-bold text-[#287A55] mt-1">6 Open</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-[#34251F]">Select Requirement Purpose *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      onClick={() => setFormType('New Post (Expansion)')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formType === 'New Post (Expansion)'
                          ? 'border-[#654638] bg-[#F8F6F2] shadow-xs'
                          : 'border-[#E8E0D8] hover:bg-[#F8F6F2]'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={formType === 'New Post (Expansion)'}
                        onChange={() => setFormType('New Post (Expansion)')}
                        className="accent-[#654638] mr-2"
                      />
                      <span className="font-bold text-[#34251F]">New Post (Academic Expansion)</span>
                      <p className="text-[12px] text-[#766B64] mt-1">
                        Approved by Academic Council for new elective stream or surge in student roll.
                      </p>
                    </label>

                    <label
                      onClick={() => setFormType('Replacement for Resignation')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formType === 'Replacement for Resignation'
                          ? 'border-[#654638] bg-[#F8F6F2] shadow-xs'
                          : 'border-[#E8E0D8] hover:bg-[#F8F6F2]'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={formType === 'Replacement for Resignation'}
                        onChange={() => setFormType('Replacement for Resignation')}
                        className="accent-[#654638] mr-2"
                      />
                      <span className="font-bold text-[#34251F]">Replacement Post</span>
                      <p className="text-[12px] text-[#766B64] mt-1">
                        Vacancy created due to superannuation, transfer, or resignation of permanent faculty.
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Justification */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-headline font-bold text-lg text-[#34251F] pb-2 border-b border-[#E8E0D8]">
                  3. Academic & Teaching Load Justification
                </h3>

                <div>
                  <label className="block text-[12px] font-bold text-[#34251F] mb-1">
                    Deficit Weekly Contact Hours Absorbed by Department *
                  </label>
                  <input
                    type="number"
                    value={formOverloadHours}
                    onChange={(e) => setFormOverloadHours(Number(e.target.value))}
                    className="w-full sm:w-48 h-9 px-3 rounded-xl border border-[#E8E0D8] focus:outline-none focus:ring-1 focus:ring-[#654638]"
                    min="4"
                    max="60"
                  />
                  <span className="text-[11px] text-[#766B64] mt-1 block">
                    AICTE statutory teaching cap: Assistant Professors 16 hrs direct instruction.
                  </span>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#34251F] mb-1">
                    Detailed Rationale & Evidence Statement *
                  </label>
                  <textarea
                    rows={4}
                    value={formJustification}
                    onChange={(e) => setFormJustification(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E8E0D8] focus:outline-none focus:ring-1 focus:ring-[#654638]"
                    placeholder="Provide details on course sections, laboratory batches, and student enrollment..."
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 4: Documents */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="font-headline font-bold text-lg text-[#34251F] pb-2 border-b border-[#E8E0D8]">
                  4. Supporting Evidence & Documents
                </h3>
                <p className="text-[13px] text-[#766B64]">
                  Upload Board of Studies (BoS) minutes, workload audit statements, or syllabus expansions.
                </p>

                <div
                  onClick={handleAddFile}
                  className="p-6 rounded-2xl border-2 border-dashed border-[#B6A18E] bg-[#F8F6F2] text-center cursor-pointer hover:bg-[#E8E0D8]/40 transition-colors"
                >
                  <span className="material-symbols-outlined text-[32px] text-[#654638]">cloud_upload</span>
                  <div className="font-bold text-[13px] text-[#34251F] mt-1">Click to attach compliance document</div>
                  <div className="text-[11px] text-[#766B64]">Supports PDF, XLSX up to 15MB</div>
                </div>

                <div className="space-y-2">
                  {attachedFiles.map((f, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[#654638]">description</span>
                        <div>
                          <div className="font-semibold text-[13px] text-[#34251F]">{f.name}</div>
                          <div className="text-[11px] text-[#766B64]">{f.size} • Verified Attached</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(i)}
                        className="text-[#766B64] hover:text-[#B83A3A] p-1"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="font-headline font-bold text-lg text-[#34251F] pb-2 border-b border-[#E8E0D8]">
                  5. Review Requisition Summary
                </h3>

                <div className="p-4 rounded-xl bg-[#F8F6F2] space-y-3 text-[13px]">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[11px] text-[#766B64] uppercase font-bold">Position</span>
                      <div className="font-bold text-[#34251F]">{formPosition} ({formCount} Post)</div>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#766B64] uppercase font-bold">Department</span>
                      <div className="font-bold text-[#34251F]">{formDepartment}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[11px] text-[#766B64] uppercase font-bold">Specialization Track</span>
                      <div className="font-semibold text-[#34251F]">{formSpecialization}</div>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#766B64] uppercase font-bold">Pay Band Tier</span>
                      <div className="font-semibold text-[#34251F]">{formCadreTier}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#766B64] uppercase font-bold">Overload Justification</span>
                    <p className="text-[#34251F] mt-0.5">{formJustification}</p>
                    <span className="text-[11px] text-[#B83A3A] font-semibold mt-1 block">
                      +{formOverloadHours} hours/week instructional contact deficit
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#766B64] uppercase font-bold">Attached Evidence</span>
                    <div className="text-[#34251F] mt-0.5">{attachedFiles.length} Document(s) attached</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F8F6F2] border border-[#C8A66A] text-[12px] text-[#34251F]">
                  <strong>What happens next?</strong> Upon submission, this request will appear in Dean Prof. S. Mukhopadhyay's pending academic review queue with a 24-hour SLA.
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E8E0D8]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl bg-[#F8F6F2] text-[#34251F] font-semibold text-[13px] hover:bg-[#E8E0D8]"
                >
                  ← Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2 rounded-xl text-[#766B64] hover:bg-[#F8F6F2] font-semibold text-[13px]"
                >
                  Cancel
                </button>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onShowToast('Draft saved successfully.')}
                  className="px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#E8E0D8] text-[#34251F] font-semibold text-[13px] hover:bg-[#F8F6F2]"
                >
                  Save Draft
                </button>

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-5 py-2 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[13px] hover:bg-[#4c3023]"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[13px] hover:bg-[#4c3023] shadow-sm flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>Submit for Review</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}

      {/* View 4: Department Faculty Load Ledger */}
      {currentView === 'workload' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline font-bold text-2xl text-[#34251F]">
                Department Teaching Load Ledger
              </h1>
              <p className="text-[13px] text-[#766B64]">
                Current contact hours by faculty member against AICTE norms (Prof: 16h, Asst: 18h)
              </p>
            </div>
            <button
              onClick={() => onShowToast('Exported teaching load audit matrix as spreadsheet.')}
              className="px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#E8E0D8] text-[#34251F] font-semibold text-[13px] hover:bg-[#F8F6F2]"
            >
              Export Load Matrix
            </button>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#F8F6F2]">
                <span className="text-[11px] text-[#766B64] font-bold uppercase">Total Sections</span>
                <div className="font-headline text-2xl font-bold text-[#34251F] mt-1">26 Batches</div>
              </div>
              <div className="p-4 rounded-xl bg-[#F8F6F2]">
                <span className="text-[11px] text-[#766B64] font-bold uppercase">Department Capacity</span>
                <div className="font-headline text-2xl font-bold text-[#34251F] mt-1">448 hrs / wk</div>
              </div>
              <div className="p-4 rounded-xl bg-[#F8F6F2]">
                <span className="text-[11px] text-[#766B64] font-bold uppercase">Current Deficit</span>
                <div className="font-headline text-2xl font-bold text-[#B83A3A] mt-1">+56 hrs / wk</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Drawer / Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#34251F]/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-[#E8E0D8] bg-[#F8F6F2] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline font-bold text-lg text-[#34251F]">
                    {selectedReq.positionTitle}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFFFFF] border border-[#E8E0D8] text-[#654638]">
                    {selectedReq.reqCode}
                  </span>
                </div>
                <p className="text-[12px] text-[#766B64]">
                  {selectedReq.department} • Submitted {selectedReq.dateSubmitted}
                </p>
              </div>
              <button
                onClick={() => setSelectedReq(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#766B64] hover:bg-[#E8E0D8]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-[13px]">
              <div className="p-4 rounded-xl bg-[#F8F6F2] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#766B64]">Current Status:</span>
                  <span className="font-bold text-[#654638]">{selectedReq.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#766B64]">Responsible Role:</span>
                  <span className="font-semibold text-[#34251F]">{selectedReq.currentAssignee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#766B64]">Cadre Tier:</span>
                  <span className="font-mono text-[#34251F]">{selectedReq.cadreTier}</span>
                </div>
              </div>

              <div>
                <h4 className="font-headline font-bold text-[#34251F] text-[14px] mb-1">Justification</h4>
                <p className="text-[#766B64] leading-relaxed">{selectedReq.justificationReason}</p>
              </div>

              <div>
                <h4 className="font-headline font-bold text-[#34251F] text-[14px] mb-2">Approval Timeline</h4>
                <div className="space-y-2 border-l-2 border-[#E8E0D8] pl-4 ml-1">
                  {selectedReq.history.map((h, i) => (
                    <div key={i} className="text-[12px]">
                      <div className="flex items-center gap-2">
                        <strong className="text-[#34251F]">{h.stage}</strong>
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                          h.status === 'Completed' ? 'bg-[#287A55]/10 text-[#287A55]' : 'bg-[#B7791F]/10 text-[#B7791F]'
                        }`}>
                          {h.status}
                        </span>
                      </div>
                      <div className="text-[#766B64]">
                        {h.actor} ({h.role}) {h.date && `• ${h.date}`}
                      </div>
                      {h.notes && <div className="text-[11px] text-[#34251F] italic mt-0.5">“{h.notes}”</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F8F6F2] border-t border-[#E8E0D8] flex justify-end">
              <button
                onClick={() => setSelectedReq(null)}
                className="px-5 py-2 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[13px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
