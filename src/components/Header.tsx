import React, { useState } from 'react';
import { UserRole, USER_ROLES_INFO } from '../data/mockData';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onToggleSidebar: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onToggleSidebar,
  onOpenNotifications,
  unreadCount = 4
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentRoleInfo = USER_ROLES_INFO[currentRole] || USER_ROLES_INFO.dean;

  const roleList: UserRole[] = [
    'hod',
    'dean',
    'assoc_dean',
    'head_hr',
    'hr_team',
    'prochancellor',
    'management',
    'selection_comm',
    'technical_panel',
    'sys_admin'
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#FFF8F5]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(101,70,56,0.05)] z-40 flex items-center justify-between px-4 lg:px-6 gap-3 border-b border-[#E8E0D8]">
      {/* Left zone: Mobile toggle + Logo + Breadcrumbs + Search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[#504440] hover:bg-[#F4E5DC] transition-colors"
          type="button"
          aria-label="Open navigation menu"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        <img
          alt="The Neotia University CollegePortal Logo"
          className="h-8 w-auto object-contain shrink-0"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnDJj8b_qI1BQiZYLcUW1KFMpGtWW-E6F7X4jH2XkawauL-GNZQ5Otio5KHOkxOJpSMQnhmDanflkcaSqzEqAVS_HpUqBHBzaychroHRXLHeYr62zFdbxj18C6tpYuTBr-HMY9HiEyKZk7hc-wlIetha0SiGHerWGoA5MrlRY8yCzLupZCSkLtkfjYrFCQtpQ6zA_5OjUtCgevqmsITutRQSsEooElRzLFtZqQfij-1hCUfzlC5fIQwg"
        />

        <div className="hidden xl:flex items-center gap-1 text-[12px] text-[#766B64] font-body shrink-0">
          <span className="hover:text-[#654638] transition-colors cursor-pointer">TNU Central</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="hover:text-[#654638] transition-colors cursor-pointer">Recruitment Module</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#34251F] font-semibold">
            {currentRoleInfo.title}
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#766B64] text-[18px]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-xl bg-[#FFFFFF] text-[#34251F] text-[13px] placeholder-[#766B64] border border-[#E8E0D8] shadow-xs focus:outline-none focus:ring-1 focus:ring-[#654638]"
            placeholder="Search candidates, requisitions, faculty, codes..."
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#766B64] hover:text-[#34251F]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right zone: Role Switcher + Notifications + Profile */}
      <div className="flex items-center gap-2 relative">
        {/* Role Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8] text-[#34251F] text-[12px] font-semibold hover:bg-[#E8E0D8] transition-colors cursor-pointer"
            type="button"
          >
            <span className="w-2 h-2 rounded-full bg-[#287A55]"></span>
            <span className="hidden sm:inline">Role: <strong>{currentRoleInfo.badge}</strong></span>
            <span className="sm:hidden font-bold">{currentRoleInfo.badge}</span>
            <span className="material-symbols-outlined text-[16px] text-[#766B64]">arrow_drop_down</span>
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 max-h-[80vh] overflow-y-auto rounded-2xl bg-[#FFFFFF] shadow-2xl border border-[#E8E0D8] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#766B64] border-b border-[#E8E0D8] flex items-center justify-between">
                <span>Select User Role Experience</span>
                <span className="text-[#C8A66A]">10 Roles</span>
              </div>
              {roleList.map((r) => {
                const item = USER_ROLES_INFO[r];
                const active = currentRole === r;
                return (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 flex items-start gap-3 text-[13px] hover:bg-[#F8F6F2] transition-colors border-b border-[#E8E0D8]/40 last:border-b-0 ${
                      active ? 'bg-[#F8F6F2] font-bold text-[#654638]' : 'text-[#34251F]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#654638]/10 text-[#654638] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      {item.badge.slice(0, 3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold truncate text-[12px]">{item.title}</span>
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-[#654638] shrink-0"></span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#766B64] truncate">{item.name}</div>
                      <div className="text-[10px] text-[#766B64] line-clamp-1 mt-0.5">{item.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[#504440] hover:bg-[#F4E5DC] transition-colors"
          type="button"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#B83A3A] text-[#FFFFFF] text-[9px] font-bold flex items-center justify-center leading-none">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Mini Avatar */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#E8E0D8]">
          <img
            src={currentRoleInfo.avatar}
            alt={currentRoleInfo.name}
            className="w-8 h-8 rounded-xl object-cover border border-[#E8E0D8]"
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-[12px] font-bold text-[#34251F] leading-tight truncate max-w-[120px]">
              {currentRoleInfo.name}
            </span>
            <span className="text-[10px] text-[#766B64] leading-tight truncate max-w-[120px]">
              {currentRoleInfo.department}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
