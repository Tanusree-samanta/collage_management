import React, { useState } from 'react';
import { CandidateRecord, INITIAL_CANDIDATES } from '../../data/mockData';

interface SelectionCommitteeScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (path: string) => void;
}

export const SelectionCommitteeScreen: React.FC<SelectionCommitteeScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [candidates, setCandidates] = useState<CandidateRecord[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRecord>(INITIAL_CANDIDATES[0]);
  
  // Evaluation form state
  const [researchScore, setResearchScore] = useState<number>(9.8);
  const [pedagogyScore, setPedagogyScore] = useState<number>(9.5);
  const [curriculumScore, setCurriculumScore] = useState<number>(9.6);
  const [grantScore, setGrantScore] = useState<number>(9.2);
  const [recommendation, setRecommendation] = useState<'Strongly Recommend' | 'Recommend' | 'Reject'>('Strongly Recommend');
  const [evalNotes, setEvalNotes] = useState<string>(
    'The candidate demonstrated extraordinary command over network cryptography and sponsored research lab establishment. The lecture demonstration on Zero-Knowledge Proofs was lucid and pedagogically superior.'
  );
  const [submittedEvaluations, setSubmittedEvaluations] = useState<Record<string, boolean>>({});

  const totalScore = ((researchScore + pedagogyScore + curriculumScore + grantScore) / 40 * 100).toFixed(1);

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedEvaluations((prev) => ({ ...prev, [selectedCandidate.id]: true }));
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidate.id
          ? {
              ...c,
              stage: 'Selection Board',
              evaluation: {
                technicalScore: researchScore,
                academicScore: curriculumScore,
                pedagogyScore: pedagogyScore,
                comments: evalNotes,
                evaluator: 'Prof. K. N. Rao (Selection Board Chair)',
                recommendation: recommendation
              }
            }
          : c
      )
    );
    onShowToast(`Evaluation submitted for ${selectedCandidate.name}. Score: ${totalScore}/100 (${recommendation})`);
  };

  return (
    <div className="flex flex-col gap-6 w-full font-body text-[13px] text-[#34251F]">
      {/* Header Banner */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[12px] font-bold uppercase tracking-wider text-[#C8A66A]">
            Statutory Selection Committee
          </div>
          <h1 className="font-headline font-bold text-2xl text-[#34251F] mt-0.5">
            Faculty Candidate Evaluation & Quorum
          </h1>
          <p className="text-[13px] text-[#766B64] mt-1">
            Chairperson: <strong>Prof. K. N. Rao (IIT Nominee)</strong> • Hearing Date: Feb 28, 2025 • Senate Quorum Confirmed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#287A55]/10 text-[#287A55] font-bold text-[12px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#287A55] animate-pulse"></span>
            Quorum Active: 4 / 4 Members Present
          </span>
        </div>
      </div>

      {/* Main Workspace: Split into Candidates List (Left) and Evaluation Sheet (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Assigned Candidates */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E0D8] shadow-sm">
            <h2 className="font-headline font-bold text-base text-[#34251F] mb-1">
              Candidates for Board Hearing
            </h2>
            <p className="text-[12px] text-[#766B64] mb-3">
              Select a candidate to review their profile and submit evaluation marks
            </p>

            <div className="space-y-3">
              {candidates.map((cand) => {
                const isSelected = selectedCandidate.id === cand.id;
                const isEvaluated = submittedEvaluations[cand.id];

                return (
                  <div
                    key={cand.id}
                    onClick={() => {
                      setSelectedCandidate(cand);
                    }}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#F8F6F2] border-[#654638] shadow-sm'
                        : 'bg-[#FFFFFF] border-[#E8E0D8] hover:bg-[#F8F6F2]/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-headline font-bold text-sm text-[#34251F]">
                          {cand.name}
                        </div>
                        <div className="text-[12px] text-[#654638] font-semibold mt-0.5">
                          {cand.appliedRole}
                        </div>
                        <div className="text-[11px] text-[#766B64] mt-0.5">
                          {cand.department}
                        </div>
                      </div>
                      {isEvaluated ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#287A55]/10 text-[#287A55] shrink-0">
                          Evaluated ✓
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C8A66A]/20 text-[#654638] shrink-0">
                          Pending Score
                        </span>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#E8E0D8] flex items-center justify-between text-[11px] text-[#766B64]">
                      <span>Experience: {cand.experienceYears} Years</span>
                      <span className="font-semibold text-[#34251F]">RCS: {cand.rcsScore}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F6F2] border border-[#E8E0D8] text-[12px] text-[#766B64]">
            <strong className="text-[#34251F] block mb-1">Statutory Guidelines:</strong>
            Evaluations recorded by the selection committee are confidential and entered directly into the Chancellor's Executive Docket.
          </div>
        </div>

        {/* Right Column: Candidate Profile & Detailed Scoring Rubric */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Candidate Dossier Overview */}
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E0D8]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8A66A]">
                  Candidate Interview Docket
                </span>
                <h2 className="font-headline font-bold text-2xl text-[#34251F] mt-0.5">
                  {selectedCandidate.name}
                </h2>
                <p className="text-[13px] text-[#766B64]">
                  {selectedCandidate.highestDegree} • {selectedCandidate.university}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] text-right shrink-0">
                <span className="text-[10px] font-bold text-[#766B64] uppercase block">
                  Requisition Code
                </span>
                <span className="font-mono font-bold text-[#654638] text-sm">
                  {selectedCandidate.reqCode}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px]">
              <div className="p-3 rounded-xl bg-[#F8F6F2]">
                <span className="text-[#766B64] block">Applied Position</span>
                <strong className="text-[#34251F]">{selectedCandidate.appliedRole}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F6F2]">
                <span className="text-[#766B64] block">Current Organization</span>
                <strong className="text-[#34251F]">{selectedCandidate.currentCompany}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F6F2]">
                <span className="text-[#766B64] block">Experience</span>
                <strong className="text-[#34251F]">{selectedCandidate.experienceYears} Years</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F6F2]">
                <span className="text-[#766B64] block">Pre-Interview RCS</span>
                <strong className="text-[#287A55]">{selectedCandidate.rcsScore} / 100</strong>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => onShowToast(`Downloaded Full CV for ${selectedCandidate.name}`)}
                className="px-3.5 py-1.5 rounded-lg bg-[#F8F6F2] hover:bg-[#E8E0D8] text-[#34251F] font-semibold text-[12px] flex items-center gap-1.5 transition-colors border border-[#E8E0D8]"
              >
                <span className="material-symbols-outlined text-[16px]">description</span>
                View Curriculum Vitae (PDF)
              </button>
              <button
                type="button"
                onClick={() => onShowToast(`Opened Publication Footprints for ${selectedCandidate.name}`)}
                className="px-3.5 py-1.5 rounded-lg bg-[#F8F6F2] hover:bg-[#E8E0D8] text-[#34251F] font-semibold text-[12px] flex items-center gap-1.5 transition-colors border border-[#E8E0D8]"
              >
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                Research & Patent Records
              </button>
            </div>
          </div>

          {/* Statutory Evaluation Scoring Form */}
          <form
            onSubmit={handleSubmitEvaluation}
            className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D8]">
              <div>
                <h3 className="font-headline font-bold text-lg text-[#34251F]">
                  Committee Assessment Rubric
                </h3>
                <p className="text-[12px] text-[#766B64]">
                  Rate the candidate across four statutory parameters (Max 10 points each)
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-[#766B64] uppercase block">
                  Cumulative Score
                </span>
                <span className="font-headline font-bold text-2xl text-[#654638]">
                  {totalScore}%
                </span>
              </div>
            </div>

            {/* Parameter 1: Research Quality */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[13px]">
                <label className="font-semibold text-[#34251F]">
                  1. Research Publications, Citations & Patents (Weight: 25%)
                </label>
                <span className="font-bold text-[#654638]">{researchScore} / 10.0</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={researchScore}
                onChange={(e) => setResearchScore(parseFloat(e.target.value))}
                className="w-full accent-[#654638]"
              />
              <div className="flex justify-between text-[11px] text-[#766B64]">
                <span>Needs Improvement (0-4)</span>
                <span>Satisfactory (5-7)</span>
                <span>Exceptional / High Impact (8-10)</span>
              </div>
            </div>

            {/* Parameter 2: Pedagogy & Lecture Demo */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[13px]">
                <label className="font-semibold text-[#34251F]">
                  2. Classroom Pedagogy & Lecture Demonstration (Weight: 25%)
                </label>
                <span className="font-bold text-[#654638]">{pedagogyScore} / 10.0</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={pedagogyScore}
                onChange={(e) => setPedagogyScore(parseFloat(e.target.value))}
                className="w-full accent-[#654638]"
              />
              <div className="flex justify-between text-[11px] text-[#766B64]">
                <span>Below Standard</span>
                <span>Clear Delivery</span>
                <span>Master Pedagogy & Student Engagement</span>
              </div>
            </div>

            {/* Parameter 3: Domain & Curriculum Vision */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[13px]">
                <label className="font-semibold text-[#34251F]">
                  3. Domain Competence & Curricular Innovation (Weight: 25%)
                </label>
                <span className="font-bold text-[#654638]">{curriculumScore} / 10.0</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={curriculumScore}
                onChange={(e) => setCurriculumScore(parseFloat(e.target.value))}
                className="w-full accent-[#654638]"
              />
            </div>

            {/* Parameter 4: Grants & Institutional Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[13px]">
                <label className="font-semibold text-[#34251F]">
                  4. Sponsored Research Grants & Institutional Leadership (Weight: 25%)
                </label>
                <span className="font-bold text-[#654638]">{grantScore} / 10.0</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={grantScore}
                onChange={(e) => setGrantScore(parseFloat(e.target.value))}
                className="w-full accent-[#654638]"
              />
            </div>

            {/* Recommendation Decision */}
            <div className="space-y-2 pt-2 border-t border-[#E8E0D8]">
              <label className="font-semibold text-[#34251F] block text-[13px]">
                Committee Recommendation Decision
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setRecommendation('Strongly Recommend')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    recommendation === 'Strongly Recommend'
                      ? 'border-[#287A55] bg-[#287A55]/10 text-[#287A55] font-bold shadow-xs'
                      : 'border-[#E8E0D8] text-[#766B64] hover:bg-[#F8F6F2]'
                  }`}
                >
                  Strongly Recommend
                </button>
                <button
                  type="button"
                  onClick={() => setRecommendation('Recommend')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    recommendation === 'Recommend'
                      ? 'border-[#C8A66A] bg-[#C8A66A]/10 text-[#654638] font-bold shadow-xs'
                      : 'border-[#E8E0D8] text-[#766B64] hover:bg-[#F8F6F2]'
                  }`}
                >
                  Recommend
                </button>
                <button
                  type="button"
                  onClick={() => setRecommendation('Reject')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    recommendation === 'Reject'
                      ? 'border-[#B83A3A] bg-[#B83A3A]/10 text-[#B83A3A] font-bold shadow-xs'
                      : 'border-[#E8E0D8] text-[#766B64] hover:bg-[#F8F6F2]'
                  }`}
                >
                  Do Not Recommend
                </button>
              </div>
            </div>

            {/* Committee Notes */}
            <div className="space-y-1.5">
              <label className="font-semibold text-[#34251F] block text-[13px]">
                Confidential Committee Assessment Notes & Recommendation Justification
              </label>
              <textarea
                rows={3}
                value={evalNotes}
                onChange={(e) => setEvalNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#E8E0D8] bg-[#FFFFFF] text-[13px] text-[#34251F] focus:outline-none focus:ring-1 focus:ring-[#654638]"
                placeholder="Enter key technical findings, lecture observations, and remuneration recommendation..."
                required
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E8E0D8]">
              <span className="text-[12px] text-[#766B64]">
                Digital signatory: Prof. K. N. Rao (IIT Nominee)
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[13px] hover:bg-[#4c3023] transition-colors shadow-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Submit Statutory Evaluation</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
