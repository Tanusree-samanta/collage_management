import React from 'react';

interface WorkflowGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkflowGuideModal: React.FC<WorkflowGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'Manpower Request',
      role: 'Department Head (HOD)',
      desc: 'HOD identifies instructional deficit, prepares workload justification, and submits request for new post or replacement.'
    },
    {
      num: 2,
      title: 'Academic Review',
      role: 'Associate Dean & Dean of School',
      desc: 'Deanery verifies AICTE/UGC student-teacher ratios (SFR 1:15), checks course credit deficit, and endorses academic need.'
    },
    {
      num: 3,
      title: 'HR Cadre Vetting',
      role: 'Head HR',
      desc: 'Central HR checks the post against sanctioned vacancy ledgers and verifies reservation roster allocations.'
    },
    {
      num: 4,
      title: 'Authorized Approval',
      role: 'Pro-Chancellor & Management',
      desc: 'Executive authority reviews budget and academic necessity, then issues official statutory sanction to recruit.'
    },
    {
      num: 5,
      title: 'Recruitment & Job Posting',
      role: 'HR Talent Acquisition Team',
      desc: 'Job Requisition (JR) is published across university portal, job boards, and academic publications.'
    },
    {
      num: 6,
      title: 'CV Screening & Shortlisting',
      role: 'HR Team & Department',
      desc: 'Incoming applications are screened using the UGC 2018 Academic Performance Indicator (API) criteria.'
    },
    {
      num: 7,
      title: 'Interviews & Presentations',
      role: 'Technical Panel & Department',
      desc: 'Candidates present research papers, deliver classroom teaching demonstrations, and undergo domain interviews.'
    },
    {
      num: 8,
      title: 'Final Selection',
      role: 'Statutory Selection Committee',
      desc: 'Panel chaired by Vice-Chancellor/Dean with Visitor Nominee evaluates finalists and prepares ranked merit list.'
    },
    {
      num: 9,
      title: 'Offer / Letter of Intent (LOI)',
      role: 'Head HR & Registrar',
      desc: 'Formal offer package is generated, approved, and digitally transmitted to selected candidate with joining deadline.'
    },
    {
      num: 10,
      title: 'Document Verification',
      role: 'HR Team & Registrar Office',
      desc: 'Verification of doctoral degrees, experience certificates, previous employer clearances, and background checks.'
    },
    {
      num: 11,
      title: 'Joining & Induction',
      role: 'Department HOD & HR',
      desc: 'Candidate formally joins, completes university oath, receives employee code, and begins academic instruction.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#34251F]/40 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E8E0D8] bg-[#F8F6F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#654638] text-[#FFFFFF] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">account_tree</span>
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg text-[#34251F]">
                University Recruitment & Approval Process
              </h2>
              <p className="text-[13px] text-[#766B64]">
                Standard 11-step lifecycle compliant with The Neotia University Statutes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#766B64] hover:bg-[#E8E0D8] hover:text-[#34251F] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-[13px] text-[#766B64] leading-relaxed">
            Every faculty post follows a transparent, documented sequence to ensure academic standards, budget compliance, and regulatory adherence.
          </p>

          <div className="relative pl-6 space-y-4 border-l-2 border-[#E8E0D8] ml-2">
            {steps.map((s) => (
              <div key={s.num} className="relative group">
                {/* Number dot */}
                <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-[#654638] text-[#FFFFFF] text-[11px] font-bold flex items-center justify-center ring-4 ring-[#FFFFFF]">
                  {s.num}
                </div>
                <div className="bg-[#F8F6F2] p-3.5 rounded-xl border border-[#E8E0D8]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-headline font-bold text-[14px] text-[#34251F]">
                      {s.title}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#E8E0D8] text-[11px] text-[#654638] font-semibold">
                      {s.role}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#766B64] mt-1 leading-normal">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F8F6F2] border-t border-[#E8E0D8] flex items-center justify-between">
          <span className="text-[12px] text-[#766B64]">
            Governed under Statute 8.4 & 14(2) • TNU Charter
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[13px] hover:bg-[#4c3023] transition-colors shadow-sm"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
