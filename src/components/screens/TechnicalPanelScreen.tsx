import React, { useState } from 'react';
import { CandidateRecord, INITIAL_CANDIDATES } from '../../data/mockData';

interface TechnicalPanelScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (path: string) => void;
}

export const TechnicalPanelScreen: React.FC<TechnicalPanelScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [candidates, setCandidates] = useState<CandidateRecord[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRecord>(INITIAL_CANDIDATES[1]); // Dr. Suniti Mukherjee

  // Technical assessment state
  const [codingScore, setCodingScore] = useState<number>(9.4);
  const [archScore, setArchScore] = useState<number>(9.2);
  const [labPedagogyScore, setLabPedagogyScore] = useState<number>(8.9);
  const [mathScore, setMathScore] = useState<number>(9.5);
  const [recommendation, setRecommendation] = useState<'Clear' | 'Conditional' | 'Reject'>('Clear');
  const [comments, setComments] = useState<string>(
    'Demonstrated deep mastery of Transformer attention mechanisms, CUDA kernel optimizations, and PyTorch internals. Successfully wrote live distributed tensor training pipeline in 25 minutes.'
  );

  const avgTechScore = ((codingScore + archScore + labPedagogyScore + mathScore) / 4).toFixed(1);

  const handleSaveAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast(`Technical assessment saved for ${selectedCandidate.name}. Average Tech Score: ${avgTechScore}/10 (${recommendation})`);
  };

  return (
    <div className="flex flex-col gap-6 w-full font-body text-[13px] text-[#34251F]">
      {/* Header */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[12px] font-bold uppercase tracking-wider text-[#C8A66A]">
            Technical Evaluation Panel
          </div>
          <h1 className="font-headline font-bold text-2xl text-[#34251F] mt-0.5">
            Subject Domain & Coding / Lab Assessment
          </h1>
          <p className="text-[13px] text-[#766B64] mt-1">
            Lead Evaluator: <strong>Dr. S. Mukherjee</strong> • Faculty Evaluation Board
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#654638]/10 text-[#654638] font-bold text-[12px]">
            Academic Year: 2024–2025 (Odd Semester)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Candidate Queue */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E0D8] shadow-sm">
            <h2 className="font-headline font-bold text-base text-[#34251F] mb-1">
              Assigned for Technical Interview
            </h2>
            <p className="text-[12px] text-[#766B64] mb-3">
              Candidates queued for coding, lab exercises and subject interviews
            </p>

            <div className="space-y-3">
              {candidates.map((c) => {
                const isSelected = selectedCandidate.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCandidate(c)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#F8F6F2] border-[#654638] shadow-sm'
                        : 'bg-[#FFFFFF] border-[#E8E0D8] hover:bg-[#F8F6F2]/60'
                    }`}
                  >
                    <div className="font-headline font-bold text-sm text-[#34251F]">{c.name}</div>
                    <div className="text-[12px] text-[#654638] font-medium mt-0.5">{c.appliedRole}</div>
                    <div className="text-[11px] text-[#766B64] mt-0.5">{c.department}</div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-[#766B64] pt-2 border-t border-[#E8E0D8]">
                      <span>Interview: {c.interviewDate || 'Scheduled'}</span>
                      <span className="font-bold text-[#287A55]">RCS: {c.rcsScore}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Assessment Workspace */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E0D8]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8A66A]">
                  Candidate Under Review
                </span>
                <h2 className="font-headline font-bold text-2xl text-[#34251F] mt-0.5">
                  {selectedCandidate.name}
                </h2>
                <p className="text-[13px] text-[#766B64]">
                  {selectedCandidate.highestDegree} • {selectedCandidate.university}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-[#766B64] uppercase block">Overall Tech Rating</span>
                <span className="font-headline font-bold text-2xl text-[#287A55]">{avgTechScore} / 10.0</span>
              </div>
            </div>

            <form onSubmit={handleSaveAssessment} className="space-y-5">
              {/* Metric 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[13px]">
                  <label className="font-semibold text-[#34251F]">1. Hands-on Coding / Algorithm Implementation</label>
                  <span className="font-bold text-[#654638]">{codingScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={codingScore}
                  onChange={(e) => setCodingScore(parseFloat(e.target.value))}
                  className="w-full accent-[#654638]"
                />
              </div>

              {/* Metric 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[13px]">
                  <label className="font-semibold text-[#34251F]">2. System Architecture & Lab Equipment Competence</label>
                  <span className="font-bold text-[#654638]">{archScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={archScore}
                  onChange={(e) => setArchScore(parseFloat(e.target.value))}
                  className="w-full accent-[#654638]"
                />
              </div>

              {/* Metric 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[13px]">
                  <label className="font-semibold text-[#34251F]">3. Practical Lab Experiment Instruction Pedagogy</label>
                  <span className="font-bold text-[#654638]">{labPedagogyScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={labPedagogyScore}
                  onChange={(e) => setLabPedagogyScore(parseFloat(e.target.value))}
                  className="w-full accent-[#654638]"
                />
              </div>

              {/* Metric 4 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[13px]">
                  <label className="font-semibold text-[#34251F]">4. Mathematical & Theoretical Rigor</label>
                  <span className="font-bold text-[#654638]">{mathScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={mathScore}
                  onChange={(e) => setMathScore(parseFloat(e.target.value))}
                  className="w-full accent-[#654638]"
                />
              </div>

              {/* Clearance Decision */}
              <div className="space-y-2 pt-2 border-t border-[#E8E0D8]">
                <label className="font-semibold text-[#34251F] block text-[13px]">
                  Technical Clearance Recommendation
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setRecommendation('Clear')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      recommendation === 'Clear'
                        ? 'border-[#287A55] bg-[#287A55]/10 text-[#287A55] font-bold'
                        : 'border-[#E8E0D8] text-[#766B64] hover:bg-[#F8F6F2]'
                    }`}
                  >
                    Clear for Selection Board
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecommendation('Conditional')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      recommendation === 'Conditional'
                        ? 'border-[#C8A66A] bg-[#C8A66A]/10 text-[#654638] font-bold'
                        : 'border-[#E8E0D8] text-[#766B64] hover:bg-[#F8F6F2]'
                    }`}
                  >
                    Conditional Clearance
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecommendation('Reject')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      recommendation === 'Reject'
                        ? 'border-[#B83A3A] bg-[#B83A3A]/10 text-[#B83A3A] font-bold'
                        : 'border-[#E8E0D8] text-[#766B64] hover:bg-[#F8F6F2]'
                    }`}
                  >
                    Technical Veto / Decline
                  </button>
                </div>
              </div>

              {/* Remarks */}
              <div className="space-y-1.5">
                <label className="font-semibold text-[#34251F] block text-[13px]">
                  Technical Observations & Demonstration Feedback
                </label>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E8E0D8] bg-[#FFFFFF] text-[13px] text-[#34251F] focus:outline-none focus:ring-1 focus:ring-[#654638]"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#E8E0D8]">
                <span className="text-[12px] text-[#766B64]">
                  Panel Expert: Dr. S. Mukherjee
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[13px] hover:bg-[#4c3023] transition-colors shadow-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Save Technical Evaluation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
