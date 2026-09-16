import {
  StudentProfile,
  SkillItem,
  SkillRadarItem,
  CompanyMatch,
  RoadmapPhase,
  DailyTask,
  Integration,
  ResumeAnalysis,
  InterviewAnalytics,
  DigitalTwinNode,
  NotificationItem
} from '../types';

export const MOCK_STUDENT: StudentProfile = {
  id: 'std_01',
  name: 'Alex Sharma',
  college: 'ABC Engineering College',
  degree: 'B.Tech CSE',
  graduationYear: 2027,
  cgpa: 8.4,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  targetRole: 'Software Development Engineer',
  targetSalary: '?8–15 LPA',
  targetCompanies: ['Microsoft', 'Accenture', 'Capgemini', 'TCS'],
  stats: {
    leetCodeProblems: 187,
    githubRepos: 12,
    projectsCount: 5,
    placementReadiness: 78,
    readinessDeltaMonth: 6,
    interviewReadiness: 64,
    resumeScore: 86,
    dsaScore: 81,
    developmentScore: 76,
    systemDesignScore: 48,
    dbmsScore: 58,
    communicationScore: 72,
    consistencyScore: 84,
    streakDays: 12,
  },
};

export const MOCK_SKILL_RADAR: SkillRadarItem[] = [
  { subject: 'DSA', score: 81, benchmark: 75, fullMark: 100 },
  { subject: 'Development', score: 76, benchmark: 70, fullMark: 100 },
  { subject: 'CS Fundamentals', score: 68, benchmark: 75, fullMark: 100 },
  { subject: 'System Design', score: 48, benchmark: 75, fullMark: 100 },
  { subject: 'Communication', score: 72, benchmark: 70, fullMark: 100 },
  { subject: 'Problem Solving', score: 82, benchmark: 75, fullMark: 100 },
  { subject: 'Projects', score: 76, benchmark: 70, fullMark: 100 },
  { subject: 'Interview Skills', score: 64, benchmark: 75, fullMark: 100 },
];

export const MOCK_SKILLS: SkillItem[] = [
  {
    id: 'sk_sys_design',
    name: 'System Design',
    category: 'System Design',
    currentScore: 48,
    requiredScore: 75,
    priority: 'high',
    gap: 27,
    impactOnPlacement: 'Blocks Tier-1 product companies like Microsoft (54% readiness)',
    recommendation: 'Learn scalability fundamentals, APIs, databases, caching, and distributed systems.',
    recommendedTopics: ['Horizontal vs Vertical Scaling', 'Load Balancing & Reverse Proxies', 'Database Sharding & Replication', 'Cache Strategies (Redis/Memcached)', 'CAP Theorem & Microservices']
  },
  {
    id: 'sk_dbms',
    name: 'DBMS & Query Optimization',
    category: 'CS Fundamentals',
    currentScore: 58,
    requiredScore: 75,
    priority: 'medium',
    gap: 17,
    impactOnPlacement: 'Frequently tested in technical screening rounds across Tier-1/2 firms',
    recommendation: 'Master normalization, ACID transactions, isolation levels, and indexing mechanics.',
    recommendedTopics: ['1NF to BCNF Normalization', 'B-Trees & Indexing Internals', 'Transaction Isolation Levels', 'Query Optimization & EXPLAIN plans']
  },
  {
    id: 'sk_os',
    name: 'Operating Systems',
    category: 'CS Fundamentals',
    currentScore: 72,
    requiredScore: 78,
    priority: 'low',
    gap: 6,
    impactOnPlacement: 'Minor gap for core technical rounds',
    recommendation: 'Review thread synchronization, virtual memory, and process scheduling algorithms.',
    recommendedTopics: ['Paging & Virtual Memory', 'Deadlock Detection & Prevention', 'POSIX Threads & Semaphores']
  },
  {
    id: 'sk_dsa_graphs',
    name: 'Advanced Graphs & DP',
    category: 'DSA',
    currentScore: 68,
    requiredScore: 85,
    priority: 'high',
    gap: 17,
    impactOnPlacement: 'Essential for Microsoft and top product company coding rounds',
    recommendation: 'Solve 20 topological sort, Dijkstra, and multidimensional dynamic programming questions.',
    recommendedTopics: ['Topological Sort (Kahn Algorithm)', 'Shortest Paths (Dijkstra/Bellman-Ford)', 'Disjoint Set Union (DSU)', 'Bitmask Dynamic Programming']
  }
];

export const MOCK_COMPANIES: CompanyMatch[] = [
  {
    id: 'cmp_tcs',
    name: 'TCS',
    logo: 'TC',
    readiness: 92,
    status: 'Strong Match',
    salaryRange: '?7–9 LPA',
    role: 'Digital / Prime SDE',
    skillsMatched: ['DSA (Arrays, Strings, HashMaps)', 'Java & OOP Principles', 'SQL Fundamentals', 'Problem Solving'],
    missingSkills: ['System Design (minimal expectation)'],
    recommendedPreparation: [
      'Revise standard TCS NQT coding question banks',
      'Brush up on core Java collections and multithreading basics',
      'Prepare project walkthrough with architecture diagrams'
    ],
    description: 'Premier tech consulting multinational with massive recruitment for Digital & Prime roles.',
    targetTimeline: 'Upcoming drive in 4 weeks'
  },
  {
    id: 'cmp_capgemini',
    name: 'Capgemini',
    logo: 'CG',
    readiness: 88,
    status: 'Strong Match',
    salaryRange: '?6–8 LPA',
    role: 'Software Analyst / Developer',
    skillsMatched: ['DSA Foundations', 'Web Development (React, Node)', 'Relational Databases', 'Team Communication'],
    missingSkills: ['Cloud Infrastructure Basics (AWS/Azure)'],
    recommendedPreparation: [
      'Take 2 mock technical screenings focusing on behavioral competencies',
      'Review REST API design principles and HTTP status codes',
      'Solidify DBMS normalization and indexing'
    ],
    description: 'Global leader in partnering with companies to transform and manage business through technology.',
    targetTimeline: 'Application window open'
  },
  {
    id: 'cmp_accenture',
    name: 'Accenture',
    logo: 'AC',
    readiness: 81,
    status: 'Good Match',
    salaryRange: '?7–10 LPA',
    role: 'Advanced Application Engineering Analyst',
    skillsMatched: ['Core Problem Solving', 'Full Stack Development', 'Git & Software Lifecycle', 'Aptitude & Verbal'],
    missingSkills: ['Microservices Architecture', 'Docker & Containerization'],
    recommendedPreparation: [
      'Solve 15 medium problems on LeetCode focusing on Dynamic Programming',
      'Review Docker containerization basics and deploy one project',
      'Review critical case studies and STAR interview stories'
    ],
    description: 'Fortune Global 500 company providing strategy, consulting, digital, and technology services.',
    targetTimeline: 'Campus drive expected next month'
  },
  {
    id: 'cmp_microsoft',
    name: 'Microsoft',
    logo: 'MS',
    readiness: 54,
    status: 'Needs Preparation',
    salaryRange: '?20–35 LPA',
    role: 'Software Engineer (SDE I)',
    skillsMatched: ['DSA Fundamentals', 'React & Modern Frontend', 'Git & CI/CD Pipelines', 'Problem Solving Attitude'],
    missingSkills: ['Advanced Graphs & DP', 'Low-Level Design (LLD / OOP)', 'High-Level System Design (HLD)', 'Concurrency & Distributed Systems'],
    recommendedPreparation: [
      'Complete 20 Graph & Dynamic Programming LeetCode Medium/Hard problems',
      'Study System Design fundamentals: Caching, Sharding, Message Queues (Kafka)',
      'Design & implement 2 scalable backend microservices projects',
      'Take 3 rigorous mock technical and behavioral interviews'
    ],
    description: 'Global technology giant known for cloud, AI, productivity software, and engineering excellence.',
    targetTimeline: 'Off-campus & internship drive in 3 months'
  }
];

export const MOCK_ROADMAP: RoadmapPhase[] = [
  {
    id: 'phase_1',
    phaseNumber: 1,
    title: 'Strengthen Foundations',
    status: 'Completed',
    progressPercentage: 100,
    topics: [
      { id: 't_1', title: 'Arrays & Strings', difficulty: 'Easy', estimatedHours: 12, status: 'completed', category: 'DSA' },
      { id: 't_2', title: 'Hashing & HashMaps', difficulty: 'Easy', estimatedHours: 8, status: 'completed', category: 'DSA' },
      { id: 't_3', title: 'Binary Search & Two Pointers', difficulty: 'Medium', estimatedHours: 14, status: 'completed', category: 'DSA' },
      { id: 't_4', title: 'Linked Lists & Fast/Slow Pointers', difficulty: 'Easy', estimatedHours: 10, status: 'completed', category: 'DSA' }
    ]
  },
  {
    id: 'phase_2',
    phaseNumber: 2,
    title: 'Advanced DSA & Problem Solving',
    status: 'In Progress',
    progressPercentage: 60,
    topics: [
      { id: 't_5', title: 'Binary Trees & Traversals', difficulty: 'Medium', estimatedHours: 16, status: 'completed', category: 'DSA' },
      { id: 't_6', title: 'Graphs & BFS/DFS', difficulty: 'Hard', estimatedHours: 20, status: 'in_progress', category: 'DSA' },
      { id: 't_7', title: 'Dynamic Programming Patterns', difficulty: 'Hard', estimatedHours: 24, status: 'upcoming', category: 'DSA' }
    ]
  },
  {
    id: 'phase_3',
    phaseNumber: 3,
    title: 'Interview Preparation & System Design',
    status: 'Upcoming',
    progressPercentage: 15,
    topics: [
      { id: 't_8', title: 'System Design Fundamentals', difficulty: 'Hard', estimatedHours: 25, status: 'upcoming', category: 'System Design' },
      { id: 't_9', title: 'Behavioral Interviews (STAR Method)', difficulty: 'Easy', estimatedHours: 8, status: 'upcoming', category: 'Interview' },
      { id: 't_10', title: 'Full Stack Mock Technical Rounds', difficulty: 'Medium', estimatedHours: 15, status: 'upcoming', category: 'Interview' }
    ]
  }
];

export const MOCK_DAILY_TASKS: DailyTask[] = [
  {
    id: 'dt_1',
    title: 'Binary Trees',
    subtitle: 'Solve 3 problems (Lowest Common Ancestor, Diameter, Zigzag Traversal)',
    timeEstimate: '45 min',
    status: 'in_progress',
    type: 'dsa',
    priority: 'high'
  },
  {
    id: 'dt_2',
    title: 'DBMS Revision',
    subtitle: 'Revise normalization rules (1NF, 2NF, 3NF, BCNF) with real schemas',
    timeEstimate: '30 min',
    status: 'pending',
    type: 'dbms',
    priority: 'high'
  },
  {
    id: 'dt_3',
    title: 'Development Module',
    subtitle: 'Build JWT authentication & refresh token mechanism in Node.js',
    timeEstimate: '60 min',
    status: 'completed',
    type: 'development',
    priority: 'medium'
  },
  {
    id: 'dt_4',
    title: 'Behavioral Questions',
    subtitle: 'Record answers for Tell me about a challenging bug you fixed',
    timeEstimate: '30 min',
    status: 'completed',
    type: 'interview',
    priority: 'standard'
  }
];

export const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: 'int_github',
    name: 'GitHub',
    icon: 'github',
    connected: true,
    statusText: 'Connected ?',
    lastSynced: '2 hours ago',
    detail: '12 active repositories • 34 commits this month',
    actionText: 'Resync Repos'
  },
  {
    id: 'int_leetcode',
    name: 'LeetCode',
    icon: 'code',
    connected: true,
    statusText: 'Connected ?',
    lastSynced: 'Yesterday at 11:30 PM',
    detail: '187 problems solved (92 Easy, 76 Medium, 19 Hard)',
    actionText: 'Refresh Stats'
  },
  {
    id: 'int_codeforces',
    name: 'Codeforces',
    icon: 'terminal',
    connected: true,
    statusText: 'Connected ?',
    lastSynced: '3 days ago',
    detail: 'Rating: 1248 (Pupil) • 14 Contests',
    actionText: 'Update Rating'
  },
  {
    id: 'int_linkedin',
    name: 'LinkedIn',
    icon: 'share-2',
    connected: false,
    statusText: 'Not connected',
    lastSynced: 'Never',
    detail: 'Connect to auto-extract certifications and experience',
    actionText: 'Connect'
  },
  {
    id: 'int_resume',
    name: 'Resume Parser',
    icon: 'file-text',
    connected: true,
    statusText: 'Uploaded ?',
    lastSynced: '3 days ago',
    detail: 'Alex_Sharma_Resume_2026.pdf (Parsed 48 skills, 5 projects)',
    actionText: 'Update Resume'
  },
  {
    id: 'int_college',
    name: 'College Academics',
    icon: 'graduation-cap',
    connected: true,
    statusText: 'Verified ?',
    lastSynced: 'Semester 5 GradeSheet',
    detail: 'CGPA: 8.4 • ABC Engineering College (B.Tech CSE)',
    actionText: 'Update'
  }
];

export const MOCK_RESUME_ANALYSIS: ResumeAnalysis = {
  overallScore: 86,
  breakdown: {
    skills: 92,
    projects: 84,
    experience: 76,
    formatting: 94,
    atsCompatibility: 88,
  },
  suggestions: [
    {
      type: 'warning',
      text: 'Add measurable impact to project descriptions (e.g. Reduced API latency by 35% using Redis).',
      impact: '+4 ATS Score'
    },
    {
      type: 'warning',
      text: 'Explicitly mention deployment & cloud technologies (Docker, AWS EC2, Vercel, CI/CD).',
      impact: '+5 Recruiter Match'
    },
    {
      type: 'success',
      text: 'Strong technical skills section with clear categorization into languages, frameworks, and tools.',
      impact: 'ATS Verified'
    },
    {
      type: 'info',
      text: 'Include links to hosted live demos alongside GitHub repositories.',
      impact: '+2 Recruiter Engagement'
    }
  ]
};

export const MOCK_INTERVIEW_ANALYTICS: InterviewAnalytics = {
  overallScore: 64,
  breakdown: {
    technical: 72,
    communication: 78,
    problemSolving: 74,
    confidence: 61,
    csFundamentals: 58,
  },
  weeklyProgress: [
    { week: 'Week 1', score: 52 },
    { week: 'Week 2', score: 58 },
    { week: 'Week 3', score: 64 },
    { week: 'Week 4', score: 71 },
  ],
  aiFeedback: 'You explain your conceptual approach clearly, but you tend to jump into coding before discussing edge cases and evaluating time-space complexity trade-offs.',
  strengths: [
    'Articulates thought process while writing code',
    'Handles interviewer hints constructively',
    'Clean variable naming and modular decomposition'
  ],
  growthAreas: [
    'Clarify constraints & edge cases before writing line 1',
    'Revise OS concurrency concepts (mutexes vs semaphores)',
    'Structure behavioral answers strictly around the STAR method'
  ]
};

export const MOCK_DIGITAL_TWIN_NODES: DigitalTwinNode[] = [
  { id: 'node_dsa', label: 'DSA & Algorithms', score: 81, status: 'Strong', description: '187 LeetCode problems solved, robust array/tree foundations', updatedAgo: 'Yesterday', x: 20, y: 30 },
  { id: 'node_dev', label: 'Web Development', score: 76, status: 'Good', description: 'Full stack React, TypeScript, Node.js, REST APIs', updatedAgo: '2 hours ago', x: 75, y: 25 },
  { id: 'node_sys', label: 'System Design', score: 48, status: 'Attention', description: 'Primary blocker for Tier-1 engineering roles', updatedAgo: '4 days ago', x: 80, y: 70 },
  { id: 'node_acad', label: 'Academics (CGPA 8.4)', score: 84, status: 'Strong', description: 'B.Tech CSE at ABC Engineering College (2027 batch)', updatedAgo: 'Last week', x: 25, y: 75 },
  { id: 'node_intv', label: 'Interview Intelligence', score: 64, status: 'Attention', description: 'Mock interview average, needs edge case deliberation', updatedAgo: '5 days ago', x: 50, y: 15 },
  { id: 'node_res', label: 'Resume & ATS Score', score: 86, status: 'Strong', description: 'Formatted for ATS parsers, projects need quantitative metrics', updatedAgo: '3 days ago', x: 50, y: 85 },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n_1',
    title: 'Placement Readiness Increased',
    description: 'Your readiness score rose by ? 4% after solving 5 Medium Tree problems.',
    timestamp: '2 hours ago',
    read: false,
    type: 'growth'
  },
  {
    id: 'n_2',
    title: 'Daily Goal Completed',
    description: 'You completed 2 out of 4 study goals for today. Consistency streak: 12 days!',
    timestamp: 'Yesterday',
    read: false,
    type: 'success'
  },
  {
    id: 'n_3',
    title: 'New GitHub Project Detected',
    description: 'TwinAI synced ecommerce-microservice. Added Node.js & Redis to your verified skills.',
    timestamp: 'Yesterday',
    read: true,
    type: 'update'
  },
  {
    id: 'n_4',
    title: 'Skill Gap Alert',
    description: 'System Design is currently your #1 limiting factor for Microsoft readiness (54%).',
    timestamp: '2 days ago',
    read: true,
    type: 'alert'
  },
  {
    id: 'n_5',
    title: 'Interview Score Improved',
    description: 'Your communication rating jumped +8% in the latest behavioral mock test.',
    timestamp: '3 days ago',
    read: true,
    type: 'growth'
  }
];

export const MOCK_PROGRESS_HISTORY = {
  readiness: [
    { period: 'May', score: 56, benchmark: 70 },
    { period: 'Jun', score: 62, benchmark: 70 },
    { period: 'Jul', score: 68, benchmark: 72 },
    { period: 'Aug', score: 72, benchmark: 75 },
    { period: 'Sep', score: 78, benchmark: 75 },
  ],
  problemsSolved: [
    { period: 'Week 1', count: 28 },
    { period: 'Week 2', count: 42 },
    { period: 'Week 3', count: 55 },
    { period: 'Week 4', count: 62 },
  ],
  studyHours: [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 2.8 },
    { day: 'Thu', hours: 5.0 },
    { day: 'Fri', hours: 4.0 },
    { day: 'Sat', hours: 6.5 },
    { day: 'Sun', hours: 4.5 },
  ]
};
