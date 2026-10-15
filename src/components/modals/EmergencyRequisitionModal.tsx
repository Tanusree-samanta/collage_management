import React, { useState } from 'react';
import { RequisitionDocket } from '../../data/mockData';

interface EmergencyRequisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newReq: RequisitionDocket) => void;
}

export const EmergencyRequisitionModal: React.FC<EmergencyRequisitionModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [dept, setDept] = useState('Dept of CSE');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [specialization, setSpecialization] = useState('Cyber Physical Systems & Edge AI');
  const [payLevel, setPayLevel] = useState('Pay Level 11');
  const [hours, setHours] = useState('22');
  const [justification, setJustification] = useState(
    'Sudden faculty resignation and immediate surge in elective enrollments for final year B.Tech AI & Robotics cohort.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: RequisitionDocket = {
      id: `req-${Date.now()}`,
      refCode: `REQ-2025-${Math.floor(100 + Math.random() * 900)}`,
      title: `${designation} — ${specialization}`,
      school: 'School of Engineering & Technology',
      department: dept,
      initiatedBy: 'Dr. A. Banerjee (HOD)',
      receivedTime: 'Just now',
      urgency: 'critical',
      urgencyLabel: 'Emergency Cadre Fill',
      designation: designation,
      payLevel: payLevel,
      salaryRange: payLevel.includes('13') ? '₹1,39,600 - ₹2,11,300' : '₹68,900 - ₹1,17,200',
      status: 'Pending Dean Endorsement',
      slaHoursRemaining: 24,
      photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsIjDSgdxRsjX64RgPHiC1ne3uCn2DSCz4XoS1aPMBTm_Eyw3XUWmjN6wD03UhO05U5hHEggs_qdWc7C7AoD54xgWLiKoVIXZo9ganMTKpbMi50g90FZ9AWbTZAEErZ-rJFnlptId9iY2sBJrBO0ozbcsjTZeXS1TFslvXT8jNboRGvTNWJZL6WQrIK3q6EwF6ClQr5mRx6R3GmW_6-au4i9Xyh1mSgDBMVESUq-DQCvYwMcPMh2d3Hg',
      teachingLoadText: `${justification} Absorbing ${hours} weekly contact deficit hours.`,
      cadreRationale: 'Emergency statutory sanction under Section 8.4 TNU Charter.',
      hasOverload: true,
      overloadHours: parseInt(hours, 10) || 20,
      hoursOverload: parseInt(hours, 10) || 20,
      budgetAnnual: '₹14,50,000'
    };
    onSubmit(newReq);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211a15]/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#ffffff] shadow-2xl overflow-hidden border border-[#e8e0d8] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#fff1e9]/80 border-b border-[#e8e0d8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4c3023] text-[#ffdea7] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-[#4c3023]">
                Create Emergency Faculty Requisition
              </h3>
              <p className="text-[12px] text-[#504440]">
                Statutory fast-track authorization compliant with TNU Statute 8.4
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-body text-[13px]">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#211a15] mb-1">
                Department Unit <span className="text-[#ba1a1a]">*</span>
              </label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#faebe2] text-[#211a15] border border-[#d4c3bd] focus:outline-none focus:ring-1 focus:ring-[#4c3023]"
              >
                <option value="Dept of CSE">Computer Science & Engineering</option>
                <option value="Dept of RAI">Robotics & AI</option>
                <option value="Dept of Mechanical Eng">Mechanical Engineering</option>
                <option value="Dept of EEE">Electrical & Electronics</option>
                <option value="Dept of Civil Eng">Civil Engineering</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#211a15] mb-1">
                Designation Cadre <span className="text-[#ba1a1a]">*</span>
              </label>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#faebe2] text-[#211a15] border border-[#d4c3bd] focus:outline-none focus:ring-1 focus:ring-[#4c3023]"
              >
                <option value="Assistant Professor">Assistant Professor (Level 10/11)</option>
                <option value="Associate Professor">Associate Professor (Level 13A)</option>
                <option value="Professor">Professor (Level 14/14A)</option>
                <option value="Professor of Practice">Professor of Practice (Industry)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#211a15] mb-1">
              Mandated Sub-Specialization & Track <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full h-9 px-3 rounded-xl bg-[#ffffff] text-[#211a15] border border-[#d4c3bd] focus:outline-none focus:ring-1 focus:ring-[#4c3023]"
              placeholder="e.g. Distributed Cloud Systems & Microservices"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#211a15] mb-1">
                Pay Band Tier
              </label>
              <select
                value={payLevel}
                onChange={(e) => setPayLevel(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#faebe2] text-[#211a15] border border-[#d4c3bd] focus:outline-none focus:ring-1 focus:ring-[#4c3023]"
              >
                <option value="Pay Level 10">Pay Level 10 (₹57,700 - ₹98,200)</option>
                <option value="Pay Level 11">Pay Level 11 (₹68,900 - ₹1,17,200)</option>
                <option value="Pay Level 13A2">Pay Level 13A2 (₹1,39,600 - ₹2,11,300)</option>
                <option value="Pay Level 14">Pay Level 14 (₹1,44,200 - ₹2,18,200)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#211a15] mb-1">
                Deficit Workload (Hours/Wk)
              </label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#ffffff] text-[#211a15] border border-[#d4c3bd] focus:outline-none focus:ring-1 focus:ring-[#4c3023]"
                min="6"
                max="48"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#211a15] mb-1">
              Urgent Academic Justification & Evidence
            </label>
            <textarea
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              rows={3}
              className="w-full p-2.5 rounded-xl bg-[#ffffff] text-[#211a15] border border-[#d4c3bd] focus:outline-none focus:ring-1 focus:ring-[#4c3023]"
              placeholder="Detail reasons for emergency requisition..."
              required
            />
          </div>

          <div className="p-3 rounded-xl bg-[#faebe2] flex items-center gap-2 text-[11px] text-[#755a26]">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Fast-track requisition will be sent directly to Dean & CHRO with a 24-hour statutory SLA.</span>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[#504440] hover:bg-[#f4e5dc] font-semibold text-[13px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#4c3023] hover:bg-[#654638] text-[#ffffff] font-bold text-[13px] shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>Submit Emergency Requisition</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
