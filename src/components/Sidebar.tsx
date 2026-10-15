import React from 'react';
import { UserRole, USER_ROLES_INFO } from '../data/mockData';

interface SidebarProps {
  currentPath: string;
  currentRole: UserRole;
  onNavigate: (path: string) => void;
  onRoleChange: (role: UserRole) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: string;
  badge?: string;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  currentRole,
  onNavigate,
  onRoleChange,
  isOpen,
  onToggle
}) => {
  const currentRoleInfo = USER_ROLES_INFO[currentRole] || USER_ROLES_INFO.dean;

  // Role-specific navigation menus
  const getNavSections = (): NavSection[] => {
    switch (currentRole) {
      case 'hod':
        return [
          {
            section: 'HOD Planning',
            items: [
              { path: 'hod-dashboard', label: 'Department Overview', icon: 'dashboard' },
              { path: 'hod-create', label: 'Create Manpower Request', icon: 'add_circle' },
              { path: 'hod-requisitions', label: 'My Requisitions', icon: 'assignment', badge: '3' },
              { path: 'hod-workload', label: 'Course Deficit & Load', icon: 'bar_chart' }
            ]
          },
          {
            section: 'Department Assets',
            items: [
              { path: 'faculty-workforce', label: 'Faculty Directory', icon: 'groups' }
            ]
          }
        ];

      case 'dean':
        return [
          {
            section: 'Deanery Command',
            items: [
              { path: 'overview-command', label: 'School Staffing Cockpit', icon: 'space_dashboard' },
              { path: 'dean-reviews', label: 'Pending Reviews', icon: 'fact_check', badge: '4' },
              { path: 'workforce-requisitions', label: 'Teaching Load Deficits', icon: 'calculate' }
            ]
          },
          {
            section: 'Workforce & Cadre',
            items: [
              { path: 'faculty-workforce', label: 'Faculty Directory', icon: 'groups' },
              { path: 'cadre-budget', label: 'Cadre & Budgeting', icon: 'account_balance_wallet' },
              { path: 'docket-approvals', label: 'Executive Dockets', icon: 'rule', badge: '8' }
            ]
          },
          {
            section: 'Accreditation',
            items: [
              { path: 'accreditation-ledgers', label: 'NAAC & NIRF Records', icon: 'verified' }
            ]
          }
        ];

      case 'assoc_dean':
        return [
          {
            section: 'Academic Affairs',
            items: [
              { path: 'assoc-dashboard', label: 'Academic Affairs Cockpit', icon: 'school' },
              { path: 'assoc-reviews', label: 'Curriculum & Deficit Reviews', icon: 'rate_review', badge: '3' },
              { path: 'hod-workload', label: 'Course Load Matrix', icon: 'table_chart' },
              { path: 'accreditation-ledgers', label: 'Accreditation Audit', icon: 'verified' }
            ]
          }
        ];

      case 'head_hr':
        return [
          {
            section: 'HR Command',
            items: [
              { path: 'applicant-pipeline', label: 'Recruitment Command', icon: 'recent_actors' },
              { path: 'hr-vetting', label: 'Cadre Quota Vetting', icon: 'verified_user', badge: '2' },
              { path: 'hr-offers', label: 'Offers & LOI Issuance', icon: 'mark_email_read' },
              { path: 'hr-joining', label: 'Induction & Joining', icon: 'badge' }
            ]
          },
          {
            section: 'Evaluation & Analytics',
            items: [
              { path: 'merit-matrices', label: 'Merit & Scrutiny Engine', icon: 'analytics' },
              { path: 'cadre-budget', label: 'Cadre Roster Budget', icon: 'account_balance_wallet' },
              { path: 'faculty-workforce', label: 'Faculty Directory', icon: 'groups' }
            ]
          }
        ];

      case 'hr_team':
        return [
          {
            section: 'Talent Acquisition',
            items: [
              { path: 'hr-screening', label: 'Candidate Screening', icon: 'person_search', badge: '14' },
              { path: 'hr-interviews', label: 'Schedule & Coordinate', icon: 'calendar_month' },
              { path: 'hr-candidates', label: 'Candidate Dossiers', icon: 'folder_shared' },
              { path: 'hr-joining', label: 'Document Verification', icon: 'checklist' }
            ]
          },
          {
            section: 'Job Requisitions',
            items: [
              { path: 'applicant-pipeline', label: 'All Open Requisitions', icon: 'work' }
            ]
          }
        ];

      case 'prochancellor':
        return [
          {
            section: 'Governing Authority',
            items: [
              { path: 'docket-approvals', label: 'Executive Dockets', icon: 'policy', badge: '4' },
              { path: 'management-approvals', label: 'Management Resolutions', icon: 'gavel' },
              { path: 'overview-command', label: 'University Sanction Overview', icon: 'domain' }
            ]
          },
          {
            section: 'Statutory Governance',
            items: [
              { path: 'cadre-budget', label: 'Cadre Fiscal Envelope', icon: 'account_balance' },
              { path: 'accreditation-ledgers', label: 'Statutory Audit Ledgers', icon: 'history_edu' }
            ]
          }
        ];

      case 'management':
        return [
          {
            section: 'Board Oversight',
            items: [
              { path: 'management-approvals', label: 'Executive Manpower Approvals', icon: 'account_balance', badge: '3' },
              { path: 'cadre-budget', label: 'Cadre & Fiscal Outlay', icon: 'payments' },
              { path: 'overview-command', label: 'School Allocation Cockpit', icon: 'analytics' }
            ]
          }
        ];

      case 'selection_comm':
        return [
          {
            section: 'Selection Committee',
            items: [
              { path: 'selection-quorum', label: 'Candidate Hearing Quorum', icon: 'event_seat', badge: '3' },
              { path: 'merit-matrices', label: 'UGC Scrutiny Scores', icon: 'fact_check' }
            ]
          }
        ];

      case 'technical_panel':
        return [
          {
            section: 'Technical Panel',
            items: [
              { path: 'technical-rubric', label: 'Coding & Lab Rubric', icon: 'terminal', badge: '2' },
              { path: 'merit-matrices', label: 'Technical Credentials', icon: 'code' }
            ]
          }
        ];

      case 'sys_admin':
        return [
          {
            section: 'System Administration',
            items: [
              { path: 'system-configuration', label: 'User Accounts & Roles', icon: 'manage_accounts' },
              { path: 'system-depts', label: 'Departments & Sanctions', icon: 'domain' },
              { path: 'system-slas', label: 'Approval SLAs & Workflows', icon: 'rule' },
              { path: 'accreditation-ledgers', label: 'Immutable Audit Logs', icon: 'history_edu' }
            ]
          }
        ];

      default:
        return [
          {
            section: 'Core Management',
            items: [
              { path: 'overview-command', label: 'Overview & Command', icon: 'space_dashboard' },
              { path: 'faculty-workforce', label: 'Faculty Directory', icon: 'groups' }
            ]
          }
        ];
    }
  };

  const navSections = getNavSections();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#211A15]/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-[#FFFFFF] shadow-[0_1px_8px_rgba(101,70,56,0.06)] z-50 flex flex-col justify-between overflow-y-auto border-r border-[#E8E0D8] transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo Brand Header */}
          <div className="h-16 px-4 flex items-center justify-between bg-[#F8F6F2] border-b border-[#E8E0D8]">
            <button
              onClick={() => onNavigate(currentRole === 'hod' ? 'hod-dashboard' : 'overview-command')}
              className="flex items-center gap-2.5 text-left hover:opacity-90 transition-opacity"
            >
              <div className="w-9 h-9 rounded-xl bg-[#654638] flex items-center justify-center text-[#FFFFFF] font-bold text-lg font-headline shadow-xs">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-headline font-bold text-[14px] leading-tight text-[#34251F]">
                  CollegePortal
                </span>
                <span className="text-[10px] text-[#766B64] font-medium tracking-wide">
                  The Neotia University
                </span>
              </div>
            </button>
            <span className="px-2 py-0.5 rounded-full bg-[#C8A66A]/20 text-[#654638] text-[9px] font-bold">
              ERP 2.4
            </span>
          </div>

          {/* Active Role Indicator Card */}
          <div className="p-3 mx-3 my-3 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8]">
            <div className="flex items-center gap-2.5">
              <img
                src={currentRoleInfo.avatar}
                alt={currentRoleInfo.name}
                className="w-9 h-9 rounded-lg object-cover border border-[#E8E0D8] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-[#654638] uppercase tracking-wider">
                  {currentRoleInfo.title}
                </div>
                <div className="font-headline font-bold text-[13px] text-[#34251F] truncate">
                  {currentRoleInfo.name}
                </div>
              </div>
            </div>
          </div>

          {/* Role Navigation Items */}
          <nav className="px-3 space-y-4">
            {navSections.map((sec, idx) => (
              <div key={idx} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#766B64]">
                  {sec.section}
                </div>
                <div className="space-y-0.5">
                  {sec.items.map((item) => {
                    const isActive = currentPath === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          onNavigate(item.path);
                          if (window.innerWidth < 1024) onToggle();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                          isActive
                            ? 'bg-[#654638] text-[#FFFFFF] font-bold shadow-xs'
                            : 'text-[#34251F] hover:bg-[#F8F6F2] hover:text-[#654638]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`material-symbols-outlined text-[18px] ${
                              isActive ? 'text-[#FFFFFF]' : 'text-[#766B64]'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                              isActive
                                ? 'bg-[#FFFFFF] text-[#654638]'
                                : 'bg-[#C8A66A]/20 text-[#654638]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Role Quick Switcher */}
        <div className="p-3 border-t border-[#E8E0D8] space-y-2 bg-[#FFFFFF]">
          {/* Quick Role Perspective Switcher Pill */}
          <div className="p-2 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#766B64] mb-1.5">
              Quick Role Switch:
            </div>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <button
                onClick={() => onRoleChange('hod')}
                className={`p-1.5 rounded-lg text-left truncate transition-colors ${
                  currentRole === 'hod' ? 'bg-[#654638] text-[#FFFFFF] font-bold' : 'hover:bg-[#E8E0D8] text-[#34251F]'
                }`}
              >
                HOD (CSE)
              </button>
              <button
                onClick={() => onRoleChange('dean')}
                className={`p-1.5 rounded-lg text-left truncate transition-colors ${
                  currentRole === 'dean' ? 'bg-[#654638] text-[#FFFFFF] font-bold' : 'hover:bg-[#E8E0D8] text-[#34251F]'
                }`}
              >
                Dean (SET)
              </button>
              <button
                onClick={() => onRoleChange('head_hr')}
                className={`p-1.5 rounded-lg text-left truncate transition-colors ${
                  currentRole === 'head_hr' ? 'bg-[#654638] text-[#FFFFFF] font-bold' : 'hover:bg-[#E8E0D8] text-[#34251F]'
                }`}
              >
                Head HR
              </button>
              <button
                onClick={() => onRoleChange('prochancellor')}
                className={`p-1.5 rounded-lg text-left truncate transition-colors ${
                  currentRole === 'prochancellor' ? 'bg-[#654638] text-[#FFFFFF] font-bold' : 'hover:bg-[#E8E0D8] text-[#34251F]'
                }`}
              >
                Pro-Chancellor
              </button>
              <button
                onClick={() => onRoleChange('selection_comm')}
                className={`p-1.5 rounded-lg text-left truncate transition-colors ${
                  currentRole === 'selection_comm' ? 'bg-[#654638] text-[#FFFFFF] font-bold' : 'hover:bg-[#E8E0D8] text-[#34251F]'
                }`}
              >
                Selection Board
              </button>
              <button
                onClick={() => onRoleChange('sys_admin')}
                className={`p-1.5 rounded-lg text-left truncate transition-colors ${
                  currentRole === 'sys_admin' ? 'bg-[#654638] text-[#FFFFFF] font-bold' : 'hover:bg-[#E8E0D8] text-[#34251F]'
                }`}
              >
                Admin & Audit
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
