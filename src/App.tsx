import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewCommandScreen } from './components/screens/OverviewCommandScreen';
import { ManpowerPlanningScreen } from './components/screens/ManpowerPlanningScreen';
import { ExecutiveDocketsScreen } from './components/screens/ExecutiveDocketsScreen';
import { ApplicantPipelineScreen } from './components/screens/ApplicantPipelineScreen';
import { FacultyDirectoryScreen } from './components/screens/FacultyDirectoryScreen';
import { CadreBudgetScreen } from './components/screens/CadreBudgetScreen';
import { MeritScrutinyScreen } from './components/screens/MeritScrutinyScreen';
import { AcademicAuditsScreen } from './components/screens/AcademicAuditsScreen';
import { ERPConfigScreen } from './components/screens/ERPConfigScreen';
import { HODScreens } from './components/screens/HODScreens';
import { DeanScreens } from './components/screens/DeanScreens';
import { HRScreens } from './components/screens/HRScreens';
import { SelectionCommitteeScreen } from './components/screens/SelectionCommitteeScreen';
import { TechnicalPanelScreen } from './components/screens/TechnicalPanelScreen';
import { ManagementApprovalScreen } from './components/screens/ManagementApprovalScreen';
import { SystemAdminScreen } from './components/screens/SystemAdminScreen';
import { DepartmentDossierModal } from './components/modals/DepartmentDossierModal';
import { EmergencyRequisitionModal } from './components/modals/EmergencyRequisitionModal';
import { SelectionHearingModal } from './components/modals/SelectionHearingModal';
import {
  Department,
  RequisitionDocket,
  UserRole,
  ManpowerRequest,
  INITIAL_MANPOWER_REQUESTS
} from './data/mockData';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('overview-command');
  const [currentRole, setCurrentRole] = useState<UserRole>('dean');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Shared requests state so changes in one screen propagate to all roles
  const [requests, setRequests] = useState<ManpowerRequest[]>(INITIAL_MANPOWER_REQUESTS);

  // Modals state
  const [selectedDeptDossier, setSelectedDeptDossier] = useState<Department | null>(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);
  const [hearingPanelName, setHearingPanelName] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const handleCreateRequest = (newReq: ManpowerRequest) => {
    setRequests([newReq, ...requests]);
    showToast(`Request ${newReq.reqCode} created and sent to Dean for academic review.`);
  };

  const handleUpdateRequestStatus = (
    reqId: string,
    newStatus: ManpowerRequest['status'],
    note: string,
    nextAssignee: string
  ) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              status: newStatus,
              currentAssignee: nextAssignee,
              decisionNote: note,
              history: [
                ...r.history,
                {
                  stage: newStatus,
                  actor: currentRole === 'dean' ? 'Prof. S. Mukhopadhyay' : 'Associate Dean',
                  role: currentRole === 'dean' ? 'Dean of School' : 'Associate Dean',
                  status: 'Completed',
                  date: 'Today',
                  notes: note
                }
              ]
            }
          : r
      )
    );
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'hod') {
      setCurrentPath('hod-dashboard');
      showToast('Switched perspective to: Department Head HOD (Dr. Amitabh Banerjee)');
    } else if (role === 'dean') {
      setCurrentPath('overview-command');
      showToast('Switched perspective to: Dean of School (Prof. S. Mukhopadhyay)');
    } else if (role === 'assoc_dean') {
      setCurrentPath('assoc-dashboard');
      showToast('Switched perspective to: Associate Dean Academics (Prof. Nirmal Roy)');
    } else if (role === 'head_hr') {
      setCurrentPath('applicant-pipeline');
      showToast('Switched perspective to: Head HR & Workforce (Dr. Radhika Sharma)');
    } else if (role === 'hr_team') {
      setCurrentPath('hr-screening');
      showToast('Switched perspective to: HR Talent Acquisition (Ananya Sen)');
    } else if (role === 'prochancellor') {
      setCurrentPath('docket-approvals');
      showToast('Switched perspective to: Pro-Chancellor (Dr. H. P. Kanoria)');
    } else if (role === 'management') {
      setCurrentPath('management-approvals');
      showToast('Switched perspective to: University Management / BOG');
    } else if (role === 'selection_comm') {
      setCurrentPath('selection-quorum');
      showToast('Switched perspective to: Statutory Selection Committee');
    } else if (role === 'technical_panel') {
      setCurrentPath('technical-rubric');
      showToast('Switched perspective to: Technical Panel Expert (Dr. S. Mukherjee)');
    } else if (role === 'sys_admin') {
      setCurrentPath('system-configuration');
      showToast('Switched perspective to: System Administrator');
    }
  };

  const handleAddEmergencyRequisition = (newReq: RequisitionDocket) => {
    showToast(`Emergency requisition ${newReq.refCode} logged! Sent to Dean & CHRO.`);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F5] text-[#211A15] antialiased flex flex-col font-body selection:bg-[#C8A66A]/30 selection:text-[#34251F]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPath={currentPath}
        currentRole={currentRole}
        onNavigate={(path) => setCurrentPath(path)}
        onRoleChange={handleRoleChange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Layout Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Fixed Top Header */}
        <Header
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenNotifications={() => setNotificationsOpen(true)}
        />

        {/* Dynamic Content Viewport */}
        <main className="w-full pt-20 px-4 sm:px-6 lg:px-8 py-6 flex-1">
          {/* Role 1: HOD Screens */}
          {currentPath === 'hod-dashboard' && (
            <HODScreens
              currentView="dashboard"
              onNavigate={(v) => setCurrentPath(`hod-${v}`)}
              requests={requests}
              onCreateRequest={handleCreateRequest}
              onShowToast={showToast}
            />
          )}
          {currentPath === 'hod-create' && (
            <HODScreens
              currentView="create"
              onNavigate={(v) => setCurrentPath(`hod-${v}`)}
              requests={requests}
              onCreateRequest={handleCreateRequest}
              onShowToast={showToast}
            />
          )}
          {currentPath === 'hod-requisitions' && (
            <HODScreens
              currentView="requisitions"
              onNavigate={(v) => setCurrentPath(`hod-${v}`)}
              requests={requests}
              onCreateRequest={handleCreateRequest}
              onShowToast={showToast}
            />
          )}
          {currentPath === 'hod-workload' && (
            <HODScreens
              currentView="workload"
              onNavigate={(v) => setCurrentPath(`hod-${v}`)}
              requests={requests}
              onCreateRequest={handleCreateRequest}
              onShowToast={showToast}
            />
          )}

          {/* Role 2: Dean of School Screens */}
          {currentPath === 'overview-command' && (
            <OverviewCommandScreen
              onNavigate={(path) => setCurrentPath(path)}
              onRoleChange={(role) => handleRoleChange(role as UserRole)}
              onOpenDossier={(dept) => setSelectedDeptDossier(dept)}
              onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
              onOpenHearingModal={(panel) => setHearingPanelName(panel)}
              onShowToast={showToast}
            />
          )}
          {currentPath === 'dean-reviews' && (
            <DeanScreens
              currentView="reviews"
              onNavigate={(v) => setCurrentPath(`dean-${v}`)}
              requests={requests}
              onUpdateRequestStatus={handleUpdateRequestStatus}
              onShowToast={showToast}
            />
          )}
          {currentPath === 'dean-dashboard' && (
            <DeanScreens
              currentView="dashboard"
              onNavigate={(v) => setCurrentPath(`dean-${v}`)}
              requests={requests}
              onUpdateRequestStatus={handleUpdateRequestStatus}
              onShowToast={showToast}
            />
          )}

          {/* Role 3: Associate Dean (Academics) Screens */}
          {currentPath === 'assoc-dashboard' && (
            <DeanScreens
              currentView="dashboard"
              onNavigate={(v) => setCurrentPath(`assoc-${v}`)}
              requests={requests}
              onUpdateRequestStatus={handleUpdateRequestStatus}
              onShowToast={showToast}
              isAssocDean={true}
            />
          )}
          {currentPath === 'assoc-reviews' && (
            <DeanScreens
              currentView="reviews"
              onNavigate={(v) => setCurrentPath(`assoc-${v}`)}
              requests={requests}
              onUpdateRequestStatus={handleUpdateRequestStatus}
              onShowToast={showToast}
              isAssocDean={true}
            />
          )}

          {/* Role 4 & 5: HR Screens */}
          {currentPath === 'applicant-pipeline' && (
            <ApplicantPipelineScreen
              onNavigate={(path) => setCurrentPath(path)}
              onShowToast={showToast}
            />
          )}
          {currentPath === 'hr-vetting' && (
            <HRScreens
              currentView="vetting"
              onNavigate={(v) => setCurrentPath(`hr-${v}`)}
              requests={requests}
              onShowToast={showToast}
              isHeadHR={true}
            />
          )}
          {currentPath === 'hr-screening' && (
            <HRScreens
              currentView="screening"
              onNavigate={(v) => setCurrentPath(`hr-${v}`)}
              requests={requests}
              onShowToast={showToast}
              isHeadHR={false}
            />
          )}
          {currentPath === 'hr-interviews' && (
            <HRScreens
              currentView="interviews"
              onNavigate={(v) => setCurrentPath(`hr-${v}`)}
              requests={requests}
              onShowToast={showToast}
              isHeadHR={false}
            />
          )}
          {currentPath === 'hr-candidates' && (
            <HRScreens
              currentView="candidates"
              onNavigate={(v) => setCurrentPath(`hr-${v}`)}
              requests={requests}
              onShowToast={showToast}
              isHeadHR={false}
            />
          )}
          {currentPath === 'hr-offers' && (
            <HRScreens
              currentView="offers"
              onNavigate={(v) => setCurrentPath(`hr-${v}`)}
              requests={requests}
              onShowToast={showToast}
              isHeadHR={true}
            />
          )}
          {currentPath === 'hr-joining' && (
            <HRScreens
              currentView="joining"
              onNavigate={(v) => setCurrentPath(`hr-${v}`)}
              requests={requests}
              onShowToast={showToast}
              isHeadHR={false}
            />
          )}

          {/* Role 6: Pro-Chancellor Executive Dockets */}
          {currentPath === 'docket-approvals' && (
            <ExecutiveDocketsScreen
              onNavigate={(path) => setCurrentPath(path)}
              onShowToast={showToast}
            />
          )}

          {/* Role 7: Management Approvals */}
          {currentPath === 'management-approvals' && (
            <ManagementApprovalScreen
              onNavigate={(path) => setCurrentPath(path)}
              onShowToast={showToast}
            />
          )}

          {/* Role 8: Selection Committee */}
          {currentPath === 'selection-quorum' && (
            <SelectionCommitteeScreen
              onNavigate={(path) => setCurrentPath(path)}
              onShowToast={showToast}
            />
          )}

          {/* Role 9: Technical Panel */}
          {currentPath === 'technical-rubric' && (
            <TechnicalPanelScreen
              onNavigate={(path) => setCurrentPath(path)}
              onShowToast={showToast}
            />
          )}

          {/* Common Modules */}
          {currentPath === 'workforce-requisitions' && (
            <ManpowerPlanningScreen
              onNavigate={(path) => setCurrentPath(path)}
              onShowToast={showToast}
            />
          )}

          {currentPath === 'faculty-workforce' && (
            <FacultyDirectoryScreen
              onNavigate={(path) => setCurrentPath(path)}
              onShowToast={showToast}
            />
          )}

          {currentPath === 'cadre-budget' && (
            <CadreBudgetScreen
              onNavigate={(path) => setCurrentPath(path)}
              onShowToast={showToast}
            />
          )}

          {currentPath === 'merit-matrices' && (
            <MeritScrutinyScreen
              onNavigate={(path) => setCurrentPath(path)}
              onShowToast={showToast}
            />
          )}

          {currentPath === 'accreditation-ledgers' && (
            <AcademicAuditsScreen
              onNavigate={(path) => setCurrentPath(path)}
              onShowToast={showToast}
            />
          )}

          {/* Role 10 & 11: System Admin & Department Config */}
          {(currentPath === 'system-configuration' ||
            currentPath === 'system-depts' ||
            currentPath === 'system-slas') && (
            <SystemAdminScreen
              onNavigate={(path) => setCurrentPath(path)}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Department Dossier Inspection Modal */}
      <DepartmentDossierModal
        dept={selectedDeptDossier}
        onClose={() => setSelectedDeptDossier(null)}
      />

      {/* Emergency Requisition Modal */}
      <EmergencyRequisitionModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        onSubmit={handleAddEmergencyRequisition}
      />

      {/* Selection Board Hearing Modal */}
      <SelectionHearingModal
        panelName={hearingPanelName || ''}
        isOpen={!!hearingPanelName}
        onClose={() => setHearingPanelName(null)}
      />

      {/* Notifications Drawer */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-[#211A15]/30 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-[#FFFFFF] shadow-2xl overflow-hidden border border-[#E8E0D8] p-5 space-y-4 mt-14">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E0D8]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#654638] text-[20px]">
                  notifications
                </span>
                <h3 className="font-headline font-bold text-[#34251F]">Executive Notifications</h3>
              </div>
              <button
                onClick={() => setNotificationsOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#766B64] hover:bg-[#F8F6F2]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2.5 text-[12px]">
              <div className="p-3 rounded-xl bg-[#B83A3A]/10 border border-[#B83A3A]/20">
                <div className="flex justify-between font-bold text-[#34251F]">
                  <span>Urgent Cadre SLA Expiry</span>
                  <span className="text-[#B83A3A]">6h Left</span>
                </div>
                <p className="text-[#766B64] mt-0.5">
                  Requisition #REQ-2025-084 requires Dean Endorsement seal before statutory deadline.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F6F2] border border-[#E8E0D8]">
                <div className="flex justify-between font-bold text-[#34251F]">
                  <span>Selection Board Sitting</span>
                  <span className="text-[#654638]">Feb 28</span>
                </div>
                <p className="text-[#766B64] mt-0.5">
                  Visitor Nominee confirmed quorum for Marine Propulsion & Cyber Physical Systems.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E8E0D8]">
                <div className="flex justify-between font-bold text-[#34251F]">
                  <span>New Resumes Screened</span>
                  <span className="text-[#287A55]">+34 Today</span>
                </div>
                <p className="text-[#766B64] mt-0.5">
                  Talent acquisition pipeline updated for School of Engineering & Technology.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setNotificationsOpen(false);
                showToast('All notifications acknowledged.');
              }}
              className="w-full py-2 rounded-xl bg-[#654638] text-[#FFFFFF] font-bold text-[12px] hover:bg-[#4c3023]"
            >
              Mark All as Read
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#654638] text-[#FFFFFF] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#C8A66A]/40 animate-in slide-in-from-bottom-4 duration-200">
          <span className="material-symbols-outlined text-[#C8A66A] text-[20px] shrink-0">
            info
          </span>
          <p className="text-[13px] font-medium leading-snug flex-1">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#C8A66A] hover:text-[#FFFFFF] shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
