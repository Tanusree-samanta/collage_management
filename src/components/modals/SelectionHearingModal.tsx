import React from 'react';

interface SelectionHearingModalProps {
  panelName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SelectionHearingModal: React.FC<SelectionHearingModalProps> = ({
  panelName,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const isCse = panelName.toLowerCase().includes('cyber') || panelName.toLowerCase().includes('cse');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211a15]/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#ffffff] shadow-2xl overflow-hidden border border-[#e8e0d8] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#fff1e9]/80 border-b border-[#e8e0d8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#755a26] text-[#ffffff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">event_seat</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline text-lg font-bold text-[#4c3023]">
                  {isCse ? 'CSE / Cybersecurity Panel' : 'Robotics & Mechatronics Panel'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdea7] text-[#271900] text-[10px] font-bold">
                  CONFIDENTIAL
                </span>
              </div>
              <p className="text-[12px] text-[#504440]">
                {isCse ? 'March 14, 2025 • 10:30 AM • Senate Room 204' : 'March 19, 2025 • 02:00 PM • Video Conf Room B'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#82746f] hover:bg-[#f4e5dc] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 font-body text-[13px]">
          <div className="p-3.5 rounded-xl bg-[#faebe2] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#82746f] uppercase">Board Chairperson</span>
              <div className="font-bold text-[#4c3023] font-headline">Prof. S. Mukhopadhyay (Dean)</div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#82746f] uppercase">Visitor / Ext. Expert</span>
              <div className="font-bold text-[#755a26] font-headline">IIT Kharagpur Nominee</div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#82746f] uppercase">Quorum State</span>
              <div className="font-bold text-[#287a55]">Confirmed (5/5)</div>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-[#4c3023] text-[14px] mb-2">
              Shortlisted Candidates Scheduled for Statutory Interview
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-[#e8e0d8] flex items-center justify-between hover:bg-[#fff8f5] transition-colors">
                <div>
                  <div className="font-bold text-[#211a15]">1. Dr. Aravind Swaminathan</div>
                  <div className="text-[12px] text-[#82746f]">PhD (IISc) • Former Chief Scientist, C-DAC Pune • RCS Score: 96.5</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#faebe2] text-[#755a26] text-[11px] font-bold">10:30 AM</span>
              </div>
              <div className="p-3 rounded-xl border border-[#e8e0d8] flex items-center justify-between hover:bg-[#fff8f5] transition-colors">
                <div>
                  <div className="font-bold text-[#211a15]">2. Dr. Suniti Mukherjee</div>
                  <div className="text-[12px] text-[#82746f]">PhD (IIT Delhi) • Postdoc Carnegie Mellon • RCS Score: 92.0</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#faebe2] text-[#755a26] text-[11px] font-bold">11:15 AM</span>
              </div>
              <div className="p-3 rounded-xl border border-[#e8e0d8] flex items-center justify-between hover:bg-[#fff8f5] transition-colors">
                <div>
                  <div className="font-bold text-[#211a15]">3. Dr. Vikramaditya Rathore</div>
                  <div className="text-[12px] text-[#82746f]">PhD (IIEST) • Principal Scientist DRDO Lab • RCS Score: 89.5</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#faebe2] text-[#755a26] text-[11px] font-bold">12:00 PM</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#fff1e9] border border-[#e8e0d8] text-[12px] text-[#504440] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#755a26] text-[20px]">lock</span>
            <span>All interview scoring sheets are digitally sealed and broadcast to the Chancellor's Minute Ledger.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fff1e9]/60 border-t border-[#e8e0d8] flex items-center justify-between">
          <button
            onClick={() => alert('Downloading encrypted panel dossier zip...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] border border-[#d4c3bd] text-[#4c3023] font-semibold text-[12px] hover:bg-[#faebe2]"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download Sealed Docket Package</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#4c3023] text-[#ffffff] font-bold text-[12px] hover:bg-[#654638]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
