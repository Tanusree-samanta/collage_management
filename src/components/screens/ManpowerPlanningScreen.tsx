import React, { useState } from 'react';

interface CourseRow {
  id: string;
  code: string;
  title: string;
  sub: string;
  sem: string;
  theory: string;
  tut: string;
  lab: string;
  deficit: number;
}

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  badge: string;
  badgeType: 'verified' | 'neutral';
}

interface ManpowerPlanningScreenProps {
  onNavigate: (path: string) => void;
  onShowToast: (msg: string) => void;
}

export const ManpowerPlanningScreen: React.FC<ManpowerPlanningScreenProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [reqType, setReqType] = useState<'replacement' | 'expansion'>('replacement');
  const [designation, setDesignation] = useState(
    'Assistant Professor (Senior Scale - Academic Level 11 · 7th CPC)'
  );
  const [specialization, setSpecialization] = useState(
    'Distributed Systems, Cloud Architecture & DevOps'
  );
  const [workflowFilter, setWorkflowFilter] = useState('all');

  const [courseRows, setCourseRows] = useState<CourseRow[]>([
    {
      id: 'row-1',
      code: 'CS-401',
      title: 'Distributed Computing & Clusters',
      sub: 'Core Mandatory · B.Tech CSE Yr IV',
      sem: 'VII',
      theory: '3 hrs/wk',
      tut: '1 hr/wk',
      lab: '2 Batches × 2 hrs (4 hrs)',
      deficit: 8
    },
    {
      id: 'row-2',
      code: 'CS-502',
      title: 'Cloud Architecture & Microservices',
      sub: 'Track Elective · B.Tech CSE Yr IV',
      sem: 'VII',
      theory: '3 hrs/wk',
      tut: '0 hr/wk',
      lab: '3 Batches × 2 hrs (6 hrs)',
      deficit: 9
    },
    {
      id: 'row-3',
      code: 'CS-791',
      title: 'Major Capstone Project Mentorship',
      sub: 'Departmental Lab / Project Viva',
      sem: 'VII & VIII',
      theory: '-',
      tut: '-',
      lab: '5 Project Teams',
      deficit: 5
    }
  ]);

  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([
    {
      id: 'file-1',
      name: 'AICTE_Faculty_Load_Audit_2024-25.pdf',
      size: '2.4 MB',
      badge: 'Verified System Extract',
      badgeType: 'verified'
    },
    {
      id: 'file-2',
      name: 'BoS_Curriculum_Expansion_Minutes.pdf',
      size: '1.1 MB',
      badge: 'Department Resolution #14',
      badgeType: 'neutral'
    }
  ]);

  const totalWeeklyLoad = courseRows.reduce((acc, row) => acc + row.deficit, 0);

  const handleAddCourse = () => {
    const newCourse: CourseRow = {
      id: `row-${Date.now()}`,
      code: `CS-${Math.floor(400 + Math.random() * 200)}`,
      title: 'Advanced Operating Systems & Kernel Virtualization',
      sub: 'Elective Specialization · B.Tech CSE Yr IV',
      sem: 'VII',
      theory: '3 hrs/wk',
      tut: '1 hr/wk',
      lab: '1 Batch × 2 hrs',
      deficit: 6
    };
    setCourseRows([...courseRows, newCourse]);
    onShowToast('Added curriculum deficit course row. Total workload updated.');
  };

  const handleDeleteCourse = (id: string, code: string) => {
    setCourseRows(courseRows.filter((r) => r.id !== id));
    onShowToast(`Removed ${code} from workload deficit table.`);
  };

  const handleSimulateUpload = () => {
    const newDoc: AttachedFile = {
      id: `file-${Date.now()}`,
      name: `Deanery_Teaching_Load_Evidence_${Date.now().toString().slice(-4)}.pdf`,
      size: '1.8 MB',
      badge: 'Uploaded Just Now',
      badgeType: 'verified'
    };
    setAttachedFiles([...attachedFiles, newDoc]);
    onShowToast('Statutory workload document uploaded and indexed.');
  };

  const handleRemoveFile = (id: string, name: string) => {
    setAttachedFiles(attachedFiles.filter((f) => f.id !== id));
    onShowToast(`Removed document ${name}.`);
  };

  const handleForwardToDean = () => {
    onShowToast('Requisition REQ-2025-084-CSE forwarded to Associate Dean Academics & Dean Prof. S. Mukhopadhyay!');
    setCurrentStep(4);
  };

  return (
    <div className="flex flex-col w-full font-body text-[13px] text-[#211a15]">
      {/* Top Academic Context Header & Action Bar */}
      <section className="relative w-full mb-6">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <div>
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-[11px] text-[#82746f] mb-1.5 tracking-wide uppercase">
              <span
                onClick={() => onNavigate('overview-command')}
                className="hover:text-[#4c3023] cursor-pointer transition-colors"
              >
                Home
              </span>
              <span className="material-symbols-outlined text-[13px]">chevron_right</span>
              <span>HOD Command</span>
              <span className="material-symbols-outlined text-[13px]">chevron_right</span>
              <span className="text-[#755a26] font-bold">Manpower Planning</span>
            </div>

            {/* Title and Department Identifier */}
            <div className="flex flex-wrap items-baseline gap-2">
              <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#211a15] tracking-tight">
                Department Staffing & Manpower Requisition Studio
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdea7]/50 text-[#271900] text-[12px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#755a26]"></span>
                Dept. of Computer Science & Engineering
              </span>
            </div>
            <p className="text-[14px] text-[#504440] mt-1">
              HOD: <strong className="font-semibold text-[#211a15]">Dr. Amitabh Banerjee</strong> · Academic Year 2024–2025 (Odd Semester Cycle)
            </p>
          </div>

          {/* Action Buttons Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onShowToast('Draft saved successfully to departmental local store.')}
              className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl bg-[#ffffff] text-[#4c3023] text-[13px] font-semibold shadow-sm hover:bg-[#f4e5dc] border border-[#e8e0d8] transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => onShowToast('Generating UGC 1:15 Load Matrix Preview... All sections calculated.')}
              className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl bg-[#f4e5dc] text-[#4c3023] text-[13px] font-semibold shadow-sm hover:bg-[#efe0d7] transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">monitoring</span>
              <span>Preview UGC Load Matrix</span>
            </button>
            <button
              onClick={handleForwardToDean}
              className="inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-[#4c3023] text-[#ffffff] text-[13px] font-bold shadow-md hover:bg-[#654638] transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Submit Requisition to Dean</span>
            </button>
          </div>
        </div>
      </section>

      {/* Key Metrics Strategic Banner (4 Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Metric 1 */}
        <div className="relative bg-[#ffffff] rounded-xl p-4 shadow-sm border border-[#e8e0d8] overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#82746f] font-bold">
              Sanctioned Cadre
            </span>
            <span className="w-7 h-7 rounded-lg bg-[#faebe2] flex items-center justify-center text-[#4c3023]">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-3xl font-bold text-[#211a15]">34</span>
            <span className="text-[12px] text-[#504440] font-medium">Faculty Posts</span>
          </div>
          <div className="mt-2 pt-1 flex items-center justify-between text-[12px] text-[#82746f]">
            <span>Statutory AICTE Cadre 1:2:6</span>
            <span className="font-semibold text-[#755a26]">Verified</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="relative bg-[#ffffff] rounded-xl p-4 shadow-sm border border-[#e8e0d8] overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#82746f] font-bold">
              Current Staffing
            </span>
            <span className="w-7 h-7 rounded-lg bg-[#faebe2] flex items-center justify-center text-[#755a26]">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-3xl font-bold text-[#211a15]">28</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-semibold">
              6 Vacant
            </span>
          </div>
          <div className="mt-2 pt-1 flex items-center gap-1.5 text-[12px] text-[#504440]">
            <span className="w-2 h-2 rounded-full bg-[#755a26]"></span>
            <span>4 Profs, 8 Assoc., 16 Asst. Profs</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="relative bg-[#ffffff] rounded-xl p-4 shadow-sm border border-[#e8e0d8] overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#82746f] font-bold">
              Gross Student Roll
            </span>
            <span className="w-7 h-7 rounded-lg bg-[#faebe2] flex items-center justify-center text-[#4c3023]">
              <span className="material-symbols-outlined text-[18px]">school</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-3xl font-bold text-[#211a15]">580</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#fdd897] text-[#785c28] font-semibold">
              SFR 1:20.7
            </span>
          </div>
          <div className="mt-2 pt-1 flex items-center justify-between text-[12px] text-[#82746f]">
            <span>UGC Target: 1:15</span>
            <span className="text-[#ba1a1a] font-semibold">+38% Stress</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="relative bg-[#ffffff] rounded-xl p-4 shadow-sm border border-[#e8e0d8] overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#ba1a1a] font-bold">
              Weekly Teaching Overload
            </span>
            <span className="w-7 h-7 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-3xl font-bold text-[#ba1a1a]">56 hrs</span>
            <span className="text-[12px] text-[#504440] font-medium">/ week</span>
          </div>
          <div className="mt-2 pt-1 flex items-center gap-1 text-[12px] text-[#ba1a1a]">
            <span className="material-symbols-outlined text-[15px]">timer</span>
            <span className="font-medium">Absorbed by Ad-hoc & Adjuncts</span>
          </div>
        </div>
      </section>

      {/* Primary Interactive Manpower Requisition Card */}
      <section className="bg-[#ffffff] rounded-xl shadow-sm border border-[#e8e0d8] p-5 sm:p-6 mb-8">
        {/* Header with Stage Title and Requisition Meta */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-[#f4e5dc]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#654638] text-[#ffdbcc] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">post_add</span>
            </div>
            <div>
              <h2 className="font-headline text-xl font-bold text-[#211a15]">
                Initiate Teaching Post Requisition
              </h2>
              <p className="text-[12px] text-[#504440]">
                Step-by-step academic justifications compliant with TNU Statute 8.4
              </p>
            </div>
          </div>
          <div className="mt-2 md:mt-0 flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#82746f]">Form ID:</span>
            <span className="text-[13px] px-2.5 py-1 rounded-lg bg-[#faebe2] font-mono font-semibold text-[#4c3023]">
              REQ-2025-084-CSE
            </span>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Step 1 */}
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                currentStep === 1
                  ? 'bg-[#faebe2] shadow-sm border border-[#755a26]'
                  : 'bg-[#fff1e9]'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-[#755a26] text-[#ffffff] flex items-center justify-center text-xs font-bold shrink-0">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] text-[#755a26] uppercase font-bold tracking-wider">
                  Step 1 · Done
                </span>
                <span className="block text-[13px] font-semibold text-[#211a15] truncate">
                  Department & Cadre Base
                </span>
              </div>
            </button>

            {/* Step 2 */}
            <button
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                currentStep === 2
                  ? 'bg-[#faebe2] shadow-sm border-2 border-[#4c3023]'
                  : 'bg-[#fff1e9]'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-[#4c3023] text-[#ffffff] flex items-center justify-center text-xs font-bold shrink-0">
                2
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] text-[#4c3023] uppercase font-bold tracking-wider">
                  Step 2 · In Progress
                </span>
                <span className="block text-[13px] font-bold text-[#4c3023] truncate">
                  Justification & Workload
                </span>
              </div>
            </button>

            {/* Step 3 */}
            <button
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                currentStep === 3
                  ? 'bg-[#faebe2] shadow-sm border-2 border-[#4c3023]'
                  : 'bg-[#fff1e9] opacity-75'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-[#efe0d7] text-[#504440] flex items-center justify-center text-xs font-bold shrink-0">
                3
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] text-[#82746f] uppercase font-bold tracking-wider">
                  Step 3 · Next
                </span>
                <span className="block text-[13px] font-medium text-[#504440] truncate">
                  Cadre Quotas & Budgeting
                </span>
              </div>
            </button>

            {/* Step 4 */}
            <button
              onClick={() => setCurrentStep(4)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                currentStep === 4
                  ? 'bg-[#faebe2] shadow-sm border-2 border-[#4c3023]'
                  : 'bg-[#fff1e9] opacity-75'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-[#efe0d7] text-[#504440] flex items-center justify-center text-xs font-bold shrink-0">
                4
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] text-[#82746f] uppercase font-bold tracking-wider">
                  Step 4
                </span>
                <span className="block text-[13px] font-medium text-[#504440] truncate">
                  Dossier Endorsement
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Active Form Canvas (Step 2 & Step 3 Integrated Workarea) */}
        <div className="space-y-6">
          {/* Field 1: Requisition Type Radio Pills */}
          <div className="space-y-2">
            <label className="block text-[14px] font-bold text-[#211a15]">
              Requisition Type & Purpose <span className="text-[#ba1a1a]">*</span>
            </label>
            <p className="text-[12px] text-[#504440] mb-2">
              Select whether this requisition addresses institutional growth or fills an existing vacancy ledger.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option A: Expansion */}
              <label
                onClick={() => setReqType('expansion')}
                className={`relative flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
                  reqType === 'expansion'
                    ? 'bg-[#faebe2] border-[#755a26] shadow-sm'
                    : 'bg-[#ffffff] border-[#e8e0d8] hover:bg-[#fff1e9]'
                }`}
              >
                <input
                  type="radio"
                  name="req_type"
                  checked={reqType === 'expansion'}
                  onChange={() => setReqType('expansion')}
                  className="mt-1 accent-[#4c3023]"
                />
                <div>
                  <span className="block text-[14px] font-bold text-[#211a15]">
                    Additional New Post (Academic Expansion)
                  </span>
                  <span className="block text-[12px] text-[#504440] mt-0.5">
                    Approved via Academic Council for new specialization verticals (Cloud Architecture & DevOps track).
                  </span>
                </div>
              </label>

              {/* Option B: Replacement */}
              <label
                onClick={() => setReqType('replacement')}
                className={`relative flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
                  reqType === 'replacement'
                    ? 'bg-[#fff1e9] border-[#4c3023] shadow-sm'
                    : 'bg-[#ffffff] border-[#e8e0d8] hover:bg-[#fff1e9]'
                }`}
              >
                <input
                  type="radio"
                  name="req_type"
                  checked={reqType === 'replacement'}
                  onChange={() => setReqType('replacement')}
                  className="mt-1 accent-[#4c3023]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="block text-[14px] font-bold text-[#4c3023]">
                      Replacement for Resignation / Superannuation
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#ffdea7] text-[#271900] text-[10px] font-bold">
                      Active Cadre
                    </span>
                  </div>
                  <span className="block text-[12px] text-[#504440] mt-0.5">
                    Vacancy created due to resignation of Dr. P. K. Sengupta (Resigned Aug 2024; Post ID: CSE-AP-019).
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Field 2 & 3: Designation and Specialization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-[#211a15] mb-1.5">
                Designation & Pay Scale Tier <span className="text-[#ba1a1a]">*</span>
              </label>
              <div className="relative">
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full h-10 px-4 rounded-xl bg-[#ffffff] text-[#211a15] text-[13px] border border-[#d4c3bd] shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[#4c3023]"
                >
                  <option value="Assistant Professor (Senior Scale - Academic Level 11 · 7th CPC)">
                    Assistant Professor (Senior Scale - Academic Level 11 · 7th CPC)
                  </option>
                  <option value="Assistant Professor (Grade I - Academic Level 10)">
                    Assistant Professor (Grade I - Academic Level 10)
                  </option>
                  <option value="Associate Professor (Academic Level 13A)">
                    Associate Professor (Academic Level 13A)
                  </option>
                  <option value="Professor (Academic Level 14)">Professor (Academic Level 14)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#82746f] pointer-events-none text-[20px]">
                  expand_more
                </span>
              </div>
              <span className="block text-[11px] text-[#82746f] mt-1.5">
                Cadre Quota Availability: 2 Open Posts in Level 11
              </span>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#211a15] mb-1.5">
                Mandated Sub-Specialization & Research Track <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                className="w-full h-10 px-4 rounded-xl bg-[#ffffff] text-[#211a15] text-[13px] border border-[#d4c3bd] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#4c3023]"
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
              <span className="block text-[11px] text-[#82746f] mt-1.5">
                Curriculum BoS Reference: Annexure-III (Sem VII & VIII Electives)
              </span>
            </div>
          </div>

          {/* Workload Justification Table (AICTE/UGC Norms) */}
          <div className="space-y-2 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-[14px] font-bold text-[#211a15]">
                  Curricular Workload Deficit Matrix
                </label>
                <p className="text-[12px] text-[#504440]">
                  Statutory mapping showing unassigned instructional contact hours for the upcoming semester.
                </p>
              </div>
              <button
                onClick={handleAddCourse}
                className="inline-flex items-center gap-1 text-[#4c3023] hover:text-[#755a26] text-[12px] font-bold"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                <span>Add Course Row</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-sm border border-[#e8e0d8]">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-[#f4e5dc] text-[#211a15] font-bold text-[12px]">
                    <th className="py-2.5 px-4">Course Code & Title</th>
                    <th className="py-2.5 px-3">Semester</th>
                    <th className="py-2.5 px-3">Theory (L)</th>
                    <th className="py-2.5 px-3">Tutorial (T)</th>
                    <th className="py-2.5 px-3">Lab Batches (P)</th>
                    <th className="py-2.5 px-3">Current Deficit</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f4e5dc]">
                  {courseRows.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={idx % 2 === 1 ? 'bg-[#fff1e9]/50 hover:bg-[#fff1e9]' : 'bg-[#ffffff] hover:bg-[#fff1e9]'}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#211a15]">{row.code}: {row.title}</div>
                        <div className="text-[11px] text-[#82746f]">{row.sub}</div>
                      </td>
                      <td className="py-3 px-3 font-medium">{row.sem}</td>
                      <td className="py-3 px-3 font-mono">{row.theory}</td>
                      <td className="py-3 px-3 font-mono">{row.tut}</td>
                      <td className="py-3 px-3 font-mono">{row.lab}</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 font-bold text-[#ba1a1a]">
                          <span className="material-symbols-outlined text-[14px]">trending_up</span>
                          +{row.deficit} hrs/wk
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteCourse(row.id, row.code)}
                          className="text-[#82746f] hover:text-[#ba1a1a] transition-colors p-1"
                          type="button"
                          title="Delete course row"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete_outline</span>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Summary Calculation Footer Row */}
                  <tr className="bg-[#faebe2] font-semibold text-[#211a15]">
                    <td className="py-3 px-4 text-right font-bold" colSpan={5}>
                      Total Quantified Weekly Load to be Allocated to Requested Faculty:
                    </td>
                    <td className="py-3 px-3 font-headline text-lg text-[#4c3023] font-bold" colSpan={2}>
                      {totalWeeklyLoad} hrs / week
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[12px] text-[#504440] italic">
              * Note: AICTE statutory teaching cap for Assistant Professors is 16 hours direct instruction + 6 hours student mentorship/governance.
            </p>
          </div>

          {/* Upload Supporting Documents Zone */}
          <div className="space-y-2 pt-2">
            <label className="block text-[14px] font-bold text-[#211a15]">
              Supporting Dossiers & Statutory Evidence
            </label>
            <p className="text-[12px] text-[#504440]">
              Attach Board of Studies recommendations, curriculum credit distributions, or workload audit statements.
            </p>

            {/* Dropzone Container */}
            <div
              onClick={handleSimulateUpload}
              className="p-6 rounded-xl bg-[#fff1e9] text-center hover:bg-[#faebe2] border-2 border-dashed border-[#d4c3bd] transition-colors cursor-pointer group"
            >
              <div className="max-w-md mx-auto flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-[#f4e5dc] text-[#4c3023] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
                </div>
                <span className="text-[14px] font-bold text-[#211a15]">
                  Drag & drop compliance documents here
                </span>
                <span className="text-[12px] text-[#82746f] mt-0.5">
                  Supports PDF, XLSX up to 15MB each
                </span>
                <button
                  type="button"
                  className="mt-3 px-4 py-1.5 rounded-lg bg-[#ffffff] text-[#4c3023] text-[12px] font-semibold shadow-sm hover:bg-[#f4e5dc] border border-[#e8e0d8]"
                >
                  Browse Local Drives
                </button>
              </div>
            </div>

            {/* Attached Files List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {attachedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#ffffff] shadow-sm border border-[#e8e0d8]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-9 h-9 rounded-lg bg-[#654638] text-[#ffffff] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                    </span>
                    <div className="min-w-0">
                      <div className="text-[13px] font-bold text-[#211a15] truncate">
                        {file.name}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#82746f]">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span className={file.badgeType === 'verified' ? 'text-[#755a26] font-semibold' : ''}>
                          {file.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pl-2 shrink-0">
                    <button
                      onClick={() => onShowToast(`Viewing statutory extract for ${file.name}`)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#82746f] hover:text-[#4c3023] hover:bg-[#faebe2] transition-colors"
                      type="button"
                      title="Preview Document"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button
                      onClick={() => handleRemoveFile(file.id, file.name)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#82746f] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
                      type="button"
                      title="Remove Document"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer for Multi-step Form */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#f4e5dc]">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 h-10 rounded-xl bg-[#f4e5dc] text-[#4c3023] text-[13px] font-semibold hover:bg-[#efe0d7] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back: Cadre Profile</span>
            </button>
            <div className="w-full sm:w-auto flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={() => onShowToast('Progress saved as draft.')}
                className="inline-flex items-center justify-center gap-1.5 px-4 h-10 rounded-xl bg-[#ffffff] text-[#211a15] text-[13px] font-semibold shadow-sm hover:bg-[#faebe2] border border-[#e8e0d8] transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>Save Progress as Draft</span>
              </button>
              <button
                onClick={handleForwardToDean}
                className="inline-flex items-center justify-center gap-2 px-5 h-10 rounded-xl bg-[#4c3023] text-[#ffffff] text-[13px] font-bold shadow-md hover:bg-[#654638] transition-all"
                type="button"
              >
                <span>Forward to Associate Dean & Dean</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Section: Requisition History & Live Approval Workflow Stepper */}
      <section className="bg-[#ffffff] rounded-xl shadow-sm border border-[#e8e0d8] p-5 sm:p-6 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-[#f4e5dc]">
          <div>
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#755a26] font-bold">
              <span className="material-symbols-outlined text-[16px]">account_tree</span>
              <span>Live Tracking Governance</span>
            </div>
            <h2 className="font-headline text-xl font-bold text-[#211a15] mt-0.5">
              My Department's Requisition History & Approval Workflows
            </h2>
          </div>
          <div className="mt-2 md:mt-0 flex items-center gap-2">
            <span className="text-[12px] text-[#82746f]">Filter by Status:</span>
            <select
              value={workflowFilter}
              onChange={(e) => setWorkflowFilter(e.target.value)}
              className="h-8 px-2.5 rounded-lg bg-[#faebe2] text-[#211a15] text-[12px] border border-[#d4c3bd] focus:outline-none"
            >
              <option value="all">All Active Dockets (3)</option>
              <option value="board">Pending Executive Board (1)</option>
              <option value="done">Completed / Sanctioned (7)</option>
            </select>
          </div>
        </div>

        {/* Live Tracked Requisition Item Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#fff1e9] shadow-sm border border-[#e8e0d8]">
          {/* Item Meta Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#f4e5dc]">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-headline text-lg font-bold text-[#211a15]">
                  Requisition #REQ-2025-079
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdea7] text-[#271900] text-[11px] font-bold">
                  Level 13A · Associate Professor
                </span>
              </div>
              <p className="text-[13px] text-[#504440] mt-0.5">
                Subject Domain: <strong className="font-semibold text-[#211a15]">Artificial Intelligence, Machine Learning & Computer Vision</strong> · Target Intake: 1 Post
              </p>
            </div>

            {/* SLA Warning Pill */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#ffffff] shadow-sm border border-[#e8e0d8]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#755a26] animate-pulse"></span>
                <div className="text-left text-[11px]">
                  <span className="block text-[#82746f] font-medium">Pending Approver SLA:</span>
                  <span className="block font-bold text-[#755a26]">48 Hours Remaining</span>
                </div>
              </div>
              <button
                onClick={() => onShowToast('Retrieving full audit docket for #REQ-2025-079...')}
                className="w-9 h-9 rounded-xl bg-[#faebe2] flex items-center justify-center text-[#4c3023] hover:bg-[#f4e5dc] transition-colors border border-[#d4c3bd]"
                title="View Full Audit Docket"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">description</span>
              </button>
            </div>
          </div>

          {/* Visual Multi-Step Approval Progress Track */}
          <div className="relative py-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              {/* Stage 1: Initiated */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#755a26] text-[#ffffff] flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#755a26] uppercase tracking-wider">Completed</span>
                </div>
                <div className="font-bold text-[#211a15] text-[13px]">1. HOD Initiation</div>
                <div className="text-[12px] text-[#504440]">Dr. Amitabh Banerjee</div>
                <div className="text-[11px] text-[#82746f] mt-1 font-mono">Oct 12 · 11:40 AM</div>
              </div>

              {/* Stage 2: Assoc Dean */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#755a26] text-[#ffffff] flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#755a26] uppercase tracking-wider">Verified</span>
                </div>
                <div className="font-bold text-[#211a15] text-[13px]">2. Workload Review</div>
                <div className="text-[12px] text-[#504440]">Assoc. Dean Academics</div>
                <div className="text-[11px] text-[#82746f] mt-1 font-mono">Oct 14 · 03:15 PM</div>
              </div>

              {/* Stage 3: Dean Endorsement */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#755a26] text-[#ffffff] flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#755a26] uppercase tracking-wider">Endorsed</span>
                </div>
                <div className="font-bold text-[#211a15] text-[13px]">3. Dean Endorsement</div>
                <div className="text-[12px] text-[#504440]">Prof. S. Mukhopadhyay</div>
                <div className="text-[11px] text-[#82746f] mt-1 font-mono">Oct 16 · 09:30 AM</div>
              </div>

              {/* Stage 4: Head HR Vetting (Active Node) */}
              <div className="flex flex-col p-2.5 -m-2.5 rounded-xl bg-[#faebe2] shadow-sm border border-[#755a26]/40">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#4c3023] text-[#ffffff] flex items-center justify-center shadow-md animate-pulse">
                    <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#4c3023] uppercase tracking-wider">In Scrutiny</span>
                </div>
                <div className="font-bold text-[#4c3023] text-[13px]">4. HR & Cadre Vetting</div>
                <div className="text-[12px] font-bold text-[#211a15]">Dr. Radhika Sharma</div>
                <div className="text-[11px] text-[#755a26] font-semibold mt-1">Head HR · Roster Verification</div>
              </div>

              {/* Stage 5: Executive Board */}
              <div className="flex flex-col opacity-60">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#efe0d7] text-[#504440] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#82746f] uppercase tracking-wider">Queued</span>
                </div>
                <div className="font-bold text-[#211a15] text-[13px]">5. Executive Board</div>
                <div className="text-[12px] text-[#504440]">Pro-Chancellor Office</div>
                <div className="text-[11px] text-[#82746f] mt-1">Pending HR Sanction</div>
              </div>
            </div>
          </div>

          {/* Context Remark Box from Preceding Approver */}
          <div className="mt-3 p-3 rounded-xl bg-[#ffffff] border border-[#e8e0d8] flex items-start gap-3">
            <span className="material-symbols-outlined text-[#755a26] text-[20px] mt-0.5">format_quote</span>
            <div className="text-[13px] text-[#211a15]">
              <strong className="font-semibold text-[#4c3023]">Dean's Endorsement Note:</strong> “Approved with high priority. CSE has absorbed +56 hours of ad-hoc teaching load this semester. Specialization in AI/ML is essential to support our newly introduced B.Tech Honors stream. Forwarded to Head HR for sanctioned cadre check.”
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
