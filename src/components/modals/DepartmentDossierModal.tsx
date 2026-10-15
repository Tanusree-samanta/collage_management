import React, { useState } from 'react';
import { Department } from '../../data/mockData';

interface DepartmentDossierModalProps {
  dept: Department | null;
  onClose: () => void;
}

export const DepartmentDossierModal: React.FC<DepartmentDossierModalProps> = ({ dept, onClose }) => {
  const [activeTab, setActiveTab] = useState<'cadre' | 'workload' | 'accreditation'>('cadre');

  if (!dept) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211a15]/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#ffffff] shadow-2xl overflow-hidden border border-[#e8e0d8] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-[#fff1e9]/60 border-b border-[#e8e0d8] flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#4c3023] text-[#ffffff] flex items-center justify-center font-bold text-lg font-headline">
              {dept.shortCode}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline text-xl font-bold text-[#4c3023]">
                  {dept.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#fdd897] text-[#785c28] text-[11px] font-bold">
                  {dept.code}
                </span>
              </div>
              <p className="text-[13px] text-[#504440] mt-0.5">
                Head of Department: <strong className="text-[#211a15]">{dept.head}</strong> • Campus: TNU West Bengal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#82746f] hover:bg-[#f4e5dc] hover:text-[#211a15] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="px-6 border-b border-[#e8e0d8] flex gap-4 bg-[#fff8f5]">
          <button
            onClick={() => setActiveTab('cadre')}
            className={`py-3 text-[13px] font-semibold border-b-2 transition-colors ${
              activeTab === 'cadre'
                ? 'border-[#755a26] text-[#755a26]'
                : 'border-transparent text-[#82746f] hover:text-[#211a15]'
            }`}
          >
            Cadre Allocation & Roster
          </button>
          <button
            onClick={() => setActiveTab('workload')}
            className={`py-3 text-[13px] font-semibold border-b-2 transition-colors ${
              activeTab === 'workload'
                ? 'border-[#755a26] text-[#755a26]'
                : 'border-transparent text-[#82746f] hover:text-[#211a15]'
            }`}
          >
            SFR & Workload Audit (+{dept.loadHoursDelta}h)
          </button>
          <button
            onClick={() => setActiveTab('accreditation')}
            className={`py-3 text-[13px] font-semibold border-b-2 transition-colors ${
              activeTab === 'accreditation'
                ? 'border-[#755a26] text-[#755a26]'
                : 'border-transparent text-[#82746f] hover:text-[#211a15]'
            }`}
          >
            AICTE & NAAC Criteria 2.4
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 font-body">
          {activeTab === 'cadre' && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#faebe2]">
                  <div className="text-[11px] font-bold uppercase text-[#82746f]">Sanctioned Posts</div>
                  <div className="text-2xl font-bold font-headline text-[#4c3023] mt-1">{dept.sanctioned}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#faebe2]">
                  <div className="text-[11px] font-bold uppercase text-[#82746f]">In Position</div>
                  <div className="text-2xl font-bold font-headline text-[#755a26] mt-1">{dept.inPosition}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#ffdad6]">
                  <div className="text-[11px] font-bold uppercase text-[#ba1a1a]">Vacancies</div>
                  <div className="text-2xl font-bold font-headline text-[#ba1a1a] mt-1">{dept.vacancies} Open</div>
                </div>
                <div className="p-3 rounded-xl bg-[#faebe2]">
                  <div className="text-[11px] font-bold uppercase text-[#82746f]">Enrolled Students</div>
                  <div className="text-2xl font-bold font-headline text-[#211a15] mt-1">{dept.totalStudents}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#fff1e9]/60 border border-[#e8e0d8]">
                <h4 className="font-headline font-bold text-[#4c3023] text-[14px] mb-2">Cadre Distribution Roster</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-[#ffffff] rounded-lg shadow-xs">
                    <span className="text-[11px] text-[#82746f] block uppercase font-bold">Professors</span>
                    <span className="text-lg font-bold text-[#4c3023] font-headline">{dept.professors}</span>
                    <span className="block text-[10px] text-[#82746f]">Level 14 / 14A</span>
                  </div>
                  <div className="p-3 bg-[#ffffff] rounded-lg shadow-xs">
                    <span className="text-[11px] text-[#82746f] block uppercase font-bold">Associate Profs</span>
                    <span className="text-lg font-bold text-[#755a26] font-headline">{dept.assocProfessors}</span>
                    <span className="block text-[10px] text-[#82746f]">Level 13A1 / 13A2</span>
                  </div>
                  <div className="p-3 bg-[#ffffff] rounded-lg shadow-xs">
                    <span className="text-[11px] text-[#82746f] block uppercase font-bold">Assistant Profs</span>
                    <span className="text-lg font-bold text-[#211a15] font-headline">{dept.asstProfessors}</span>
                    <span className="block text-[10px] text-[#82746f]">Level 10 / 11 / 12</span>
                  </div>
                </div>
              </div>

              <p className="text-[13px] text-[#504440] leading-relaxed">
                {dept.description}
              </p>
            </div>
          )}

          {activeTab === 'workload' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#faebe2] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase text-[#82746f]">Student-Faculty Ratio (SFR)</span>
                  <div className="text-2xl font-bold font-headline text-[#4c3023]">{dept.sfr}</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase text-[#82746f]">Statutory AICTE Norm</span>
                  <div className="text-lg font-semibold text-[#755a26]">1:15 Maximum</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#e8e0d8] bg-[#ffffff] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#211a15]">Current Instructional Load Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    dept.statusType === 'overloaded'
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : dept.statusType === 'threshold'
                      ? 'bg-[#ffdea7] text-[#271900]'
                      : 'bg-[#faebe2] text-[#755a26]'
                  }`}>
                    {dept.loadStatus}
                  </span>
                </div>
                <p className="text-[12px] text-[#504440]">
                  Direct lecture hours, tutorials, and practical sessions currently exceed baseline allocation by <strong>{dept.loadHoursDelta} hours per week</strong>. Adjunct and ad-hoc guest lecturers currently absorb surplus.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'accreditation' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#faebe2] flex items-center gap-3">
                <span className="material-symbols-outlined text-[#755a26] text-[24px]">verified</span>
                <div>
                  <div className="text-[13px] font-bold text-[#4c3023]">NAAC SSR Criterion 2.4 Cadre Ratio Status</div>
                  <div className="text-[12px] text-[#504440]">Cadre norm target 1:2:6 (Prof:Assoc:Asst). Department ratio calibrated for upcoming Peer Team inspection.</div>
                </div>
              </div>
              <div className="p-3 rounded-xl border border-[#e8e0d8] text-[12px] text-[#504440] space-y-1">
                <div className="flex justify-between font-medium">
                  <span>NBA Tier-I Compliance Status:</span>
                  <span className="text-[#755a26] font-bold">Satisfactory (Grade A)</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Ph.D. Faculty Proportion:</span>
                  <span className="text-[#4c3023] font-bold">78.4% (Target: 85%)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fff1e9]/60 border-t border-[#e8e0d8] flex items-center justify-between">
          <span className="text-[11px] text-[#82746f]">Deanery Dossier Digest Ref: TNU-DOS-2025</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Exporting official statutory load statement PDF for ${dept.name}...`);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#ffffff] text-[#4c3023] border border-[#d4c3bd] text-[12px] font-semibold hover:bg-[#faebe2]"
            >
              Export Dossier PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#4c3023] text-[#ffffff] text-[12px] font-bold hover:bg-[#654638]"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
