import React, { useState } from 'react';
import { FACULTY_DIRECTORY_DATA } from '../../data/mockData';

interface FacultyDirectoryScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (path: string) => void;
}

export const FacultyDirectoryScreen: React.FC<FacultyDirectoryScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [selectedFaculty, setSelectedFaculty] = useState<typeof FACULTY_DIRECTORY_DATA[0] | null>(null);

  const filteredFaculty = FACULTY_DIRECTORY_DATA.filter((f) => {
    if (deptFilter !== 'All Departments' && f.dept !== deptFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.designation.toLowerCase().includes(q) ||
        f.phd.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-6 font-body text-[13px] text-[#211a15]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#82746f] uppercase tracking-wider mb-1">
            <span onClick={() => onNavigate('overview-command')} className="hover:text-[#4c3023] cursor-pointer">Home</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-[#4c3023] font-bold">Faculty Workforce</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#4c3023] tracking-tight">
            Academic Faculty Directory & Teaching Load Ledger
          </h1>
          <p className="text-[14px] text-[#504440] mt-1">
            Real-time roster of sanctioned faculty posts, AICTE instructional hours, and research footprints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowToast('Exporting Faculty Roster as CSV...')}
            className="px-3.5 py-2 rounded-xl bg-[#ffffff] border border-[#e8e0d8] text-[#4c3023] font-semibold text-[12px] shadow-sm hover:bg-[#faebe2]"
          >
            Export Directory
          </button>
          <button
            onClick={() => onNavigate('workforce-requisitions')}
            className="px-4 py-2 rounded-xl bg-[#4c3023] text-[#ffffff] font-bold text-[12px] shadow-sm hover:bg-[#654638]"
          >
            + New Cadre Requisition
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-[#ffffff] border border-[#e8e0d8] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#82746f] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, post, or degree..."
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#faebe2] text-[13px] text-[#211a15] placeholder-[#82746f] focus:outline-none focus:ring-1 focus:ring-[#4c3023]"
            />
          </div>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="h-9 px-3 rounded-lg bg-[#faebe2] text-[12px] text-[#211a15] border border-[#d4c3bd] focus:outline-none"
          >
            <option>All Departments</option>
            <option>Computer Science & Engineering</option>
            <option>Robotics & Artificial Intelligence</option>
            <option>Mechanical Engineering</option>
            <option>Electrical & Electronics</option>
          </select>
        </div>

        <div className="text-[12px] text-[#82746f]">
          Showing <strong>{filteredFaculty.length}</strong> Faculty Members
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFaculty.map((fac) => (
          <div
            key={fac.id}
            className="p-5 rounded-2xl bg-[#ffffff] border border-[#e8e0d8] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={fac.avatarUrl}
                alt={fac.name}
                className="w-16 h-16 rounded-xl object-cover border border-[#e8e0d8] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline text-base font-bold text-[#4c3023] truncate">
                    {fac.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#fdd897] text-[#785c28] text-[10px] font-bold shrink-0">
                    Ph.D.
                  </span>
                </div>
                <div className="text-[13px] font-semibold text-[#755a26]">{fac.designation}</div>
                <div className="text-[12px] text-[#82746f] mt-0.5">{fac.dept}</div>
                <div className="text-[11px] text-[#82746f] font-mono mt-0.5">{fac.phd}</div>
              </div>
            </div>

            {/* Metrics */}
            <div className="p-3 rounded-xl bg-[#fff1e9] grid grid-cols-3 gap-2 text-center text-[12px]">
              <div>
                <span className="text-[10px] text-[#82746f] uppercase font-bold block">Teaching Load</span>
                <span className={`font-headline font-bold text-base ${fac.teachingLoad > fac.maxLoad ? 'text-[#ba1a1a]' : 'text-[#4c3023]'}`}>
                  {fac.teachingLoad}h / wk
                </span>
                <span className="text-[10px] text-[#82746f] block">Max {fac.maxLoad}h</span>
              </div>
              <div>
                <span className="text-[10px] text-[#82746f] uppercase font-bold block">SCI Papers</span>
                <span className="font-headline font-bold text-base text-[#755a26]">
                  {fac.researchPapers}
                </span>
                <span className="text-[10px] text-[#82746f] block">Scopus Indexed</span>
              </div>
              <div>
                <span className="text-[10px] text-[#82746f] uppercase font-bold block">Patents</span>
                <span className="font-headline font-bold text-base text-[#4c3023]">
                  {fac.patents}
                </span>
                <span className="text-[10px] text-[#82746f] block">Granted</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#f4e5dc]">
              <span className="text-[11px] text-[#82746f]">
                Status: <strong className="text-[#287a55]">Active Tenure Track</strong>
              </span>
              <button
                onClick={() => {
                  setSelectedFaculty(fac);
                  onShowToast(`Viewing academic portfolio for ${fac.name}`);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#faebe2] hover:bg-[#4c3023] hover:text-[#ffffff] text-[#4c3023] text-[12px] font-semibold transition-colors"
              >
                View Full Dossier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Dossier Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211a15]/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#ffffff] shadow-2xl overflow-hidden border border-[#e8e0d8] p-6">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={selectedFaculty.avatarUrl}
                alt={selectedFaculty.name}
                className="w-16 h-16 rounded-xl object-cover border border-[#e8e0d8]"
              />
              <div>
                <h3 className="font-headline text-lg font-bold text-[#4c3023]">{selectedFaculty.name}</h3>
                <div className="text-[13px] text-[#755a26] font-semibold">{selectedFaculty.designation}</div>
                <div className="text-[12px] text-[#82746f]">{selectedFaculty.dept}</div>
                <div className="text-[11px] text-[#82746f] font-mono">{selectedFaculty.phd}</div>
              </div>
            </div>

            <div className="space-y-3 text-[13px] p-3 rounded-xl bg-[#faebe2]">
              <div className="flex justify-between">
                <span className="text-[#82746f]">Teaching Load Compliance:</span>
                <strong className={selectedFaculty.teachingLoad > selectedFaculty.maxLoad ? 'text-[#ba1a1a]' : 'text-[#4c3023]'}>
                  {selectedFaculty.teachingLoad} hrs / week ({selectedFaculty.teachingLoad > selectedFaculty.maxLoad ? 'Overload' : 'Compliant'})
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#82746f]">Research Publications:</span>
                <strong>{selectedFaculty.researchPapers} SCI/Scopus Papers</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#82746f]">Patents Granted:</span>
                <strong>{selectedFaculty.patents} Indian / US Patents</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#82746f]">Academic Council Status:</span>
                <strong className="text-[#287a55]">Tenured Permanent Faculty</strong>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setSelectedFaculty(null)}
                className="px-4 py-2 rounded-xl bg-[#4c3023] text-[#ffffff] font-bold text-[12px]"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
