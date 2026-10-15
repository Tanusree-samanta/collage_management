export type UserRole =
  | 'hod'
  | 'dean'
  | 'assoc_dean'
  | 'head_hr'
  | 'hr_team'
  | 'prochancellor'
  | 'management'
  | 'selection_comm'
  | 'technical_panel'
  | 'sys_admin';

export interface RoleInfo {
  id: UserRole;
  title: string;
  name: string;
  department: string;
  avatar: string;
  badge: string;
  description: string;
}

export const USER_ROLES_INFO: Record<UserRole, RoleInfo> = {
  hod: {
    id: 'hod',
    title: 'Department Head (HOD)',
    name: 'Dr. Amitabh Banerjee',
    department: 'Dept. of Computer Science & Engineering',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsIjDSgdxRsjX64RgPHiC1ne3uCn2DSCz4XoS1aPMBTm_Eyw3XUWmjN6wD03UhO05U5hHEggs_qdWc7C7AoD54xgWLiKoVIXZo9ganMTKpbMi50g90FZ9AWbTZAEErZ-rJFnlptId9iY2sBJrBO0ozbcsjTZeXS1TFslvXT8jNboRGvTNWJZL6WQrIK3q6EwF6ClQr5mRx6R3GmW_6-au4i9Xyh1mSgDBMVESUq-DQCvYwMcPMh2d3Hg',
    badge: 'HOD CSE',
    description: 'Create manpower requests, provide workload justification, and track department hiring.'
  },
  dean: {
    id: 'dean',
    title: 'Dean of School',
    name: 'Prof. S. Mukhopadhyay',
    department: 'School of Engineering & Technology',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj2fB9Txz94CBaOoWIbgAIiKskeFcolarjBwpInqiJJkZLDJifMSHgX5ziEkOJKEKG6wz_aAPTVvYGnDBwNoNOWmxYnJjvbzBhDkurLMdnEr5X2UI6ooNTIrEa-DvGR5Tm7Qe62hAQzUOgPc2dcRtPP7Ck99T23181G1ojIBzmfnhicxBw0svsY1UBOcYxrfwrke7eJIryI0RZi8snOTN-z2nqa5CImqymGK_wgxFINEf_FnxvyAMh0Q',
    badge: 'Dean SET',
    description: 'Review school-level staffing, verify AICTE teacher ratios, and recommend approvals.'
  },
  assoc_dean: {
    id: 'assoc_dean',
    title: 'Associate Dean (Academics)',
    name: 'Prof. Nirmal Roy',
    department: 'Academic Affairs Directorate',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj2fB9Txz94CBaOoWIbgAIiKskeFcolarjBwpInqiJJkZLDJifMSHgX5ziEkOJKEKG6wz_aAPTVvYGnDBwNoNOWmxYnJjvbzBhDkurLMdnEr5X2UI6ooNTIrEa-DvGR5Tm7Qe62hAQzUOgPc2dcRtPP7Ck99T23181G1ojIBzmfnhicxBw0svsY1UBOcYxrfwrke7eJIryI0RZi8snOTN-z2nqa5CImqymGK_wgxFINEf_FnxvyAMh0Q',
    badge: 'Assoc. Dean',
    description: 'Verify curriculum credit hours, course deficit matrix, and academic council approvals.'
  },
  head_hr: {
    id: 'head_hr',
    title: 'Head HR & Workforce',
    name: 'Dr. Radhika Sharma',
    department: 'Central HR Directorate',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCulHWxiGb_JdwJaLnddA4DaKzl6L1stcmIi4j-OQ6TAnuGes_sQo-0Q-LkWayFW5muDxRwFnjhGZ41kf6_JfeFpBeS7EtXcEczDiIA_yYev6V8ntpKJ8Wraftlr9iqnIzftERxN0Hf52EgMbpb0mZpS7DFRWHBBKesUsxxYMo4T7dzgaIsmfclIHt4g5yuA3_OQGkcgi9uAbOWhtgeoboOkbYTXZZ27S1edlw_CXaS2C0dy3v8-A0p7w',
    badge: 'CHRO',
    description: 'Manage cadre quota vetting, reservation rosters, recruitment cycles, offers, and joining.'
  },
  hr_team: {
    id: 'hr_team',
    title: 'HR Talent Acquisition',
    name: 'Ananya Sen',
    department: 'Faculty Recruitment Cell',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCulHWxiGb_JdwJaLnddA4DaKzl6L1stcmIi4j-OQ6TAnuGes_sQo-0Q-LkWayFW5muDxRwFnjhGZ41kf6_JfeFpBeS7EtXcEczDiIA_yYev6V8ntpKJ8Wraftlr9iqnIzftERxN0Hf52EgMbpb0mZpS7DFRWHBBKesUsxxYMo4T7dzgaIsmfclIHt4g5yuA3_OQGkcgi9uAbOWhtgeoboOkbYTXZZ27S1edlw_CXaS2C0dy3v8-A0p7w',
    badge: 'HR Specialist',
    description: 'Screen applicant CVs, manage candidate database, schedule interviews, and track documents.'
  },
  prochancellor: {
    id: 'prochancellor',
    title: 'Pro-Chancellor',
    name: 'Dr. H. P. Kanoria',
    department: 'Governing Board Executive Chamber',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVrc1kyzo3wgrSbgEU2Xh2xkFGiKowk2_9OkQDXPQSzwnPlxVSB7lD_I6nkHJkKzDcOKBXVuOj2oKl30n1nnBNLlUjyLzht3Oc9YcPXXWCKnAvq9vUOQYkUR2zZ3RYSJ9qF6G7uv8xPzV9XXct4z9h1Jpf4DY51-IBTmasZ2Kc4UmYFUwqkTblzmStiRusWORyojfcHvXO-Zx-056yRQEs46c3U9bglEprfcA2jYgJAMnAWYShIuWTMw',
    badge: 'Executive',
    description: 'Review statutory dockets, grant final sanctioned approvals, and seal appointments.'
  },
  management: {
    id: 'management',
    title: 'University Management',
    name: 'Executive Committee',
    department: 'Board of Governors',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVrc1kyzo3wgrSbgEU2Xh2xkFGiKowk2_9OkQDXPQSzwnPlxVSB7lD_I6nkHJkKzDcOKBXVuOj2oKl30n1nnBNLlUjyLzht3Oc9YcPXXWCKnAvq9vUOQYkUR2zZ3RYSJ9qF6G7uv8xPzV9XXct4z9h1Jpf4DY51-IBTmasZ2Kc4UmYFUwqkTblzmStiRusWORyojfcHvXO-Zx-056yRQEs46c3U9bglEprfcA2jYgJAMnAWYShIuWTMw',
    badge: 'BOG',
    description: 'Review high-value fiscal allocations, new academic chairs, and special exceptions.'
  },
  selection_comm: {
    id: 'selection_comm',
    title: 'Selection Committee',
    name: 'Prof. K. N. Rao (IIT Nominee)',
    department: 'Statutory Selection Panel',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVrc1kyzo3wgrSbgEU2Xh2xkFGiKowk2_9OkQDXPQSzwnPlxVSB7lD_I6nkHJkKzDcOKBXVuOj2oKl30n1nnBNLlUjyLzht3Oc9YcPXXWCKnAvq9vUOQYkUR2zZ3RYSJ9qF6G7uv8xPzV9XXct4z9h1Jpf4DY51-IBTmasZ2Kc4UmYFUwqkTblzmStiRusWORyojfcHvXO-Zx-056yRQEs46c3U9bglEprfcA2jYgJAMnAWYShIuWTMw',
    badge: 'Selection Board',
    description: 'Evaluate faculty candidates in statutory interviews, score criteria, and submit recommendation.'
  },
  technical_panel: {
    id: 'technical_panel',
    title: 'Technical Panel',
    name: 'Dr. S. Mukherjee',
    department: 'Faculty Evaluation Board',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsIjDSgdxRsjX64RgPHiC1ne3uCn2DSCz4XoS1aPMBTm_Eyw3XUWmjN6wD03UhO05U5hHEggs_qdWc7C7AoD54xgWLiKoVIXZo9ganMTKpbMi50g90FZ9AWbTZAEErZ-rJFnlptId9iY2sBJrBO0ozbcsjTZeXS1TFslvXT8jNboRGvTNWJZL6WQrIK3q6EwF6ClQr5mRx6R3GmW_6-au4i9Xyh1mSgDBMVESUq-DQCvYwMcPMh2d3Hg',
    badge: 'Technical Expert',
    description: 'Assess technical pedagogy, domain competence, coding/lab expertise, and submit evaluation.'
  },
  sys_admin: {
    id: 'sys_admin',
    title: 'System Administrator',
    name: 'Campus IT Administration',
    department: 'ERP Systems Operations',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnDJj8b_qI1BQiZYLcUW1KFMpGtWW-E6F7X4jH2XkawauL-GNZQ5Otio5KHOkxOJpSMQnhmDanflkcaSqzEqAVS_HpUqBHBzaychroHRXLHeYr62zFdbxj18C6tpYuTBr-HMY9HiEyKZk7hc-wlIetha0SiGHerWGoA5MrlRY8yCzLupZCSkLtkfjYrFCQtpQ6zA_5OjUtCgevqmsITutRQSsEooElRzLFtZqQfij-1hCUfzlC5fIQwg',
    badge: 'Administrator',
    description: 'Manage users, permissions, department structures, academic years, and system audit logs.'
  }
};

export interface WorkflowStep {
  stage: string;
  actor: string;
  role: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  date?: string;
  notes?: string;
}

export interface ManpowerRequest {
  id: string;
  reqCode: string;
  academicYear: string;
  department: string;
  positionTitle: string;
  cadreTier: string;
  count: number;
  existingStaffing: number;
  existingVacancies: number;
  requirementType: 'New Post (Expansion)' | 'Replacement for Resignation';
  justificationReason: string;
  specialization: string;
  weeklyOverloadHours: number;
  dateSubmitted: string;
  status:
    | 'Draft'
    | 'Submitted'
    | 'Under Academic Review'
    | 'Changes Requested'
    | 'HR Vetting'
    | 'Awaiting Executive Approval'
    | 'Approved'
    | 'In Recruitment'
    | 'Offer Issued'
    | 'Joined'
    | 'Rejected';
  currentAssignee: string;
  documents: { name: string; size: string; type: string }[];
  budgetEstimatedAnnual: string;
  history: WorkflowStep[];
  decisionNote?: string;
}

export const INITIAL_MANPOWER_REQUESTS: ManpowerRequest[] = [
  {
    id: 'req-084',
    reqCode: 'REQ-2025-084',
    academicYear: '2024-2025 (Odd Semester)',
    department: 'Computer Science & Engineering',
    positionTitle: 'Associate Professor — AI & Machine Learning',
    cadreTier: 'Pay Level 13A2 (₹1,39,600 - ₹2,11,300)',
    count: 1,
    existingStaffing: 28,
    existingVacancies: 6,
    requirementType: 'New Post (Expansion)',
    justificationReason:
      'Elective specialization "Deep Neural Models & Vision" enrollments expanded to 142 students across 2 unbudgeted sections. Current CSE faculty absorbing 42 weekly surplus teaching hours.',
    specialization: 'Artificial Intelligence, Machine Learning & Computer Vision',
    weeklyOverloadHours: 42,
    dateSubmitted: 'Oct 14, 2024',
    status: 'Under Academic Review',
    currentAssignee: 'Dean of School (Prof. S. Mukhopadhyay)',
    documents: [
      { name: 'AICTE_Faculty_Load_Audit_2024-25.pdf', size: '2.4 MB', type: 'PDF' },
      { name: 'BoS_Curriculum_Expansion_Minutes.pdf', size: '1.1 MB', type: 'PDF' }
    ],
    budgetEstimatedAnnual: '₹22,40,000',
    history: [
      {
        stage: 'Request Creation',
        actor: 'Dr. Amitabh Banerjee',
        role: 'Department Head (HOD)',
        status: 'Completed',
        date: 'Oct 14, 2024 · 11:40 AM',
        notes: 'Submitted with curricular workload deficit justification and BoS resolution.'
      },
      {
        stage: 'Academic Review',
        actor: 'Prof. S. Mukhopadhyay',
        role: 'Dean of School',
        status: 'In Progress',
        notes: 'Reviewing SFR 1:16.8 compliance and deficit hours calculation.'
      },
      {
        stage: 'HR Cadre Vetting',
        actor: 'Dr. Radhika Sharma',
        role: 'Head HR',
        status: 'Pending',
        notes: 'Awaiting sanctioned roster check.'
      },
      {
        stage: 'Executive Approval',
        actor: 'Dr. H. P. Kanoria',
        role: 'Pro-Chancellor',
        status: 'Pending',
        notes: 'Awaiting final statutory seal.'
      }
    ]
  },
  {
    id: 'req-091',
    reqCode: 'REQ-2025-091',
    academicYear: '2024-2025 (Odd Semester)',
    department: 'Mechanical Engineering',
    positionTitle: 'Assistant Professor — Thermal & Fluid Dynamics',
    cadreTier: 'Pay Level 10 (₹57,700 - ₹98,200)',
    count: 1,
    existingStaffing: 30,
    existingVacancies: 2,
    requirementType: 'Replacement for Resignation',
    justificationReason:
      'Succession planning for superannuation of Prof. P. Majumdar on October 31, 2025. Laboratory leadership for "Advanced Propulsion & CFD Lab" requires an immediate sanctioned handover.',
    specialization: 'Propulsion, Aerodynamics & CFD Modeling',
    weeklyOverloadHours: 18,
    dateSubmitted: 'Oct 13, 2024',
    status: 'HR Vetting',
    currentAssignee: 'Head HR (Dr. Radhika Sharma)',
    documents: [
      { name: 'Superannuation_Notice_Prof_Majumdar.pdf', size: '0.8 MB', type: 'PDF' },
      { name: 'CFD_Lab_Operational_Roster.xlsx', size: '1.5 MB', type: 'XLSX' }
    ],
    budgetEstimatedAnnual: '₹11,80,000',
    history: [
      {
        stage: 'Request Creation',
        actor: 'Prof. K. C. Sen',
        role: 'Department Head (HOD)',
        status: 'Completed',
        date: 'Oct 13, 2024 · 02:15 PM',
        notes: 'Superannuation replacement request submitted.'
      },
      {
        stage: 'Academic Review',
        actor: 'Prof. S. Mukhopadhyay',
        role: 'Dean of School',
        status: 'Completed',
        date: 'Oct 14, 2024 · 04:30 PM',
        notes: 'Recommended with high priority for NBA laboratory accreditation.'
      },
      {
        stage: 'HR Cadre Vetting',
        actor: 'Dr. Radhika Sharma',
        role: 'Head HR',
        status: 'In Progress',
        notes: 'Checking against mechanical department sanctioned vacancy ledger.'
      }
    ]
  },
  {
    id: 'req-079',
    reqCode: 'REQ-2025-079',
    academicYear: '2024-2025 (Odd Semester)',
    department: 'Computer Science & Engineering',
    positionTitle: 'Professor & Chair of Cyber Security',
    cadreTier: 'Pay Level 14A (₹1,44,200 - ₹2,18,200)',
    count: 1,
    existingStaffing: 28,
    existingVacancies: 6,
    requirementType: 'New Post (Expansion)',
    justificationReason:
      'Launching M.Tech in Cyber Defence programme in collaboration with national cybersecurity bodies. Requires senior academic researcher with sponsored lab experience.',
    specialization: 'Cybersecurity, Cryptography & Network Defence',
    weeklyOverloadHours: 24,
    dateSubmitted: 'Oct 10, 2024',
    status: 'Awaiting Executive Approval',
    currentAssignee: 'Pro-Chancellor (Dr. H. P. Kanoria)',
    documents: [
      { name: 'MTech_Cyber_Curriculum_Approval.pdf', size: '3.1 MB', type: 'PDF' },
      { name: 'External_Grant_Sponsorship_Proof.pdf', size: '2.0 MB', type: 'PDF' }
    ],
    budgetEstimatedAnnual: '₹28,50,000',
    history: [
      {
        stage: 'Request Creation',
        actor: 'Dr. Amitabh Banerjee',
        role: 'Department Head (HOD)',
        status: 'Completed',
        date: 'Oct 10, 2024 · 10:00 AM'
      },
      {
        stage: 'Academic Review',
        actor: 'Prof. S. Mukhopadhyay',
        role: 'Dean of School',
        status: 'Completed',
        date: 'Oct 11, 2024 · 01:20 PM',
        notes: 'Critical appointment for NAAC Criterion 3 and new M.Tech programme.'
      },
      {
        stage: 'HR Cadre Vetting',
        actor: 'Dr. Radhika Sharma',
        role: 'Head HR',
        status: 'Completed',
        date: 'Oct 12, 2024 · 04:00 PM',
        notes: 'Cadre Band 14A validated against university reserve.'
      },
      {
        stage: 'Executive Approval',
        actor: 'Dr. H. P. Kanoria',
        role: 'Pro-Chancellor',
        status: 'In Progress',
        notes: 'Under executive docket review.'
      }
    ]
  },
  {
    id: 'req-065',
    reqCode: 'REQ-2025-065',
    academicYear: '2024-2025 (Odd Semester)',
    department: 'Robotics & Artificial Intelligence',
    positionTitle: 'Assistant Professor — Autonomous Systems',
    cadreTier: 'Pay Level 10 (₹57,700 - ₹98,200)',
    count: 2,
    existingStaffing: 21,
    existingVacancies: 3,
    requirementType: 'New Post (Expansion)',
    justificationReason:
      'Establishment of collaborative Industry 4.0 robotics cell with 120 enrolled B.Tech students.',
    specialization: 'Autonomous Navigation & Embedded Mechatronics',
    weeklyOverloadHours: 14,
    dateSubmitted: 'Sep 25, 2024',
    status: 'In Recruitment',
    currentAssignee: 'HR Talent Acquisition Team',
    documents: [{ name: 'Industry_Robotics_MOU.pdf', size: '1.9 MB', type: 'PDF' }],
    budgetEstimatedAnnual: '₹23,60,000',
    history: [
      { stage: 'Request Creation', actor: 'Dr. M. Ghosh', role: 'HOD', status: 'Completed', date: 'Sep 25, 2024' },
      { stage: 'Academic Review', actor: 'Prof. S. Mukhopadhyay', role: 'Dean', status: 'Completed', date: 'Sep 27, 2024' },
      { stage: 'HR Vetting', actor: 'Dr. Radhika Sharma', role: 'Head HR', status: 'Completed', date: 'Sep 29, 2024' },
      { stage: 'Executive Approval', actor: 'Pro-Chancellor Office', role: 'Executive', status: 'Completed', date: 'Oct 02, 2024' },
      { stage: 'Recruitment', actor: 'HR Team', role: 'Recruitment', status: 'In Progress', notes: 'JR-2025-012 published on portals.' }
    ]
  }
];

export interface CandidateRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  appliedRole: string;
  department: string;
  reqCode: string;
  experienceYears: number;
  highestDegree: string;
  university: string;
  currentCompany: string;
  rcsScore: number;
  stage:
    | 'Screening'
    | 'Shortlisted'
    | 'Technical Interview'
    | 'Selection Board'
    | 'Offer Issued'
    | 'Document Verification'
    | 'Joined'
    | 'Rejected';
  appliedDate: string;
  interviewDate?: string;
  interviewTime?: string;
  panelAssigned?: string;
  evaluation?: {
    technicalScore: number;
    academicScore: number;
    pedagogyScore: number;
    comments: string;
    evaluator: string;
    recommendation: 'Recommend' | 'Strongly Recommend' | 'Reject';
  };
  offerLetterSentDate?: string;
  expectedJoiningDate?: string;
  salaryOfferedAnnual?: string;
}

export const INITIAL_CANDIDATES: CandidateRecord[] = [
  {
    id: 'cand-1',
    name: 'Dr. Aravind Swaminathan',
    email: 'aravind.swaminathan@cdac.in',
    phone: '+91 98450 12890',
    appliedRole: 'Professor & Chair of Cyber Security',
    department: 'Computer Science & Engineering',
    reqCode: 'REQ-2025-079',
    experienceYears: 19,
    highestDegree: 'Ph.D. in Computer Science',
    university: 'Indian Institute of Science (IISc), Bangalore',
    currentCompany: 'Former Chief Scientist at C-DAC Pune',
    rcsScore: 96.5,
    stage: 'Selection Board',
    appliedDate: 'Oct 05, 2024',
    interviewDate: 'Feb 28, 2025',
    interviewTime: '10:30 AM',
    panelAssigned: 'Statutory Selection Committee (Dean & Visitor Nominee)',
    evaluation: {
      technicalScore: 9.8,
      academicScore: 9.9,
      pedagogyScore: 9.5,
      comments:
        'Outstanding scientific track record, h-index 28, 42 SCI journal publications, and 4 patents. Proven capacity to bring industry research sponsorship.',
      evaluator: 'Prof. K. N. Rao (IIT Kharagpur)',
      recommendation: 'Strongly Recommend'
    },
    salaryOfferedAnnual: '₹28,50,000',
    expectedJoiningDate: 'Apr 01, 2025'
  },
  {
    id: 'cand-2',
    name: 'Dr. Suniti Mukherjee',
    email: 'suniti.mukherjee@cmu.edu',
    phone: '+91 97110 44521',
    appliedRole: 'Associate Professor — AI & Machine Learning',
    department: 'Computer Science & Engineering',
    reqCode: 'REQ-2025-084',
    experienceYears: 11,
    highestDegree: 'Ph.D. in Machine Learning',
    university: 'IIT Delhi / Postdoc CMU',
    currentCompany: 'Senior Applied Scientist, Adobe Research',
    rcsScore: 92.0,
    stage: 'Technical Interview',
    appliedDate: 'Oct 12, 2024',
    interviewDate: 'Feb 20, 2025',
    interviewTime: '02:30 PM',
    panelAssigned: 'Technical Evaluation Panel (Dr. S. Mukherjee)'
  },
  {
    id: 'cand-3',
    name: 'Dr. Vikramaditya Rathore',
    email: 'v.rathore@drdo.res.in',
    phone: '+91 94330 89123',
    appliedRole: 'Assistant Professor — Autonomous Systems',
    department: 'Robotics & Artificial Intelligence',
    reqCode: 'REQ-2025-065',
    experienceYears: 8,
    highestDegree: 'Ph.D. in Aerospace Dynamics',
    university: 'IIEST Shibpur',
    currentCompany: 'Scientist D, DRDO Robotics Cluster',
    rcsScore: 89.5,
    stage: 'Offer Issued',
    appliedDate: 'Sep 28, 2024',
    offerLetterSentDate: 'Oct 10, 2024',
    salaryOfferedAnnual: '₹12,40,000',
    expectedJoiningDate: 'Nov 15, 2024'
  },
  {
    id: 'cand-4',
    name: 'Dr. Priyanka Chatterjee',
    email: 'priyanka.c@iitkgp.ac.in',
    phone: '+91 98301 77234',
    appliedRole: 'Assistant Professor — Thermal & Fluid Dynamics',
    department: 'Mechanical Engineering',
    reqCode: 'REQ-2025-091',
    experienceYears: 7,
    highestDegree: 'Ph.D. in Thermal Engineering',
    university: 'IIT Kharagpur',
    currentCompany: 'Research Associate, General Electric Gas Turbines',
    rcsScore: 88.0,
    stage: 'Shortlisted',
    appliedDate: 'Oct 14, 2024'
  },
  {
    id: 'cand-5',
    name: 'Dr. Alok Verma',
    email: 'alok.verma@caluniv.ac.in',
    phone: '+91 98100 23456',
    appliedRole: 'Associate Professor — Autonomous Systems',
    department: 'Robotics & Artificial Intelligence',
    reqCode: 'REQ-2025-065',
    experienceYears: 14,
    highestDegree: 'Ph.D. in Embedded Robotics',
    university: 'Jadavpur University',
    currentCompany: 'Associate Professor, NIT Durgapur',
    rcsScore: 85.0,
    stage: 'Joined',
    appliedDate: 'Aug 15, 2024',
    expectedJoiningDate: 'Oct 01, 2024',
    salaryOfferedAnnual: '₹18,50,000'
  }
];

export interface DepartmentSummary {
  code: string;
  name: string;
  head: string;
  sanctioned: number;
  inPosition: number;
  vacancies: number;
  studentCount: number;
  sfrRatio: string;
  weeklyOverloadHours: number;
}

export const DEPARTMENTS_LIST: DepartmentSummary[] = [
  {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    head: 'Dr. Amitabh Banerjee',
    sanctioned: 48,
    inPosition: 43,
    vacancies: 5,
    studentCount: 722,
    sfrRatio: '1:16.8',
    weeklyOverloadHours: 42
  },
  {
    code: 'RAI',
    name: 'Robotics & Artificial Intelligence',
    head: 'Dr. M. Ghosh',
    sanctioned: 24,
    inPosition: 21,
    vacancies: 3,
    studentCount: 319,
    sfrRatio: '1:15.2',
    weeklyOverloadHours: 14
  },
  {
    code: 'ME',
    name: 'Mechanical Engineering',
    head: 'Prof. K. C. Sen',
    sanctioned: 32,
    inPosition: 30,
    vacancies: 2,
    studentCount: 432,
    sfrRatio: '1:14.4',
    weeklyOverloadHours: 0
  },
  {
    code: 'EE',
    name: 'Electrical & Electronics Engineering',
    head: 'Dr. Rina Sengupta',
    sanctioned: 26,
    inPosition: 24,
    vacancies: 2,
    studentCount: 334,
    sfrRatio: '1:13.9',
    weeklyOverloadHours: -4
  },
  {
    code: 'CE',
    name: 'Civil Engineering',
    head: 'Prof. T. Bhattacharya',
    sanctioned: 18,
    inPosition: 16,
    vacancies: 2,
    studentCount: 236,
    sfrRatio: '1:14.8',
    weeklyOverloadHours: 2
  }
];

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: string;
  roleKey: UserRole;
  department: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
}

export const SYSTEM_USERS_DATA: SystemUser[] = [
  {
    id: 'u-1',
    name: 'Dr. Amitabh Banerjee',
    email: 'amitabh.banerjee@tnu.in',
    role: 'Department Head (HOD)',
    roleKey: 'hod',
    department: 'Computer Science & Engineering',
    status: 'Active',
    lastActive: 'Today, 10:15 AM'
  },
  {
    id: 'u-2',
    name: 'Prof. S. Mukhopadhyay',
    email: 's.mukhopadhyay@tnu.in',
    role: 'Dean of School',
    roleKey: 'dean',
    department: 'School of Engineering & Technology',
    status: 'Active',
    lastActive: 'Today, 11:42 AM'
  },
  {
    id: 'u-3',
    name: 'Prof. Nirmal Roy',
    email: 'nirmal.roy@tnu.in',
    role: 'Associate Dean (Academics)',
    roleKey: 'assoc_dean',
    department: 'Academic Affairs Directorate',
    status: 'Active',
    lastActive: 'Yesterday, 04:30 PM'
  },
  {
    id: 'u-4',
    name: 'Dr. Radhika Sharma',
    email: 'radhika.sharma@tnu.in',
    role: 'Head HR & Workforce',
    roleKey: 'head_hr',
    department: 'Central HR Directorate',
    status: 'Active',
    lastActive: 'Today, 09:20 AM'
  },
  {
    id: 'u-5',
    name: 'Ananya Sen',
    email: 'ananya.sen@tnu.in',
    role: 'HR Talent Acquisition',
    roleKey: 'hr_team',
    department: 'Faculty Recruitment Cell',
    status: 'Active',
    lastActive: 'Today, 11:00 AM'
  },
  {
    id: 'u-6',
    name: 'Dr. H. P. Kanoria',
    email: 'prochancellor@tnu.in',
    role: 'Pro-Chancellor',
    roleKey: 'prochancellor',
    department: 'Executive Chamber',
    status: 'Active',
    lastActive: 'Oct 14, 05:00 PM'
  },
  {
    id: 'u-7',
    name: 'Prof. K. N. Rao',
    email: 'knrao@iitkgp.ac.in',
    role: 'Selection Committee Chair',
    roleKey: 'selection_comm',
    department: 'Statutory Selection Panel',
    status: 'Active',
    lastActive: 'Oct 12, 02:00 PM'
  },
  {
    id: 'u-8',
    name: 'Dr. S. Mukherjee',
    email: 's.mukherjee@tnu.in',
    role: 'Technical Panel Expert',
    roleKey: 'technical_panel',
    department: 'Faculty Evaluation Board',
    status: 'Active',
    lastActive: 'Oct 13, 03:45 PM'
  }
];

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  notes: string;
}

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: 'Oct 14, 2024 · 11:42 AM',
    user: 'Prof. S. Mukhopadhyay',
    role: 'Dean of School',
    action: 'Endorsed Requisition',
    target: 'REQ-2025-084',
    notes: 'Approved teaching load deficit justification and forwarded to Head HR.'
  },
  {
    id: 'log-2',
    timestamp: 'Oct 14, 2024 · 10:15 AM',
    user: 'Dr. Amitabh Banerjee',
    role: 'Department Head (HOD)',
    action: 'Submitted Request',
    target: 'REQ-2025-084',
    notes: 'Created new post requisition for Associate Professor in AI & ML.'
  },
  {
    id: 'log-3',
    timestamp: 'Oct 12, 2024 · 04:00 PM',
    user: 'Dr. Radhika Sharma',
    role: 'Head HR',
    action: 'Cadre Roster Vetting Cleared',
    target: 'REQ-2025-079',
    notes: 'Level 14A post checked against sanctioned cadre.'
  },
  {
    id: 'log-4',
    timestamp: 'Oct 10, 2024 · 02:30 PM',
    user: 'Campus IT Administration',
    role: 'System Administrator',
    action: 'System Settings Updated',
    target: 'SLA Window',
    notes: 'Calibrated emergency review SLA to 24 hours.'
  }
];

// -------------------------------------------------------------
// CORE SCREEN 1: Overview & Command Data Models
// -------------------------------------------------------------

export interface Department {
  code: string;
  name: string;
  shortCode: string;
  head: string;
  sanctioned: number;
  inPosition: number;
  vacancies: number;
  sfr: string;
  loadStatus: string;
  loadHoursDelta: number;
  statusType: 'overloaded' | 'threshold' | 'balanced' | 'surplus';
  cadre: {
    professors: { sanctioned: number; inPosition: number };
    associates: { sanctioned: number; inPosition: number };
    assistants: { sanctioned: number; inPosition: number };
  };
  studentIntake: number;
  phdRatio: string;
  totalStudents?: number;
  professors?: number;
  assocProfessors?: number;
  asstProfessors?: number;
  description?: string;
}

export const DEPARTMENTS_DATA: Department[] = [
  {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    shortCode: 'CS',
    head: 'Dr. Amitabh Banerjee',
    sanctioned: 48,
    inPosition: 43,
    vacancies: 5,
    sfr: '1:16.8',
    loadStatus: '+42h Deficit',
    loadHoursDelta: 42,
    statusType: 'overloaded',
    cadre: {
      professors: { sanctioned: 6, inPosition: 4 },
      associates: { sanctioned: 14, inPosition: 12 },
      assistants: { sanctioned: 28, inPosition: 27 }
    },
    studentIntake: 722,
    totalStudents: 722,
    professors: 4,
    assocProfessors: 12,
    asstProfessors: 27,
    phdRatio: '84.2%',
    description: 'Premier department running B.Tech CSE, AI/ML, and Cybersecurity specializations. AICTE student-faculty ratio target 1:15.'
  },
  {
    code: 'RAI',
    name: 'Robotics & Artificial Intelligence',
    shortCode: 'RI',
    head: 'Dr. M. Ghosh',
    sanctioned: 24,
    inPosition: 21,
    vacancies: 3,
    sfr: '1:15.2',
    loadStatus: '+14h Deficit',
    loadHoursDelta: 14,
    statusType: 'threshold',
    cadre: {
      professors: { sanctioned: 3, inPosition: 2 },
      associates: { sanctioned: 7, inPosition: 6 },
      assistants: { sanctioned: 14, inPosition: 13 }
    },
    studentIntake: 319,
    totalStudents: 319,
    professors: 2,
    assocProfessors: 6,
    asstProfessors: 13,
    phdRatio: '78.5%',
    description: 'Interdisciplinary centre of excellence housing mechatronics and autonomous robotics testbeds.'
  },
  {
    code: 'ME',
    name: 'Mechanical Engineering',
    shortCode: 'ME',
    head: 'Prof. K. C. Sen',
    sanctioned: 32,
    inPosition: 30,
    vacancies: 2,
    sfr: '1:14.4',
    loadStatus: 'Balanced',
    loadHoursDelta: 0,
    statusType: 'balanced',
    cadre: {
      professors: { sanctioned: 4, inPosition: 4 },
      associates: { sanctioned: 10, inPosition: 9 },
      assistants: { sanctioned: 18, inPosition: 17 }
    },
    studentIntake: 432,
    totalStudents: 432,
    professors: 4,
    assocProfessors: 9,
    asstProfessors: 17,
    phdRatio: '90.0%',
    description: 'NBA Tier-1 accredited school with specialized CFD, Turbo-machinery, and Thermal Propulsion laboratories.'
  },
  {
    code: 'EE',
    name: 'Electrical & Electronics Engineering',
    shortCode: 'EE',
    head: 'Dr. Rina Sengupta',
    sanctioned: 26,
    inPosition: 24,
    vacancies: 2,
    sfr: '1:13.9',
    loadStatus: 'Normal (4h Surplus)',
    loadHoursDelta: -4,
    statusType: 'balanced',
    cadre: {
      professors: { sanctioned: 3, inPosition: 3 },
      associates: { sanctioned: 8, inPosition: 7 },
      assistants: { sanctioned: 15, inPosition: 14 }
    },
    studentIntake: 334,
    totalStudents: 334,
    professors: 3,
    assocProfessors: 7,
    asstProfessors: 14,
    phdRatio: '87.5%',
    description: 'Advanced power systems and microgrid testbed laboratories.'
  },
  {
    code: 'CE',
    name: 'Civil Engineering',
    shortCode: 'CE',
    head: 'Prof. T. Bhattacharya',
    sanctioned: 18,
    inPosition: 16,
    vacancies: 2,
    sfr: '1:14.8',
    loadStatus: '+2h Minor Gap',
    loadHoursDelta: 2,
    statusType: 'balanced',
    cadre: {
      professors: { sanctioned: 2, inPosition: 2 },
      associates: { sanctioned: 5, inPosition: 5 },
      assistants: { sanctioned: 11, inPosition: 9 }
    },
    studentIntake: 236,
    totalStudents: 236,
    professors: 2,
    assocProfessors: 5,
    asstProfessors: 9,
    phdRatio: '81.2%',
    description: 'Structural testing and environmental engineering experimental facilities.'
  }
];

export interface RequisitionDocket {
  id: string;
  refCode: string;
  title: string;
  school: string;
  department: string;
  initiatedBy: string;
  receivedTime: string;
  urgency: 'critical' | 'normal' | 'low';
  urgencyLabel: string;
  designation: string;
  payLevel: string;
  salaryRange: string;
  teachingLoadText: string;
  slaHoursRemaining: number;
  status: 'Pending Review' | 'Pending Dean Endorsement' | 'Approved' | 'Rejected' | 'Clarification';
  hoursOverload: number;
  photoUrl?: string;
  cadreRationale?: string;
  hasOverload?: boolean;
  overloadHours?: number;
  budgetAnnual?: string;
}

export const INITIAL_REQUISITION_DOCKETS: RequisitionDocket[] = [
  {
    id: 'req-084',
    refCode: 'REQ-2025-084',
    title: 'Associate Professor — Artificial Intelligence & Machine Learning',
    school: 'School of Engineering & Technology',
    department: 'Dept. of Computer Science & Engineering',
    initiatedBy: 'Dr. Amitabh Banerjee (HOD)',
    receivedTime: 'Submitted 4 hours ago',
    urgency: 'critical',
    urgencyLabel: 'Critical Bottleneck',
    designation: 'Associate Professor',
    payLevel: 'Pay Level 13A2',
    salaryRange: '₹1,39,600 - ₹2,11,300',
    teachingLoadText:
      'Curricular expansion in B.Tech CS (AI & ML). Current faculty load exceeds AICTE 16h/wk threshold by 42 surplus teaching hours across 2 elective sections.',
    slaHoursRemaining: 6,
    status: 'Pending Review',
    hoursOverload: 42,
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'req-091',
    refCode: 'REQ-2025-091',
    title: 'Assistant Professor — Thermal & Fluid Dynamics',
    school: 'School of Engineering & Technology',
    department: 'Dept. of Mechanical Engineering',
    initiatedBy: 'Prof. K. C. Sen (HOD)',
    receivedTime: 'Submitted Yesterday',
    urgency: 'normal',
    urgencyLabel: 'Superannuation Replacement',
    designation: 'Assistant Professor',
    payLevel: 'Pay Level 10',
    salaryRange: '₹57,700 - ₹98,200',
    teachingLoadText:
      'Immediate succession cover for retiring laboratory head. Needed for Advanced Propulsion and CFD laboratory instruction.',
    slaHoursRemaining: 21,
    status: 'Pending Review',
    hoursOverload: 18,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'req-079',
    refCode: 'REQ-2025-079',
    title: 'Professor & Chair of Cyber Security',
    school: 'School of Engineering & Technology',
    department: 'Dept. of Computer Science & Engineering',
    initiatedBy: 'Dr. Amitabh Banerjee (HOD)',
    receivedTime: 'Submitted 2 days ago',
    urgency: 'normal',
    urgencyLabel: 'New Academic Chair',
    designation: 'Professor',
    payLevel: 'Pay Level 14A',
    salaryRange: '₹1,44,200 - ₹2,18,200',
    teachingLoadText:
      'Launching sponsored M.Tech Cyber Defence programme. Endowed chair funded by National Cyber Security initiative.',
    slaHoursRemaining: 34,
    status: 'Pending Review',
    hoursOverload: 24,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  }
];

// -------------------------------------------------------------
// CORE SCREEN 3: Executive Dockets Data Models
// -------------------------------------------------------------

export interface ExecutiveDocket {
  id: string;
  docketId: string;
  title: string;
  school: string;
  department: string;
  status: 'urgent' | 'regular' | 'sealed';
  urgencyLabel: string;
  statusBadge: string;
  ctcGross: string;
  cadreBand: string;
  fiscalBreakdown: {
    component: string;
    cadreScale: string;
    monthlyRate: string;
    annualAllocation: string;
  }[];
  auditTrail: {
    title: string;
    isPending?: boolean;
    tag: string;
    desc: string;
    timestamp: string;
  }[];
  candidate: {
    name: string;
    photoUrl: string;
    qualification: string;
    currentOrg: string;
    experience: string;
    hIndex: number;
    sciJournals: number;
    patents: number;
    selectionScore: number;
  };
  endorsements: {
    author: string;
    role: string;
    initials: string;
    badge: string;
    quote: string;
  }[];
}

export const EXECUTIVE_DOCKETS_DATA: ExecutiveDocket[] = [
  {
    id: 'EX-2025-041',
    docketId: 'EX-2025-041',
    title: 'Professor & Chair of Cyber Security',
    school: 'School of Engineering & Technology',
    department: 'Dept. of Computer Science & Engineering',
    status: 'urgent',
    urgencyLabel: 'Action Required',
    statusBadge: 'Quorum Ratified',
    ctcGross: '₹28,50,000 / annum',
    cadreBand: 'Band 14A (Statutory Chair)',
    fiscalBreakdown: [
      { component: 'Basic Pay', cadreScale: 'Pay Level 14A', monthlyRate: '₹1,44,200', annualAllocation: '₹17,30,400' },
      { component: 'Academic Allowance & DA', cadreScale: 'UGC Norms (50%)', monthlyRate: '₹72,100', annualAllocation: '₹8,65,200' },
      { component: 'HRA & Institutional Perks', cadreScale: 'Band Tier 1', monthlyRate: '₹21,200', annualAllocation: '₹2,54,400' }
    ],
    auditTrail: [
      { title: 'Requisition Initiated', timestamp: 'Oct 10, 2024', tag: 'Initiated', desc: 'Curricular necessity validated by Dr. Amitabh Banerjee (HOD).' },
      { title: 'Academic Deanery Endorsed', timestamp: 'Oct 11, 2024', tag: 'Endorsed', desc: 'Recommended for M.Tech accreditation by Prof. S. Mukhopadhyay.' },
      { title: 'HR Cadre Quota Vetted', timestamp: 'Oct 12, 2024', tag: 'Quota Vetted', desc: 'Band 14A approved against university reserve by Dr. Radhika Sharma.' },
      { title: 'Statutory Selection Committee Sitting', timestamp: 'Oct 14, 2024', tag: 'Interview Cleared', desc: 'Unanimously recommended by Prof. K. N. Rao (Visitor Nominee).' },
      { title: 'Executive Seal & Ratification', timestamp: 'Pending', isPending: true, tag: 'Pending Seal', desc: 'Awaiting Pro-Chancellor statutory signature.' }
    ],
    candidate: {
      name: 'Dr. Aravind Swaminathan',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      qualification: 'Ph.D. Computer Science (IISc Bangalore)',
      currentOrg: 'Former Chief Scientist, C-DAC Pune',
      experience: '19 Years Research & Post-Graduate Pedagogy',
      hIndex: 28,
      sciJournals: 42,
      patents: 4,
      selectionScore: 96.5
    },
    endorsements: [
      {
        author: 'Prof. K. N. Rao (Visitor Nominee, IIT Kharagpur)',
        role: 'Statutory Selection Committee Chair',
        initials: 'KR',
        badge: 'Unanimous Recommendation',
        quote:
          '"Exceptional researcher with direct national-scale cyber defense lab leadership. Scoring 9.8/10 in technical scrutiny and 9.5 in pedagogy lecture demonstration."'
      },
      {
        author: 'Prof. S. Mukhopadhyay',
        role: 'Dean, School of Engineering & Technology',
        initials: 'SM',
        badge: 'Dean Endorsed',
        quote:
          '"Directly addresses NBA Criterion 3 and expands sponsored M.Tech research capacity. Highly recommend immediate issuance of statutory Offer Letter."'
      },
      {
        author: 'Dr. Radhika Sharma',
        role: 'Head HR & Workforce Planning',
        initials: 'RS',
        badge: 'Cadre Quota Cleared',
        quote:
          '"Post is fully sanctioned within the 2025-26 Academic Budget Band 14A. No deviation from university remuneration matrices."'
      }
    ]
  },
  {
    id: 'EX-2025-039',
    docketId: 'EX-2025-039',
    title: 'Assistant Professor — Autonomous Systems',
    school: 'School of Engineering & Technology',
    department: 'Dept. of Robotics & AI',
    status: 'regular',
    urgencyLabel: 'Executive Review',
    statusBadge: 'Quorum Cleared',
    ctcGross: '₹12,40,000 / annum',
    cadreBand: 'Band 10 (Entry Assistant Prof)',
    fiscalBreakdown: [
      { component: 'Basic Pay', cadreScale: 'Pay Level 10', monthlyRate: '₹57,700', annualAllocation: '₹6,92,400' },
      { component: 'Academic Allowance & DA', cadreScale: 'UGC Norms', monthlyRate: '₹28,850', annualAllocation: '₹3,46,200' },
      { component: 'HRA & Allowances', cadreScale: 'Standard', monthlyRate: '₹16,783', annualAllocation: '₹2,01,400' }
    ],
    auditTrail: [
      { title: 'Requisition Initiated', timestamp: 'Sep 25, 2024', tag: 'Initiated', desc: 'Robotics lab necessity logged by Dr. M. Ghosh.' },
      { title: 'Dean Endorsed', timestamp: 'Sep 27, 2024', tag: 'Endorsed', desc: 'Recommended by Prof. S. Mukhopadhyay.' },
      { title: 'HR Vetted', timestamp: 'Sep 29, 2024', tag: 'Quota Vetted', desc: 'Quota verified by Dr. Radhika Sharma.' },
      { title: 'Executive Approval', timestamp: 'Pending', isPending: true, tag: 'Pending Seal', desc: 'Under review by Dr. H. P. Kanoria.' }
    ],
    candidate: {
      name: 'Dr. Vikramaditya Rathore',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      qualification: 'Ph.D. Aerospace Dynamics (IIEST Shibpur)',
      currentOrg: 'Scientist D, DRDO Robotics Cluster',
      experience: '8 Years Applied Defense Robotics',
      hIndex: 14,
      sciJournals: 18,
      patents: 2,
      selectionScore: 89.5
    },
    endorsements: [
      {
        author: 'Prof. S. Mukhopadhyay',
        role: 'Dean, School of Engineering & Technology',
        initials: 'SM',
        badge: 'Dean Endorsed',
        quote:
          '"Critical addition for our industry 4.0 robotics lab. Candidate has active DRDO project guidance credentials."'
      },
      {
        author: 'Dr. Radhika Sharma',
        role: 'Head HR',
        initials: 'RS',
        badge: 'Budget Verified',
        quote:
          '"Sanctioned under replacement quota. Proposed compensation matches Pay Level 10 entry baseline."'
      }
    ]
  },
  {
    id: 'EX-2025-037',
    docketId: 'EX-2025-037',
    title: 'Associate Professor — AI & Machine Learning',
    school: 'School of Engineering & Technology',
    department: 'Dept. of Computer Science & Engineering',
    status: 'regular',
    urgencyLabel: 'Executive Review',
    statusBadge: 'Interview Cleared',
    ctcGross: '₹22,40,000 / annum',
    cadreBand: 'Band 13A2',
    fiscalBreakdown: [
      { component: 'Basic Pay', cadreScale: 'Pay Level 13A2', monthlyRate: '₹1,39,600', annualAllocation: '₹16,75,200' },
      { component: 'Allowances & Perks', cadreScale: 'UGC Band', monthlyRate: '₹47,066', annualAllocation: '₹5,64,800' }
    ],
    auditTrail: [
      { title: 'Requisition Initiated', timestamp: 'Oct 14, 2024', tag: 'Initiated', desc: 'Relieves 42h deficit logged by Dr. Amitabh Banerjee.' },
      { title: 'Dean Endorsed', timestamp: 'Oct 14, 2024', tag: 'Endorsed', desc: 'Recommended by Prof. S. Mukhopadhyay.' },
      { title: 'Executive Approval', timestamp: 'Pending', isPending: true, tag: 'Pending Seal', desc: 'Awaiting seal from Dr. H. P. Kanoria.' }
    ],
    candidate: {
      name: 'Dr. Suniti Mukherjee',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      qualification: 'Ph.D. Machine Learning (IIT Delhi / Postdoc CMU)',
      currentOrg: 'Senior Applied Scientist, Adobe Research',
      experience: '11 Years Industrial & Academic ML',
      hIndex: 22,
      sciJournals: 29,
      patents: 3,
      selectionScore: 92.0
    },
    endorsements: [
      {
        author: 'Dr. Amitabh Banerjee',
        role: 'Department Head (HOD CSE)',
        initials: 'AB',
        badge: 'HOD Request',
        quote:
          '"Directly relieves 42 weekly surplus teaching hours in AI specializations. Outstanding pedagogy feedback."'
      }
    ]
  }
];

// -------------------------------------------------------------
// CORE SCREEN 4: Applicant Pipeline Data Models
// -------------------------------------------------------------

export interface JobRequisition {
  id: string;
  jrCode: string;
  role: string;
  specialization: string;
  school: string;
  department: string;
  sanctioned: number;
  occupied: number;
  rcsCutoff: string;
  applicantsCount: number;
  stageKey: 'shortlist' | 'selection' | 'offer' | 'onboard';
  workflowStage: string;
  slaStatus: string;
  slaState: 'normal' | 'warning' | 'overdue';
}

export const JOB_REQUISITIONS_DATA: JobRequisition[] = [
  {
    id: 'jr-1',
    jrCode: 'JR-2025-012',
    role: 'Professor & Chair of Cyber Security',
    specialization: 'Cybersecurity, Cryptography & Network Defence',
    school: 'School of Engineering & Technology',
    department: 'Computer Science & Engineering',
    sanctioned: 6,
    occupied: 4,
    rcsCutoff: '85.0+',
    applicantsCount: 48,
    stageKey: 'selection',
    workflowStage: 'Selection Quorum Completed',
    slaStatus: 'Under Executive Docket',
    slaState: 'warning'
  },
  {
    id: 'jr-2',
    jrCode: 'JR-2025-014',
    role: 'Associate Professor — AI & Machine Learning',
    specialization: 'Deep Learning & Vision Transformers',
    school: 'School of Engineering & Technology',
    department: 'Computer Science & Engineering',
    sanctioned: 14,
    occupied: 12,
    rcsCutoff: '80.0+',
    applicantsCount: 82,
    stageKey: 'shortlist',
    workflowStage: 'Technical Scrutiny',
    slaStatus: '+6 Days Overdue',
    slaState: 'overdue'
  },
  {
    id: 'jr-3',
    jrCode: 'JR-2025-018',
    role: 'Assistant Professor — Autonomous Systems',
    specialization: 'Robotics, Sensors & Embedded AI',
    school: 'School of Engineering & Technology',
    department: 'Robotics & Artificial Intelligence',
    sanctioned: 14,
    occupied: 13,
    rcsCutoff: '75.0+',
    applicantsCount: 36,
    stageKey: 'offer',
    workflowStage: 'Formal Offer Issued',
    slaStatus: 'Acceptance Window Open',
    slaState: 'normal'
  },
  {
    id: 'jr-4',
    jrCode: 'JR-2025-021',
    role: 'Assistant Professor — Thermal & Fluid Dynamics',
    specialization: 'CFD Modeling & Propulsion',
    school: 'School of Engineering & Technology',
    department: 'Mechanical Engineering',
    sanctioned: 18,
    occupied: 17,
    rcsCutoff: '75.0+',
    applicantsCount: 29,
    stageKey: 'shortlist',
    workflowStage: 'Document Verification',
    slaStatus: 'On Schedule (4d remaining)',
    slaState: 'normal'
  },
  {
    id: 'jr-5',
    jrCode: 'JR-2025-025',
    role: 'Professor & Dean — School of Maritime Studies',
    specialization: 'Marine Navigation & Naval Architecture',
    school: 'School of Maritime Studies',
    department: 'Marine Engineering',
    sanctioned: 4,
    occupied: 3,
    rcsCutoff: 'Exempt',
    applicantsCount: 14,
    stageKey: 'selection',
    workflowStage: 'Visitor Quorum Scheduled',
    slaStatus: 'Hearing on Mar 02',
    slaState: 'normal'
  },
  {
    id: 'jr-6',
    jrCode: 'JR-2025-028',
    role: 'Assistant Professor — Pharmaceutical Chemistry',
    specialization: 'Drug Design & Chromatographic Profiling',
    school: 'School of Pharmacy',
    department: 'Pharmaceutics',
    sanctioned: 12,
    occupied: 10,
    rcsCutoff: '72.0+',
    applicantsCount: 52,
    stageKey: 'onboard',
    workflowStage: 'Joining & Induction',
    slaStatus: 'Reporting Feb 26',
    slaState: 'normal'
  }
];

// -------------------------------------------------------------
// FACULTY WORKFORCE DIRECTORY DATA
// -------------------------------------------------------------

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  dept: string;
  phd: string;
  avatarUrl: string;
  teachingLoad: number;
  maxLoad: number;
  researchPapers: number;
  patents: number;
  email: string;
  phone: string;
  doj: string;
}

export const FACULTY_DIRECTORY_DATA: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Prof. S. Mukhopadhyay',
    designation: 'Professor & Dean',
    dept: 'Computer Science & Engineering',
    phd: 'Ph.D. VLSI & Embedded Systems (IIT Kharagpur)',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj2fB9Txz94CBaOoWIbgAIiKskeFcolarjBwpInqiJJkZLDJifMSHgX5ziEkOJKEKG6wz_aAPTVvYGnDBwNoNOWmxYnJjvbzBhDkurLMdnEr5X2UI6ooNTIrEa-DvGR5Tm7Qe62hAQzUOgPc2dcRtPP7Ck99T23181G1ojIBzmfnhicxBw0svsY1UBOcYxrfwrke7eJIryI0RZi8snOTN-z2nqa5CImqymGK_wgxFINEf_FnxvyAMh0Q',
    teachingLoad: 12,
    maxLoad: 14,
    researchPapers: 54,
    patents: 6,
    email: 's.mukhopadhyay@tnu.in',
    phone: '+91 98300 11223',
    doj: 'Aug 2018'
  },
  {
    id: 'fac-2',
    name: 'Dr. Amitabh Banerjee',
    designation: 'Associate Professor & HOD',
    dept: 'Computer Science & Engineering',
    phd: 'Ph.D. Distributed Systems (Jadavpur University)',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsIjDSgdxRsjX64RgPHiC1ne3uCn2DSCz4XoS1aPMBTm_Eyw3XUWmjN6wD03UhO05U5hHEggs_qdWc7C7AoD54xgWLiKoVIXZo9ganMTKpbMi50g90FZ9AWbTZAEErZ-rJFnlptId9iY2sBJrBO0ozbcsjTZeXS1TFslvXT8jNboRGvTNWJZL6WQrIK3q6EwF6ClQr5mRx6R3GmW_6-au4i9Xyh1mSgDBMVESUq-DQCvYwMcPMh2d3Hg',
    teachingLoad: 20,
    maxLoad: 16,
    researchPapers: 31,
    patents: 3,
    email: 'amitabh.banerjee@tnu.in',
    phone: '+91 98311 44556',
    doj: 'Jul 2019'
  },
  {
    id: 'fac-3',
    name: 'Dr. M. Ghosh',
    designation: 'Associate Professor & HOD',
    dept: 'Robotics & Artificial Intelligence',
    phd: 'Ph.D. Mechatronics (IIEST Shibpur)',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    teachingLoad: 18,
    maxLoad: 16,
    researchPapers: 24,
    patents: 2,
    email: 'm.ghosh@tnu.in',
    phone: '+91 94330 55667',
    doj: 'Jan 2021'
  },
  {
    id: 'fac-4',
    name: 'Prof. K. C. Sen',
    designation: 'Professor & HOD',
    dept: 'Mechanical Engineering',
    phd: 'Ph.D. Thermal Power & Turbo-machinery (IIT Delhi)',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    teachingLoad: 14,
    maxLoad: 14,
    researchPapers: 48,
    patents: 5,
    email: 'kc.sen@tnu.in',
    phone: '+91 98450 77889',
    doj: 'Jul 2017'
  },
  {
    id: 'fac-5',
    name: 'Dr. Rina Sengupta',
    designation: 'Associate Professor & HOD',
    dept: 'Electrical & Electronics Engineering',
    phd: 'Ph.D. Power Electronics & Smart Grids (IIT Roorkee)',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    teachingLoad: 15,
    maxLoad: 16,
    researchPapers: 28,
    patents: 4,
    email: 'rina.sengupta@tnu.in',
    phone: '+91 97480 33445',
    doj: 'Sep 2020'
  },
  {
    id: 'fac-6',
    name: 'Prof. T. Bhattacharya',
    designation: 'Professor & HOD',
    dept: 'Civil Engineering',
    phd: 'Ph.D. Structural Mechanics & Earthquake Engg (IIT Bombay)',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    teachingLoad: 14,
    maxLoad: 14,
    researchPapers: 39,
    patents: 2,
    email: 't.bhattacharya@tnu.in',
    phone: '+91 98310 99887',
    doj: 'Nov 2018'
  }
];
