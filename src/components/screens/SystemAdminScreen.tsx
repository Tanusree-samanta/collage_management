import React, { useState } from 'react';
import {
  SystemUser,
  SYSTEM_USERS_DATA,
  AuditLogEntry,
  INITIAL_AUDIT_LOGS,
  DEPARTMENTS_LIST,
  DepartmentSummary
} from '../../data/mockData';

interface SystemAdminScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (path: string) => void;
}

export const SystemAdminScreen: React.FC<SystemAdminScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'departments' | 'workflows' | 'audit'>('users');
  const [users, setUsers] = useState<SystemUser[]>(SYSTEM_USERS_DATA);
  const [departments, setDepartments] = useState<DepartmentSummary[]>(DEPARTMENTS_LIST);
  const [auditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // User modal & search
  const [userSearch, setUserSearch] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Department Head (HOD)');
  const [newUserDept, setNewUserDept] = useState('Computer Science & Engineering');

  // Workflow SLAs
  const [hodSla, setHodSla] = useState(48);
  const [deanSla, setDeanSla] = useState(24);
  const [hrSla, setHrSla] = useState(36);
  const [execSla, setExecSla] = useState(72);

  const handleToggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
      )
    );
    onShowToast('User account status updated.');
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    const newUser: SystemUser = {
      id: `u-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      roleKey: 'hod',
      department: newUserDept,
      status: 'Active',
      lastActive: 'Just now'
    };
    setUsers([...users, newUser]);
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
    onShowToast(`Created account for ${newUserName} (${newUserRole}).`);
  };

  const handleSaveSlas = () => {
    onShowToast('Workflow approval SLAs saved and deployed to engine.');
  };

  const filteredUsers = users.filter((u) => {
    const q = userSearch.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-6 w-full font-body text-[13px] text-[#34251F]">
      {/* Header */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[12px] font-bold uppercase tracking-wider text-[#C8A66A]">
            Campus Administration & Governance
          </div>
          <h1 className="font-headline font-bold text-2xl text-[#34251F] mt-0.5">
            System Administration & Policy Configuration
          </h1>
          <p className="text-[13px] text-[#766B64] mt-1">
            Manage user authorization, department structure, workflow escalation triggers, and statutory audit ledgers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#654638]/10 text-[#654638] font-bold text-[12px]">
            ERP Core v2.4.0 • Academic Year 2024–25
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-[#FFFFFF] rounded-2xl border border-[#E8E0D8] shadow-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-[#654638] text-[#FFFFFF] shadow-sm'
              : 'text-[#766B64] hover:bg-[#F8F6F2]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">manage_accounts</span>
          <span>User Accounts & Permissions ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('departments')}
          className={`px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
            activeTab === 'departments'
              ? 'bg-[#654638] text-[#FFFFFF] shadow-sm'
              : 'text-[#766B64] hover:bg-[#F8F6F2]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">domain</span>
          <span>Departments & Sanction Caps</span>
        </button>

        <button
          onClick={() => setActiveTab('workflows')}
          className={`px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
            activeTab === 'workflows'
              ? 'bg-[#654638] text-[#FFFFFF] shadow-sm'
              : 'text-[#766B64] hover:bg-[#F8F6F2]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">rule</span>
          <span>Workflow & SLA Calibration</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-[#654638] text-[#FFFFFF] shadow-sm'
              : 'text-[#766B64] hover:bg-[#F8F6F2]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">history_edu</span>
          <span>Immutable Audit Logs</span>
        </button>
      </div>

      {/* Tab 1: Users */}
      {activeTab === 'users' && (
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E0D8]">
            <div className="relative flex-1 max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#766B64] text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search staff, email, role, or department..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl border border-[#E8E0D8] bg-[#F8F6F2] text-[12px] focus:outline-none focus:ring-1 focus:ring-[#654638]"
              />
            </div>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[12px] hover:bg-[#4c3023] transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>+ Provision User Account</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E8E0D8]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F6F2] text-[11px] font-bold text-[#766B64] uppercase tracking-wider">
                  <th className="p-3">Staff Member</th>
                  <th className="p-3">Role Designation</th>
                  <th className="p-3">Department / Directorate</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3">Last Active</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D8] text-[12px]">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F8F6F2]/50 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-[#34251F]">{u.name}</div>
                      <div className="text-[11px] text-[#766B64] font-mono">{u.email}</div>
                    </td>
                    <td className="p-3 font-semibold text-[#654638]">{u.role}</td>
                    <td className="p-3 text-[#766B64]">{u.department}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.status === 'Active'
                            ? 'bg-[#287A55]/10 text-[#287A55]'
                            : 'bg-[#B83A3A]/10 text-[#B83A3A]'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 text-[#766B64]">{u.lastActive}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleToggleUserStatus(u.id)}
                        className="px-2.5 py-1 rounded-lg border border-[#E8E0D8] text-[11px] font-semibold text-[#34251F] hover:bg-[#F8F6F2]"
                      >
                        {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Departments */}
      {activeTab === 'departments' && (
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D8]">
            <div>
              <h2 className="font-headline font-bold text-base text-[#34251F]">
                University Departments & Statutory Sanction Allocations
              </h2>
              <p className="text-[12px] text-[#766B64]">
                Configure sanctioned faculty positions and SFR thresholds under AICTE guidelines
              </p>
            </div>
            <button
              onClick={() => onShowToast('Department structure editor opened.')}
              className="px-4 py-2 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[12px] hover:bg-[#4c3023]"
            >
              + Add Department
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E8E0D8]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F6F2] text-[11px] font-bold text-[#766B64] uppercase tracking-wider">
                  <th className="p-3">Department Name</th>
                  <th className="p-3">Head of Department</th>
                  <th className="p-3 text-center">Sanctioned</th>
                  <th className="p-3 text-center">In Position</th>
                  <th className="p-3 text-center">Vacancies</th>
                  <th className="p-3 text-center">SFR Ratio</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D8] text-[12px]">
                {departments.map((d) => (
                  <tr key={d.code} className="hover:bg-[#F8F6F2]/50">
                    <td className="p-3">
                      <div className="font-bold text-[#34251F]">{d.name}</div>
                      <span className="text-[10px] font-mono text-[#766B64]">Code: {d.code}</span>
                    </td>
                    <td className="p-3 text-[#34251F]">{d.head}</td>
                    <td className="p-3 text-center font-bold text-[#34251F]">{d.sanctioned}</td>
                    <td className="p-3 text-center text-[#766B64]">{d.inPosition}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-[#B83A3A]/10 text-[#B83A3A] font-bold text-[11px]">
                        {d.vacancies}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-[#654638]">{d.sfrRatio}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onShowToast(`Edited quota for ${d.name}`)}
                        className="px-2.5 py-1 rounded-lg border border-[#E8E0D8] text-[11px] font-semibold text-[#654638] hover:bg-[#F8F6F2]"
                      >
                        Edit Quota
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Workflows */}
      {activeTab === 'workflows' && (
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-6">
          <div className="pb-3 border-b border-[#E8E0D8]">
            <h2 className="font-headline font-bold text-base text-[#34251F]">
              Approval Workflow Escalation & SLA Windows
            </h2>
            <p className="text-[12px] text-[#766B64]">
              Define statutory time limits for each review gate before triggering an executive reminder
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] space-y-2">
              <label className="font-bold text-[#34251F] block">
                1. Department Head (HOD) Draft to Submission Window
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={hodSla}
                  onChange={(e) => setHodSla(parseInt(e.target.value) || 0)}
                  className="w-24 p-2 rounded-lg border border-[#E8E0D8] bg-[#FFFFFF] font-bold text-center"
                />
                <span className="text-[#766B64]">Hours</span>
              </div>
              <p className="text-[11px] text-[#766B64]">Allowed time for HOD to attach teaching load statements.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] space-y-2">
              <label className="font-bold text-[#34251F] block">
                2. Dean of School Endorsement SLA
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={deanSla}
                  onChange={(e) => setDeanSla(parseInt(e.target.value) || 0)}
                  className="w-24 p-2 rounded-lg border border-[#E8E0D8] bg-[#FFFFFF] font-bold text-center"
                />
                <span className="text-[#766B64]">Hours</span>
              </div>
              <p className="text-[11px] text-[#766B64]">Deanery review of student-faculty ratio & curriculum impact.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] space-y-2">
              <label className="font-bold text-[#34251F] block">
                3. Head HR Cadre Roster Vetting SLA
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={hrSla}
                  onChange={(e) => setHrSla(parseInt(e.target.value) || 0)}
                  className="w-24 p-2 rounded-lg border border-[#E8E0D8] bg-[#FFFFFF] font-bold text-center"
                />
                <span className="text-[#766B64]">Hours</span>
              </div>
              <p className="text-[11px] text-[#766B64]">HR check against UGC roster points and reservation norms.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] space-y-2">
              <label className="font-bold text-[#34251F] block">
                4. Pro-Chancellor Executive Docket Seal SLA
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={execSla}
                  onChange={(e) => setExecSla(parseInt(e.target.value) || 0)}
                  className="w-24 p-2 rounded-lg border border-[#E8E0D8] bg-[#FFFFFF] font-bold text-center"
                />
                <span className="text-[#766B64]">Hours</span>
              </div>
              <p className="text-[11px] text-[#766B64]">Executive chamber resolution and dispatch of formal letters.</p>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-[#E8E0D8]">
            <button
              onClick={handleSaveSlas}
              className="px-6 py-2.5 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[12px] hover:bg-[#4c3023] shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Deploy Updated SLA Rules</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Audit */}
      {activeTab === 'audit' && (
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E0D8] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D8]">
            <div>
              <h2 className="font-headline font-bold text-base text-[#34251F]">
                Immutable Statutory Audit Trail
              </h2>
              <p className="text-[12px] text-[#766B64]">
                Cryptographically logged records of approvals, salary decisions, and cadre movements
              </p>
            </div>
            <button
              onClick={() => onShowToast('Exported complete Audit Ledger to PDF.')}
              className="px-3.5 py-1.5 rounded-xl border border-[#E8E0D8] text-[12px] font-bold text-[#654638] hover:bg-[#F8F6F2]"
            >
              Export Audit Trail
            </button>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] flex flex-col md:flex-row md:items-center justify-between gap-3 text-[12px]"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#34251F]">{log.action}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FFFFFF] border border-[#E8E0D8] text-[#654638]">
                      {log.target}
                    </span>
                  </div>
                  <p className="text-[#766B64] mt-0.5">{log.notes}</p>
                  <div className="text-[11px] text-[#766B64] mt-1">
                    Actor: <strong className="text-[#34251F]">{log.user}</strong> ({log.role})
                  </div>
                </div>
                <div className="font-mono text-[11px] text-[#766B64] shrink-0">{log.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211a15]/40 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-[#FFFFFF] p-6 border border-[#E8E0D8] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E0D8]">
              <h3 className="font-headline font-bold text-lg text-[#34251F]">
                Provision New User Account
              </h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-[#766B64] hover:text-[#34251F]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3">
              <div>
                <label className="text-[12px] font-bold text-[#34251F] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Kavita Singhania"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0D8] text-[13px]"
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#34251F] block mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. k.singhania@tnu.in"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0D8] text-[13px]"
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#34251F] block mb-1">Role Permission</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0D8] text-[13px] bg-[#FFFFFF]"
                >
                  <option value="Department Head (HOD)">Department Head (HOD)</option>
                  <option value="Dean of School">Dean of School</option>
                  <option value="Associate Dean (Academics)">Associate Dean (Academics)</option>
                  <option value="Head HR & Workforce">Head HR & Workforce</option>
                  <option value="HR Talent Acquisition">HR Talent Acquisition</option>
                  <option value="Selection Committee Chair">Selection Committee Chair</option>
                  <option value="Technical Panel Expert">Technical Panel Expert</option>
                  <option value="System Administrator">System Administrator</option>
                </select>
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#34251F] block mb-1">Department</label>
                <select
                  value={newUserDept}
                  onChange={(e) => setNewUserDept(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0D8] text-[13px] bg-[#FFFFFF]"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Robotics & Artificial Intelligence">Robotics & Artificial Intelligence</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Central HR Directorate">Central HR Directorate</option>
                  <option value="Deanery of Engineering">Deanery of Engineering</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E0D8]">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#E8E0D8] text-[#766B64] text-[12px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[12px] hover:bg-[#4c3023]"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
