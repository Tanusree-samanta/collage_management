import React, { useState } from 'react';

interface MeritScrutinyScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (path: string) => void;
}

export const MeritScrutinyScreen: React.FC<MeritScrutinyScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  // Interactive UGC 2018 Scrutiny Engine simulator
  const [candidateName, setCandidateName] = useState('Dr. Aravind Swaminathan');
  const [postApplied, setPostApplied] = useState('Professor (Level 14A)');
  const [hasPhd, setHasPhd] = useState(true);
  const [phdInstitute, setPhdInstitute] = useState('tier1'); // tier1 = 30 pts, tier2 = 25 pts
  const [pgPercentage, setPgPercentage] = useState(86);
  const [ugPercentage, setUgPercentage] = useState(82);
  const [q1Papers, setQ1Papers] = useState(14);
  const [q2Papers, setQ2Papers] = useState(12);
  const [citations, setCitations] = useState(480);
  const [teachingYears, setTeachingYears] = useState(16);
  const [patents, setPatents] = useState(4);
  const [fundedGrantsLakhs, setFundedGrantsLakhs] = useState(120);

  // Calculation logic based on UGC Regulations 2018
  const academicScore = Math.min(
    40,
    (hasPhd ? (phdInstitute === 'tier1' ? 30 : 25) : 0) +
      (pgPercentage >= 80 ? 7 : pgPercentage >= 60 ? 5 : 3) +
      (ugPercentage >= 80 ? 3 : 2)
  );

  const researchScore = Math.min(
    30,
    q1Papers * 1.5 + q2Papers * 1.0 + Math.min(5, citations / 100)
  );

  const pedagogyScore = Math.min(
    20,
    teachingYears * 1.2 + 2 // Base LMS & curriculum
  );

  const industryScore = Math.min(
    10,
    patents * 1.5 + Math.min(4, fundedGrantsLakhs / 30)
  );

  const totalRcsScore = Math.min(100, academicScore + researchScore + pedagogyScore + industryScore);

  const isEligible = totalRcsScore >= (postApplied.includes('Professor') ? 85 : 75);

  return (
    <div className="flex flex-col w-full gap-6 font-body text-[13px] text-[#211a15]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#82746f] uppercase tracking-wider mb-1">
            <span onClick={() => onNavigate('overview-command')} className="hover:text-[#4c3023] cursor-pointer">Home</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-[#4c3023] font-bold">Recruitment Command</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-[#755a26] font-bold">Merit & Scrutiny</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#4c3023] tracking-tight">
            UGC 2018 Statutory Merit & Scrutiny Engine
          </h1>
          <p className="text-[14px] text-[#504440] mt-1">
            Automated Academic Performance Indicator (API) calculation and Recruitment Criteria Score (RCS) simulator.
          </p>
        </div>

        <button
          onClick={() => {
            onShowToast(`Generated Official Scrutiny Sheet for ${candidateName} (Score: ${totalRcsScore.toFixed(1)}/100).`);
          }}
          className="px-4 py-2 rounded-xl bg-[#4c3023] text-[#ffffff] font-bold text-[12px] shadow-sm hover:bg-[#654638]"
        >
          Export Official Scrutiny Sheet
        </button>
      </div>

      {/* Grid: Simulator on Left / Instant Score Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: 8 cols */}
        <div className="lg:col-span-8 bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#e8e0d8] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#f4e5dc]">
            <h2 className="font-headline text-lg font-bold text-[#4c3023]">
              Candidate Credentials Evaluation Simulator
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#faebe2] text-[#755a26] text-[11px] font-bold">
              UGC Gazette 2018 Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Candidate Full Name</label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Cadre Tier Applied</label>
              <select
                value={postApplied}
                onChange={(e) => setPostApplied(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-[#d4c3bd]"
              >
                <option value="Professor (Level 14A)">Professor (Level 14A · Cutoff 85+)</option>
                <option value="Associate Professor (Level 13A)">Associate Professor (Level 13A · Cutoff 80+)</option>
                <option value="Assistant Professor (Level 10/11)">Assistant Professor (Level 10/11 · Cutoff 75+)</option>
              </select>
            </div>
          </div>

          {/* Section 1: Academic Qualifications (40%) */}
          <div className="p-4 rounded-xl bg-[#fff1e9] border border-[#e8e0d8] space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#4c3023] uppercase text-[12px]">
                1. Academic Qualifications & API (Max 40 Pts)
              </span>
              <span className="font-bold font-mono text-[#755a26]">{academicScore.toFixed(1)} / 40 Pts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-[#82746f] mb-1 font-semibold">Doctoral Degree</label>
                <select
                  value={phdInstitute}
                  onChange={(e) => setPhdInstitute(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg bg-[#ffffff] border border-[#d4c3bd] text-[12px]"
                >
                  <option value="tier1">IIT / IISc / Top 100 World (30 pts)</option>
                  <option value="tier2">Central / State University (25 pts)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-[#82746f] mb-1 font-semibold">Postgraduate % / CGPA</label>
                <input
                  type="number"
                  value={pgPercentage}
                  onChange={(e) => setPgPercentage(Number(e.target.value))}
                  className="w-full h-8 px-2 rounded-lg bg-[#ffffff] border border-[#d4c3bd] text-[12px]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#82746f] mb-1 font-semibold">Undergraduate % / CGPA</label>
                <input
                  type="number"
                  value={ugPercentage}
                  onChange={(e) => setUgPercentage(Number(e.target.value))}
                  className="w-full h-8 px-2 rounded-lg bg-[#ffffff] border border-[#d4c3bd] text-[12px]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Research & Publications (30%) */}
          <div className="p-4 rounded-xl bg-[#fff1e9] border border-[#e8e0d8] space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#4c3023] uppercase text-[12px]">
                2. Research & Scopus Publications (Max 30 Pts)
              </span>
              <span className="font-bold font-mono text-[#755a26]">{researchScore.toFixed(1)} / 30 Pts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-[#82746f] mb-1 font-semibold">Q1 SCI Journals</label>
                <input
                  type="number"
                  value={q1Papers}
                  onChange={(e) => setQ1Papers(Number(e.target.value))}
                  className="w-full h-8 px-2 rounded-lg bg-[#ffffff] border border-[#d4c3bd] text-[12px]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#82746f] mb-1 font-semibold">Q2 SCI Journals</label>
                <input
                  type="number"
                  value={q2Papers}
                  onChange={(e) => setQ2Papers(Number(e.target.value))}
                  className="w-full h-8 px-2 rounded-lg bg-[#ffffff] border border-[#d4c3bd] text-[12px]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#82746f] mb-1 font-semibold">Total Scopus Citations</label>
                <input
                  type="number"
                  value={citations}
                  onChange={(e) => setCitations(Number(e.target.value))}
                  className="w-full h-8 px-2 rounded-lg bg-[#ffffff] border border-[#d4c3bd] text-[12px]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Teaching & Experience (20%) */}
          <div className="p-4 rounded-xl bg-[#fff1e9] border border-[#e8e0d8] space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#4c3023] uppercase text-[12px]">
                3. Teaching Experience & Pedagogy (Max 20 Pts)
              </span>
              <span className="font-bold font-mono text-[#755a26]">{pedagogyScore.toFixed(1)} / 20 Pts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#82746f] mb-1 font-semibold">Years Post-PhD Teaching</label>
                <input
                  type="number"
                  value={teachingYears}
                  onChange={(e) => setTeachingYears(Number(e.target.value))}
                  className="w-full h-8 px-2 rounded-lg bg-[#ffffff] border border-[#d4c3bd] text-[12px]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#82746f] mb-1 font-semibold">LMS & Curriculum Design</label>
                <div className="pt-2 text-[12px] font-semibold text-[#287a55]">Audited & Verified (100%)</div>
              </div>
            </div>
          </div>

          {/* Section 4: Patents & Grants (10%) */}
          <div className="p-4 rounded-xl bg-[#fff1e9] border border-[#e8e0d8] space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#4c3023] uppercase text-[12px]">
                4. Patents & Sponsored Grants (Max 10 Pts)
              </span>
              <span className="font-bold font-mono text-[#755a26]">{industryScore.toFixed(1)} / 10 Pts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#82746f] mb-1 font-semibold">Granted Patents</label>
                <input
                  type="number"
                  value={patents}
                  onChange={(e) => setPatents(Number(e.target.value))}
                  className="w-full h-8 px-2 rounded-lg bg-[#ffffff] border border-[#d4c3bd] text-[12px]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#82746f] mb-1 font-semibold">Sponsored Research (₹ Lakhs)</label>
                <input
                  type="number"
                  value={fundedGrantsLakhs}
                  onChange={(e) => setFundedGrantsLakhs(Number(e.target.value))}
                  className="w-full h-8 px-2 rounded-lg bg-[#ffffff] border border-[#d4c3bd] text-[12px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Scorecard: 4 cols */}
        <div className="lg:col-span-4 bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#e8e0d8] flex flex-col gap-5 sticky top-24">
          <div className="flex items-center justify-between pb-2 border-b border-[#f4e5dc]">
            <h3 className="font-headline text-base font-bold text-[#4c3023]">Merit Index Scorecard</h3>
            <span className="text-[11px] font-mono text-[#82746f]">Instant Scrutiny</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#fff1e9] text-center border border-[#e8e0d8] relative overflow-hidden">
            <span className="text-[11px] text-[#82746f] uppercase font-bold tracking-wider">
              Composite RCS Score
            </span>
            <div className="font-headline text-5xl font-bold text-[#4c3023] my-2">
              {totalRcsScore.toFixed(1)}
              <span className="text-xl text-[#82746f]">/100</span>
            </div>
            <div className="mt-2">
              {isEligible ? (
                <span className="px-3 py-1 rounded-full bg-[#fdd897] text-[#785c28] text-[12px] font-bold">
                  ✓ Qualifies for Selection Board
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[12px] font-bold">
                  Below Cadre Cutoff
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2 text-[12px]">
            <div className="flex justify-between py-1 border-b border-[#f4e5dc]">
              <span className="text-[#82746f]">1. Academic API:</span>
              <strong className="font-mono">{academicScore.toFixed(1)} / 40</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[#f4e5dc]">
              <span className="text-[#82746f]">2. Research & Scopus:</span>
              <strong className="font-mono">{researchScore.toFixed(1)} / 30</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[#f4e5dc]">
              <span className="text-[#82746f]">3. Teaching Pedagogy:</span>
              <strong className="font-mono">{pedagogyScore.toFixed(1)} / 20</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[#f4e5dc]">
              <span className="text-[#82746f]">4. Patents & Industry:</span>
              <strong className="font-mono">{industryScore.toFixed(1)} / 10</strong>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#faebe2] text-[11px] text-[#504440] leading-relaxed">
            Candidates meeting statutory cutoff are automatically queued for Selection Committee Hearing under Deanery Quorum.
          </div>

          <button
            onClick={() => {
              onShowToast(`Dispatched scrutiny seal for ${candidateName} to Head HR registry.`);
              onNavigate('applicant-pipeline');
            }}
            className="w-full py-2.5 rounded-xl bg-[#4c3023] text-[#ffffff] font-bold text-[13px] hover:bg-[#654638] shadow-sm"
          >
            Endorse & Send to Selection Board
          </button>
        </div>
      </div>
    </div>
  );
};
